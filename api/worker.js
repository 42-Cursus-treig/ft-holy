const INTRA = "https://api.intra.42.fr";
const CACHE_TTL = 900;
const SEARCH_TTL = 3600;
const PAGE_SIZE = 100;
const MAX_PAGES = 4;

const SEARCH_MIN = 2;
const SEARCH_LIMIT = 8;

const TOKEN_KEY = "intra:token";
const TOKEN_SKEW = 300;

const ALLOWED_ORIGINS = [
  "https://tristan-reig.github.io",
  "https://42-cursus-treig.github.io",

  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:4173",
  "http://127.0.0.1:4173",
];

const LOGIN_RE = /^[a-zA-Z0-9_-]{2,32}$/;
const QUERY_RE = /^[a-zA-Z0-9_-]{2,32}$/;

class HttpError extends Error {
  constructor(status, code) {
    super(code);
    this.status = status;
    this.code = code;
  }
}

const corsHeaders = (request) => {
  const origin = request.headers.get("Origin");
  const headers = {
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
  if (ALLOWED_ORIGINS.includes(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
  }
  return headers;
};

const json = (request, body, status = 200, extra = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...corsHeaders(request), ...extra },
  });

const cachedJson = (request, body, hit) =>
  new Response(body, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "X-Cache": hit ? "HIT" : "MISS",
      ...corsHeaders(request),
    },
  });

async function requestToken(env) {
  if (!env.FT_UID || !env.FT_SECRET) {
    console.log("token_failed: missing FT_UID or FT_SECRET binding");
    throw new HttpError(502, "intra_missing_credentials");
  }

  const r = await fetch(`${INTRA}/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      grant_type: "client_credentials",
      client_id: env.FT_UID,
      client_secret: env.FT_SECRET,
    }),
  });

  if (!r.ok) {
    const detail = await r.text().catch(() => "");
    console.log("token_failed", r.status, detail.slice(0, 200));
    throw new HttpError(502, r.status === 401 ? "intra_bad_credentials" : "intra_token_failed");
  }

  const data = await r.json();
  if (!data.access_token) throw new HttpError(502, "intra_token_failed");

  const now = Math.floor(Date.now() / 1000);
  const createdAt = typeof data.created_at === "number" ? data.created_at : now;
  const expiresAt = createdAt + (data.expires_in ?? 7200);
  const ttl = Math.max(60, expiresAt - now - TOKEN_SKEW);

  await env.CACHE.put(TOKEN_KEY, data.access_token, { expirationTtl: ttl });
  return data.access_token;
}

async function getToken(env, force = false) {
  if (!force) {
    const cached = await env.CACHE.get(TOKEN_KEY);
    if (cached) return cached;
  }
  return requestToken(env);
}

async function withAuth(env, fn) {
  const token = await getToken(env);

  try {
    return await fn(token);
  } catch (e) {
    if (!(e instanceof HttpError) || e.code !== "intra_unauthorized") throw e;

    await env.CACHE.delete(TOKEN_KEY);
    const fresh = await getToken(env, true);

    try {
      return await fn(fresh);
    } catch (retryError) {
      if (retryError instanceof HttpError && retryError.code === "intra_unauthorized") {
        console.log("still unauthorized after token refresh");
        throw new HttpError(502, "intra_bad_credentials");
      }
      throw retryError;
    }
  }
}

async function intraGet(path, token) {
  const r = await fetch(`${INTRA}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (r.status === 401) throw new HttpError(401, "intra_unauthorized");
  if (r.status === 404) throw new HttpError(404, "login_not_found");
  if (r.status === 429) throw new HttpError(429, "intra_rate_limited");
  if (r.status === 403) throw new HttpError(403, "intra_forbidden");
  if (!r.ok) throw new HttpError(502, `intra_${r.status}`);

  return r.json();
}

async function fetchProjects(login, token, embedded) {
  if (Array.isArray(embedded) && embedded.length < PAGE_SIZE) return embedded;

  const all = [];
  for (let page = 1; page <= MAX_PAGES; page++) {
    const batch = await intraGet(
      `/v2/users/${encodeURIComponent(login)}/projects_users?page[size]=${PAGE_SIZE}&page[number]=${page}`,
      token
    );
    all.push(...batch);
    if (batch.length < PAGE_SIZE) break;
  }
  return all;
}

const statusOf = (pu) => {
  if (pu.status !== "finished") return "in-progress";
  return pu["validated?"] ? "validated" : "failed";
};

function normalize(user, projectsUsers) {
  const projects = {};

  for (const pu of projectsUsers) {
    const slug = pu.project?.slug;
    if (!slug) continue;

    const entry = {
      status: statusOf(pu),
      mark: pu.final_mark ?? null,
      occurrence: pu.occurrence ?? 0,
      cursusIds: pu.cursus_ids || [],
    };

    const prev = projects[slug];
    if (!prev || (prev.status !== "validated" && entry.status === "validated")) {
      projects[slug] = entry;
    }
  }

  return {
    version: 1,
    login: user.login,
    displayName: user.usual_full_name || user.displayname || null,
    avatar: user.image?.link || null,
    updatedAt: new Date().toISOString(),
    cursus: (user.cursus_users || []).map((cu) => ({
      id: cu.cursus?.id ?? null,
      slug: cu.cursus?.slug ?? null,
      name: cu.cursus?.name ?? null,
      level: cu.level ?? 0,
      grade: cu.grade ?? null,
      beginAt: cu.begin_at ?? null,
      endAt: cu.end_at ?? null,
    })),
    projects,
  };
}

async function handleHoly(request, env, login) {
  if (!LOGIN_RE.test(login)) throw new HttpError(400, "invalid_login");

  const key = `holy:${login.toLowerCase()}`;
  const cached = await env.CACHE.get(key);
  if (cached) return cachedJson(request, cached, true);

  const { user, projectsUsers } = await withAuth(env, async (token) => {
    const u = await intraGet(`/v2/users/${encodeURIComponent(login)}`, token);
    return { user: u, projectsUsers: await fetchProjects(login, token, u.projects_users) };
  });

  const payload = normalize(user, projectsUsers);
  const body = JSON.stringify(payload);
  await env.CACHE.put(key, body, { expirationTtl: CACHE_TTL });

  return cachedJson(request, body, false);
}

async function handleSearch(request, env, raw) {
  const q = raw.toLowerCase();
  if (q.length < SEARCH_MIN || !QUERY_RE.test(q)) throw new HttpError(400, "invalid_query");

  const key = `search:${q}`;
  const cached = await env.CACHE.get(key);
  if (cached) return cachedJson(request, cached, true);

  const upper = `${q}zzzzzzzz`;
  const users = await withAuth(env, (token) =>
    intraGet(
      `/v2/users?range[login]=${encodeURIComponent(q)},${encodeURIComponent(upper)}` +
        `&page[size]=${SEARCH_LIMIT}&sort=login`,
      token
    )
  );

  const results = (Array.isArray(users) ? users : [])
    .filter((u) => typeof u.login === "string" && u.login.toLowerCase().startsWith(q))
    .slice(0, SEARCH_LIMIT)
    .map((u) => ({
      login: u.login,
      displayName: u.usual_full_name || u.displayname || null,
      avatar: u.image?.versions?.small || u.image?.link || null,
    }));

  const body = JSON.stringify({ query: q, results });
  await env.CACHE.put(key, body, { expirationTtl: SEARCH_TTL });

  return cachedJson(request, body, false);
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(request) });
    }
    if (request.method !== "GET") {
      return json(request, { error: "method_not_allowed" }, 405);
    }

    const { pathname } = new URL(request.url);
    const holy = pathname.match(/^\/api\/holy\/([^/]+)\/?$/);
    const search = pathname.match(/^\/api\/search\/([^/]+)\/?$/);

    if (!holy && !search) return json(request, { error: "not_found" }, 404);

    try {
      return holy
        ? await handleHoly(request, env, decodeURIComponent(holy[1]))
        : await handleSearch(request, env, decodeURIComponent(search[1]));
    } catch (e) {
      if (e instanceof HttpError) return json(request, { error: e.code }, e.status);
      console.log("internal_error", e?.stack || String(e));
      return json(request, { error: "internal_error" }, 500);
    }
  },
};

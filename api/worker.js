const INTRA = "https://api.intra.42.fr";
const CACHE_TTL = 900;
const PAGE_SIZE = 100;
const MAX_PAGES = 4;

const ALLOWED_ORIGINS = [
  "https://tristan-reig.github.io",
  "https://42-cursus-treig.github.io",

  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:4173",
  "http://127.0.0.1:4173",
];

const LOGIN_RE = /^[a-zA-Z0-9_-]{2,32}$/;

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

async function getToken(env) {
  const cached = await env.CACHE.get("intra:token");
  if (cached) return cached;

  const r = await fetch(`${INTRA}/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      grant_type: "client_credentials",
      client_id: env.FT_UID,
      client_secret: env.FT_SECRET,
    }),
  });

  if (!r.ok) throw new HttpError(502, "intra_token_failed");

  const data = await r.json();
  const ttl = Math.max(60, (data.expires_in || 7200) - 300);
  await env.CACHE.put("intra:token", data.access_token, { expirationTtl: ttl });
  return data.access_token;
}

async function intraGet(path, token) {
  const r = await fetch(`${INTRA}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (r.status === 404) throw new HttpError(404, "login_not_found");
  if (r.status === 429) throw new HttpError(429, "intra_rate_limited");
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
  if (cached) {
    return new Response(cached, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "X-Cache": "HIT",
        ...corsHeaders(request),
      },
    });
  }

  const token = await getToken(env);
  const user = await intraGet(`/v2/users/${encodeURIComponent(login)}`, token);
  const projectsUsers = await fetchProjects(login, token, user.projects_users);

  const payload = normalize(user, projectsUsers);
  const body = JSON.stringify(payload);
  await env.CACHE.put(key, body, { expirationTtl: CACHE_TTL });

  return new Response(body, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "X-Cache": "MISS",
      ...corsHeaders(request),
    },
  });
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
    const match = pathname.match(/^\/api\/holy\/([^/]+)\/?$/);

    if (!match) return json(request, { error: "not_found" }, 404);

    try {
      return await handleHoly(request, env, decodeURIComponent(match[1]));
    } catch (e) {
      if (e instanceof HttpError) return json(request, { error: e.code }, e.status);
      return json(request, { error: "internal_error" }, 500);
    }
  },
};

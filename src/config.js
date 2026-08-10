const params = new URLSearchParams(window.location.search);

export const API_BASE = import.meta.env.VITE_API_BASE || "";
export const API_ENABLED = Boolean(API_BASE);

const BASE = import.meta.env.BASE_URL;
const LOGIN_RE = /^[a-zA-Z0-9_-]{2,32}$/;

const segmentLogin = (() => {
  const path = window.location.pathname;
  if (!path.startsWith(BASE)) return null;
  const segment = path.slice(BASE.length).replace(/\/+$/, "").split("/")[0];
  return LOGIN_RE.test(segment) ? segment : null;
})();

const queryLogin = (() => {
  const value = params.get("login");
  return value && LOGIN_RE.test(value) ? value : null;
})();

const rawLogin = segmentLogin || queryLogin;

if (params.get("from") === "path" && rawLogin) {
  const rest = new URLSearchParams(params);
  rest.delete("login");
  rest.delete("from");
  const suffix = rest.toString();
  window.history.replaceState(
    null,
    "",
    `${BASE}${rawLogin}${suffix ? `?${suffix}` : ""}${window.location.hash}`
  );
}

export const SELF = API_ENABLED && (params.has("me") || rawLogin === "me");
export const LOGIN = API_ENABLED && rawLogin !== "me" ? rawLogin : null;

export const GRAPH_PARAM = params.get("graph");
export const COMPACT = params.has("compact");

export const PROGRESS_PUBLIC_URL = `${import.meta.env.BASE_URL}progress.json`;

export const progressUrl = (login) => {
  if (SELF) return `${API_BASE}/api/holy/me`;
  if (login) return `${API_BASE}/api/holy/${encodeURIComponent(login)}`;
  return PROGRESS_PUBLIC_URL;
};

export const READ_ONLY = LOGIN !== null || SELF;

export const LS_PROGRESS_KEY = LOGIN
  ? `ft_holy:progress:${LOGIN}`
  : "ft_holy:progress";

export const LS_POSITIONS_PREFIX = "ft_holy:positions:";
export const positionsKey = (worldId) => `${LS_POSITIONS_PREFIX}${worldId}`;

export const GITHUB_OWNER = "42-Cursus-treig";
export const GITHUB_REPO = "ft-holy";
export const GITHUB_BRANCH = "main";
export const PROGRESS_FILE_PATH = "public/progress.json";
export const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;
export const ADMIN_USERNAME = "tristan-reig";
export const LS_TOKEN_KEY = "ft_holy:gh_token";

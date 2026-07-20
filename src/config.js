const params = new URLSearchParams(window.location.search);

export const LOGIN = params.get("login") || null;
export const SELF = params.has("me") || params.get("login") === "me";
export const GRAPH = params.get("graph") || (LOGIN || SELF ? "pool" : "cursus");

export const API_BASE =
  import.meta.env.VITE_API_BASE ||
  (import.meta.env.DEV ? "" : "https://moulinette.ft-moulinette.fr");

export const PROGRESS_PUBLIC_URL = `${import.meta.env.BASE_URL}progress.json`;

export const progressUrl = (login) => {
  if (SELF) return `${API_BASE}/api/holy/me`;
  if (login) return `${API_BASE}/api/holy/${encodeURIComponent(login)}`;
  return PROGRESS_PUBLIC_URL;
};

export const READ_ONLY = LOGIN !== null || SELF;
export const COMPACT = params.has("compact");

export const LS_PROGRESS_KEY = LOGIN ? `ft_holy:progress:${LOGIN}` : "ft_holy:progress";
export const LS_POSITIONS_KEY = `ft_holy:positions:${GRAPH}`;

export const GITHUB_OWNER = "tristan-reig";
export const GITHUB_REPO = "ft-holy";
export const GITHUB_BRANCH = "main";
export const PROGRESS_FILE_PATH = "public/progress.json";
export const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;
export const ADMIN_USERNAME = "tristan-reig";
export const LS_TOKEN_KEY = "ft_holy:gh_token";
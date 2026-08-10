import {
  GITHUB_OWNER,
  GITHUB_REPO,
  GITHUB_BRANCH,
  PROGRESS_FILE_PATH,
  ADMIN_USERNAME,
} from "../config";

const API = "https://api.github.com";

const utf8ToBase64 = (str) => {
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
};

const headers = (token) => ({
  Authorization: `Bearer ${token}`,
  Accept: "application/vnd.github+json",
});

export const verifyToken = async (token) => {
  try {
    const r = await fetch(`${API}/user`, { headers: headers(token) });
    if (!r.ok) return { ok: false, reason: "invalid_token" };
    const u = await r.json();
    if (u.login !== ADMIN_USERNAME) {
      return { ok: false, reason: "not_admin", login: u.login };
    }
    return { ok: true, login: u.login, avatar: u.avatar_url };
  } catch {
    return { ok: false, reason: "network" };
  }
};

const fetchCurrentSha = async (token) => {
  const url = `${API}/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${PROGRESS_FILE_PATH}?ref=${GITHUB_BRANCH}`;
  const r = await fetch(url, { headers: headers(token) });
  if (r.status === 404) return null;
  if (!r.ok) throw new Error(`GET contents: ${r.status}`);
  const d = await r.json();
  return d.sha;
};

const COMMIT_ERRORS = [
  [/protected branch|pull request/i, "La branche est protégée : une pull request est exigée."],
  [/is at .* but expected/i, "Le fichier a changé entre-temps, recharge la page et réessaie."],
  [/Bad credentials|requires authentication/i, "Token invalide ou expiré, reconnecte-toi."],
  [/Resource not accessible/i, "Ce token n'a pas la permission « Contents: read and write »."],
  [/Not Found/i, "Dépôt ou fichier introuvable (vérifie GITHUB_OWNER / GITHUB_REPO)."],
];

const commitError = async (r) => {
  const body = await r.json().catch(() => null);
  const raw = body?.message || `HTTP ${r.status}`;
  const known = COMMIT_ERRORS.find(([re]) => re.test(raw));
  const err = new Error(known ? known[1] : `Commit échoué (${r.status}) : ${raw}`);
  err.status = r.status;
  err.githubMessage = raw;
  return err;
};

export const commitProgress = async (token, progressData) => {
  const sha = await fetchCurrentSha(token);
  const body = {
    message: `progress: maj du ${new Date().toLocaleString("fr-FR")}`,
    content: utf8ToBase64(JSON.stringify(progressData, null, 2) + "\n"),
    branch: GITHUB_BRANCH,
  };
  if (sha) body.sha = sha;

  const r = await fetch(`${API}/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${PROGRESS_FILE_PATH}`, {
    method: "PUT",
    headers: { ...headers(token), "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!r.ok) throw await commitError(r);
  return r.json();
};

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
  if (!r.ok) {
    const err = await r.text();
    throw new Error(`Commit échoué (${r.status}): ${err}`);
  }
  return r.json();
};

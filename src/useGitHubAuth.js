import { useState, useEffect, useCallback } from "react";
import {
  GITHUB_CLIENT_ID,
  GITHUB_OWNER,
  GITHUB_REPO,
  GITHUB_BRANCH,
  PROGRESS_FILE_PATH,
  ADMIN_USERNAME,
  LS_TOKEN_KEY,
} from "./config";

const DEVICE_PROXY = "";

const readToken = () => {
  try {
    return localStorage.getItem(LS_TOKEN_KEY) || null;
  } catch {
    return null;
  }
};

const writeToken = (t) => {
  try {
    if (t) localStorage.setItem(LS_TOKEN_KEY, t);
    else localStorage.removeItem(LS_TOKEN_KEY);
  } catch {}
};

const verifyToken = async (token) => {
  try {
    const r = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
    });
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

export const useGitHubAuth = () => {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("idle");
  const [deviceInfo, setDeviceInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const t = readToken();
    if (!t) return;
    setStatus("verifying");
    verifyToken(t).then((res) => {
      if (res.ok) {
        setUser({ login: res.login, avatar: res.avatar, token: t });
        setStatus("idle");
      } else {
        writeToken(null);
        setStatus("idle");
        if (res.reason === "not_admin") {
          setError(`Compte ${res.login} non autorisé`);
        }
      }
    });
  }, []);

  const loginWithPAT = useCallback(async (pat) => {
    setStatus("verifying");
    setError(null);
    const res = await verifyToken(pat);
    if (res.ok) {
      writeToken(pat);
      setUser({ login: res.login, avatar: res.avatar, token: pat });
      setStatus("idle");
      return { ok: true };
    }
    setStatus("error");
    const msg =
      res.reason === "not_admin"
        ? `Compte ${res.login} non autorisé`
        : res.reason === "invalid_token"
        ? "Token invalide"
        : "Erreur réseau";
    setError(msg);
    return { ok: false, error: msg };
  }, []);

  const loginWithDevice = useCallback(async () => {
    if (!DEVICE_PROXY || !GITHUB_CLIENT_ID) {
      setError("Device Flow non configuré, utilise un PAT");
      setStatus("error");
      return;
    }
    setStatus("device");
    setError(null);
    try {
      const r = await fetch(`${DEVICE_PROXY}/device/code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_id: GITHUB_CLIENT_ID,
          scope: "repo",
        }),
      });
      const d = await r.json();
      setDeviceInfo({
        user_code: d.user_code,
        verification_uri: d.verification_uri,
      });

      const start = Date.now();
      const expiresIn = (d.expires_in || 900) * 1000;
      const interval = (d.interval || 5) * 1000;

      while (Date.now() - start < expiresIn) {
        await new Promise((res) => setTimeout(res, interval));
        const pr = await fetch(`${DEVICE_PROXY}/access_token`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            client_id: GITHUB_CLIENT_ID,
            device_code: d.device_code,
            grant_type: "urn:ietf:params:oauth:grant-type:device_code",
          }),
        });
        const pd = await pr.json();
        if (pd.access_token) {
          const v = await verifyToken(pd.access_token);
          if (v.ok) {
            writeToken(pd.access_token);
            setUser({ login: v.login, avatar: v.avatar, token: pd.access_token });
            setDeviceInfo(null);
            setStatus("idle");
            return;
          } else {
            setError(`Compte ${v.login || "inconnu"} non autorisé`);
            setStatus("error");
            return;
          }
        }
        if (pd.error && pd.error !== "authorization_pending" && pd.error !== "slow_down") {
          setError(pd.error_description || pd.error);
          setStatus("error");
          return;
        }
      }
      setError("Délai expiré");
      setStatus("error");
    } catch (e) {
      setError(String(e));
      setStatus("error");
    }
  }, []);

  const logout = useCallback(() => {
    writeToken(null);
    setUser(null);
    setStatus("idle");
    setError(null);
  }, []);

  return {
    user,
    isAdmin: user?.login === ADMIN_USERNAME,
    status,
    deviceInfo,
    error,
    loginWithPAT,
    loginWithDevice,
    logout,
  };
};

const utf8ToBase64 = (str) => {
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
};

const fetchCurrentSha = async (token) => {
  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${PROGRESS_FILE_PATH}?ref=${GITHUB_BRANCH}`;
  const r = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
    },
  });
  if (r.status === 404) return null;
  if (!r.ok) throw new Error(`GET contents: ${r.status}`);
  const d = await r.json();
  return d.sha;
};

export const commitProgress = async (token, progressData) => {
  const sha = await fetchCurrentSha(token);
  const payload = JSON.stringify(progressData, null, 2) + "\n";
  const body = {
    message: `progress: maj du ${new Date().toLocaleString("fr-FR")}`,
    content: utf8ToBase64(payload),
    branch: GITHUB_BRANCH,
  };
  if (sha) body.sha = sha;

  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${PROGRESS_FILE_PATH}`;
  const r = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!r.ok) {
    const err = await r.text();
    throw new Error(`Commit échoué (${r.status}): ${err}`);
  }
  return r.json();
};
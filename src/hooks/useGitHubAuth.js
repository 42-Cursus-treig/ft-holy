import { useState, useEffect, useCallback, useRef } from "react";
import { GITHUB_CLIENT_ID, ADMIN_USERNAME, LS_TOKEN_KEY } from "../config";
import { verifyToken } from "../lib/github";

const DEVICE_PROXY = "";

export const deviceFlowAvailable = Boolean(DEVICE_PROXY && GITHUB_CLIENT_ID);

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
  } catch {
    //
  }
};

export const useGitHubAuth = () => {
  const [initialToken] = useState(() => readToken());
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState(() =>
    initialToken ? "verifying" : "idle"
  );
  const [deviceInfo, setDeviceInfo] = useState(null);
  const [error, setError] = useState(null);

  const alive = useRef(true);
  useEffect(() => () => { alive.current = false; }, []);

  useEffect(() => {
    const t = initialToken;
    if (!t) return;
    verifyToken(t).then((res) => {
      if (!alive.current) return;
      if (res.ok) {
        setUser({ login: res.login, avatar: res.avatar, token: t });
        setStatus("idle");
      } else {
        writeToken(null);
        setStatus("idle");
        if (res.reason === "not_admin") setError(`Compte ${res.login} non autorisé`);
      }
    });
  }, [initialToken]);

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
    if (!deviceFlowAvailable) {
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
        body: JSON.stringify({ client_id: GITHUB_CLIENT_ID, scope: "repo" }),
      });
      const d = await r.json();
      if (!alive.current) return;
      setDeviceInfo({ user_code: d.user_code, verification_uri: d.verification_uri });

      const start = Date.now();
      const expiresIn = (d.expires_in || 900) * 1000;
      const interval = (d.interval || 5) * 1000;

      while (alive.current && Date.now() - start < expiresIn) {
        await new Promise((res) => setTimeout(res, interval));
        if (!alive.current) return;

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
        if (!alive.current) return;

        if (pd.access_token) {
          const v = await verifyToken(pd.access_token);
          if (!alive.current) return;
          if (v.ok) {
            writeToken(pd.access_token);
            setUser({ login: v.login, avatar: v.avatar, token: pd.access_token });
            setDeviceInfo(null);
            setStatus("idle");
          } else {
            setError(`Compte ${v.login || "inconnu"} non autorisé`);
            setStatus("error");
          }
          return;
        }
        if (pd.error && pd.error !== "authorization_pending" && pd.error !== "slow_down") {
          setError(pd.error_description || pd.error);
          setStatus("error");
          return;
        }
      }
      if (alive.current) {
        setError("Délai expiré");
        setStatus("error");
      }
    } catch (e) {
      if (!alive.current) return;
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

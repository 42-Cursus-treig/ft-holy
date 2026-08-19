import { useState, useEffect, useCallback, useRef } from "react";
import {
  progressUrl,
  PROGRESS_PUBLIC_URL,
  LS_PROGRESS_KEY,
  READ_ONLY,
  LOGIN,
} from "../config";
import { toProgress, detectTronc, allowedWorlds } from "../data/ft42";

const EMPTY = { version: 1, updatedAt: null, statuses: {}, marks: {} };

const readLocal = () => {
  try {
    const raw = localStorage.getItem(LS_PROGRESS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (typeof parsed !== "object" || !parsed.statuses) return null;
    return parsed;
  } catch {
    return null;
  }
};

const writeLocal = (data) => {
  try {
    localStorage.setItem(LS_PROGRESS_KEY, JSON.stringify(data));
  } catch {
    //
  }
};

const mostRecent = (a, b) => {
  if (!a) return b;
  if (!b) return a;
  const ta = a.updatedAt ? Date.parse(a.updatedAt) : 0;
  const tb = b.updatedAt ? Date.parse(b.updatedAt) : 0;
  return ta >= tb ? a : b;
};

const isIntraPayload = (data) => data && typeof data.projects === "object";

// Un login inexistant ou invalide est définitif → page 404 pleine.
// Un rate limit, un token en échec ou une coupure réseau sont passagers →
// bandeau d'avertissement, le graphe reste visible.
const FATAL_ERRORS = new Set(["login_not_found", "invalid_login"]);

const messageFor = (code) =>
  ({
    login_not_found: "Ce login n'existe pas sur l'intra.",
    invalid_login: "Login invalide.",
    intra_rate_limited: "L'intra limite les requêtes, réessaie dans un instant.",
    intra_token_failed: "L'API 42 est injoignable.",
    intra_forbidden: "L'application n'a pas accès à ces données.",
  }[code] || null);

export const useProgress = () => {
  const [data, setData] = useState(() =>
    READ_ONLY ? EMPTY : readLocal() || EMPTY
  );
  const [remoteLoaded, setRemoteLoaded] = useState(false);
  // { code, message, fatal } — objet et non chaîne, pour que l'appelant
  // puisse décider entre page 404 et simple bandeau.
  const [error, setError] = useState(null);
  const [hasLocalDraft, setHasLocalDraft] = useState(false);

  const [worlds, setWorlds] = useState(null);
  const [tronc, setTronc] = useState(null);
  const [profile, setProfile] = useState(null);

  const remoteRef = useRef(EMPTY);

  useEffect(() => {
    const base = progressUrl(LOGIN);
    const url = `${base}${base.includes("?") ? "&" : "?"}t=${Date.now()}`;

    if (READ_ONLY) {
      fetch(url, { cache: "no-store" })
        .then(async (r) => {
          const body = await r.json().catch(() => null);
          if (!r.ok) {
            // Le code brut doit survivre au message traduit : c'est lui qui
            // détermine si l'erreur est fatale.
            const err = new Error(messageFor(body?.error) || `HTTP ${r.status}`);
            err.code = body?.error || `http_${r.status}`;
            throw err;
          }
          return body;
        })
        .then((remote) => {
          if (isIntraPayload(remote)) {
            const detected = detectTronc(remote);
            const normalized = toProgress(remote);

            setTronc(detected);
            setWorlds(allowedWorlds(remote, detected));
            setProfile({
              login: remote.login,
              displayName: remote.displayName,
              avatar: remote.avatar,
              level: remote.cursus?.find((c) => c.id === 21)?.level
                ?? remote.cursus?.[0]?.level
                ?? null,
            });
            remoteRef.current = normalized;
            setData(normalized);

            if (import.meta.env.DEV) {
              import("../data/ft42").then(({ unmappedSlugs }) => {
                const orphans = unmappedSlugs(remote);
                if (orphans.length) {
                  console.warn(
                    `[ft_holy] ${orphans.length} slug(s) 42 sans correspondance :`,
                    orphans.join(", ")
                  );
                }
              });
            }
          } else {
            const normalized = remote?.statuses ? remote : EMPTY;
            remoteRef.current = normalized;
            setData(normalized);
          }
          setRemoteLoaded(true);
        })
        .catch((e) => {
          const code = e.code || "network_error";
          setError({ code, message: e.message, fatal: FATAL_ERRORS.has(code) });
          setRemoteLoaded(true);
        });
      return;
    }

    const local = readLocal();
    fetch(url, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : EMPTY))
      .catch(() => EMPTY)
      .then((remote) => {
        const normalized = remote?.statuses ? remote : EMPTY;
        remoteRef.current = normalized;
        setData(mostRecent(local, normalized));
        setRemoteLoaded(true);
        const lt = local?.updatedAt ? Date.parse(local.updatedAt) : 0;
        const rt = normalized.updatedAt ? Date.parse(normalized.updatedAt) : 0;
        setHasLocalDraft(lt > rt);
      });
  }, []);

  const getStatus = useCallback((id) => data.statuses[id] || "available", [data]);

  const getMark = useCallback((id) => data.marks?.[id] ?? null, [data]);

  const setStatus = useCallback((id, status) => {
    if (READ_ONLY) return;
    setData((prev) => {
      const next = { ...prev.statuses };
      if (status === "available") {
        delete next[id];
      } else {
        next[id] = status;
      }
      const updated = {
        version: 1,
        updatedAt: new Date().toISOString(),
        statuses: next,
        marks: prev.marks || {},
      };
      writeLocal(updated);
      setHasLocalDraft(true);
      return updated;
    });
  }, []);

  const markSynced = useCallback((syncedData) => {
    remoteRef.current = syncedData;
    setHasLocalDraft(false);
  }, []);

  const refreshRemote = useCallback(async () => {
    try {
      const r = await fetch(`${PROGRESS_PUBLIC_URL}?t=${Date.now()}`, { cache: "no-store" });
      if (!r.ok) return null;
      const remote = await r.json();
      remoteRef.current = remote;
      return remote;
    } catch {
      return null;
    }
  }, []);

  return {
    data,
    getStatus,
    getMark,
    setStatus,
    remoteLoaded,
    error,
    readOnly: READ_ONLY,
    hasLocalDraft,
    markSynced,
    refreshRemote,
    remoteRef,
    worlds,
    tronc,
    profile,
  };
};

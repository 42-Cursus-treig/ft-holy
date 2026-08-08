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
  } catch {}
};

const mostRecent = (a, b) => {
  if (!a) return b;
  if (!b) return a;
  const ta = a.updatedAt ? Date.parse(a.updatedAt) : 0;
  const tb = b.updatedAt ? Date.parse(b.updatedAt) : 0;
  return ta >= tb ? a : b;
};

const isIntraPayload = (data) => data && typeof data.projects === "object";

const messageFor = (code) =>
  ({
    login_not_found: "Ce login n'existe pas sur l'intra.",
    invalid_login: "Login invalide.",
    intra_rate_limited: "L'intra limite les requêtes, réessaie dans un instant.",
    intra_token_failed: "L'API 42 est injoignable.",
  }[code] || null);

export const useProgress = () => {
  const [data, setData] = useState(EMPTY);
  const [remoteLoaded, setRemoteLoaded] = useState(false);
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
          if (!r.ok) throw new Error(messageFor(body?.error) || `HTTP ${r.status}`);
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
          setError(e.message);
          setRemoteLoaded(true);
        });
      return;
    }

    const local = readLocal();
    if (local) setData(local);
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

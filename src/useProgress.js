import { useState, useEffect, useCallback, useRef } from "react";
import { PROGRESS_PUBLIC_URL, LS_PROGRESS_KEY } from "./config";

const EMPTY = { version: 1, updatedAt: null, statuses: {} };

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

export const useProgress = () => {
  const [data, setData] = useState(EMPTY);
  const [remoteLoaded, setRemoteLoaded] = useState(false);
  const [hasLocalDraft, setHasLocalDraft] = useState(false);
  const remoteRef = useRef(EMPTY);

  useEffect(() => {
    const local = readLocal();
    if (local) setData(local);

    const url = `${PROGRESS_PUBLIC_URL}?t=${Date.now()}`;
    fetch(url, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : EMPTY))
      .catch(() => EMPTY)
      .then((remote) => {
        const normalized = remote && remote.statuses ? remote : EMPTY;
        remoteRef.current = normalized;
        const winner = mostRecent(local, normalized);
        setData(winner);
        setRemoteLoaded(true);
        const localTs = local?.updatedAt ? Date.parse(local.updatedAt) : 0;
        const remoteTs = normalized.updatedAt ? Date.parse(normalized.updatedAt) : 0;
        setHasLocalDraft(localTs > remoteTs);
      });
  }, []);

  const getStatus = useCallback(
    (id) => data.statuses[id] || "available",
    [data]
  );

  const setStatus = useCallback((id, status) => {
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
      const r = await fetch(`${PROGRESS_PUBLIC_URL}?t=${Date.now()}`, {
        cache: "no-store",
      });
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
    setStatus,
    remoteLoaded,
    hasLocalDraft,
    markSynced,
    refreshRemote,
    remoteRef,
  };
};
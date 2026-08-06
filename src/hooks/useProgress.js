import { useState, useEffect, useCallback, useRef } from "react";
import { progressUrl, PROGRESS_PUBLIC_URL, LS_PROGRESS_KEY, READ_ONLY, LOGIN } from "../config";

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

export const useProgress = () => {
  const [data, setData] = useState(EMPTY);
  const [remoteLoaded, setRemoteLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [hasLocalDraft, setHasLocalDraft] = useState(false);
  const remoteRef = useRef(EMPTY);

  useEffect(() => {
    const url = `${progressUrl(LOGIN)}${progressUrl(LOGIN).includes("?") ? "&" : "?"}t=${Date.now()}`;

    if (READ_ONLY) {
      fetch(url, { cache: "no-store", credentials: "include" })
        .then((r) => {
          if (!r.ok) throw new Error(`HTTP ${r.status}`);
          return r.json();
        })
        .then((remote) => {
          const normalized = remote?.statuses ? remote : EMPTY;
          remoteRef.current = normalized;
          setData(normalized);
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
        marks: prev.marks || {}
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

  return { data, getStatus, getMark, setStatus, remoteLoaded, error, readOnly: READ_ONLY, hasLocalDraft, markSynced, refreshRemote, remoteRef };
};

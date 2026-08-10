import { useState, useEffect } from "react";
import { FT_SLUGS } from "./ft42";

const SUBJECTS_URL = `${import.meta.env.BASE_URL}subjects.json`;
const INTRA_PROJECT = "https://projects.intra.42.fr/projects/";

export const slugsOf = (nodeId) => {
  const entry = FT_SLUGS[nodeId];
  if (!entry) return [];
  return (Array.isArray(entry) ? entry : [entry]).filter(Boolean);
};

export const slugOf = (nodeId) => slugsOf(nodeId)[0] || null;

let cache = null;

export const loadSubjects = () => {
  if (cache) return cache;
  cache = fetch(SUBJECTS_URL, { cache: "no-store" })
    .then((r) => (r.ok ? r.json() : null))
    .then((d) => d?.subjects || {})
    .catch(() => ({}));
  return cache;
};

export const useSubjects = () => {
  const [subjects, setSubjects] = useState(null);
  useEffect(() => {
    let alive = true;
    loadSubjects().then((s) => alive && setSubjects(s));
    return () => {
      alive = false;
    };
  }, []);
  return subjects;
};

const pickDoc = (docs, lang) => {
  if (!Array.isArray(docs) || !docs.length) return null;
  const isSubject = (d) => /subject/i.test(d.name || "");

  return (
    docs.find((d) => isSubject(d) && d.lang === lang) ||
    docs.find((d) => isSubject(d) && !d.lang) ||
    docs.find(isSubject) ||
    docs[0]
  );
};

export const resolveSubject = (data, nodeId, subjects, lang = "en") => {
  if (data?.url) {
    return { href: data.url, kind: "custom", label: "Voir la ressource" };
  }

  if (data?.pdfUrl) {
    const href = /^https?:\/\//.test(data.pdfUrl)
      ? data.pdfUrl
      : `${import.meta.env.BASE_URL}${data.pdfUrl.replace(/^\//, "")}`;
    return { href, kind: "pdf", label: "Ouvrir le sujet" };
  }

  const candidates = [nodeId, data?.parentId].filter(Boolean);
  const slugs = candidates.flatMap(slugsOf);
  if (!slugs.length) return null;

  for (const slug of slugs) {
    const doc = pickDoc(subjects?.[slug], lang);
    if (doc) {
      return {
        href: doc.href,
        kind: "pdf",
        label: "Ouvrir le sujet",
        lang: doc.lang,
        slug,
      };
    }
  }

  return {
    href: INTRA_PROJECT + encodeURIComponent(slugs[0]),
    kind: "intra",
    label: "Voir sur l'intra",
    slug: slugs[0],
  };
};

export const intraFallback = (nodeId) => {
  const slug = slugOf(nodeId);
  return slug ? INTRA_PROJECT + encodeURIComponent(slug) : null;
};

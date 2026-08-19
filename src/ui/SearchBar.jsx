import { useState, useRef, useEffect, useMemo } from "react";
import { useReactFlow } from "@xyflow/react";
import {
  LOGIN,
  SELF,
  ADMIN_USERNAME,
  API_ENABLED,
  holyUrl,
  searchUrl,
  isValidLogin,
} from "../config";

const SIGIL = "@";
const MIN_QUERY = 2;
const DEBOUNCE_MS = 220;

export const SearchBar = ({ nodes, onSelectNode }) => {
  const [term, setTerm] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const [students, setStudents] = useState([]);
  const [searchState, setSearchState] = useState("idle");
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const { setCenter } = useReactFlow();

  const isStudentMode = term.startsWith(SIGIL);
  const query = (isStudentMode ? term.slice(SIGIL.length) : term).trim().toLowerCase();

  useEffect(() => {
    if (!isStudentMode || !API_ENABLED || query.length < MIN_QUERY) {
      setStudents([]);
      setSearchState("idle");
      return;
    }

    const controller = new AbortController();
    setSearchState("loading");

    const timer = setTimeout(() => {
      fetch(searchUrl(query), { signal: controller.signal })
        .then(async (r) => {
          const body = await r.json().catch(() => null);
          if (r.status === 403) {
            setStudents([]);
            setSearchState("unavailable");
            return;
          }
          if (!r.ok) throw new Error(body?.error || `HTTP ${r.status}`);
          setStudents(Array.isArray(body?.results) ? body.results : []);
          setSearchState("ok");
        })
        .catch((e) => {
          if (e.name === "AbortError") return;
          setStudents([]);
          setSearchState("error");
        });
    }, DEBOUNCE_MS);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [isStudentMode, query]);

  const results = useMemo(() => {
    if (!isStudentMode) {
      if (term.trim() === "") return [];
      return nodes
        .filter((n) => n.data.label?.toLowerCase().includes(term.toLowerCase()))
        .slice(0, 12)
        .map((n) => ({
          key: `node:${n.id}`,
          kind: "node",
          node: n,
          primary: n.data.label,
          secondary: n.data.language || "—",
        }));
    }

    const current = (LOGIN || "").toLowerCase();
    const list = students
      .filter((s) => s.login.toLowerCase() !== current)
      .map((s) => ({
        key: `user:${s.login}`,
        kind: "student",
        login: s.login,
        primary: s.login,
        secondary: s.displayName || "cadet·te",
        avatar: s.avatar,
      }));

    const alreadyListed = list.some((r) => r.login.toLowerCase() === query);
    if (isValidLogin(query) && query !== current && !alreadyListed && searchState !== "loading") {
      list.push({
        key: `direct:${query}`,
        kind: "student",
        login: query,
        primary: query,
        secondary: "ouvrir ce holy graph",
      });
    }

    if ((LOGIN || SELF) && (query === "" || ADMIN_USERNAME.toLowerCase().startsWith(query))) {
      list.push({
        key: "root",
        kind: "student",
        login: null,
        primary: ADMIN_USERNAME,
        secondary: "graphe de référence",
      });
    }

    return list;
  }, [isStudentMode, term, query, nodes, students, searchState]);

  const handleTermChange = (event) => {
    setTerm(event.target.value);
    setActiveIndex(-1);
  };

  useEffect(() => {
    if (activeIndex >= 0 && listRef.current) {
      const items = listRef.current.querySelectorAll("[data-result-item]");
      items[activeIndex]?.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const typing = /^(INPUT|TEXTAREA)$/.test(document.activeElement?.tagName || "");

      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === SIGIL && !typing && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        setTerm(SIGIL);
        setActiveIndex(-1);
        inputRef.current?.focus();
      }
      if (e.key === "Escape") {
        inputRef.current?.blur();
        setTerm("");
        setActiveIndex(-1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleInputKeyDown = (e) => {
    if (results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const target = activeIndex >= 0 ? results[activeIndex] : results[0];
      if (target) handleSelect(target);
    }
  };

  const handleSelect = (result) => {
    if (result.kind === "student") {
      const target = holyUrl(result.login);
      if (target === window.location.pathname) {
        setTerm("");
        inputRef.current?.blur();
        return;
      }
      window.location.assign(target);
      return;
    }

    const node = result.node;
    setTerm("");
    setActiveIndex(-1);
    inputRef.current?.blur();
    onSelectNode(node.id);
    const size = node.data.size || 60;
    setCenter(node.position.x + size / 2, node.position.y + size / 2, {
      zoom: 1.4,
      duration: 800,
    });
  };

  const accent = isStudentMode ? "var(--azure)" : "var(--gold)";

  const hint = !isStudentMode
    ? null
    : searchState === "loading"
    ? "recherche…"
    : searchState === "unavailable"
    ? "autocomplétion indisponible — saisis un login complet"
    : searchState === "error"
    ? "recherche impossible — saisis un login complet"
    : query.length > 0 && query.length < MIN_QUERY
    ? `${MIN_QUERY} caractères minimum`
    : query === ""
    ? "saisis un login 42"
    : null;

  const dropdown = {
    background: "rgba(10, 12, 20, 0.95)",
    border: "1px solid var(--ink-line)",
    borderRadius: 2,
  };

  return (
    <div className="relative" style={{ width: "var(--hud-bar-width)" }}>
      <div
        className="hud-bar items-center gap-2 px-3 transition-colors"
        style={{ border: `1px solid ${isStudentMode ? "var(--azure-soft)" : "var(--ink-line)"}` }}
      >
        <span
          className="smallcaps text-[9px] transition-colors"
          style={{ color: isStudentMode ? "var(--azure)" : "var(--vellum-mute)" }}
        >
          {isStudentMode ? "CADET" : "CATALOGUE"}
        </span>
        <input
          ref={inputRef}
          type="text"
          placeholder="rechercher une étoile… (@ pour un cadet)"
          value={term}
          onChange={handleTermChange}
          onKeyDown={handleInputKeyDown}
          className="flex-1 bg-transparent text-vellum font-serif italic text-sm placeholder:text-vellum-mute focus:outline-none"
          spellCheck={false}
          autoComplete="off"
        />
        {isStudentMode && searchState === "loading" ? (
          <span className="font-mono text-[9px] text-azure animate-pulse">···</span>
        ) : (
          <div className="flex items-center gap-1">
            <kbd className="font-mono text-[9px] px-1.5 py-0.5 text-vellum-mute bg-ink-deep border border-ink-line rounded-sm">CTRL</kbd>
            <kbd className="font-mono text-[9px] px-1.5 py-0.5 text-vellum-mute bg-ink-deep border border-ink-line rounded-sm">K</kbd>
          </div>
        )}
      </div>

      {results.length > 0 && (
        <div
          ref={listRef}
          className="absolute top-full left-0 right-0 mt-1 overflow-hidden backdrop-blur-md max-h-72 overflow-y-auto z-50 fade-in"
          style={dropdown}
        >
          {results.map((r, i) => (
            <div
              key={r.key}
              data-result-item
              onClick={() => handleSelect(r)}
              className="px-3 py-2 cursor-pointer border-b border-ink-line last:border-0 transition-colors flex items-center gap-2.5"
              style={{
                background: i === activeIndex ? "rgba(212, 175, 55, 0.08)" : undefined,
                borderLeft: `2px solid ${i === activeIndex ? accent : "transparent"}`,
              }}
            >
              {r.kind === "student" && (
                <span
                  className="w-6 h-6 shrink-0 flex items-center justify-center overflow-hidden"
                  style={{ border: "1px solid var(--ink-line)", borderRadius: "50%" }}
                >
                  {r.avatar ? (
                    <img src={r.avatar} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <span className="font-mono text-[10px] text-vellum-mute">
                      {r.primary.slice(0, 1).toUpperCase()}
                    </span>
                  )}
                </span>
              )}
              <div className="min-w-0 flex-1">
                <div
                  className={r.kind === "student" ? "font-mono text-xs truncate" : "font-serif text-sm"}
                  style={{ color: i === activeIndex ? accent : "var(--vellum)" }}
                >
                  {r.primary}
                </div>
                <div className="smallcaps text-[8px] text-vellum-mute mt-0.5 truncate">
                  {r.kind === "student"
                    ? r.secondary
                    : `${String(i + 1).padStart(3, "0")} · ${r.secondary}`}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {results.length === 0 && hint && (
        <div
          className="absolute top-full left-0 right-0 mt-1 px-3 py-2 backdrop-blur-md z-50 fade-in"
          style={dropdown}
        >
          <div className="smallcaps text-[9px] text-vellum-mute">{hint}</div>
        </div>
      )}
    </div>
  );
};

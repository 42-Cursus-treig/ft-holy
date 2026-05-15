import { useState, useRef, useEffect } from "react";
import { useReactFlow } from "@xyflow/react";

export const SearchBar = ({ nodes, onSelectNode }) => {
  const [term, setTerm] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const { setCenter } = useReactFlow();

  const results =
    term.trim() === ""
      ? []
      : nodes.filter((n) => n.data.label?.toLowerCase().includes(term.toLowerCase())).slice(0, 12);

  useEffect(() => {
    setActiveIndex(-1);
  }, [term]);

  useEffect(() => {
    if (activeIndex >= 0 && listRef.current) {
      const items = listRef.current.querySelectorAll("[data-result-item]");
      items[activeIndex]?.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
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

  const handleSelect = (node) => {
    setTerm("");
    setActiveIndex(-1);
    inputRef.current?.blur();
    onSelectNode(node.id);
    const size = node.data.size || 60;
    const x = node.position.x + size / 2;
    const y = node.position.y + size / 2;
    setCenter(x, y, { zoom: 1.4, duration: 800 });
  };

  return (
    <div className="relative w-74">
      <div
        className="flex items-center gap-2 px-3 py-2 backdrop-blur-md transition-colors"
        style={{
          background: "rgba(10, 12, 20, 0.85)",
          border: "1px solid var(--ink-line)",
          borderRadius: 2,
        }}
      >
        <span className="smallcaps text-[9px] text-vellum-mute">CATALOGUE</span>
        <input
          ref={inputRef}
          type="text"
          placeholder="rechercher une étoile…"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          onKeyDown={handleInputKeyDown}
          className="flex-1 bg-transparent text-vellum font-serif italic text-sm placeholder:text-vellum-mute focus:outline-none"
        />
        <div className="flex items-center gap-1">
          <kbd className="font-mono text-[9px] px-1.5 py-0.5 text-vellum-mute bg-ink-deep border border-ink-line rounded-sm">CTRL</kbd>
          <kbd className="font-mono text-[9px] px-1.5 py-0.5 text-vellum-mute bg-ink-deep border border-ink-line rounded-sm">K</kbd>
        </div>
      </div>

      {results.length > 0 && (
        <div
          ref={listRef}
          className="absolute top-full left-0 right-0 mt-1 overflow-hidden backdrop-blur-md max-h-72 overflow-y-auto z-50 fade-in"
          style={{
            background: "rgba(10, 12, 20, 0.95)",
            border: "1px solid var(--ink-line)",
            borderRadius: 2,
          }}
        >
          {results.map((n, i) => (
            <div
              key={n.id}
              data-result-item
              onClick={() => handleSelect(n)}
              className="px-3 py-2 cursor-pointer border-b border-ink-line last:border-0 transition-colors"
              style={{
                background: i === activeIndex ? "rgba(212, 175, 55, 0.08)" : undefined,
                borderLeft: i === activeIndex ? "2px solid var(--gold)" : "2px solid transparent",
              }}
            >
              <div
                className="font-serif text-sm"
                style={{ color: i === activeIndex ? "var(--gold)" : "var(--vellum)" }}
              >
                {n.data.label}
              </div>
              <div className="smallcaps text-[8px] text-vellum-mute mt-0.5">
                {String(i + 1).padStart(3, "0")} · {n.data.language || "—"}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
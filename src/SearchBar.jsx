import { useState, useRef, useEffect } from "react";
import { useReactFlow } from "@xyflow/react";

export const SearchBar = ({ nodes, onSelectNode }) => {
  const [term, setTerm] = useState("");
  const inputRef = useRef(null);
  const { setCenter } = useReactFlow();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape") {
        inputRef.current?.blur();
        setTerm("");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const results =
    term.trim() === ""
      ? []
      : nodes.filter((n) => n.data.label?.toLowerCase().includes(term.toLowerCase())).slice(0, 12);

  const handleSelect = (node) => {
    setTerm("");
    inputRef.current?.blur();
    onSelectNode(node.id);
    const size = node.data.size || 60;
    const x = node.position.x + size / 2;
    const y = node.position.y + size / 2;
    setCenter(x, y, { zoom: 1.4, duration: 800 });
  };

  return (
    <div className="relative w-72">
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
          className="flex-1 bg-transparent text-vellum font-serif italic text-sm placeholder:text-vellum-mute focus:outline-none"
        />
        <kbd className="text-[9px] font-mono text-vellum-mute px-1 py-0.5 border border-ink-line rounded-sm">⌘K</kbd>
      </div>

      {results.length > 0 && (
        <div
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
              onClick={() => handleSelect(n)}
              className="px-3 py-2 cursor-pointer border-b border-ink-line last:border-0 transition-colors hover:bg-ink-soft"
            >
              <div className="font-serif text-vellum text-sm">{n.data.label}</div>
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
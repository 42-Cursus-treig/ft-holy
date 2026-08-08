import { useEffect } from "react";

const ROMAN = ["I", "II", "III", "IV"];

export const GraphSwitcher = ({ worlds, order, currentWorld, subLabel, onSelect, onBack }) => {
  useEffect(() => {
    const onKey = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const tag = document.activeElement?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      const index = Number(e.key) - 1;
      if (Number.isInteger(index) && index >= 0 && index < order.length) {
        e.preventDefault();
        onSelect(order[index]);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [order, onSelect]);

  if (subLabel) {
    return (
      <div className="hud-bar fade-in">
        <button
          onClick={onBack}
          className="flex items-center px-4 smallcaps text-[10px] text-vellum-dim hover:text-gold transition-colors"
        >
          ← {worlds[currentWorld].label}
        </button>
        <div className="w-px my-2" style={{ background: "var(--ink-line)" }} />
        <span className="flex items-center px-4 font-serif italic text-sm text-vellum">
          {subLabel}
        </span>
      </div>
    );
  }

  return (
    <div
      className="hud-bar fade-in max-w-[calc(100vw-2rem)] overflow-x-auto"
      role="tablist"
      aria-label="Planches de la carte"
    >
      <span className="hidden sm:flex items-center px-4 font-serif italic text-sm text-vellum-dim shrink-0">
        ft_holy
      </span>
      <div className="w-px my-2 hidden sm:block shrink-0" style={{ background: "var(--ink-line)" }} />

      {order.map((id, index) => {
        const world = worlds[id];
        const active = id === currentWorld;
        return (
          <button
            key={id}
            role="tab"
            aria-selected={active}
            onClick={() => onSelect(id)}
            title={world.caption}
            className="relative flex items-center gap-2 px-4 transition-colors shrink-0"
            style={{ background: active ? "rgba(212, 175, 55, 0.07)" : "transparent" }}
          >
            <span
              className="font-mono text-[9px]"
              style={{ color: active ? "var(--gold)" : "var(--vellum-mute)" }}
            >
              {ROMAN[index] ?? index + 1}
            </span>
            <span
              className="smallcaps text-[10px] transition-colors"
              style={{ color: active ? "var(--gold)" : "var(--vellum-dim)" }}
            >
              {world.label}
            </span>
            <span
              aria-hidden
              className="absolute left-0 right-0 bottom-0"
              style={{
                height: 2,
                background: active ? "var(--gold)" : "transparent",
              }}
            />
          </button>
        );
      })}
    </div>
  );
};

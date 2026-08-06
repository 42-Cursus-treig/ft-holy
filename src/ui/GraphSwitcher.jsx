import { useEffect } from "react";

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

  const shell = {
    background: "rgba(10, 12, 20, 0.85)",
    border: "1px solid var(--ink-line)",
    borderRadius: 2,
  };

  if (subLabel) {
    return (
      <div className="mt-4 flex items-stretch backdrop-blur-md fade-in" style={shell}>
        <button
          onClick={onBack}
          className="px-4 py-2 smallcaps text-[10px] text-vellum-dim hover:text-gold transition-colors"
        >
          ← {worlds[currentWorld].label}
        </button>
        <div className="w-px my-2" style={{ background: "var(--ink-line)" }} />
        <span className="px-4 py-2 font-serif italic text-sm text-vellum self-center">
          {subLabel}
        </span>
      </div>
    );
  }

  return (
    <div
      className="mt-4 flex items-stretch backdrop-blur-md max-w-[calc(100vw-2rem)] overflow-x-auto fade-in"
      style={shell}
      role="tablist"
      aria-label="Planches de la carte"
    >
      <span className="hidden sm:flex items-center px-4 font-serif italic text-sm text-vellum-dim shrink-0">
        ft_holy
      </span>
      <div className="w-px my-2 hidden sm:block shrink-0" style={{ background: "var(--ink-line)" }} />

      {order.map((id) => {
        const world = worlds[id];
        const active = id === currentWorld;
        return (
          <button
            key={id}
            role="tab"
            aria-selected={active}
            onClick={() => onSelect(id)}
            title={`${world.label} — ${world.caption}`}
            className="relative px-4 py-2 text-left transition-colors shrink-0 group"
            style={{ background: active ? "rgba(212, 175, 55, 0.07)" : "transparent" }}
          >
            <div className="flex items-baseline gap-2">
              <span
                className="font-mono text-[9px]"
                style={{ color: active ? "var(--gold)" : "var(--vellum-mute)" }}
              >
                {world.plate}
              </span>
              <span
                className="smallcaps text-[10px] transition-colors"
                style={{ color: active ? "var(--gold)" : "var(--vellum-dim)" }}
              >
                {world.label}
              </span>
            </div>
            <div className="smallcaps text-[8px] text-vellum-mute leading-none mt-0.5">
              {world.caption}
            </div>
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

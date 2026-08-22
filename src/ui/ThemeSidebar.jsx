import { useEffect, useState } from "react";
import { useTheme } from "../theme";
import { alpha } from "../theme/color";
import { GenericPreview } from "../theme/previews/GenericPreview";

const WIDTH = 232;

/**
 * Tiroir de sélection du thème, ancré au bord droit.
 *
 * L'onglet d'ouverture est centré verticalement sur le bord : les quatre coins
 * sont déjà pris (recherche, planches, outils dev, HUD, badge de profil) et la
 * fiche d'observation occupe tout le haut à droite. Le tiroir passe au-dessus
 * d'elle (z-30 contre z-10) — choisir un thème et lire une fiche sont deux
 * gestes qu'on ne fait pas en même temps.
 */
export const ThemeSidebar = () => {
  const { theme, themeId, themes, selectTheme, c, statusOf } = useTheme();
  const [open, setOpen] = useState(false);

  const accent = statusOf("validated").main;

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const surface = {
    background: theme.surface.panel,
    border: `1px solid ${c.inkLine}`,
    borderRadius: 2,
    backdropFilter: "blur(12px)",
  };

  return (
    <div
      className="absolute top-1/2 right-0 z-30 flex items-start"
      style={{ transform: "translateY(-50%)" }}
    >
      {/* Onglet d'ouverture, collé au bord. */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Fermer le choix du thème" : "Choisir un thème"}
        title="Thème"
        className="flex flex-col items-center gap-2 py-4 px-2 transition-colors"
        style={{
          ...surface,
          borderRight: open ? "none" : `1px solid ${c.inkLine}`,
          borderRadius: "2px 0 0 2px",
          color: open ? accent : c.vellumMute,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = accent)}
        onMouseLeave={(e) => (e.currentTarget.style.color = open ? accent : c.vellumMute)}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="13.5" cy="6.5" r="1.5" />
          <circle cx="17.5" cy="10.5" r="1.5" />
          <circle cx="8.5" cy="7.5" r="1.5" />
          <circle cx="6.5" cy="12.5" r="1.5" />
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
        </svg>
        <span
          className="smallcaps text-[9px]"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", letterSpacing: "0.2em" }}
        >
          Thème
        </span>
      </button>

      {/* Tiroir. Largeur animée plutôt que translation : le contenu ne
          déborde jamais hors de l'écran pendant la transition. */}
      <div
        className="overflow-hidden"
        style={{
          width: open ? WIDTH : 0,
          transition: "width 0.28s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div
          className="p-3"
          style={{
            ...surface,
            width: WIDTH,
            borderRadius: 0,
            borderRight: "none",
          }}
        >
          <div className="smallcaps text-[9px] text-vellum-mute mb-1">ATLAS</div>
          <div className="font-serif italic text-sm text-vellum-dim mb-3">
            Choisir un thème
          </div>

          <div className="flex flex-col gap-2">
            {themes.map((t) => {
              const active = t.id === themeId;
              const Preview = t.Preview ?? GenericPreview;
              return (
                <button
                  key={t.id}
                  onClick={() => selectTheme(t.id)}
                  aria-pressed={active}
                  className="text-left p-2 transition-colors"
                  style={{
                    background: active ? alpha(accent, 0.08) : "transparent",
                    border: `1px solid ${active ? accent : c.inkLine}`,
                    borderRadius: 2,
                  }}
                >
                  <Preview theme={t} width={WIDTH - 34} height={70} />

                  <div className="flex items-baseline justify-between gap-2 mt-2">
                    <span
                      className="font-serif text-sm truncate"
                      style={{ color: active ? accent : c.vellum }}
                    >
                      {t.label}
                    </span>
                    {active && (
                      <span className="smallcaps text-[8px] shrink-0" style={{ color: accent }}>
                        ACTIF
                      </span>
                    )}
                  </div>
                  <div className="smallcaps text-[8px] text-vellum-mute mt-0.5 truncate">
                    {t.caption}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

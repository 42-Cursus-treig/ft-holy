import { useTheme } from "../theme";

export const NotFound = ({ login, message }) => {
  const { c, theme, statusOf } = useTheme();
  const accent = statusOf("validated");

  return (
    <div
      className="w-screen h-screen relative flex items-center justify-center parchment-vignette"
      style={{ background: c.inkDeep }}
    >
      <theme.Background theme={theme} />

      <div className="relative z-10 text-center px-6 fade-in" style={{ maxWidth: 460 }}>
        <div className="smallcaps text-[10px] text-vellum-mute mb-3">RELEVÉ INTROUVABLE</div>

        <div
          className="font-mono text-vellum-mute mb-4"
          style={{ fontSize: 72, lineHeight: 1, opacity: 0.35 }}
        >
          404
        </div>

        <div className="rule mb-5" />

        <h1 className="font-serif text-3xl text-vellum mb-3" style={{ fontWeight: 600 }}>
          {login ? (
            <>
              Aucun cadet au nom de <span style={{ color: accent.main }}>{login}</span>
            </>
          ) : (
            "Relevé introuvable"
          )}
        </h1>

        <p className="font-serif italic text-sm text-vellum-dim leading-relaxed mb-6">
          {message ||
            "Ce login ne figure pas sur l'intra 42, ou son cursus n'est pas consultable."}
        </p>

        <a
          href={import.meta.env.BASE_URL}
          className="inline-block px-5 py-2 smallcaps text-[10px] transition-colors"
          style={{
            color: accent.main,
            border: `1px solid ${accent.soft}`,
            borderRadius: 1,
          }}
        >
          Retour à la carte
        </a>
      </div>
    </div>
  );
};

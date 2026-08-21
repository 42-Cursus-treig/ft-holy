import { getIconList } from "../graph/iconUrl";
import { useSubjects, resolveSubject, intraFallback } from "../data/subjects";
import { useTheme } from "../theme";
import { alpha } from "../theme/color";

export const DetailPanel = ({ node, isAdmin, onUpdateStatus, onClose }) => {
  const subjectsMap = useSubjects();
  const { c, theme, statusOf } = useTheme();

  if (!node) return null;

  const status = node.data.status || "available";
  const tone = statusOf(status);
  const pdfLang = node.data.langPdf || "en";

  const subject = resolveSubject(node.data, node.id, subjectsMap, pdfLang);
  const subjectHref = subject?.href || null;
  const fallbackHref = subject?.kind === "pdf" ? intraFallback(node.id) : null;

  const icons = getIconList(node.data.language, node.data.logoColor);

  const isIdle = status === "available";
  const tint = isIdle ? alpha(c.inkHairline, 0.6) : alpha(tone.main, 0.08);
  const border = isIdle ? alpha(c.vellumMute, 0.2) : alpha(tone.main, 0.25);
  const headline = isIdle ? c.vellumDim : tone.main;

  const validated = statusOf("validated");
  const failed = statusOf("failed");

  return (
    <div
      className="absolute top-5 right-5 w-[340px] p-0 z-10 fade-in overflow-hidden"
      style={{
        background: theme.surface.panel,
        border: `1px solid ${border}`,
        borderRadius: 2,
        backdropFilter: "blur(12px)",
        boxShadow: `0 12px 48px ${alpha(c.inkDeep, 0.6)}, 0 0 0 1px ${border}`,
      }}
    >
      <div style={{ height: 2, background: headline, opacity: 0.7 }} />

      <div className="px-5 pt-4 pb-3 border-b border-ink-line">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="smallcaps text-[9px] text-vellum-mute mb-1">FICHE D'OBSERVATION</div>
            <h2
              className="font-serif text-2xl leading-tight truncate"
              style={{ fontWeight: 600, color: headline }}
              title={node.data.label}
            >
              {node.data.label}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-vellum-mute hover:text-vellum text-xl leading-none font-serif"
            aria-label="Fermer"
          >
            x
          </button>
        </div>

        <div className="flex items-center gap-2 mt-3">
          <span
            className="smallcaps text-[10px] px-2 py-1"
            style={{
              color: headline,
              border: `1px solid ${headline}`,
              background: tint,
              borderRadius: 1,
            }}
          >
            {tone.label}
          </span>
          {node.data.mark != null && (
            <span
              className="font-mono text-[11px] px-2 py-1"
              style={{ color: headline, border: `1px solid ${border}`, borderRadius: 1 }}
            >
              {node.data.mark}/100
            </span>
          )}

          {icons.length > 0 && (
            <div className="flex items-center gap-1.5 ml-auto">
              {icons.map((icon) => (
                <span
                  key={icon.key}
                  title={icon.name}
                  className="flex items-center justify-center w-6 h-6"
                  style={{ border: `1px solid ${border}`, background: tint, borderRadius: 1 }}
                >
                  <img src={icon.src} alt={icon.name} className="w-4 h-4 object-contain" />
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {(node.data.description || subjectHref) && (
        <div className="px-5 py-4 border-b border-ink-line" style={{ background: tint }}>
          {node.data.description && (
            <p className="font-serif italic text-sm text-vellum-dim leading-relaxed mb-3">
              {node.data.description}
            </p>
          )}
          {subjectHref && (
            <div className="flex items-baseline gap-2.5">
              <a
                href={subjectHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono hover:text-vellum transition-colors"
                style={{ color: headline }}
              >
                <span className="smallcaps">
                  {subject?.kind === "intra" ? "VOIR SUR L'INTRA" : "CONSULTER LE SUJET"}
                </span>
                <span>↗</span>
              </a>

              {fallbackHref && (
                <a
                  href={fallbackHref}
                  target="_blank"
                  rel="noreferrer"
                  title="Ouvrir la page du projet sur l'intra"
                  className="text-[10px] font-mono text-vellum-mute hover:text-vellum transition-colors"
                >
                  intra ↗
                </a>
              )}
            </div>
          )}
        </div>
      )}

      {isAdmin ? (
        <div className="px-5 py-4 space-y-2">
          <div className="flex gap-2">
            <button
              onClick={() => onUpdateStatus("validated")}
              disabled={status === "validated"}
              className="flex-1 py-2 text-xs smallcaps transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: status === "validated" ? validated.main : "transparent",
                color: status === "validated" ? validated.onMain : validated.main,
                border: `1px solid ${validated.main}`,
                borderRadius: 1,
              }}
            >
              Valider
            </button>
            <button
              onClick={() => onUpdateStatus("failed")}
              disabled={status === "failed"}
              className="flex-1 py-2 text-xs smallcaps transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: status === "failed" ? failed.main : "transparent",
                color: status === "failed" ? failed.onMain : failed.main,
                border: `1px solid ${failed.main}`,
                borderRadius: 1,
              }}
            >
              Invalider
            </button>
          </div>
          <button
            onClick={() => onUpdateStatus("available")}
            disabled={status === "available"}
            className="w-full py-1.5 text-xs smallcaps text-vellum-mute border border-ink-line rounded-sm hover:text-vellum hover:border-vellum-mute transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Réinitialiser
          </button>
        </div>
      ) : (
        <div className="px-5 py-3 text-[10px] text-vellum-mute font-mono italic text-center">
          lecture seule
        </div>
      )}
    </div>
  );
};

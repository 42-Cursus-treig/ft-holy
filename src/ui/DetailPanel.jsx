import { getIconUrl } from "../graph/iconUrl";
import { useSubjects, resolveSubject, intraFallback } from "../data/subjects";

const STATUS_LABEL = {
  validated: "VALIDÉ",
  failed: "ÉCHOUÉ",
  "in-progress": "EN COURS",
  available: "INEXPLORÉ",
};

const STATUS_COLOR = {
  validated: "var(--gold)",
  failed: "var(--rust)",
  "in-progress": "var(--azure)",
  available: "var(--vellum-dim)",
};

const STATUS_BG = {
  validated: "rgba(212, 175, 55, 0.08)",
  failed: "rgba(166, 61, 42, 0.08)",
  "in-progress": "rgba(74, 144, 217, 0.08)",
  available: "rgba(28, 32, 48, 0.6)",
};

const STATUS_BORDER = {
  validated: "rgba(212, 175, 55, 0.25)",
  failed: "rgba(166, 61, 42, 0.25)",
  "in-progress": "rgba(74, 144, 217, 0.3)",
  available: "rgba(109, 106, 92, 0.2)",
};

export const DetailPanel = ({ node, isAdmin, onUpdateStatus, onClose }) => {
  const subjectsMap = useSubjects();

  if (!node) return null;

  const status = node.data.status || "available";
  const pdfLang = node.data.langPdf || "en";

  const subject = resolveSubject(node.data, node.id, subjectsMap, pdfLang);
  const subjectHref = subject?.href || null;
  const fallbackHref = subject?.kind === "pdf" ? intraFallback(node.id) : null;

  return (
    <div
      className="absolute top-5 right-5 w-[340px] p-0 z-10 fade-in overflow-hidden"
      style={{
        background: "rgba(10, 12, 20, 0.95)",
        border: `1px solid ${STATUS_BORDER[status]}`,
        borderRadius: 2,
        backdropFilter: "blur(12px)",
        boxShadow: `0 12px 48px rgba(0, 0, 0, 0.6), 0 0 0 1px ${STATUS_BORDER[status]}`,
      }}
    >
      <div style={{ height: 2, background: STATUS_COLOR[status], opacity: 0.7 }} />

      <div className="px-5 pt-4 pb-3 border-b border-ink-line">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="smallcaps text-[9px] text-vellum-mute mb-1">FICHE D'OBSERVATION</div>
            <h2
              className="font-serif text-2xl leading-tight truncate"
              style={{ fontWeight: 600, color: STATUS_COLOR[status] }}
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
              color: STATUS_COLOR[status],
              border: `1px solid ${STATUS_COLOR[status]}`,
              background: STATUS_BG[status],
              borderRadius: 1,
            }}
          >
            {STATUS_LABEL[status]}
          </span>
          {node.data.mark != null && (
            <span
              className="font-mono text-[11px] px-2 py-1"
              style={{
                color: STATUS_COLOR[status],
                border: `1px solid ${STATUS_BORDER[status]}`,
                borderRadius: 1,
              }}
            >
              {node.data.mark}/100
            </span>
          )}
          {node.data.language && (
            <img
              src={getIconUrl(node.data.language, node.data.logoColor)}
              alt={node.data.language}
              className="w-5 h-5"
            />
          )}
        </div>
      </div>

      {(node.data.description || subjectHref) && (
        <div
          className="px-5 py-4 border-b border-ink-line"
          style={{ background: STATUS_BG[status] }}
        >
          {node.data.description && (
            <p className="font-serif italic text-sm text-vellum-dim leading-relaxed mb-3">
              {node.data.description}
            </p>
          )}
          {subjectHref && (
            <a
              href={subjectHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono hover:text-vellum transition-colors"
              style={{ color: STATUS_COLOR[status] }}
            >
              <span className="smallcaps">
                {subject?.kind === "intra" ? "VOIR SUR L'INTRA" : "CONSULTER LE SUJET"}
              </span>
              <span>↗</span>
            </a>
          )}

          {fallbackHref && (
            <a
              href={fallbackHref}
              target="_blank"
              rel="noreferrer"
              className="block mt-1.5 text-[10px] font-mono text-vellum-mute hover:text-vellum transition-colors"
            >
              sujet introuvable ? voir sur l&apos;intra ↗
            </a>
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
                background: status === "validated" ? "var(--gold)" : "transparent",
                color: status === "validated" ? "var(--ink-deep)" : "var(--gold)",
                border: "1px solid var(--gold)",
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
                background: status === "failed" ? "var(--rust)" : "transparent",
                color: status === "failed" ? "var(--vellum)" : "var(--rust)",
                border: "1px solid var(--rust)",
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

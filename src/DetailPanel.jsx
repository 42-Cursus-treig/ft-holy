import { getIconUrl } from "./StatusNode";

const formatRA = (x) => {
  const h = Math.floor(Math.abs(x) / 60) % 24;
  const m = Math.floor(Math.abs(x) % 60);
  const s = Math.abs(Math.floor((x * 10) % 60));
  return `${String(h).padStart(2, "0")}ʰ ${String(m).padStart(2, "0")}ᵐ ${String(s).padStart(2, "0")}ˢ`;
};
const formatDec = (y) => {
  const sign = y < 0 ? "−" : "+";
  const d = Math.floor(Math.abs(y) / 10);
  const m = Math.floor(Math.abs(y) % 10) * 6;
  return `${sign}${String(d).padStart(2, "0")}° ${String(m).padStart(2, "0")}′`;
};

const STATUS_LABEL = {
  validated: "VALIDÉ",
  failed: "INVALIDÉ",
  available: "INEXPLORÉ",
};

const STATUS_COLOR = {
  validated: "var(--gold)",
  failed: "var(--rust)",
  available: "var(--vellum-dim)",
};

export const DetailPanel = ({ node, isAdmin, onUpdateStatus, onClose }) => {
  if (!node) return null;

  const status = node.data.status || "available";

  return (
    <div
      className="absolute top-5 right-5 w-[340px] p-0 z-10 fade-in overflow-hidden"
      style={{
        background: "rgba(10, 12, 20, 0.92)",
        border: "1px solid var(--ink-line)",
        borderRadius: 2,
        backdropFilter: "blur(12px)",
        boxShadow: "0 12px 48px rgba(0, 0, 0, 0.6)",
      }}
    >
      <div className="px-5 pt-4 pb-3 border-b border-ink-line">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="smallcaps text-[9px] text-vellum-mute mb-1">FICHE D'OBSERVATION</div>
            <h2
              className="font-serif text-2xl text-vellum leading-tight truncate"
              style={{ fontWeight: 600 }}
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

        <div className="flex items-center gap-2 mt-2">
          <span
            className="smallcaps text-[10px] px-2 py-0.5"
            style={{
              color: STATUS_COLOR[status],
              border: `1px solid ${STATUS_COLOR[status]}`,
              background: `${STATUS_COLOR[status]}10`,
              borderRadius: 1,
            }}
          >
            {STATUS_LABEL[status]}
          </span>
          {node.data.language && (
            <img
              src={getIconUrl(node.data.language, node.data.logoColor)}
              alt={node.data.language}
              className="w-5 h-5"
              style={{ filter: "saturate(0.7) brightness(0.95) opacity(0.9)" }}
            />
          )}
        </div>
      </div>

      <div className="px-5 py-3 border-b border-ink-line">
        <div className="grid grid-cols-2 gap-3 text-[10px]">
          <div>
            <div className="smallcaps text-vellum-mute mb-1">ASC. DROITE</div>
            <div className="font-mono text-vellum">{formatRA(node.position.x)}</div>
          </div>
          <div>
            <div className="smallcaps text-vellum-mute mb-1">DÉCLINAISON</div>
            <div className="font-mono text-vellum">{formatDec(node.position.y)}</div>
          </div>
        </div>
      </div>

      {(node.data.description || node.data.linkID) && (
        <div className="px-5 py-3 border-b border-ink-line">
          {node.data.description && (
            <p className="font-serif italic text-sm text-vellum-dim leading-relaxed mb-3">
              {node.data.description}
            </p>
          )}
          {node.data.linkID && (
            <a
              href={`https://cdn.intra.42.fr/pdf/pdf/${node.data.linkID}/en.subject.pdf`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-azure text-xs font-mono hover:text-vellum transition-colors"
            >
              <span className="smallcaps">CONSULTER LE SUJET</span>
              <span>↗</span>
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
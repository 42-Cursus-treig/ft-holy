import { useMemo, useState } from "react";
import { rushList } from "../data/projectDB";
import { childIdsOf } from "../data/graphs";

export const Hud = ({
  progress,
  definitions,
  world,
  isAdmin,
  user,
  hasLocalDraft,
  onOpenAuth,
  onSync,
  syncing,
  onLogout,
  onOpenRush,
  subGraph,
  profile,
}) => {
  const stats = useMemo(() => {
    const childIds = childIdsOf(definitions);

    let total = 0;
    let validated = 0;
    let failed = 0;
    let piscines = 0;
    let piscinesDone = 0;

    Object.entries(definitions).forEach(([id, def]) => {
      if (def.locked || childIds.has(id)) return;

      const isPiscine = id.startsWith("piscine-");
      total++;
      if (isPiscine) piscines++;

      if (def.subProjects?.length) {
        const done = def.subProjects.some(
          (sub) => progress.statuses[sub.id || sub] === "validated"
        );
        if (done) {
          validated++;
          if (isPiscine) piscinesDone++;
        }
        return;
      }

      const status = progress.statuses[id];
      if (status === "validated") {
        validated++;
        if (isPiscine) piscinesDone++;
      } else if (status === "failed") {
        failed++;
      }
    });

    const rushDone = rushList.filter((r) => progress.statuses[r.id] === "validated").length;

    return { total, validated, failed, piscines, piscinesDone, rush: rushList.length, rushDone };
  }, [progress, definitions]);

  const [confirmingLogout, setConfirmingLogout] = useState(false);

  const card = {
    background: "rgba(10, 12, 20, 0.85)",
    border: "1px solid var(--ink-line)",
    borderRadius: 2,
  };

  return (
    <div
      className="absolute bottom-5 left-5 z-10 flex items-stretch gap-2 fade-in"
      style={{ pointerEvents: "auto" }}
    >
      <div className="px-4 py-2.5 backdrop-blur-md" style={card}>
        <div className="smallcaps text-[9px] text-vellum-mute mb-1">ÉTOILES CARTOGRAPHIÉES</div>
        <div className="flex items-baseline gap-2 font-mono">
          <span className="text-vellum text-lg font-medium">
            {String(stats.validated).padStart(3, "0")}
          </span>
          <span className="text-vellum-mute text-sm">/ {stats.total}</span>
          {stats.failed > 0 && <span className="text-rust text-xs ml-2">−{stats.failed}</span>}
        </div>
      </div>

      {stats.piscines > 0 && (
        <div className="px-4 py-2.5 backdrop-blur-md" style={card}>
          <div className="smallcaps text-[9px] text-vellum-mute mb-1">CONSTELLATIONS</div>
          <div className="flex items-baseline gap-2 font-mono">
            <span className="text-vellum text-lg font-medium">{stats.piscinesDone}</span>
            <span className="text-vellum-mute text-sm">/ {stats.piscines}</span>
          </div>
        </div>
      )}

      {world.hasRush && (
        <button
          onClick={onOpenRush}
          title="Voir la grille des rushes"
          className="px-4 py-2.5 text-left backdrop-blur-md transition-colors"
          style={{
            ...card,
            border: `1px solid ${subGraph === "rush" ? "var(--gold)" : "var(--ink-line)"}`,
          }}
        >
          <div className="smallcaps text-[9px] mb-1 text-vellum-mute">RUSHES</div>
          <div className="flex items-baseline gap-2 font-mono">
            <span
              className="text-lg font-medium transition-colors"
              style={{ color: subGraph === "rush" ? "var(--gold)" : "var(--vellum)" }}
            >
              {stats.rushDone}
            </span>
            <span className="text-vellum-mute text-sm">/ {stats.rush}</span>
          </div>
        </button>
      )}

      {isAdmin ? (
        <div
          className="flex items-center gap-2 px-3 py-2.5 backdrop-blur-md"
          style={{
            ...card,
            border: `1px solid ${hasLocalDraft ? "var(--gold)" : "var(--ink-line)"}`,
          }}
        >
          {user?.avatar && <img src={user.avatar} alt="" className="w-6 h-6 rounded-full" />}
          <div className="flex flex-col">
            <span className="font-mono text-[10px] text-vellum">{user?.login}</span>
            <span className="smallcaps text-[8px] text-vellum-mute">
              {hasLocalDraft ? "MODIFS LOCALES" : "SYNCHRONISÉ"}
            </span>
          </div>
          <button
            onClick={onSync}
            disabled={!hasLocalDraft || syncing}
            className="smallcaps text-[9px] px-2 py-1 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              color: hasLocalDraft ? "var(--gold)" : "var(--vellum-mute)",
              border: `1px solid ${hasLocalDraft ? "var(--gold)" : "var(--ink-line)"}`,
              borderRadius: 1,
            }}
          >
            {syncing ? "..." : "PUSH"}
          </button>
          {confirmingLogout ? (
            <button
              onClick={() => {
                onLogout();
                setConfirmingLogout(false);
              }}
              className="smallcaps text-[9px] px-2 py-1 text-rust border border-rust rounded-sm"
            >
              CONFIRMER
            </button>
          ) : (
            <button
              onClick={() => setConfirmingLogout(true)}
              onBlur={() => setConfirmingLogout(false)}
              className="text-vellum-mute hover:text-vellum text-xs"
              title="Déconnexion"
            >
              ⎋
            </button>
          )}
        </div>
      ) : profile ? null : (
        <button
          onClick={onOpenAuth}
          className="px-3 py-2.5 smallcaps text-[10px] text-vellum-mute hover:text-gold transition-colors backdrop-blur-md"
          style={card}
        >
          Admin
        </button>
      )}
    </div>
  );
};

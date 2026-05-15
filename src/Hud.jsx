import { useMemo, useState } from "react";

export const Hud = ({ progress, definitions, isAdmin, user, hasLocalDraft, onOpenAuth, onSync, syncing, onLogout }) => {
  const stats = useMemo(() => {
    let total = 0;
    let validated = 0;
    let failed = 0;
    let piscines = 0;
    let piscinesDone = 0;

    Object.entries(definitions).forEach(([id, def]) => {
    if (def.locked) return;

    if (def.subProjects && def.subProjects.length > 0) {
      total++;

      const isGroupValidated = def.subProjects.some((sub) => {
        const subId = sub.id || sub;
        return progress.statuses[subId] === "validated";
      });

      if (isGroupValidated) {
        validated++;
        if (id.startsWith("piscine-")) piscinesDone++;
      }
      return;
    }

    const isPiscine = id.startsWith("piscine-");
    total++;
    const s = progress.statuses[id];
    if (s === "validated") validated++;
    else if (s === "failed") failed++;
    if (isPiscine) {
      piscines++;
      if (s === "validated") piscinesDone++;
    }
  });

    return { total, validated, failed, piscines, piscinesDone };
  }, [progress, definitions]);

  const [confirmingLogout, setConfirmingLogout] = useState(false);

  return (
    <div
      className="absolute bottom-5 left-5 z-10 flex items-stretch gap-2 fade-in"
      style={{ pointerEvents: "auto" }}
    >
      <div
        className="px-4 py-2.5 backdrop-blur-md"
        style={{
          background: "rgba(10, 12, 20, 0.85)",
          border: "1px solid var(--ink-line)",
          borderRadius: 2,
        }}
      >
        <div className="smallcaps text-[9px] text-vellum-mute mb-1">ÉTOILES CARTOGRAPHIÉES</div>
        <div className="flex items-baseline gap-2 font-mono">
          <span className="text-vellum text-lg font-medium">
            {String(stats.validated).padStart(3, "0")}
          </span>
          <span className="text-vellum-mute text-sm">/ {stats.total}</span>
          {stats.failed > 0 && (
            <span className="text-rust text-xs ml-2">−{stats.failed}</span>
          )}
        </div>
      </div>

      <div
        className="px-4 py-2.5 backdrop-blur-md"
        style={{
          background: "rgba(10, 12, 20, 0.85)",
          border: "1px solid var(--ink-line)",
          borderRadius: 2,
        }}
      >
        <div className="smallcaps text-[9px] text-vellum-mute mb-1">CONSTELLATIONS</div>
        <div className="flex items-baseline gap-2 font-mono">
          <span className="text-vellum text-lg font-medium">{stats.piscinesDone}</span>
          <span className="text-vellum-mute text-sm">/ {stats.piscines}</span>
        </div>
      </div>

      {isAdmin ? (
        <div
          className="flex items-center gap-2 px-3 py-2.5 backdrop-blur-md"
          style={{
            background: "rgba(10, 12, 20, 0.85)",
            border: `1px solid ${hasLocalDraft ? "var(--gold)" : "var(--ink-line)"}`,
            borderRadius: 2,
          }}
        >
          {user?.avatar && (
            <img src={user.avatar} alt="" className="w-6 h-6 rounded-full" />
          )}
          <div className="flex flex-col">
            <span className="font-mono text-[10px] text-vellum">{user.login}</span>
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
              onClick={() => { onLogout(); setConfirmingLogout(false); }}
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
      ) : (
        <button
          onClick={onOpenAuth}
          className="px-3 py-2.5 smallcaps text-[10px] text-vellum-mute hover:text-gold transition-colors backdrop-blur-md"
          style={{
            background: "rgba(10, 12, 20, 0.85)",
            border: "1px solid var(--ink-line)",
            borderRadius: 2,
          }}
        >
          Admin
        </button>
      )}
    </div>
  );
};
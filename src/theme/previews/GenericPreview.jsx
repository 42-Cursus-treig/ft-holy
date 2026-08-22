import { alpha } from "../color";

/**
 * Vignette d'aperçu générique, dérivée des tokens du thème : fond, trois nœuds
 * aux couleurs de statut, deux arêtes. Aucun thème n'a besoin de fournir une
 * image — mais chacun peut poser un `Preview` dans sa définition pour proposer
 * mieux (une toile, une texture…), auquel cas celui-ci prend le relais.
 */
export const GenericPreview = ({ theme, width = 132, height = 74 }) => {
  const { colors: c, status, node, edge } = theme;

  const done = status.validated;
  const running = status["in-progress"];
  const idle = status.available;

  const dots = [
    { x: 26, y: 46, r: 11, tone: done },
    { x: 68, y: 26, r: 9, tone: running },
    { x: 106, y: 50, r: 8, tone: null },
  ];

  const links = [
    { from: 0, to: 1, status: "validated" },
    { from: 1, to: 2, status: "available" },
  ];

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 132 74"
      role="img"
      aria-label={`Aperçu du thème ${theme.label}`}
      style={{ display: "block", borderRadius: 2 }}
    >
      <rect width="132" height="74" fill={c.inkDeep} />

      {/* Quelques poussières de fond, pour que la vignette ne soit pas plate. */}
      {[
        [14, 14, 1], [44, 62, 0.8], [92, 12, 1.1], [118, 30, 0.7],
        [58, 8, 0.6], [30, 30, 0.7], [84, 66, 0.9],
      ].map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill={c.vellum} opacity={0.35} />
      ))}

      {links.map((link, i) => {
        const a = dots[link.from];
        const b = dots[link.to];
        const known = link.status !== "available";
        const shape = edge.styleFor(known ? link.status : "idle");
        return (
          <line
            key={i}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke={known ? edge.colorFor(link.status) : edge.idle}
            strokeWidth={shape.width}
            strokeOpacity={shape.opacity}
            strokeDasharray={shape.dash || undefined}
          />
        );
      })}

      {dots.map((dot, i) => {
        const filled = Boolean(dot.tone);
        return (
          <g key={i}>
            {filled && dot.tone.halo > 0 && (
              <circle
                cx={dot.x}
                cy={dot.y}
                r={dot.r * 2.1}
                fill={alpha(dot.tone.main, dot.tone.halo * 0.35)}
              />
            )}
            <circle
              cx={dot.x}
              cy={dot.y}
              r={dot.r}
              fill={filled ? dot.tone.main : node.idleFill}
              stroke={filled ? dot.tone.soft : node.idleBorder}
              strokeWidth="1"
            />
          </g>
        );
      })}

      {/* Rappel discret de la couleur d'échec, absente des nœuds ci-dessus. */}
      <rect x="0" y="70" width="132" height="4" fill={status.failed.main} opacity="0.5" />
      <rect x="0" y="70" width="44" height="4" fill={idle.soft} opacity="0.5" />
    </svg>
  );
};

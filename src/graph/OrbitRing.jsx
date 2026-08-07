import { useStore } from "@xyflow/react";

/**
 * Cercle d'orbite : un rang du tronc commun, dessiné derrière les nœuds.
 *
 * C'est un nœud React Flow comme un autre (il suit donc le zoom et le pan sans
 * calcul supplémentaire) mais inerte : ni déplaçable, ni sélectionnable, et
 * transparent aux clics pour ne pas voler le `onPaneClick`.
 *
 * Le trait est compensé par le zoom. Une bordure de 1 unité du plan devient
 * 0,2 pixel quand la planche est dézoomée à 20 % — le cercle disparaît alors
 * que les nœuds, eux, restent lisibles. On lit donc le facteur de zoom et on
 * épaissit le trait d'autant : il garde la même présence à toutes les échelles.
 *
 * L'orbite passe en or quand tous les projets de son rang sont validés — le
 * rang franchi se lit d'un coup d'œil, sans compteur.
 *
 * Les demi-axes viennent du calcul de disposition : `ringRatio` valant 1, on
 * retombe sur un cercle.
 */
export const OrbitRing = ({ data }) => {
  const zoom = useStore((s) => s.transform[2]);
  const { rx, ry, done } = data;

  const strokeWidth = 1.4 / Math.max(zoom, 0.05);
  const width = rx * 2;
  const height = ry * 2;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ pointerEvents: "none", overflow: "visible", display: "block" }}
    >
      <ellipse
        cx={rx}
        cy={ry}
        rx={rx}
        ry={ry}
        fill="none"
        stroke={done ? "var(--gold)" : "var(--ink-line)"}
        strokeOpacity={done ? 0.6 : 0.75}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

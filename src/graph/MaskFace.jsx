import { useId, useMemo } from "react";

/**
 * Face de nœud masquée : disque coloré par le statut, toile radiale gravée
 * dessus, deux lentilles anguleuses.
 *
 * Dessin original — le motif est une toile générique et les lentilles sont des
 * formes géométriques, pas la reprise d'un design déposé.
 *
 * Tout est en unités de la viewBox 0..100 : le composant se met à l'échelle
 * par `size`, donc un nœud de 60px et un de 90px donnent exactement la même
 * face, sans recalcul.
 */

const CX = 50;
const CY = 50;
const SPOKES = 8;
const RINGS = [17, 27, 37, 47];

const polar = (r, a) => [CX + r * Math.cos(a), CY + r * Math.sin(a)];

const buildWeb = () => {
  const step = (Math.PI * 2) / SPOKES;
  // Décalage d'un demi-pas : aucun rayon ne part à l'horizontale, ce qui
  // éviterait qu'un rayon traverse les deux lentilles de part en part.
  const offset = step / 2;

  const spokes = [];
  for (let i = 0; i < SPOKES; i++) {
    const a = offset + i * step;
    const [x, y] = polar(50, a);
    spokes.push(`M ${CX},${CY} L ${x.toFixed(1)},${y.toFixed(1)}`);
  }

  // Entre deux rayons, le fil ne va pas droit : il s'incurve vers le centre.
  // C'est cette flèche qui fait lire « toile » plutôt que « cible ».
  const arcs = [];
  for (const r of RINGS) {
    let d = "";
    for (let i = 0; i < SPOKES; i++) {
      const a1 = offset + i * step;
      const a2 = a1 + step;
      const [x1, y1] = polar(r, a1);
      const [x2, y2] = polar(r, a2);
      const [cx, cy] = polar(r * 0.8, (a1 + a2) / 2);
      d +=
        `M ${x1.toFixed(1)},${y1.toFixed(1)} ` +
        `Q ${cx.toFixed(1)},${cy.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)} `;
    }
    arcs.push(d.trim());
  }

  return { spokes, arcs };
};

// Lentilles : goutte anguleuse, pointe vers le centre. Miroir exact pour que
// le visage reste symétrique.
const LENS_LEFT = "M 14,42 C 23,31 39,34 45,45 C 38,58 21,57 14,42 Z";
const LENS_RIGHT = "M 86,42 C 77,31 61,34 55,45 C 62,58 79,57 86,42 Z";
const GLINT_LEFT = "M 21,42 C 26,36 34,37 37,42 C 33,47 25,47 21,42 Z";
const GLINT_RIGHT = "M 79,42 C 74,36 66,37 63,42 C 67,47 75,47 79,42 Z";

export const MaskFace = ({ size, tone, mask, exiting = false }) => {
  const uid = useId().replace(/:/g, "");
  const web = useMemo(buildWeb, []);

  const clipId = `mask-clip-${uid}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`mask-face${exiting ? " is-exiting" : ""}`}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      aria-hidden="true"
    >
      <defs>
        <clipPath id={clipId}>
          <circle cx={CX} cy={CY} r="49" />
        </clipPath>
      </defs>

      <circle cx={CX} cy={CY} r="49" fill={tone.main} stroke={tone.soft} strokeWidth="2" />

      <g
        clipPath={`url(#${clipId})`}
        stroke={mask.web}
        strokeWidth={mask.webWidth}
        strokeOpacity={mask.webOpacity}
        fill="none"
        strokeLinecap="round"
      >
        {web.spokes.map((d, i) => (
          <path key={`s${i}`} d={d} />
        ))}
        {web.arcs.map((d, i) => (
          <path key={`a${i}`} d={d} />
        ))}
      </g>

      <g stroke={mask.lensStroke} strokeWidth="2.4" strokeLinejoin="round">
        <path d={LENS_LEFT} fill={mask.lens} />
        <path d={LENS_RIGHT} fill={mask.lens} />
      </g>
      <g fill={mask.glint} stroke="none" opacity="0.85">
        <path d={GLINT_LEFT} />
        <path d={GLINT_RIGHT} />
      </g>
    </svg>
  );
};

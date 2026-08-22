import { useMemo } from "react";
import { useInternalNode } from "@xyflow/react";
import { edgeEndpoints } from "./edgeGeometry";

/**
 * Arête rendue en fil d'araignée.
 *
 * Deux ou trois brins s'enroulent les uns autour des autres : même fréquence,
 * phases décalées, amplitude enveloppée par un sinus qui les fait converger
 * aux deux ancrages. C'est ce déphasage qui produit la tresse — les brins se
 * croisent régulièrement au lieu de rester parallèles.
 *
 * S'y ajoutent des boucles accrochées au fil et des filaments qui s'échappent,
 * les irrégularités qui distinguent un fil de soie d'un trait.
 *
 * La forme est tirée d'un générateur pseudo-aléatoire semé par l'identifiant de
 * l'arête : chaque lien a sa propre allure, mais elle ne change pas d'un rendu
 * à l'autre — sinon la toile frémirait à chaque déplacement de nœud.
 *
 * Ce composant ne lit PAS le thème : couleur, épaisseur et opacité arrivent
 * par `style`. C'est ce qui lui permet d'être référencé par une définition de
 * thème sans créer de cycle avec le registre.
 */

const hashString = (str) => {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

const seeded = (seed) => {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
};

const buildWeb = (id, sx, sy, tx, ty) => {
  const dx = tx - sx;
  const dy = ty - sy;
  const length = Math.hypot(dx, dy) || 1;

  const rand = seeded(hashString(id || `${sx}${sy}${tx}${ty}`));

  // Vecteurs unitaires : direction du fil et sa normale.
  const ux = dx / length;
  const uy = dy / length;
  const nx = -uy;
  const ny = ux;

  // Affaissement : un fil tendu ne va jamais droit. Plafonné, sinon les longs
  // liens traverseraient la moitié de la planche.
  const sag = Math.min(length * 0.07, 20);
  const mx = (sx + tx) / 2;
  const my = (sy + ty) / 2 + sag;

  const pointAt = (t) => {
    const it = 1 - t;
    return [
      it * it * sx + 2 * it * t * mx + t * t * tx,
      it * it * sy + 2 * it * t * my + t * t * ty,
    ];
  };

  const samples = Math.max(20, Math.min(72, Math.round(length / 6)));

  // L'enveloppe annule l'amplitude aux extrémités : les brins se rejoignent
  // exactement sur les ancrages, comme une vraie attache.
  const envelope = (t) => Math.pow(Math.sin(Math.PI * t), 0.7);

  const strandPath = (amp, freq, phase) => {
    let d = "";
    for (let i = 0; i <= samples; i++) {
      const t = i / samples;
      const [bx, by] = pointAt(t);
      const o = amp * envelope(t) * Math.sin(freq * Math.PI * 2 * t + phase);
      const x = bx + nx * o;
      const y = by + ny * o;
      d += `${i === 0 ? "M" : "L"} ${x.toFixed(1)},${y.toFixed(1)} `;
    }
    return d.trim();
  };

  const strandCount = length > 150 ? 3 : 2;
  const amplitude = Math.min(3 + length * 0.035, 9);
  const frequency = 1.2 + rand() * 1.1 + length / 900;

  const strands = [];
  for (let k = 0; k < strandCount; k++) {
    const phase = (k / strandCount) * Math.PI * 2 + rand() * 0.5;
    strands.push(strandPath(amplitude * (0.75 + rand() * 0.45), frequency, phase));
  }

  // Boucles accrochées au fil : de petits anneaux de soie, comme sur les
  // toiles où le fil s'est replié sur lui-même.
  const loops = [];
  const loopCount = Math.min(3, Math.round(length / 95));
  for (let i = 0; i < loopCount; i++) {
    const t = 0.2 + (0.6 * (i + rand() * 0.7)) / Math.max(1, loopCount);
    const [bx, by] = pointAt(t);
    const side = rand() < 0.5 ? -1 : 1;
    const r = 2.4 + rand() * 2.6;
    const off = amplitude * envelope(t) * side * 0.7;
    const cx = bx + nx * off;
    const cy = by + ny * off;
    loops.push(
      `M ${(cx - r).toFixed(1)},${cy.toFixed(1)} ` +
        `a ${r.toFixed(1)},${r.toFixed(1)} 0 1,1 ${(2 * r).toFixed(1)},0 ` +
        `a ${r.toFixed(1)},${r.toFixed(1)} 0 1,1 ${(-2 * r).toFixed(1)},0`
    );
  }

  // Filaments : de courtes soies qui s'échappent du fil principal et se
  // recourbent. Ce sont elles qui donnent l'aspect « collant ».
  const whiskers = [];
  const whiskerCount = Math.min(5, Math.round(length / 60));
  for (let i = 0; i < whiskerCount; i++) {
    const t = 0.12 + rand() * 0.76;
    const [bx, by] = pointAt(t);
    const side = rand() < 0.5 ? -1 : 1;
    const len = 4 + rand() * 8;
    const along = (rand() - 0.5) * len * 1.4;

    const ex = bx + nx * side * len + ux * along;
    const ey = by + ny * side * len + uy * along;
    const cx = bx + nx * side * len * 0.35 - ux * len * 0.5;
    const cy = by + ny * side * len * 0.35 - uy * len * 0.5;

    whiskers.push(
      `M ${bx.toFixed(1)},${by.toFixed(1)} Q ${cx.toFixed(1)},${cy.toFixed(1)} ${ex.toFixed(1)},${ey.toFixed(1)}`
    );
  }

  return { strands, loops, whiskers };
};

const WebEdge = ({ id, source, target, markerEnd, style }) => {
  const sourceNode = useInternalNode(source);
  const targetNode = useInternalNode(target);

  const points = edgeEndpoints(sourceNode, targetNode);

  // Arrondi au pixel : évite de reconstruire la toile à chaque micro-variation
  // pendant un déplacement de nœud.
  const key = points
    ? `${id}|${Math.round(points.sourceX)},${Math.round(points.sourceY)},${Math.round(
        points.targetX
      )},${Math.round(points.targetY)}`
    : null;

  const web = useMemo(() => {
    if (!points) return null;
    return buildWeb(id, points.sourceX, points.sourceY, points.targetX, points.targetY);
  }, [key]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!web) return null;

  const width = style?.strokeWidth ?? 1.4;
  const opacity = style?.opacity ?? 1;

  const base = { ...style, fill: "none" };

  const secondary = {
    ...base,
    strokeWidth: Math.max(0.5, width * 0.6),
    opacity: opacity * 0.6,
    strokeDasharray: undefined,
  };

  const filament = {
    ...base,
    strokeWidth: Math.max(0.4, width * 0.45),
    opacity: opacity * 0.4,
    strokeDasharray: undefined,
  };

  return (
    <g>
      {web.whiskers.map((d, i) => (
        <path key={`w${i}`} d={d} style={filament} />
      ))}
      {web.loops.map((d, i) => (
        <path key={`l${i}`} d={d} style={secondary} />
      ))}
      {/* Brins secondaires derrière, brin porteur devant : c'est lui qui reçoit
          la classe React Flow, donc l'animation de statut. */}
      {web.strands.slice(1).map((d, i) => (
        <path key={`s${i}`} d={d} style={secondary} />
      ))}
      <path
        id={id}
        className="react-flow__edge-path"
        d={web.strands[0]}
        markerEnd={markerEnd}
        style={base}
      />
    </g>
  );
};

export default WebEdge;

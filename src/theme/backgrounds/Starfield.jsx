import { useMemo } from "react";
import { useStore } from "@xyflow/react";

const seeded = (seed) => {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
};

const halosDefs = (primary, accent) => `<defs>
  <radialGradient id="hv"><stop offset="0" stop-color="${primary}" stop-opacity="0.5"/><stop offset="1" stop-color="${primary}" stop-opacity="0"/></radialGradient>
  <radialGradient id="hg"><stop offset="0" stop-color="${accent}" stop-opacity="0.5"/><stop offset="1" stop-color="${accent}" stop-opacity="0"/></radialGradient>
</defs>`;

const buildTile = (
  { seed, tile, count, rMin, rMax, aMin, aMax, gold, halo },
  primary,
  accent
) => {
  const rand = seeded(seed);
  const margin = rMax * 4;
  const span = tile - margin * 2;
  let shapes = "";

  for (let i = 0; i < count; i++) {
    const cx = (margin + rand() * span).toFixed(1);
    const cy = (margin + rand() * span).toFixed(1);
    const r = rMin + rand() * (rMax - rMin);
    const alpha = aMin + rand() * (aMax - aMin);
    const isAccent = rand() < gold;
    const fill = isAccent ? accent : primary;

    if (halo) {
      shapes += `<circle cx="${cx}" cy="${cy}" r="${(r * 4).toFixed(2)}" fill="url(#${isAccent ? "hg" : "hv"})" opacity="${(alpha * 0.7).toFixed(2)}"/>`;
    }
    shapes += `<circle cx="${cx}" cy="${cy}" r="${r.toFixed(2)}" fill="${fill}" opacity="${alpha.toFixed(2)}"/>`;
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${tile}" height="${tile}" viewBox="0 0 ${tile} ${tile}">${halo ? halosDefs(primary, accent) : ""}${shapes}</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
};

const LAYERS = [
  { seed: 20260807, tile: 760, count: 110, rMin: 0.5, rMax: 1.1, aMin: 0.2, aMax: 0.55, gold: 0, halo: false, factor: 0.03 },
  { seed: 424242, tile: 620, count: 38, rMin: 0.9, rMax: 1.8, aMin: 0.35, aMax: 0.8, gold: 0.12, halo: false, factor: 0.09, twinkle: true },
  { seed: 1337, tile: 980, count: 14, rMin: 1.6, rMax: 2.7, aMin: 0.6, aMax: 0.95, gold: 0.25, halo: true, factor: 0.18 },
];

export const Starfield = ({ theme }) => {
  const panX = useStore((s) => s.transform[0]);
  const panY = useStore((s) => s.transform[1]);

  const primary = theme?.background?.stars?.primary ?? theme?.colors?.vellum ?? "#F4F1E8";
  const accent = theme?.background?.stars?.accent ?? theme?.colors?.gold ?? "#D4AF37";
  const nebula = theme?.background?.nebula ?? "none";

  const layers = useMemo(
    () => LAYERS.map((layer) => ({ ...layer, image: buildTile(layer, primary, accent) })),
    [primary, accent]
  );

  return (
    <div className="starfield" aria-hidden="true">
      <div style={{ position: "absolute", inset: 0, background: nebula }} />

      {layers.map((layer) => (
        <div
          key={layer.seed}
          className={layer.twinkle ? "star-twinkle" : undefined}
          style={{
            position: "absolute",
            inset: "-50%",
            backgroundImage: layer.image,
            backgroundSize: `${layer.tile}px ${layer.tile}px`,
            transform: `translate3d(${panX * layer.factor}px, ${panY * layer.factor}px, 0)`,
            willChange: "transform",
          }}
        />
      ))}
    </div>
  );
};

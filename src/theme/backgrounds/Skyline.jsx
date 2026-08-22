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

const buildSkyline = ({
  seed,
  width,
  height,
  minW,
  maxW,
  minH,
  maxH,
  fill,
  edge,
  windows,
  windowFill,
  litChance,
}) => {
  const rand = seeded(seed);
  let shapes = "";
  let x = -20;

  while (x < width + 20) {
    const w = minW + rand() * (maxW - minW);
    const h = minH + rand() * (maxH - minH);
    const y = height - h;

    shapes += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" fill="${fill}"/>`;

    if (edge) {
      shapes += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="1" fill="${edge}" opacity="0.5"/>`;
    }

    if (rand() < 0.22 && h > (minH + maxH) / 2) {
      const aw = 1.6;
      const ah = 8 + rand() * 16;
      shapes += `<rect x="${(x + w / 2 - aw / 2).toFixed(1)}" y="${(y - ah).toFixed(1)}" width="${aw}" height="${ah.toFixed(1)}" fill="${fill}"/>`;
    }

    if (windows) {
      const stepX = 7;
      const stepY = 9;
      for (let wx = x + 4; wx < x + w - 4; wx += stepX) {
        for (let wy = y + 6; wy < height - 5; wy += stepY) {
          if (rand() > litChance) continue;
          const o = (0.25 + rand() * 0.65).toFixed(2);
          shapes += `<rect x="${wx.toFixed(1)}" y="${wy.toFixed(1)}" width="2.4" height="3.2" fill="${windowFill}" opacity="${o}"/>`;
        }
      }
    }

    x += w + 1 + rand() * 7;
  }

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" ` +
    `viewBox="0 0 ${width} ${height}">${shapes}</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
};

const LAYERS = [
  {
    key: "far",
    seed: 91117,
    width: 940, height: 300,
    minW: 26, maxW: 58, minH: 90, maxH: 200,
    windows: true, litChance: 0.1,
    factor: 0.05, opacity: 0.55, scale: 0.72,
  },
  {
    key: "mid",
    seed: 5150,
    width: 880, height: 340,
    minW: 40, maxW: 86, minH: 130, maxH: 268,
    windows: true, litChance: 0.16,
    factor: 0.13, opacity: 0.8, scale: 0.88,
  },
  {
    key: "near",
    seed: 220613,
    width: 1020, height: 380,
    minW: 70, maxW: 150, minH: 180, maxH: 330,
    windows: true, litChance: 0.09,
    factor: 0.3, opacity: 1, scale: 1.15,
  },
];

export const Skyline = ({ theme }) => {
  const panX = useStore((s) => s.transform[0]);
  const panY = useStore((s) => s.transform[1]);

  const bg = theme?.background ?? {};
  const fills = bg.skyline ?? {};
  const windowFill = bg.window ?? "#FFD8A0";

  const layers = useMemo(
    () =>
      LAYERS.map((layer) => ({
        ...layer,
        image: buildSkyline({
          ...layer,
          fill: fills[layer.key] ?? "#0B1020",
          edge: bg.skylineEdge ?? null,
          windowFill,
        }),
      })),
    [fills.far, fills.mid, fills.near, bg.skylineEdge, windowFill]
  );

  return (
    <div className="starfield" aria-hidden="true">
      <div style={{ position: "absolute", inset: 0, background: bg.sky ?? "none" }} />

      {bg.glow && (
        <div style={{ position: "absolute", inset: 0, background: bg.glow }} />
      )}

      {layers.map((layer) => (
        <div
          key={layer.key}
          style={{
            position: "absolute",
            left: "-25%",
            right: "-25%",
            bottom: 0,
            height: `${layer.height * layer.scale}px`,
            backgroundImage: layer.image,
            backgroundRepeat: "repeat-x",
            backgroundPosition: "bottom left",
            backgroundSize: `${layer.width * layer.scale}px ${layer.height * layer.scale}px`,
            opacity: layer.opacity,
            transform: `translate3d(${panX * layer.factor}px, ${panY * layer.factor * 0.22}px, 0)`,
            willChange: "transform",
          }}
        />
      ))}

      {bg.haze && (
        <div style={{ position: "absolute", inset: 0, background: bg.haze, pointerEvents: "none" }} />
      )}
    </div>
  );
};

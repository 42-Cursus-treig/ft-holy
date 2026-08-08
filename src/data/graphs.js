import { projectDefinitions, rushList } from "./projectDB";
import { poolDefinitions } from "./poolDB";
import { ancienTroncDefinitions } from "./ancienTroncDB";
import { nouveauTroncDefinitions } from "./nouveauTroncDB";
import { activeProjects } from "./projectList";
import { GRAPH_PARAM, LOGIN, SELF } from "../config";
import { reportIdCollisions } from "./audit";

export const WORLDS = {
  pool: {
    id: "pool",
    label: "Piscine",
    caption: "26 jours",
    definitions: poolDefinitions,
    order: null,
    layout: "manual",
    nodeSize: 70,
    showArrows: true,
    hasRush: false,
    fitPadding: 0.15,
  },
  "tronc-ancien": {
    id: "tronc-ancien",
    label: "Ancien tronc commun",
    caption: "ancien programme",
    definitions: ancienTroncDefinitions,
    order: null,
    layout: "radial",
    ringGap: 160,
    ringExponent: 0.75,
    ringRatio: 1,
    nodeSize: 102,
    showEdges: false,
    showArrows: false,
    hasRush: false,
    fitPadding: 0.08,
    fitMaxZoom: 1.4,
    topInset: 84,
  },
  "tronc-nouveau": {
    id: "tronc-nouveau",
    label: "Nouveau tronc commun",
    caption: "nouveau programme",
    definitions: nouveauTroncDefinitions,
    order: null,
    layout: "radial",
    ringGap: 160,
    ringExponent: 0.75,
    ringRatio: 1,
    nodeSize: 102,
    showEdges: false,
    showArrows: false,
    hasRush: false,
    fitPadding: 0.08,
    fitMaxZoom: 1.4,
    topInset: 84,
  },
  cursus: {
    id: "cursus",
    label: "Mastery",
    caption: "constellations",
    definitions: projectDefinitions,
    order: activeProjects,
    layout: "manual",
    nodeSize: 60,
    showArrows: false,
    hasRush: true,
    fitPadding: 0.2,
  },
};

export const WORLD_ORDER = ["pool", "tronc-ancien", "tronc-nouveau", "cursus"];

if (import.meta.env.DEV) {
  reportIdCollisions(WORLDS, { "rushList (projectDB)": rushList });
}

const ALIASES = {
  main: "cursus",
  cursus: "cursus",
  mastery: "cursus",
  projets: "cursus",
  pool: "pool",
  piscine: "pool",
  tc: "tronc-nouveau",
  "tronc-nouveau": "tronc-nouveau",
  nouveau: "tronc-nouveau",
  "tronc-ancien": "tronc-ancien",
  ancien: "tronc-ancien",
  old: "tronc-ancien",
};

export const DEFAULT_WORLD = LOGIN || SELF ? "pool" : "cursus";

export const resolveWorld = (value) =>
  (value && ALIASES[value.toLowerCase()]) || DEFAULT_WORLD;

export const INITIAL_WORLD = resolveWorld(GRAPH_PARAM);

export const getWorld = (id) => WORLDS[id] || WORLDS[DEFAULT_WORLD];

export const getDefinitions = (id) => getWorld(id).definitions;

export const childIdsOf = (definitions) => {
  const ids = new Set();
  Object.values(definitions).forEach((def) => {
    (def.subProjects || []).forEach((sub) => ids.add(sub.id || sub));
  });
  return ids;
};

export const effectiveStatus = (id, def, getStatus) => {
  if (def?.subProjects?.length) {
    return def.subProjects.some((sub) => getStatus(sub.id || sub) === "validated")
      ? "validated"
      : "available";
  }
  return getStatus(id);
};

const estimateBox = (def, size) => {
  const subs = def.subProjects;
  if (def.shape === "rect") return { w: size * 1.6, h: size * 0.62 };
  if (!subs?.length) return { w: size, h: size };
  const titleWidth = 24 + 6.7 * (def.label?.length ?? 0);
  const rowWidth =
    40 + 7.2 * Math.max(...subs.map((sub) => (sub.label || sub.id || "").length));
  return {
    w: Math.max(size * 1.5, titleWidth, rowWidth),
    h: 38 + 32 * subs.length,
  };
};

const boxGap = (a, b) =>
  Math.max(
    Math.abs(a.cx - b.cx) - (a.w + b.w) / 2,
    Math.abs(a.cy - b.cy) - (a.h + b.h) / 2
  );

const OFFSET_STEPS = 180;
const SPREAD_WEIGHT = 0.35;

export const radialLayout = (entries, world, getStatus) => {
  const gap = world.ringGap ?? 300;
  const exponent = world.ringExponent ?? 1;
  const ratio = world.ringRatio ?? 1;

  const byRank = new Map();
  entries.forEach((entry) => {
    const rank = entry.def.rank ?? 0;
    if (!byRank.has(rank)) byRank.set(rank, []);
    byRank.get(rank).push(entry);
  });

  const positions = {};
  const rings = [];
  const placed = [];

  [...byRank.keys()]
    .sort((a, b) => a - b)
    .forEach((rank) => {
      const ring = byRank.get(rank);
      const radius =
        rank === 0 ? (ring.length > 1 ? gap * 0.5 : 0) : gap * Math.pow(rank, exponent);
      const rx = radius * ratio;
      const ry = radius;
      const step = (2 * Math.PI) / ring.length;

      const boxes = ring.map((entry) =>
        estimateBox(entry.def, entry.def.size ?? world.nodeSize ?? 70)
      );
      const byBulk = ring
        .map((_, i) => i)
        .sort((a, b) => boxes[b].w * boxes[b].h - boxes[a].w * boxes[a].h);

      let best = null;

      for (let k = 0; k < OFFSET_STEPS; k++) {
        const offset = (k / OFFSET_STEPS) * step;
        const slots = ring.map((_, i) => {
          const angle = offset + i * step;
          return { cx: rx ? rx * Math.cos(angle) : 0, cy: ry ? ry * Math.sin(angle) : 0 };
        });

        const taken = new Array(ring.length).fill(false);
        const slotOf = new Array(ring.length);
        const positioned = [];

        for (const i of byBulk) {
          let bestSlot = -1;
          let bestClearance = -Infinity;
          for (let s = 0; s < slots.length; s++) {
            if (taken[s]) continue;
            const candidate = { ...slots[s], ...boxes[i] };
            let clearance = Infinity;
            for (const other of placed) clearance = Math.min(clearance, boxGap(candidate, other));
            for (const other of positioned) clearance = Math.min(clearance, boxGap(candidate, other));
            if (clearance > bestClearance) {
              bestClearance = clearance;
              bestSlot = s;
            }
          }
          taken[bestSlot] = true;
          slotOf[i] = bestSlot;
          positioned.push({ ...slots[bestSlot], ...boxes[i] });
        }

        let worst = Infinity;
        let spread = 0;
        positioned.forEach((node, i) => {
          let nearest = Infinity;
          positioned.forEach((other, j) => {
            if (i !== j) nearest = Math.min(nearest, boxGap(node, other));
          });
          for (const other of placed) nearest = Math.min(nearest, boxGap(node, other));
          worst = Math.min(worst, nearest);
          spread += Math.min(nearest, 600);
        });

        const score = worst + SPREAD_WEIGHT * (spread / positioned.length);
        if (!best || score > best.score) best = { score, slots, slotOf };
      }

      ring.forEach((entry, i) => {
        const slot = best.slots[best.slotOf[i]];
        const box = boxes[i];
        placed.push({ ...slot, ...box });
        positions[entry.id] = { x: slot.cx - box.w / 2, y: slot.cy - box.h / 2 };
      });

      if (radius > 0) {
        rings.push({
          rx,
          ry,
          done: ring.every(
            (entry) => effectiveStatus(entry.id, entry.def, getStatus) === "validated"
          ),
        });
      }
    });

  return { positions, rings };
};

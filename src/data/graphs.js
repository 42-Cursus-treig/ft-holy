import { projectDefinitions } from "./projectDB";
import { poolDefinitions } from "./poolDB";
import { ancienTroncDefinitions } from "./ancienTroncDB";
import { nouveauTroncDefinitions } from "./nouveauTroncDB";
import { activeProjects } from "./projectList";
import { GRAPH_PARAM, LOGIN, SELF } from "../config";

export const WORLDS = {
  pool: {
    id: "pool",
    plate: "I",
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
    plate: "II",
    label: "Tronc commun",
    caption: "ancien programme",
    definitions: ancienTroncDefinitions,
    order: null,
    layout: "radial",
    ringGap: 240,
    nodeSize: 72,
    showEdges: false,
    showArrows: false,
    hasRush: false,
    fitPadding: 0.12,
  },
  "tronc-nouveau": {
    id: "tronc-nouveau",
    plate: "III",
    label: "Tronc commun",
    caption: "nouveau programme",
    definitions: nouveauTroncDefinitions,
    order: null,
    layout: "radial",
    ringGap: 240,
    nodeSize: 72,
    showEdges: false,
    showArrows: false,
    hasRush: false,
    fitPadding: 0.12,
  },
  cursus: {
    id: "cursus",
    plate: "IV",
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

export const radialLayout = (entries, world, getStatus) => {
  const gap = world.ringGap ?? 300;
  const byRank = new Map();

  entries.forEach((entry) => {
    const rank = entry.def.rank ?? 0;
    if (!byRank.has(rank)) byRank.set(rank, []);
    byRank.get(rank).push(entry);
  });

  const positions = {};
  const rings = [];

  [...byRank.keys()]
    .sort((a, b) => a - b)
    .forEach((rank) => {
      const ring = byRank.get(rank);
      const radius = rank === 0 ? (ring.length > 1 ? gap * 0.4 : 0) : rank * gap;
      const step = (2 * Math.PI) / ring.length;
      const offset = -Math.PI / 2 + (rank % 2 ? step / 2 : 0);

      ring.forEach((entry, i) => {
        const size = entry.def.size ?? world.nodeSize ?? 70;
        const angle = offset + i * step;
        positions[entry.id] = {
          x: (radius ? radius * Math.cos(angle) : 0) - size / 2,
          y: (radius ? radius * Math.sin(angle) : 0) - size / 2,
        };
      });

      if (radius > 0) {
        rings.push({
          radius,
          done: ring.every(
            (entry) => effectiveStatus(entry.id, entry.def, getStatus) === "validated"
          ),
        });
      }
    });

  return { positions, rings };
};

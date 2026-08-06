import { projectDefinitions } from "./projectDB";

const fromCursus = (id, rank, overrides = {}) => {
  const base = projectDefinitions[id];
  if (!base) {
    console.warn(`[ancienTroncDB] "${id}" est absent de projectDB`);
    return null;
  }
  return {
    ...base,
    label: base.label || id,
    position: undefined,
    rank,
    parents: [],
    ...overrides,
  };
};

const entries = {
  "tc-libft": {
    label: "Libft",
    parents: [],
    rank: 0,
    lang: "c",
    desc: "Votre première bibliothèque : les fonctions de la libc réécrites à la main, base de tous les projets suivants.",
  },
  "tc-get-next-line": {
    label: "get_next_line",
    parents: ["tc-libft"],
    rank: 1,
    lang: "c",
    desc: "Lire une ligne sur un descripteur de fichier, quelle que soit sa taille.",
  },
  "tc-ft-printf": {
    label: "ft_printf",
    parents: ["tc-libft"],
    rank: 1,
    lang: "c",
    desc: "Recodage de printf : arguments variadiques, conversions et drapeaux de format.",
  },
  "tc-fillit": {
    label: "Fillit",
    parents: ["tc-libft"],
    rank: 1,
    lang: "c",
    desc: "Placer un jeu de tetriminos dans le plus petit carré possible : parsing, backtracking et optimisation.",
  },
};

export const ancienTroncDefinitions = Object.fromEntries(
  Object.entries(entries).filter(([, def]) => def !== null)
);

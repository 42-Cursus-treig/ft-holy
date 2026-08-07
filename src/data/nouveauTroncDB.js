import { projectDefinitions } from "./projectDB";

const fromCursus = (id, rank, overrides = {}) => {
  const base = projectDefinitions[id];
  if (!base) {
    console.warn(`[nouveauTroncDB] "${id}" est absent de projectDB`);
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
  // "ntc-libft": {
  //   label: "Libft",
  //   parents: [],
  //   rank: 0,
  //   lang: "c",
  //   desc: "…",
  // },
  // "ntc-choix-rang-02": {
  //   label: "Projet au choix",
  //   parents: ["ntc-libft"],
  //   rank: 2,
  //   subProjects: [
  //     { id: "ntc-a", label: "Projet A" },
  //     { id: "ntc-b", label: "Projet B" },
  //   ],
  // },
  // "ft-ls": fromCursus("ft-ls", 3),
};

export const nouveauTroncDefinitions = Object.fromEntries(
  Object.entries(entries).filter(([, def]) => def !== null)
);

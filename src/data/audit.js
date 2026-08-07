export const collectIds = (worlds, extraSources = {}) => {
  const sources = new Map();

  const add = (id, origin, label) => {
    if (!id) return;
    if (!sources.has(id)) sources.set(id, []);
    sources.get(id).push({ origin, label });
  };

  Object.values(worlds).forEach((world) => {
    Object.entries(world.definitions).forEach(([id, def]) => {
      add(id, world.id, def.label);
      (def.modules || []).forEach((mod) => add(mod.id, `${world.id} › modules`, mod.label));
      (def.subProjects || []).forEach((sub) =>
        add(sub.id || sub, `${world.id} › subProjects`, sub.label)
      );
    });
  });

  Object.entries(extraSources).forEach(([name, entries]) => {
    (entries || []).forEach((entry) => add(entry.id, name, entry.label));
  });

  return sources;
};

export const findIdCollisions = (worlds, extraSources) => {
  const collisions = [];

  collectIds(worlds, extraSources).forEach((entries, id) => {
    if (entries.length < 2) return;
    const named = new Set(entries.map((e) => e.label).filter(Boolean));
    if (named.size > 1) collisions.push({ id, entries });
  });

  return collisions;
};

export const reportIdCollisions = (worlds, extraSources) => {
  const collisions = findIdCollisions(worlds, extraSources);
  if (collisions.length === 0) return;

  console.warn(
    `[ft_holy] ${collisions.length} identifiant(s) réutilisé(s) par des sujets différents. ` +
      `Leurs statuts sont partagés : valider l'un valide l'autre.`
  );
  collisions.forEach(({ id, entries }) => {
    console.warn(
      `  ${id} — ` + entries.map((e) => `${e.origin}: « ${e.label ?? "sans nom"} »`).join("  |  ")
    );
  });
};

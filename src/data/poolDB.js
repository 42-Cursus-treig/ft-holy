export const poolDefinitions = {
  // --- Shell ---
  "shell-00": {
    label: "C Piscine Shell 00",
    parents: [],
    position: { x: 40, y: 200 },
    lang: "bash",
    desc: "Premiers pas en ligne de commande : navigation, permissions, manipulation de fichiers.",
  },
  "shell-01": {
    label: "C Piscine Shell 01",
    parents: ["shell-00"],
    position: { x: 40, y: 30 },
    lang: "bash",
    desc: "Redirections, jobs, variables d'environnement et scripting shell.",
  },

  // --- C ---
  "c-00": {
    label: "C Piscine C 00", parents: ["shell-01"],
    position: { x: 230, y: 200 }, lang: "c",
    desc: "Bases du C : premiers programmes, write, boucles et affichage.",
  },
  "c-01": {
    label: "C Piscine C 01", parents: ["c-00"],
    position: { x: 230, y: 30 }, lang: "c",
    desc: "Pointeurs, passage par adresse et manipulation de la mémoire.",
  },
  "c-02": {
    label: "C Piscine C 02", parents: ["c-01"],
    position: { x: 420, y: 200 }, lang: "c",
    desc: "Chaînes de caractères : copie, comparaison, filtrage.",
  },
  "c-03": {
    label: "C Piscine C 03", parents: ["c-02"],
    position: { x: 420, y: 30 }, lang: "c",
    desc: "Réimplémentation des fonctions de manipulation de chaînes de la libc.",
  },
  "c-04": {
    label: "C Piscine C 04", parents: ["c-03"],
    position: { x: 610, y: 200 }, lang: "c",
    desc: "Conversion de bases, atoi/itoa et manipulation numérique.",
  },
  "c-05": {
    label: "C Piscine C 05", parents: ["c-04"],
    position: { x: 610, y: 30 }, lang: "c",
    desc: "Récursivité, itératif et algorithmes mathématiques classiques.",
  },
  "c-06": {
    label: "C Piscine C 06", parents: ["c-05"],
    position: { x: 800, y: 200 }, lang: "c",
    desc: "Arguments de la ligne de commande : argc, argv et tri.",
  },
  "c-07": {
    label: "C Piscine C 07", parents: ["c-06"],
    position: { x: 800, y: 30 }, lang: "c",
    desc: "Allocation dynamique : malloc, free et gestion de la mémoire.",
  },
  "c-08": {
    label: "C Piscine C 08", parents: ["c-07"],
    position: { x: 990, y: 200 }, lang: "c",
    desc: "Headers, structures et types définis par l'utilisateur.",
  },
  "c-09": {
    label: "C Piscine C 09", parents: ["c-08"],
    position: { x: 990, y: 30 }, lang: "c",
    desc: "Compilation séparée, Makefile et création d'une bibliothèque statique.",
  },
  "c-10": {
    label: "C Piscine C 10", parents: ["c-09"],
    position: { x: 1180, y: 200 }, lang: "c",
    desc: "Entrées/sorties fichiers : open, read, write, close.",
  },
  "c-11": {
    label: "C Piscine C 11", parents: ["c-10"],
    position: { x: 1180, y: 30 }, lang: "c",
    desc: "Pointeurs sur fonctions et tableaux de fonctions.",
  },
  "c-12": {
    label: "C Piscine C 12", parents: ["c-11"],
    position: { x: 1370, y: 200 }, lang: "c",
    desc: "Listes chaînées : création, parcours, tri et manipulation.",
  },
  "c-13": {
    label: "C Piscine C 13", parents: ["c-12"],
    position: { x: 1370, y: 30 }, lang: "c",
    desc: "Arbres binaires de recherche : insertion, parcours et applications.",
  },

  // --- Rushs ---
  "rush-00": {
    label: "C Piscine Rush 00", parents: [],
    position: { x: 120, y: 370 }, lang: "c",
    desc: "Premier rush en groupe : projet d'algorithmie sur un week-end.",
  },
  "rush-01": {
    label: "C Piscine Rush 01", parents: ["rush-00"],
    position: { x: 500, y: 370 }, lang: "c",
    desc: "Deuxième rush en groupe, plus exigeant sur la conception.",
  },
  "rush-02": {
    label: "C Piscine Rush 02", parents: ["rush-01"],
    position: { x: 880, y: 370 }, lang: "c",
    desc: "Troisième rush en groupe.",
  },
  "bsq": {
    label: "C Piscine BSQ", parents: ["rush-02"],
    position: { x: 1200, y: 370 }, lang: "c",
    desc: "Biggest Square : trouvez le plus grand carré libre dans une carte donnée. Rush final de la piscine.",
  },

  // --- Exams ---
  "exam-00": {
    label: "C Piscine Exam 00", parents: [],
    position: { x: 120, y: 540 }, lang: "c",
    desc: "Premier examen individuel en environnement contrôlé.",
  },
  "exam-01": {
    label: "C Piscine Exam 01", parents: ["exam-00"],
    position: { x: 500, y: 540 }, lang: "c",
    desc: "Deuxième examen individuel.",
  },
  "exam-02": {
    label: "C Piscine Exam 02", parents: ["exam-01"],
    position: { x: 880, y: 540 }, lang: "c",
    desc: "Troisième examen individuel.",
  },
  "exam-final": {
    label: "C Piscine Final Exam", parents: ["exam-02"],
    position: { x: 1200, y: 540 }, lang: "c",
    desc: "Examen final de la piscine : dernier jalon avant les résultats.",
  },
};

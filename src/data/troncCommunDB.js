import { projectDefinitions } from "./projectDB";

export const commonCoreProjects = {
  "tc-libft": {
    label: "Libft",
    lang: "c",
    desc: "Recoder des fonctions essentielles de la bibliothèque C standard et créer une bibliothèque utilitaire réutilisable pour les futurs projets de 42.",
  },
  "tc-ft-printf": {
    label: "ft_printf",
    lang: "c",
    desc: "Recoder la fonction printf en C, avec un focus sur la gestion des arguments variadiques, afin de pouvoir la réutiliser dans les futurs projets.",
  },
  "tc-get-next-line": {
    label: "get_next_line",
    lang: "c",
    desc: "Développer une fonction capable de lire une source de données ligne par ligne, notamment depuis un fichier ou l’entrée standard, afin de la réutiliser dans de futurs projets.",
  },
  "tc-born2beroot": {
    label: "Born2beroot",
    lang: "bash",
    desc: "Découvrir l’administration système en configurant une machine virtuelle Linux sécurisée, avec gestion des utilisateurs, des permissions, des services et des règles de sécurité.",
  },
  "tc-push-swap": {
    label: "push_swap",
    lang: "c",
    desc: "Trier des données entre deux piles avec un nombre limité d’instructions, en choisissant et optimisant les algorithmes de tri pour effectuer le moins d’opérations possible.",
  },
  "tc-netpractice": {
    label: "NetPractice",
    desc: "Découvrir les bases des réseaux informatiques en configurant et en résolvant des exercices pratiques autour de l’adressage IP, des sous-réseaux et du routage.",
  },
  "tc-inception": {
    label: "Inception",
    lang: "docker",
    desc: "Approfondir l’utilisation de Docker en créant et orchestrant plusieurs conteneurs au sein d’une machine virtuelle, afin de comprendre la virtualisation de services et leur configuration.",
  },
  "tc-collaborative-resume": {
    label: "Collaborative Resume",
    desc: "Mener un entretien croisé en binôme et rédiger le CV de l'autre : conduire l'entretien, structurer l'information recueillie et produire un document professionnel, puis échanger des retours avant la version finale.",
  },
  "tc-transcendence": {
    label: "ft_transcendence",
    lang: "typescript",
    desc: "Concevoir une application web complète autour du jeu Pong, intégrant frontend, backend, authentification, multijoueur et fonctionnalités sociales.",
  },
};

export const commonCoreExams = {
  "tc-exam-02": {
    label: "Exam Rank 02",
    shape: "rect",
  },
  "tc-exam-03": {
    label: "Exam Rank 03",
    shape: "rect",
  },
  "tc-exam-04": {
    label: "Exam Rank 04",
    shape: "rect",
  },
  "tc-exam-05": {
    label: "Exam Rank 05",
    shape: "rect",
  },
  "tc-exam-06": {
    label: "Exam Rank 06",
    shape: "rect",
  },
};

export const place = (map) =>
  Object.fromEntries(
    Object.entries(map)
      .map(([id, spec]) => {
        const base = commonCoreProjects[id] ?? commonCoreExams[id];
        if (!base) {
          console.warn(`[troncCommunDB] "${id}" est absent du catalogue`);
          return null;
        }
        const placement = typeof spec === "number" ? { rank: spec } : spec;
        return [id, { ...base, ...placement }];
      })
      .filter(Boolean)
  );

export const fromCursus = (id, rank, overrides = {}) => {
  const base = projectDefinitions[id];
  if (!base) {
    console.warn(`[troncCommunDB] "${id}" est absent de projectDB`);
    return null;
  }
  return { ...base, label: base.label || id, position: undefined, rank, parents: [], ...overrides };
};

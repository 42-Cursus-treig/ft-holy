import { place } from "./troncCommunDB";

export const ancienTroncDefinitions = {
  ...place({
    "tc-libft": 0,

    "tc-ft-printf": 1,
    "tc-get-next-line": 1,
    "tc-born2beroot": 1,

    "tc-push-swap": 2,
    "tc-exam-02": 2,

    "tc-exam-03": 3,

    "tc-netpractice": 4,
    "tc-exam-04": 4,

    "tc-inception": 5,
    "tc-exam-05": 5,

    "tc-collaborative-resume": 6,
    "tc-exam-06": 6,
    "tc-transcendence": 6,
  }),

  // Rang 02
  "tc-projet-unix": {
    label: "Projet Unix",
    rank: 2,
    lang: "c",
    desc: "Un projet au choix autour des processus et de la communication inter-processus.",
    subProjects: [
      { id: "tc-minitalk", label: "Minitalk" },
      { id: "tc-pipex", label: "Pipex" },
    ],
  },
  "tc-minitalk": {
    label: "Minitalk",
    lang: "c",
    desc: "Créer un petit programme d’échange de données entre processus à l’aide des signaux UNIX, afin de s’initier à la communication interprocessus avant d’aborder des projets UNIX plus avancés.",
  },
  "tc-pipex": {
    label: "Pipex",
    lang: "c",
    desc: "Approfondir la compréhension des redirections et des pipes UNIX en reproduisant le fonctionnement d’enchaînements de commandes, en préparation de projets système plus avancés.",
  },
  "tc-projet-graphique": {
    label: "Projet graphique",
    rank: 2,
    lang: "c",
    desc: "Un projet au choix avec la MiniLibX : fenêtres, événements et rendu.",
    subProjects: [
      { id: "tc-so-long", label: "so_long" },
      { id: "tc-fdf", label: "FdF" },
      { id: "tc-fract-ol", label: "fract-ol" },
    ],
  },
  "tc-so-long": {
    label: "so_long",
    lang: "c",
    desc: "Créer un petit jeu 2D avec la MiniLibX afin de découvrir la gestion des textures, des sprites, des tuiles et des interactions graphiques.",
  },
  "tc-fdf": {
    label: "FdF",
    lang: "c",
    desc: "S’initier à la programmation graphique avec la MiniLibX en représentant en 3D, sous forme de fils de fer, le relief d’un terrain à partir d’une carte.",
  },
  "tc-fract-ol": {
    label: "fract-ol",
    lang: "c",
    desc: "Découvrir la programmation graphique 2D avec la MiniLibX en générant, affichant et explorant différentes fractales interactives.",
  },

  // Rang 03
  "tc-philosophers": {
    label: "Philosophers",
    rank: 3,
    lang: "c",
    desc: "Comprendre les threads, les mutex et la synchronisation en simulant des philosophes qui alternent entre manger, dormir et réfléchir, tout en évitant les blocages et la famine.",
  },
  "tc-minishell": {
    label: "Minishell",
    rank: 3,
    lang: "c",
    desc: "Créer un shell simple inspiré de Bash afin de comprendre l’exécution de commandes, les processus, les redirections, les pipes et la gestion de l’environnement.",
  },

  // Rang 04
  "tc-cpp-00-04": {
    label: "CPP Modules 00-04",
    rank: 4,
    lang: "c++",
    desc: "Découvrir les bases de la programmation orientée objet en C++, notamment les classes, la surcharge, l’héritage, le polymorphisme et la forme canonique.",
  },
  "tc-projet-rendu": {
    label: "Projet 3D",
    rank: 4,
    lang: "c",
    desc: "Un moteur de rendu au choix, en binôme.",
    subProjects: [
      { id: "tc-cub3d", label: "cub3d" },
      { id: "tc-minirt", label: "miniRT" },
    ],
  },
  "tc-cub3d": {
    label: "cub3d",
    lang: "c",
    desc: "Créer un moteur 3D inspiré de Wolfenstein 3D en utilisant le ray-casting, afin d’afficher et d’explorer dynamiquement un labyrinthe en vue subjective.",
  },
  "tc-minirt": {
    label: "miniRT",
    lang: "c",
    desc: "S’initier au ray tracing en développant un moteur de rendu 3D capable de générer des scènes à partir de formes géométriques, de lumières et de caméras.",
  },

  // Rang 05
  "tc-cpp-05-09": {
    label: "CPP Modules 05-09",
    rank: 5,
    lang: "c++",
    desc: "Approfondir le C++ avec la gestion des exceptions, les templates, les conteneurs et les algorithmes de la STL.",
  },
  "tc-projet-serveur": {
    label: "Projet serveur",
    rank: 5,
    lang: "c++",
    desc: "Un serveur réseau au choix, écrit en C++.",
    subProjects: [
      { id: "tc-ft-irc", label: "ft_irc" },
      { id: "tc-webserv", label: "webserv" },
    ],
  },
  "tc-ft-irc": {
    label: "ft_irc",
    lang: "c++",
    desc: "Créer un serveur IRC conforme aux standards RFC afin de comprendre les communications réseau, la gestion de multiples clients et le fonctionnement d’un protocole Internet.",
  },
  "tc-webserv": {
    label: "webserv",
    lang: "c++",
    desc: "Créer un serveur HTTP conforme aux standards RFC afin de comprendre le fonctionnement du protocole HTTP, la gestion des requêtes et des réponses, et la communication avec un navigateur web.",
  },
};

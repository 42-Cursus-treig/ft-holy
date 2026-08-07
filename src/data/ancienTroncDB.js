export const ancienTroncDefinitions = {
  // ---- Rang 00 --------------------------------------------------------
  "tc-libft": {
    label: "Libft",
    parents: [],
    rank: 0,
    lang: "c",
    desc: "Rang 00 — Votre première bibliothèque : réimplémentation des fonctions de la libc et des outils que vous réutiliserez dans tout le cursus.",
  },

  // ---- Rang 01 --------------------------------------------------------
  "tc-ft-printf": {
    label: "ft_printf",
    parents: ["tc-libft"],
    rank: 1,
    lang: "c",
    desc: "Rang 01 — Recodez printf : nombre variable d'arguments, conversions et gestion du format.",
  },
  "tc-get-next-line": {
    label: "get_next_line",
    parents: ["tc-libft"],
    rank: 1,
    lang: "c",
    desc: "Rang 01 — Lire une ligne depuis un descripteur de fichier, et découvrir les variables statiques.",
  },
  "tc-born2beroot": {
    label: "Born2beroot",
    parents: ["tc-libft"],
    rank: 1,
    lang: "bash",
    desc: "Rang 01 — Mise en place d'un serveur sous machine virtuelle : partitionnement, durcissement, règles sudo et monitoring.",
  },

  // ---- Rang 02 --------------------------------------------------------
  "tc-push-swap": {
    label: "push_swap",
    parents: ["tc-ft-printf"],
    rank: 2,
    lang: "c",
    desc: "Rang 02 — Trier une pile avec un jeu d'instructions limité, en minimisant le nombre d'opérations.",
  },
  "tc-projet-unix": {
    label: "Projet Unix",
    parents: ["tc-ft-printf"],
    rank: 2,
    lang: "c",
    desc: "Rang 02 — Un projet au choix autour des processus et de la communication inter-processus.",
    subProjects: [
      { id: "tc-minitalk", label: "Minitalk" },
      { id: "tc-pipex", label: "Pipex" },
    ],
  },
  "tc-minitalk": {
    label: "Minitalk",
    lang: "c",
    desc: "Communication client / serveur par signaux UNIX, un bit à la fois.",
  },
  "tc-pipex": {
    label: "Pipex",
    lang: "c",
    desc: "Reproduction du comportement d'un pipe shell : fork, dup2 et redirections.",
  },
  "tc-projet-graphique": {
    label: "Projet graphique",
    parents: ["tc-get-next-line"],
    rank: 2,
    lang: "c",
    desc: "Rang 02 — Un projet au choix avec la MiniLibX : fenêtres, événements et rendu.",
    subProjects: [
      { id: "tc-so-long", label: "so_long" },
      { id: "tc-fdf", label: "FdF" },
      { id: "tc-fract-ol", label: "fract-ol" },
    ],
  },
  "tc-so-long": {
    label: "so_long",
    lang: "c",
    desc: "Petit jeu 2D en vue de dessus : parsing de carte, textures et gestion des événements.",
  },
  "tc-fdf": {
    label: "FdF",
    lang: "c",
    desc: "Représentation en fil de fer d'un relief, avec projection isométrique.",
  },
  "tc-fract-ol": {
    label: "fract-ol",
    lang: "c",
    desc: "Exploration de fractales (Mandelbrot, Julia) avec zoom et jeux de couleurs.",
  },

  // ---- Rang 03 --------------------------------------------------------
  "tc-philosophers": {
    label: "Philosophers",
    parents: ["tc-born2beroot"],
    rank: 3,
    lang: "c",
    desc: "Rang 03 — Threads, mutex et famine : le dîner des philosophes sans interblocage.",
  },
  "tc-minishell": {
    label: "Minishell",
    parents: ["tc-projet-unix"],
    rank: 3,
    lang: "c",
    desc: "Rang 03 — Un shell en binôme : lexer, parser, redirections, pipes, builtins et variables d'environnement.",
  },

  // ---- Rang 04 --------------------------------------------------------
  "tc-netpractice": {
    label: "NetPractice",
    parents: ["tc-born2beroot"],
    rank: 4,
    desc: "Rang 04 — Adressage IP, masques et routage, à travers une série de réseaux à réparer.",
  },
  "tc-cpp-00-04": {
    label: "CPP Modules 00→04",
    parents: ["tc-minishell"],
    rank: 4,
    lang: "c++",
    desc: "Rang 04 — Premiers pas en C++ : classes, surcharge, héritage, polymorphisme et forme canonique.",
  },
  "tc-projet-rendu": {
    label: "Projet 3D",
    parents: ["tc-projet-graphique"],
    rank: 4,
    lang: "c",
    desc: "Rang 04 — Un moteur de rendu au choix, en binôme.",
    subProjects: [
      { id: "tc-cub3d", label: "cub3d" },
      { id: "tc-minirt", label: "miniRT" },
    ],
  },
  "tc-cub3d": {
    label: "cub3d",
    lang: "c",
    desc: "Moteur de raycasting à la Wolfenstein : murs texturés, déplacements et collisions.",
  },
  "tc-minirt": {
    label: "miniRT",
    lang: "c",
    desc: "Raytracer minimaliste : sphères, plans, cylindres, lumières et ombres portées.",
  },

  // ---- Rang 05 --------------------------------------------------------
  "tc-cpp-05-09": {
    label: "CPP Modules 05→09",
    parents: ["tc-cpp-00-04"],
    rank: 5,
    lang: "c++",
    desc: "Rang 05 — Exceptions, templates, conteneurs et algorithmes de la STL.",
  },
  "tc-projet-serveur": {
    label: "Projet serveur",
    parents: ["tc-cpp-00-04"],
    rank: 5,
    lang: "c++",
    desc: "Rang 05 — Un serveur réseau au choix, écrit en C++.",
    subProjects: [
      { id: "tc-ft-irc", label: "ft_irc" },
      { id: "tc-webserv", label: "webserv" },
    ],
  },
  "tc-ft-irc": {
    label: "ft_irc",
    lang: "c++",
    desc: "Serveur IRC compatible avec un vrai client : canaux, opérateurs et commandes du protocole.",
  },
  "tc-webserv": {
    label: "webserv",
    lang: "c++",
    desc: "Serveur HTTP non bloquant : fichier de configuration, méthodes, CGI et pages d'erreur.",
  },
  "tc-inception": {
    label: "Inception",
    parents: ["tc-netpractice"],
    rank: 5,
    lang: "docker",
    desc: "Rang 05 — Infrastructure conteneurisée : NGINX, WordPress et MariaDB, chacun dans son image construite à la main.",
  },

  // ---- Rang 06 --------------------------------------------------------
  "tc-transcendence": {
    label: "ft_transcendence",
    parents: ["tc-projet-serveur", "tc-inception"],
    rank: 6,
    lang: "typescript",
    desc: "Rang 06 — Projet final en équipe : un site de Pong multijoueur en temps réel, avec chat, authentification et déploiement.",
  },
};

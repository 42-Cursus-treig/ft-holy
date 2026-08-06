export const nouveauTroncDefinitions = {
  // ---- Rang 00 --------------------------------------------------------
  "ntc-libft": {
    label: "Libft",
    parents: [],
    rank: 0,
    lang: "c",
    desc: "Rang 00 — Votre première bibliothèque : réimplémentation des fonctions de la libc et des outils que vous réutiliserez dans tout le cursus.",
  },

  // ---- Rang 01 --------------------------------------------------------
  "ntc-ft-printf": {
    label: "ft_printf",
    parents: ["ntc-libft"],
    rank: 1,
    lang: "c",
    desc: "Rang 01 — Recodez printf : nombre variable d'arguments, conversions et gestion du format.",
  },
  "ntc-get-next-line": {
    label: "get_next_line",
    parents: ["ntc-libft"],
    rank: 1,
    lang: "c",
    desc: "Rang 01 — Lire une ligne depuis un descripteur de fichier, et découvrir les variables statiques.",
  },
  "ntc-born2beroot": {
    label: "Born2beroot",
    parents: ["ntc-libft"],
    rank: 1,
    lang: "bash",
    desc: "Rang 01 — Mise en place d'un serveur sous machine virtuelle : partitionnement, durcissement, règles sudo et monitoring.",
  },

  // ---- Rang 02 --------------------------------------------------------
  "ntc-push-swap": {
    label: "push_swap",
    parents: ["ntc-ft-printf"],
    rank: 2,
    lang: "c",
    desc: "Rang 02 — Trier une pile avec un jeu d'instructions limité, en minimisant le nombre d'opérations.",
  },
  "ntc-projet-unix": {
    label: "Projet Unix",
    parents: ["ntc-ft-printf"],
    rank: 2,
    desc: "Rang 02 — Un projet au choix autour des processus et de la communication inter-processus.",
    subProjects: [
      { id: "ntc-minitalk", label: "Minitalk" },
      { id: "ntc-pipex", label: "Pipex" },
    ],
  },
  "ntc-minitalk": {
    label: "Minitalk",
    lang: "c",
    desc: "Communication client / serveur par signaux UNIX, un bit à la fois.",
  },
  "ntc-pipex": {
    label: "Pipex",
    lang: "c",
    desc: "Reproduction du comportement d'un pipe shell : fork, dup2 et redirections.",
  },
  "ntc-projet-graphique": {
    label: "Projet graphique",
    parents: ["ntc-get-next-line"],
    rank: 2,
    desc: "Rang 02 — Un projet au choix avec la MiniLibX : fenêtres, événements et rendu.",
    subProjects: [
      { id: "ntc-so-long", label: "so_long" },
      { id: "ntc-fdf", label: "FdF" },
      { id: "ntc-fract-ol", label: "fract-ol" },
    ],
  },
  "ntc-so-long": {
    label: "so_long",
    lang: "c",
    desc: "Petit jeu 2D en vue de dessus : parsing de carte, textures et gestion des événements.",
  },
  "ntc-fdf": {
    label: "FdF",
    lang: "c",
    desc: "Représentation en fil de fer d'un relief, avec projection isométrique.",
  },
  "ntc-fract-ol": {
    label: "fract-ol",
    lang: "c",
    desc: "Exploration de fractales (Mandelbrot, Julia) avec zoom et jeux de couleurs.",
  },

  // ---- Rang 03 --------------------------------------------------------
  "ntc-philosophers": {
    label: "Philosophers",
    parents: ["ntc-born2beroot"],
    rank: 3,
    lang: "c",
    desc: "Rang 03 — Threads, mutex et famine : le dîner des philosophes sans interblocage.",
  },
  "ntc-minishell": {
    label: "Minishell",
    parents: ["ntc-projet-unix"],
    rank: 3,
    lang: "c",
    desc: "Rang 03 — Un shell en binôme : lexer, parser, redirections, pipes, builtins et variables d'environnement.",
  },

  // ---- Rang 04 --------------------------------------------------------
  "ntc-netpractice": {
    label: "NetPractice",
    parents: ["ntc-born2beroot"],
    rank: 4,
    desc: "Rang 04 — Adressage IP, masques et routage, à travers une série de réseaux à réparer.",
  },
  "ntc-cpp-00-04": {
    label: "CPP Modules 00→04",
    parents: ["ntc-minishell"],
    rank: 4,
    lang: "c++",
    desc: "Rang 04 — Premiers pas en C++ : classes, surcharge, héritage, polymorphisme et forme canonique.",
  },
  "ntc-projet-rendu": {
    label: "Projet 3D",
    parents: ["ntc-projet-graphique"],
    rank: 4,
    desc: "Rang 04 — Un moteur de rendu au choix, en binôme.",
    subProjects: [
      { id: "ntc-cub3d", label: "cub3d" },
      { id: "ntc-minirt", label: "miniRT" },
    ],
  },
  "ntc-cub3d": {
    label: "cub3d",
    lang: "c",
    desc: "Moteur de raycasting à la Wolfenstein : murs texturés, déplacements et collisions.",
  },
  "ntc-minirt": {
    label: "miniRT",
    lang: "c",
    desc: "Raytracer minimaliste : sphères, plans, cylindres, lumières et ombres portées.",
  },

  // ---- Rang 05 --------------------------------------------------------
  "ntc-cpp-05-09": {
    label: "CPP Modules 05→09",
    parents: ["ntc-cpp-00-04"],
    rank: 5,
    lang: "c++",
    desc: "Rang 05 — Exceptions, templates, conteneurs et algorithmes de la STL.",
  },
  "ntc-projet-serveur": {
    label: "Projet serveur",
    parents: ["ntc-cpp-00-04"],
    rank: 5,
    desc: "Rang 05 — Un serveur réseau au choix, écrit en C++.",
    subProjects: [
      { id: "ntc-ft-irc", label: "ft_irc" },
      { id: "ntc-webserv", label: "webserv" },
    ],
  },
  "ntc-ft-irc": {
    label: "ft_irc",
    lang: "c++",
    desc: "Serveur IRC compatible avec un vrai client : canaux, opérateurs et commandes du protocole.",
  },
  "ntc-webserv": {
    label: "webserv",
    lang: "c++",
    desc: "Serveur HTTP non bloquant : fichier de configuration, méthodes, CGI et pages d'erreur.",
  },
  "ntc-inception": {
    label: "Inception",
    parents: ["ntc-netpractice"],
    rank: 5,
    lang: "docker",
    desc: "Rang 05 — Infrastructure conteneurisée : NGINX, WordPress et MariaDB, chacun dans son image construite à la main.",
  },

  // ---- Rang 06 --------------------------------------------------------
  "ntc-transcendence": {
    label: "ft_transcendence",
    parents: ["ntc-projet-serveur", "ntc-inception"],
    rank: 6,
    lang: "typescript",
    desc: "Rang 06 — Projet final en équipe : un site de Pong multijoueur en temps réel, avec chat, authentification et déploiement.",
  },
};

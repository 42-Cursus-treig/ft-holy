export const ancienTroncDefinitions = {
  // ---- Rang 00 --------------------------------------------------------
  "tc-libft": {
    label: "Libft",
    parents: [],
    rank: 0,
    lang: "c",
    desc: "Recoder des fonctions essentielles de la bibliothèque C standard et créer une bibliothèque utilitaire réutilisable pour les futurs projets de 42.",
  },

  // ---- Rang 01 --------------------------------------------------------
  "tc-ft-printf": {
    label: "ft_printf",
    parents: ["tc-libft"],
    rank: 1,
    lang: "c",
    desc: "Recoder la fonction printf en C, avec un focus sur la gestion des arguments variadiques, afin de pouvoir la réutiliser dans les futurs projets.",
  },
  "tc-get-next-line": {
    label: "get_next_line",
    parents: ["tc-libft"],
    rank: 1,
    lang: "c",
    desc: "Développer une fonction capable de lire une source de données ligne par ligne, notamment depuis un fichier ou l’entrée standard, afin de la réutiliser dans de futurs projets.",
  },
  "tc-born2beroot": {
    label: "Born2beroot",
    parents: ["tc-libft"],
    rank: 1,
    lang: "bash",
    desc: "Découvrir l’administration système en configurant une machine virtuelle Linux sécurisée, avec gestion des utilisateurs, des permissions, des services et des règles de sécurité.",
  },

  // ---- Rang 02 --------------------------------------------------------
  "tc-exam-02": {
    label: "Exam Rank 02",
    parents: ["tc-ft-printf", "tc-get-next-line"],
    rank: 2,
    shape: "rect",
  },
  "tc-push-swap": {
    label: "push_swap",
    parents: ["tc-ft-printf"],
    rank: 2,
    lang: "c",
    desc: "Trier des données entre deux piles avec un nombre limité d’instructions, en choisissant et optimisant les algorithmes de tri pour effectuer le moins d’opérations possible.",
  },
  "tc-projet-unix": {
    label: "Projet Unix",
    parents: ["tc-ft-printf"],
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
    parents: ["tc-get-next-line"],
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

  // ---- Rang 03 --------------------------------------------------------
  "tc-exam-03": {
    label: "Exam Rank 03",
    parents: ["tc-push-swap"],
    rank: 3,
    shape: "rect",
  },
  "tc-philosophers": {
    label: "Philosophers",
    parents: ["tc-born2beroot"],
    rank: 3,
    lang: "c",
    desc: "Comprendre les threads, les mutex et la synchronisation en simulant des philosophes qui alternent entre manger, dormir et réfléchir, tout en évitant les blocages et la famine.",
  },
  "tc-minishell": {
    label: "Minishell",
    parents: ["tc-projet-unix"],
    rank: 3,
    lang: "c",
    desc: "Créer un shell simple inspiré de Bash afin de comprendre l’exécution de commandes, les processus, les redirections, les pipes et la gestion de l’environnement.",
  },

  // ---- Rang 04 --------------------------------------------------------
  "tc-exam-04": {
    label: "Exam Rank 04",
    parents: ["tc-minishell"],
    rank: 4,
    shape: "rect",
  },
  "tc-netpractice": {
    label: "NetPractice",
    parents: ["tc-born2beroot"],
    rank: 4,
    desc: "Découvrir les bases des réseaux informatiques en configurant et en résolvant des exercices pratiques autour de l’adressage IP, des sous-réseaux et du routage.",
  },
  "tc-cpp-00-04": {
    label: "CPP Modules 00-04",
    parents: ["tc-minishell"],
    rank: 4,
    lang: "c++",
    desc: "Découvrir les bases de la programmation orientée objet en C++, notamment les classes, la surcharge, l’héritage, le polymorphisme et la forme canonique.",
  },
  "tc-projet-rendu": {
    label: "Projet 3D",
    parents: ["tc-projet-graphique"],
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

  // ---- Rang 05 --------------------------------------------------------
  "tc-exam-05": {
    label: "Exam Rank 05",
    parents: ["tc-cpp-00-04"],
    rank: 5,
    shape: "rect",
  },
  "tc-cpp-05-09": {
    label: "CPP Modules 05-09",
    parents: ["tc-cpp-00-04"],
    rank: 5,
    lang: "c++",
    desc: "Approfondir le C++ avec la gestion des exceptions, les templates, les conteneurs et les algorithmes de la STL.",
  },
  "tc-projet-serveur": {
    label: "Projet serveur",
    parents: ["tc-cpp-00-04"],
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
  "tc-inception": {
    label: "Inception",
    parents: ["tc-netpractice"],
    rank: 5,
    lang: "docker",
    desc: "Approfondir l’utilisation de Docker en créant et orchestrant plusieurs conteneurs au sein d’une machine virtuelle, afin de comprendre la virtualisation de services et leur configuration.",
  },

  // ---- Rang 06 --------------------------------------------------------
  "tc-collaborative-resume": {
    label: "Collaborative Resume",
    parents: ["tc-cpp-05-09", "tc-inception"],
    rank: 6,
    desc: "Mener un entretien croisé en binôme et rédiger le CV de l'autre : conduire l'entretien, structurer l'information recueillie et produire un document professionnel, puis échanger des retours avant la version finale.",
  },
  "tc-exam-06": {
    label: "Exam Rank 06",
    parents: ["tc-cpp-05-09", "tc-projet-serveur"],
    rank: 6,
    shape: "rect",
  },
  "tc-transcendence": {
    label: "ft_transcendence",
    parents: ["tc-projet-serveur", "tc-inception"],
    rank: 6,
    lang: "typescript",
    desc: "Concevoir une application web complète autour du jeu Pong, intégrant frontend, backend, authentification, multijoueur et fonctionnalités sociales.",
  },
};

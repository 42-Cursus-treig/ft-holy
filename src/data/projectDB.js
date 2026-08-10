export const generateId = (name) => name.toLowerCase().replace(/\s+/g, '-').replace(/_/g, '-');
 
export const projectDefinitions = {
    "tronc-commun": {
        size: 800,
        locked: true,
        position: { x: 38, y: 178 },
        modules: [
            { id: "tc-libft",  label: "Libft", parents: [] }
        ]
    },
    "guimp": {
        parents: ["mod1"],
        position: { x: 743, y: 1068 },
        desc: "L'objectif de ce projet sera pour vous de réaliser une librairie d'interface graphique. Vous devrez prouver son bon fonctionnement avec un petit logiciel d'édition d'image 2D.",
    },
    "rt": {
        parents: ["tronc-commun"],
        position: { x: 413, y: 1110 },
        desc: "Suite du projet RTv1, RT consiste à développer un moteur de raytracing avancé capable de gérer des effets réalistes comme les réflexions, la transparence, les textures et les découpes d’objets. Le projet demande de concevoir une architecture flexible et performante afin de produire des scènes 3D complexes et des images de synthèse de haute qualité."
    },
    "ft-ls": {
        parents: ["malloc"],
        position: { x: 1076, y: 770 },
        lang: "c",
        desc: "Pour tout connaitre du filesystem, de la façon dont sont rangés les fichiers et répertoires, codez par vous-même une des commandes les plus utilisées : ls .",
    },
    "red-tetris": {
        parents: ["piscine-web"],
        position: { x: -273, y: 925 },
        desc: "L’objectif de ce projet est de développer un jeu de tetris multijoueurs en réseau à partir d’une pile logicielle exclusivement Full Stack Javascript",
    },
    "zappy": {
        parents: ["bomberman"],
        position: { x: 704, y: 1249 },
        desc: "Zappy est un projet réseau avancé consistant à développer un jeu multijoueur en TCP/IP avec un serveur, un client graphique et des intelligences artificielles capables d’interagir sur une même carte en temps réel.",
    },
    "ft-ssl-des": {
        parents: ["ft-ssl-md5"],
        position: { x: 366, y: -89 },
        desc: "Recodez une partie du programme OpenSSL, notamment les encodages BASE64, DES-ECB et DES-CBC.",
    },
    "expert-system": {
        parents: ["n-puzzle"],
        position: { x: -215, y: 652 },
        lang: "rust",
        desc: "Créez un système expert en calcul des propositions, capable de raisonner sur un ensemble de règles et de faits pour en déduire de nouveaux.",
    },
    "cloud-1": {
        parents: ["tronc-commun"],
        position: { x: 106, y: 203 },
        desc: "Introduction à la gestion et au déploiement de serveurs dans le cloud.",
    },
    "hypertube": {
        parents: ["matcha"],
        position: { x: -316, y: 706 },
        desc: "Réalisez un site de streaming de vidéos téléchargées via BitTorrent en utilisant un framework MVC de votre choix.",
    },
    "in-the-shadows": {
        parents: ["piscine-unity"],
        position: { x: 307, y: 1103 },
        desc: "Développez un jeu complet alliant algorithmie et créativité.",
    },
    "swifty-companion": {
        parents: ["piscine-mobile"],
        position: { x: -74, y: 997 },
        lang: "flutter",
        desc: "Développer une application mobile qui récupère et affiche les informations des utilisateurs de l’API 42 avec une interface interactive.",
    },
    "kfs-1": {
        parents: ["little-penguin-1"],
        position: { x: 1066, y: 638 },
        desc: "Plongez dans la programmation noyau et créez votre propre kernel from scratch.",
    },
    "malloc": {
        parents: ["tronc-commun"],
        position: { x: 1010, y: 688 },
        lang: "c",
        desc: "Découvrez les rouages d'une gestion optimale de la mémoire en recodant malloc, free et realloc.",
    },
    "42sh": {
        parents: ["ft-script"],
        position: { x: 798, y: 115 },
        desc: "Créez un shell complet et abouti depuis zéro, en couvrant une large palette de fonctionnalités UNIX/POSIX (pipes, redirections, job control, etc.).",
    },
    "matrix": {
        parents: ["tronc-commun"],
        position: { x: -35, y: 561 },
        lang: "rust",
        desc: "Vous avez sans doute déjà entendu parler des vecteurs et des espaces vectoriels. Il est maintenant temps de les formaliser à l'aide de l'algèbre linéaire et d'apprendre comment fonctionnent les matrices et les transformations linéaires."
    },
    "lem-in": {
        parents: ["n-puzzle"],
        position: { x: -170, y: 512 },
        desc: "Déplacez une colonie de fourmis d'un point à un autre le plus rapidement possible en implémentant des algorithmes de parcours de graphe.",
    },
    "dr-quine": {
        parents: ["woody-woodpacker"],
        position: { x: 441, y: 79 },
        desc: "Explorez les problématiques d'auto-réplication et affrontez le théorème de récursion de Kleene dans ce petit projet d'algorithmie.",
    },
    "xv": {
        parents: ["in-the-shadows"],
        position: { x: 282, y: 1185 },
        desc: "Développez une interface graphique sous Unity pour optimiser des processus industriels, en partenariat avec l'entreprise Daher.",
    },
    "matcha": {
        parents: ["piscine-web"],
        position: { x: -214, y: 726 },
        lang: "react",
        desc: "Créez un site de rencontres avec un micro-framework de votre choix, en mettant les interactions entre utilisateurs au cœur du projet.",
        langPdf: "fr",
    },
    "camagru": {
        parents: ["piscine-web"],
        position: { x: -164, y: 947 },
        lang: "php",
        desc: "Réalisez en PHP pur (sans framework) un mini site Instagram-like permettant aux utilisateurs de créer et partager des photo-montages.",
    },
    "dslr": {
        parents: ["piscine-data-science"],
        position: { x: -121, y: 192 },
        lang: "python",
        desc: "Initiez-vous à la Data Science en recréant le Choixpeau Magique de Poudlard, un sujet proposé par l'association 42AI."
    },
    "multilayer-perceptron": {
        parents: ["dslr"],
        position: { x: -125, y: 75 },
        desc: "Introduction aux réseaux de neurones artificiels via l'implémentation d'un multilayer perceptron, proposée par 42AI.",
    },
    "doom-nukem": {
        parents: ["scop"],
        position: { x: 478, y: 1060 },
        lang: "c",
        desc: "Suite avancée du Wolf3D mêlant Doom et Duke Nukem 3D : poussez le Raycasting à l'extrême tout en concevant un vrai jeu jouable.",
    },
    "corewar": {
        parents: ["abstract-vm"],
        position: { x: 1115, y: 898 },
        desc: "Créez une arène virtuelle où s'affrontent des programmes en langage assembleur, en concevant votre propre VM et compilateur bytecode."
    },
    "ft-linear-regression": {
        parents: ["dslr"],
        position: { x: -42, y: 130 },
        desc: "Premiers pas en IA et Machine Learning : créez un programme qui prédit le prix d'une voiture via une régression linéaire entraînée par descente de gradient."
    },
    "music-room": {
        parents: ["piscine-web"],
        position: { x: -324, y: 862 },
        lang: "go",
        desc: "En partenariat avec Deezer, créez en groupe une application mobile de playlist collaborative intégrant les SDK et API de Deezer."
    },
    "libasm": {
        lang: "assemblyscript",
        parents: ["tronc-commun"],
        position: { x: 874, y: 440 },
        desc: "Codez une mini-libc en assembleur en recodant des fonctions basiques de la libc, indispensable pour aborder les projets de sécurité.",
    },
    "scop": {
        parents: ["tronc-commun"],
        position: { x: 554, y: 1085 },
        lang: "opengl",
        desc: "Premiers pas dans la 3D sur GPU avec OpenGL à travers un projet ludique couvrant les concepts principaux.",
    },
    "war": {
        parents: ["pestilence"],
        position: { x: 582, y: -107 },
        desc: "Troisième projet virus : reprenez Pestilence et faites en sorte que votre binaire modifie sa propre signature au runtime."
    },
    "snow-crash": {
        parents: ["piscine-cybersecurite"],
        position: { x: 872, y: 211 },
        desc: "Introduction à la sécurité informatique orientée développeur : trouvez des failles dans des programmes via reverse engineering et manipulation de plusieurs langages."
    },
    "taskmaster": {
        parents: ["tronc-commun"],
        position: { x: 892, y: 728 },
        desc: "Réalisez un programme de job control similaire à supervisor, dans le langage de votre choix."
    },
    "rubik": {
        parents: ["n-puzzle"],
        position: { x: -143, y: 685 },
        desc: "Réalisez un résolveur de Rubik's Cube dans le langage de votre choix — un projet d'algorithmie non trivial.",
    },
    "shaderpixel": {
        parents: ["humangl"],
        position: { x: 555, y: 1305 },
        desc: "Travaillez directement dans l'espace de la carte graphique en programmant des shaders pour créer des objets et effets visuels avancés."
    },
    "famine": {
        parents: ["woody-woodpacker"],
        position: { x: 505, y: -9 },
        desc: "Créez votre premier virus en C à but pédagogique, en manipulant des fichiers binaires pour infecter d'autres exécutables."
    },
    "ft-script": {
        parents: ["tronc-commun"],
        position: { x: 737, y: 170 },
        desc: "Recodez la commande script pour comprendre les interactions entre input utilisateur, TTY et pseudo-terminaux."
    },
    "strace": {
        parents: ["lem-ipc"],
        position: { x: 1212, y: 820 },
        desc: "Recodez strace, un outil listant tous les appels système effectués par un programme en cours d'exécution — premier pas vers un mini-GDB."
    },
    "swifty-proteins": {
        parents: ["swifty-companion"],
        position: { x: -135, y: 1063 },
        lang: "flutter",
        desc: "Initiez-vous à SceneKit en créant une application iOS qui modélise des ligands en 3D, avec Touch ID, gestures et recherche."
    },
    "woody-woodpacker": {
        parents: ["tronc-commun"],
        position: { x: 503, y: 78 },
        desc: "Modifiez les headers d'un fichier ELF64 pour y injecter du code et obfusquer une partie d'un binaire non strippé."
    },
    "ft-traceroute": {
        parents: ["ft-ping"],
        position: { x: 266, y: 62 },
        desc: "Recodez la commande traceroute pour suivre le chemin qu'un paquet IP emprunte entre deux machines sur un réseau TCP/IP."
    },
    "ft-ping": {
        parents: ["tronc-commun"],
        position: { x: 364, y: 64 },
        lang: "c",
        desc: "Recodez la commande ping pour comprendre la communication TCP/IP entre deux machines dans un réseau."
    },
    "ft-nmap": {
        parents: ["ft-traceroute"],
        position: { x: 266, y: -143 },
        desc: "Recodez nmap pour approfondir vos connaissances en réseau TCP/IP et explorer l'usage avancé des threads."
    },
    "kfs-4": {
        parents: ["kfs-3"],
        position: { x: 1198, y: 550 },
        desc: "Créez une Interrupt Description Table et gérez les interruptions au sein de votre kernel."
    },
    "bomberman": {
        parents: ["humangl"],
        position: { x: 643, y: 1206 },
        desc: "Recodez Bomberman en C++ avec OpenGL pour réaliser votre premier gros projet C++ de facture professionnelle."
    },
    "nibbler": {
        parents: ["lem-ipc"],
        position: { x: 1236, y: 712 },
        desc: "Recodez le jeu Snake en C++ avec plusieurs interfaces graphiques différentes."
    },
    "abstract-vm": {
        parents: ["libftpp"],
        position: { x: 1045, y: 854 },
        desc: "Réalisez une machine virtuelle capable d'exécuter du pseudo-ASM en utilisant une stack pour effectuer des opérations arithmétiques."
    },
    "abstract-data": {
        parents: ["libftpp"],
        position: { x: 1037, y: 930 },
        desc: "Réimplémentez les différents containers du C++ pour bien comprendre leurs usages et spécificités."
    },
    "avaj-launcher": {
        parents: ["tronc-commun"],
        position: { x: 840, y: 864 },
        lang: "java",
        desc: "Premier projet Java du cursus : implémentez un programme simple à partir d'un diagramme de classes UML fourni.",
    },
    "42run": {
        parents: ["scop"],
        position: { x: 497, y: 1159 },
        desc: "Recréez Temple Run en C++ avec OpenGL dans ce projet intermédiaire de programmation graphique.",
    },
    "krpsim": {
        parents: ["n-puzzle"],
        position: { x: -257, y: 585 },
        desc: "Optimisez le rendement d'un graphe de processus avec contraintes de ressources en explorant et choisissant les algorithmes les plus adaptés.",
    },
    "total-perspective-vortex": {
        parents: ["dslr"],
        position: { x: -255, y: 152 },
        desc: "Traitez des données en grandes dimensions avec Python et créez une interface homme-machine pilotée par les ondes cérébrales.",
    },
    "kfs-5": {
        parents: ["kfs-4"],
        position: { x: 1243, y: 647 },
        desc: "Implémentez la gestion des processus dans votre kernel, notamment l'interprétation de la fork bomb :(){ :|:& }."
    },
    "userspace-digressions": {
        parents: ["little-penguin-1"],
        position: { x: 958, y: 494 },
        desc: "Créez votre propre binaire init en espace utilisateur.",
    },
    "computorv2": {
        parents: ["computorv1"],
        position: { x: -187, y: 438 },
        desc: "Étendez votre résolveur d'équations en une calculatrice complète gérant les matrices, nombres imaginaires et résolution de fonctions."
    },
    "ft-select": {
        parents: ["ft-ls"],
        position: { x: 1143, y: 824 },
        lang: "c",
        desc: "Initiez-vous à la manipulation du terminal via les termcaps en créant une interface utilisateur pour un programme lancé en terminal."
    },
    "computorv1": {
        parents: ["tronc-commun"],
        position: { x: -110, y: 439 },
        lang: "go",
        desc: "Recodez un résolveur d'équations mathématiques élémentaires dans le langage de votre choix, socle pour de nombreux autres projets."
    },
    "ft-ssl-rsa": {
        parents: ["ft-ssl-des"],
        position: { x: 366, y: -142 },
        desc: "Codez votre propre générateur de nombres premiers aléatoires pour générer des clés RSA privées.",
    },
    "ft-vox": {
        parents: ["scop"],
        position: { x: 641, y: 1098 },
        lang: "c++",
        desc: "Créez un moteur de voxel inspiré de Minecraft avec génération de monde aléatoire.",
    },
    "override": {
        parents: ["rainfall"],
        position: { x: 1048, y: 137 },
        desc: "Recherchez des failles dans des binaires protégés et reconstruisez-les — un challenge de sécurité plus corsé que Rainfall.",
    },
    "boot2root": {
        parents: ["snow-crash"],
        position: { x: 890, y: 126 },
        desc: "Challenge sécurité en groupe : trouvez tous les moyens possibles de passer root sur l'ISO fournie.",
    },
    "death": {
        parents: ["war"],
        position: { x: 499, y: -106 },
        desc: "Projet virus final : créez un véritable code métamorphique en combinant les acquis de Famine, Pestilence et War.",
    },
    "pestilence": {
        parents: ["famine"],
        position: { x: 581, y: -10 },
        desc: "Second projet virus : reprenez Famine et ajoutez une méthode d'obfuscation de votre code.",
    },
    "kfs-9": {
        parents: ["kfs-8"],
        position: { x: 1411, y: 640 },
        desc: "Créez un parser et loader ELF pour votre kernel.",
    },
    "kfs-x": {
        parents: ["kfs-9"],
        position: { x: 1455, y: 560 },
        desc: "Projet kernel final : créez un environnement Linux complet, éventuellement avec votre propre nom de kernel.",
    },
    "kfs-8": {
        parents: ["kfs-7"],
        position: { x: 1371, y: 532 },
        desc: "Construisez une interface de modules pour votre kernel.",
    },
    "kfs-7": {
        parents: ["kfs-6"],
        position: { x: 1325, y: 643 },
        desc: "Ajoutez vos propres syscalls, comptes utilisateurs, sockets et une hiérarchie Unix à votre kernel.",
    },
    "kfs-6": {
        parents: ["kfs-5"],
        position: { x: 1292, y: 537 },
        desc: "Continuez le développement de votre kernel en y intégrant votre propre système de fichiers.",
    },
    "fix-me": {
        parents: ["swingy"],
        position: { x: 983, y: 974 },
        desc: "Projet Java final : simulez des échanges boursiers avec des algorithmes de trading, du networking et des sockets.",
    },
    "swingy": {
        parents: ["avaj-launcher"],
        position: { x: 910, y: 922 },
        lang: "java",
        desc: "Créez un jeu RPG en Java avec le framework SWING pour apprendre le développement d'applications GUI.",
    },
    "gomoku": {
        parents: ["n-puzzle"],
        position: { x: -231, y: 527 },
        desc: "Créez un jeu de Gomoku avec une IA capable de battre un humain, en implémentant un algorithme min-max et des heuristiques adaptées."
    },
    "n-puzzle": {
        parents: ["tronc-commun"],
        position: { x: -127, y: 604 },
        lang: "c++",
        desc: "Réalisez un programme capable de résoudre des Taquins de tailles variées de façon aussi optimale que possible.",
    },
    "mod1": {
        parents: ["tronc-commun"],
        position: { x: 688, y: 986 },
        lang: "c++",
        desc: "Simulez et représentez en 3D un écoulement d'eau sur une surface — vague, tsunami ou simple pluie."
    },
    "kfs-3": {
        parents: ["kfs-2"],
        position: { x: 1162, y: 646 },
        desc: "Troisième projet kernel : implémentez la gestion de la mémoire dans votre kernel."
    },
    "filesystem": {
        parents: ["drivers-and-interrupts","process-and-memory"],
        position: { x: 1077, y: 436 },
        desc: "Créez votre propre système de fichiers pour votre kernel Linux."
    },
    "drivers-and-interrupts": {
        parents: ["little-penguin-1"],
        position: { x: 1025, y: 488 },
        desc: "Apprenez à connecter un driver (clavier) à votre kernel Linux."
    },
    "process-and-memory": {
        parents: ["little-penguin-1"],
        position: { x: 1116, y: 496 },
        desc: "Introduction aux syscalls et à la gestion de la mémoire au sein du kernel Linux."
    },
    "little-penguin-1": {
        parents: ["ft-linux"],
        position: { x: 1029, y: 570 },
        desc: "Série de challenges inspirés du challenge Eudyptula pour aborder de nombreux points du développement kernel."
    },
    "rainfall": {
        parents: ["snow-crash"],
        position: { x: 967, y: 198 },
        desc: "ISO de challenge de reverse engineering plus complexe que Snow Crash : reconstruisez et analysez des binaires pour en trouver les failles."
    },
    "matt-daemon": {
        parents: ["taskmaster"],
        position: { x: 986, y: 769 },
        desc: "Créez un daemon-serveur Unix qui écoute sur un port donné et interprète une liste de commandes."
    },
    "ft-linux": {
        parents: ["tronc-commun"],
        position: { x: 910, y: 573 },
        desc: "Construisez votre propre distribution Linux (LFS) — premier projet de la branche Kernel.",
    },
    "particle-system": {
        parents: ["humangl"],
        position: { x: 469, y: 1285 },
        desc: "Introduction au GPU via OpenGL et OpenCL : créez un système de particules performant grâce à la parallélisation massive des calculs.",
    },
    "ft-turing": {
        parents: ["piscine-ocaml"],
        position: { x: 864, y: 995 },
        lang: "ocaml",
        desc: "Découvrez le modèle de Turing, fondement du paradigme impératif, en l'implémentant en OCaml.",
    },
    "humangl": {
        parents: ["scop"],
        position: { x: 561, y: 1198 },
        lang: "c++",
        desc: "Introduction à la modélisation hiérarchique avec OpenGL : liez et animez les parties d'un humanoïde via des matrices."
    },
    "ft-hangouts": {
        parents: ["piscine-mobile"],
        position: { x: 70, y: 1041 },
        lang: "kotlin",
        desc: "Créez une application Android de gestion de contacts en Java pour comprendre le cycle de vie d'une app et l'utilisation du SDK Android."
    },
    "lem-ipc": {
        parents: ["malloc"],
        position: { x: 1138, y: 735 },
        desc: "Approfondissez la communication inter-processus en explorant les mécanismes IPC, complémentaires à TCP/IP."
    },
    "kfs-2": {
        parents: ["kfs-1"],
        position: { x: 1124, y: 560 },
        desc: "Plongez dans la programmation noyau et créez votre propre kernel from scratch."
    },
    "h42n42": {
        parents: ["ft-turing"],
        position: { x: 955, y: 1039 },
        lang: "ocaml",
        desc: "Introduction au framework Ocsigen pour créer des applications web riches en OCaml, illustrée par un simulateur de bestioles fuyant un virus.",
    },
    "open-project": {
        parents: ["tronc-commun"],
        position: { x: 211, y: 998 },
        lang: "react",
        desc: "Gérez un projet long terme de 6 mois en groupe avec d'autres étudiants de 42, sur un sujet libre comportant des éléments informatiques.",
    },
    "piscine-web": {
        parents: ["tronc-commun"],
        position: { x: -98, y: 780 },
        subProjects: [
            { id: "piscine-django", label: "Piscine Django" },
            { id: "piscine-ror", label: "Piscine RoR" },
            { id: "piscine-symfony", label: "Piscine Symfony" },
        ]
    },
    "piscine-django": {
        lang: "python",
        langPdf: "fr",
        modules: [
            { id: "django-0", label: "Initiation", parents: [] },
            { id: "django-1", label: "Starting", parents: ["django-0"], langPdf: "en" },
            { id: "django-2", label: "Oob", parents: ["django-1"] },
            { id: "django-3", label: "Lib", parents: ["django-2"] },
            { id: "django-4", label: "Base Django", parents: ["django-3"] },
            { id: "django-5", label: "SQL", parents: ["django-4"] },
            { id: "django-6", label: "Sessions", parents: ["django-5"] },
            { id: "django-7", label: "Advanced", parents: ["django-6"] },
            { id: "django-8", label: "Final", parents: ["django-7"] },
        ]
    },
    "piscine-ror": {
        lang: "ruby",
        langPdf: "fr",
        modules: [
            { id: "ruby-0", label: "Initiation", parents: [] },
            { id: "ruby-1", label: "Starting", parents: ["ruby-0"] },
            { id: "ruby-2", label: "Oob", parents: ["ruby-1"], langPdf: "en" },
            { id: "ruby-3", label: "Gems", parents: ["ruby-2"] },
            { id: "ruby-4", label: "Base Rails", parents: ["ruby-3"] },
            { id: "ruby-5", label: "SQL", parents: ["ruby-4"], langPdf: "en" },
            { id: "ruby-6", label: "Sessions", parents: ["ruby-5"], langPdf: "en" },
            { id: "ruby-7", label: "Advanced", parents: ["ruby-6"] },
            { id: "ruby-8", label: "Final", parents: ["ruby-7"], langPdf: "en" },
        ],
    },
    "piscine-symfony": {
        lang: "php",
        langPdf: "fr",
        modules: [
            { id: "symfony-0", label: "Initiation", parents: [] },
            { id: "symfony-1", label: "Starting", parents: ["symfony-0"] },
            { id: "symfony-2", label: "Oob", parents: ["symfony-1"] },
            { id: "symfony-3", label: "Composer", parents: ["symfony-2"], langPdf: "en" },
            { id: "symfony-4", label: "Base Symfony", parents: ["symfony-3"], langPdf: "en" },
            { id: "symfony-5", label: "SQL", parents: ["symfony-4"], langPdf: "en" },
            { id: "symfony-6", label: "Sessions", parents: ["symfony-5"], langPdf: "en" },
            { id: "symfony-7", label: "Advanced", parents: ["symfony-6"], langPdf: "en" },
            { id: "symfony-8", label: "Final", parents: ["symfony-7"], langPdf: "en" },
        ],
    },
    "piscine-mobile": {
        parents: ["tronc-commun"],
        position: { x: 14, y: 952 },
        lang: "dart",
        modules: [
            { id: "mobile-0", label: "Mobile Basics", parents: [] },
            { id: "mobile-1", label: "Structure and Logic", parents: ["mobile-0"] },
            { id: "mobile-2", label: "API and data", parents: ["mobile-1"] },
            { id: "mobile-3", label: "Design", parents: ["mobile-2"] },
            { id: "mobile-4", label: "Auth and dataBase", parents: ["mobile-3"] },
            { id: "mobile-5", label: "Manage data and display", parents: ["mobile-4"] },
        ],
    },
    "piscine-ocaml": {
        parents: ["tronc-commun"],
        position: { x: 730, y: 928 },
        lang: "ocaml",
        modules : [
            { id: "ocaml-0", label: "Basic syntax and semantics", parents: [] },
            { id: "ocaml-1", label: "Recursion and higher-order functions", parents: ["ocaml-0"] },
            { id: "ocaml-2", label: "Pattern matching and data type", parents: ["ocaml-1"] },
            { id: "ocaml-3", label: "Ocaml's modules language", parents: ["ocaml-2"] },
            { id: "ocaml-4", label: "Imperative features", parents: ["ocaml-3"] },
            { id: "ocaml-5", label: "Functor", parents: ["ocaml-4"] },
            { id: "ocaml-6", label: "OOP 1", parents: ["ocaml-5"] },
            { id: "ocaml-7", label: "OOP 2", parents: ["ocaml-6"] },
            { id: "ocaml-8", label: "Monoids and Monads", parents: ["ocaml-7"] },
        ]
    },
    "piscine-unity": {
        parents: ["tronc-commun"],
        position: { x: 323, y: 1018 },
        lang: "unity",
        modules : [
            { id: "unity-0", label: "The basics unity tools", parents: [] },
            { id: "unity-1", label: "3D physics, Tags, Layers and Scene", parents: ["unity-0"] },
            { id: "unity-2", label: "2D environment, tiles and sprites", parents: ["unity-1"] },
            { id: "unity-3", label: "Advanced inputs and 2D GUI", parents: ["unity-2"] },
            { id: "unity-4", label: "Animations and Sound", parents: ["unity-3"] },
            { id: "unity-5", label: "Singleton, playerPrefs and coroutines", parents: ["unity-4"] },
            { id: "unity-6", label: "Navmesh, light, sound and camera", parents: ["unity-5"] },
        ]
    },
    "piscine-cybersecurite": {
        parents: ["tronc-commun"],
        position: { x: 770, y: 274 },
        lang: "nextdns",
        modules: [
            { id: "cyber-0", label: "Arachnida", parents: [] },
            { id: "cyber-1", label: "ft_otp", parents: ["cyber-0"] },
            { id: "cyber-2", label: "ft_onion", parents: ["cyber-1"] },
            { id: "cyber-3", label: "Reverse me", parents: ["cyber-2"] },
            { id: "cyber-4", label: "Stockholm", parents: ["cyber-3"] },
            { id: "cyber-5", label: "Inquisitor", parents: ["cyber-4"] },
            { id: "cyber-6", label: "Vaccine", parents: ["cyber-5"] }
        ]
    },
    "piscine-objet": {
        parents: ["tronc-commun"],
        position: { x: 835, y: 796 },
        lang: "c++",
        modules: [
            { id: "object-0", label: "Encapsulation", parents: [] },
            { id: "object-1", label: "Relationship", parents: ["object-0"] },
            { id: "object-2", label: "UML", parents: ["object-1"] },
            { id: "object-3", label: "SOLID", parents: ["object-2"] },
            { id: "object-4", label: "Design pattern", parents: ["object-3"] },
            { id: "object-5", label: "Pattern work", parents: ["object-4"] },
        ]
    },
    "piscine-data-science": {
        parents: ["tronc-commun"],
        position: { x: -39, y: 257 },
        lang: "python",
        modules: [
            { id: "data-0", label: "Data Engineer", parents: [] },
            { id: "data-1", label: "Data Warehouse", parents: ["data-0"] },
            { id: "data-2", label: "Data Analyst", parents: ["data-1"] },
            { id: "data-3", label: "Data Scientist p.1", parents: ["data-2"] },
            { id: "data-4", label: "Data Scientist p.2", parents: ["data-3"] },
        ]
    },
    "ft-ality": {
        lang: "ocaml",
        parents: ["ft-turing"],
        position: { x: 885, y: 1100 },
        desc: "Ce projet va vous initier aux problématiques liées à l'analyse syntaxique automatique, en étudiant les automates finis avec un jeu de combat."
    },
    "ft-minecraft": {
        parents: ["ft-vox"],
        position: { x: 733, y: 1187 },
        lang: "java",
        desc: "ft_minecraft est la suite de ft_vox, avec une approche plus avancée en matière de génération procédurale, de techniques de rendu et de mise en réseau.",
    },
    "libftpp": {
        parents: ["piscine-objet"],
        position: { x: 957, y: 841 },
        lang: "c++",
        desc: "Ce sujet a pour objectif de vous initier aux concepts avancés du C++ à travers le développement d'outils et de systèmes complexes.",
    },
    "peace-break": {
        parents: ["swifty-proteins"],
        position: { x: -212, y: 1130 },
        desc: "Inspiré de Brick Breaker, ce projet est une introduction au développement mobile : concevez une interface, gérez des données utilisateur et implémentez les mécaniques de jeu.",
    },
    "ft-lex": {
        parents: ["tronc-commun"],
        position: { x: 852, y: 359 },
        lang: "C",
        desc: "Un projet sur l'analyse lexicale et les automates finis. Dans le cadre de ce projet, vous devrez mettre en œuvre un puissant moteur d'expressions régulières"
    },
    "ft-yacc": {
        parents: ["ft-lex"],
        position: { x: 967, y: 314 },
        desc: "Implémentez l'utilitaire POSIX yacc, un générateur de parsers, en explorant la théorie des automates, les langages formels et la hiérarchie de Chomsky.",
    },
    "cc1": {
        parents: ["ft-yacc","b"],
        position: { x: 1065, y: 334 },
        desc: "Ce projet consiste à créer un compilateur C",
    },
    "b": {
        parents: ["libasm"],
        position: { x: 963, y: 397 },
        desc: "La lettre qui précéde C",
    },
    "darkly": {
        parents: ["piscine-web"],
        position: { x: -320, y: 785 },
        desc: "Disséquez un site web vulnérable pour vous initier à la sécurité web et prendre conscience des failles liées aux erreurs de développement et de conception.",
    },
    "ftl-quantum": {
        parents: ["tronc-commun"],
        position: { x: -56, y: 396 },
        lang: "python",
        desc: "Ce projet est une introduction à la programmation quantique. Il vous mettra au défi de créer différents programmes quantiques et de les exécuter sur un véritable ordinateur quantique.",
    },
    "unleashthebox": {
        parents: ["boot2root"],
        position: { x: 962, y: 79 },
        desc: "Un projet immersif consacré à la cybersécurité, dans le cadre duquel les participants apprennent à exploiter des systèmes et acquièrent les compétences indispensables pour évoluer dans le monde en constante évolution de la sécurité de l'information.",
    },
    "freddie-mercury": {
        parents: ["xv"],
        position: { x: 256, y: 1266 },
        desc: "Créez un escape game complet en VR avec au moins deux niveaux, en maîtrisant les contrôles VR, les interactions avec les objets et le game design.",
    },
    "ft-newton": {
        parents: ["humangl"],
        position: { x: 670, y: 1317 },
        desc: "Codez un moteur physique basique from scratch, illustré par un jeu inspiré d'Angry Birds, avec détection de collisions, corps rigides et gravité.",
    },
    "very-real-engine": {
        parents: ["ft-minecraft","ft-newton"],
        position: { x: 767, y: 1315 },
        desc: "Créer et mettre en œuvre une bibliothèque contenant tous les outils nécessaires, notamment un moteur graphique et un moteur physique."
    },
    "learn2slither": {
        parents: ["dslr"],
        position: { x: -231, y: 227 },
        desc: "Créer une intelligence artificielle utilisant le reinforcement learning pour entraîner un serpent à survivre et maximiser ses récompenses sur une grille de jeu.",
    },
    "leaffliction": {
        parents: ["dslr"],
        position: { x: -206, y: 89 },
        desc: "Un projet novateur en vision par ordinateur qui utilise l'analyse d'images de feuilles pour détecter les maladies."
    },
    "tokenizer": {
        parents: ["tronc-commun"],
        position: { x: -10, y: 674 },
        desc: "Créez et déployez votre propre token fongible sur une blockchain publique",
    },
    "tokenizeart": {
        parents: ["tokenizer"],
        position: { x: -74, y: 706 },
        desc: "Créez et mintez votre propre NFT sur une blockchain publique, en gérant son image via IPFS, son smart contract et ses métadonnées.",
    },
    "ft-kalman": {
        parents: ["matrix"],
        position: { x: -106, y: 542 },
        desc: "Implémentez un filtre de Kalman pour suivre les coordonnées d'un véhicule équipé de capteurs défectueux — une introduction au filtrage de signaux et aux opérations matricielles.",
        langPdf: "fr",
    },
    "ready-set-boole": {
        parents: ["tronc-commun"],
        position: { x: -40, y: 495 },
        lang: "rust",
        desc: "Découvrez les bases des mathématiques appliquées à l'informatique grâce à l'algèbre booléenne et à la théorie des ensembles !",
    },
    "tinky-winkey": {
        parents: ["tronc-commun"],
        position: { x: 636, y: 140 },
        desc: "Introduction au système d'exploitation Windows à travers la création d'un service exécutant un keylogger."
    },
    "ft-malcolm": {
        parents: ["tronc-commun"],
        position: { x: 254, y: 128 },
        desc: "Introduction à la sécurité des réseaux : l'attaque de type 'Man-in-the-middle'",
    },
    "ft-ssl-md5": {
        parents: ["ft-ping"],
        position: { x: 366, y: -33 },
        desc: "Vous allez réécrire une partie du programme OpenSSL, plus précisément l'algorithme de hachage MD5.",
    },
    "bgp-at-doors-of-autonomous-systems-is-simple": {
        parents: ["tronc-commun"],
        position: { x: 169, y: 148 },
        desc: "Ce projet a pour but d'approfondir vos connaissances apprises par NetPractice. Vous allez devoir simuler plusieurs réseaux dans GNS3.",
    },
    "ft-shield": {
        parents: ["woody-woodpacker"],
        position: { x: 588, y: 81 },
        desc: "Utilisez vos skills sur la création de daemon pour créer votre premier trojan basique.",
    },
    "nm": {
        parents: ["malloc"],
        position: { x: 1105, y: 682 },
        desc: "Réécrivez les outils nm et otool pour décortiquer le format des exécutables et comprendre comment le kernel lance les binaires — une ouverture essentielle sur la culture UNIX système.",
    },
    "inception-of-things": {
        parents: ["cloud-1"],
        position: { x: 60, y: 140 },
        desc: "Découvrez Kubernetes côté développeur en déployant des clusters dans Docker et en mettant en place une pipeline d'intégration continue pour vos applications.",
    },
    "call-me-maybe": {
        parents: ["piscine-data-science"],
        position: { x: -136, y: 295 },
        lang: "python",
        desc: "Découvrir le function calling des modèles de langage en transformant des instructions en langage naturel en appels de fonctions structurés, avec des arguments typés et un décodage contraint garantissant la génération de JSON valide et fiable.",
    },
    "rag-against-the-machine": {
        parents: ["call-me-maybe"],
        position: { x: -216, y: 295 },
        lang: "python",
        desc: "Concevoir un système de Retrieval-Augmented Generation (RAG) capable de répondre à des questions sur une base de code en retrouvant les informations pertinentes, grâce à un découpage intelligent des données et à des méthodes de recherche comme TF-IDF et BM25, puis en générant des réponses fondées sur les éléments récupérés.",
    },
    "agent-smith": {
        parents: ["rag-against-the-machine"],
        position: { x: -296, y: 295 },
        lang: "python",
        desc: "Concevoir un agent d’intelligence artificielle autonome capable de raisonner, générer, exécuter et améliorer du code de manière itérative afin de résoudre des problèmes de programmation dans un environnement sécurisé et isolé.",
    },
    "retroemu": {
        parents: ["lem-ipc"],
        position: { x: 1274, y: 779 },
        lang: "rust",
        desc: "Développer un émulateur de console portable 8 bits, compatible avec les modèles DMG et CGB, afin de comprendre l’émulation matérielle et le fonctionnement des cartouches ROM.",
    },
    "supercharge": {
        parents: ["ftl-quantum"],
        position: { x: -154, y: 362 },
        lang: "react",
        desc: "Créer une application web optimisant l’emplacement de bornes de recharge électrique et comparant une résolution classique par force brute à l’algorithme quantique QAOA.",
    },
    "ft-lgtm": {
        parents: ["inception-of-things"],
        position: { x: 19, y: 64 },
        desc: "Créer une application web exécutant du code non fiable de façon sécurisée avec WASM/WASI, le stockant sur IPFS et supervisée via une stack LGTM sur Kubernetes.",
    },
    "inception-of-context": {
        parents: ["ft-lgtm"],
        position: { x: 50, y: 0 },
        desc: "Créer un assistant de programmation IA entièrement local, capable d’indexer le code, répondre avec contexte et appliquer, valider ou annuler automatiquement des modifications.",
    },
    "inception-of-wisdom": {
        parents: ["ft-lgtm"],
        position: { x: -55, y: 25 },
        desc: "Créer un agent autonome capable de surveiller un service, détecter les pannes, corriger automatiquement le code avec une IA locale, redéployer et annuler les modifications en cas d’échec.",
    },
};

export const rushList = [
    {
        id: "cursus-rush-00",
        label: "Libunit",
        pdfUrl: "subjects/libunit.fr.pdf",
        desc: "Concevez un micro-framework en langage C dédié aux tests."
    },
    {
        id: "cursus-rush-01",
        label: "Hotrace",
        desc: "Développez un moteur de recherche capable d'indexer des données et de répondre efficacement aux recherches par mots-clés."
    },
    {
        id: "cursus-rush-02",
        label: "AlCu",
        desc: "Développez AlCu, un jeu basé sur des tas, et mettez en œuvre des algorithmes ainsi que des méthodes de programmation efficaces."
    },
    {
        id: "cursus-rush-03",
        label: "Wong kar Wai",
        desc: "Amusez-vous en développant le jeu 2048."
    },
    {
        id: "cursus-rush-04",
        label: "yasl",
        desc: "Découvrez un nouveau langage de programmation et mettez à l'épreuve votre capacité d'adaptation.",
    },
    {
        id: "cursus-rush-05",
        label: "wordle",
        desc: "Reproduisez le jeu Wordle en développant sa logique de jeu et son système de validation des mots."
    },
    {
        id: "cursus-rush-06",
        label: "Connect4",
        desc: "Développez une version du Puissance 4 intégrant une intelligence artificielle capable de vous affronter."
    },
    {
        id: "cursus-rush-07",
        label: "Retro-MFA",
        desc: "Retrouvez des images cachées dans un format de fichier propriétaire en développant les outils nécessaires à leur extraction."
    },
    {
        id: "cursus-rush-08",
        label: "ft_shmup",
        desc: "Le but de ce projet est d’implémenter un jeu simpliste de type shoot'em up dans votre terminal."
    },
];

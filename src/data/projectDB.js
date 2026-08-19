export const generateId = (name) => name.toLowerCase().replace(/\s+/g, '-').replace(/_/g, '-');
 
export const projectDefinitions = {
    "tronc-commun": {
        size: 1100,
        locked: true,
        position: { x: -112, y: 28 },
        desc: "Le tronc commun de 42 vous apprend les fondamentaux de la programmation et de l’informatique à travers une progression de projets pratiques. Vous y aborderez notamment le C, les algorithmes, les structures de données, Unix, les réseaux, les systèmes, la programmation orientée objet, tout en développant votre autonomie, votre rigueur et votre capacité à travailler en équipe."
    },
    "guimp": {
        parents: ["mod1"],
        position: { x: 824, y: 1194 },
        desc: "L'objectif de ce projet sera pour vous de réaliser une librairie d'interface graphique. Vous devrez prouver son bon fonctionnement avec un petit logiciel d'édition d'image 2D.",
    },
    "rt": {
        parents: ["tronc-commun"],
        position: { x: 414, y: 1260 },
        desc: "Suite du projet RTv1, RT consiste à développer un moteur de raytracing avancé capable de gérer des effets réalistes comme les réflexions, la transparence, les textures et les découpes d’objets. Le projet demande de concevoir une architecture flexible et performante afin de produire des scènes 3D complexes et des images de synthèse de haute qualité."
    },
    "ft-ls": {
        parents: ["malloc"],
        position: { x: 1218, y: 817 },
        lang: "c",
        desc: "Pour tout connaitre du filesystem, de la façon dont sont rangés les fichiers et répertoires, codez par vous-même une des commandes les plus utilisées : ls .",
    },
    "red-tetris": {
        parents: ["piscine-web"],
        position: { x: -355, y: 1024 },
        desc: "L’objectif de ce projet est de développer un jeu de tetris multijoueurs en réseau à partir d’une pile logicielle exclusivement Full Stack Javascript",
    },
    "zappy": {
        parents: ["bomberman"],
        position: { x: 762, y: 1387 },
        desc: "Zappy est un projet réseau avancé consistant à développer un jeu multijoueur en TCP/IP avec un serveur, un client graphique et des intelligences artificielles capables d’interagir sur une même carte en temps réel.",
    },
    "ft-ssl-des": {
        parents: ["ft-ssl-md5"],
        position: { x: 356, y: -239 },
        desc: "Recodez une partie du programme OpenSSL, notamment les encodages BASE64, DES-ECB et DES-CBC.",
    },
    "expert-system": {
        parents: ["n-puzzle"],
        position: { x: -352, y: 651 },
        lang: "rust",
        desc: "Créez un système expert en calcul des propositions, capable de raisonner sur un ensemble de règles et de faits pour en déduire de nouveaux.",
    },
    "cloud-1": {
        parents: ["tronc-commun"],
        position: { x: 7, y: 90 },
        desc: "Introduction à la gestion et au déploiement de serveurs dans le cloud.",
    },
    "hypertube": {
        parents: ["matcha"],
        position: { x: -433, y: 782 },
        desc: "Réalisez un site de streaming de vidéos téléchargées via BitTorrent en utilisant un framework MVC de votre choix.",
    },
    "in-the-shadows": {
        parents: ["piscine-unity"],
        position: { x: 280, y: 1251 },
        desc: "Développez un jeu complet alliant algorithmie et créativité.",
    },
    "swifty-companion": {
        parents: ["piscine-mobile"],
        position: { x: -184, y: 1099 },
        lang: "flutter",
        desc: "Développer une application mobile qui récupère et affiche les informations des utilisateurs de l’API 42 avec une interface interactive.",
    },
    "kfs-1": {
        parents: ["little-penguin-1"],
        position: { x: 1215, y: 658 },
        desc: "Plongez dans la programmation noyau et créez votre propre kernel from scratch.",
    },
    "malloc": {
        parents: ["tronc-commun"],
        position: { x: 1156, y: 722 },
        lang: "c",
        desc: "Découvrez les rouages d'une gestion optimale de la mémoire en recodant malloc, free et realloc.",
    },
    "42sh": {
        parents: ["ft-script"],
        position: { x: 898, y: 4 },
        desc: "Créez un shell complet et abouti depuis zéro, en couvrant une large palette de fonctionnalités UNIX/POSIX (pipes, redirections, job control, etc.).",
    },
    "matrix": {
        parents: ["tronc-commun"],
        position: { x: -185, y: 565 },
        lang: "rust",
        desc: "Vous avez sans doute déjà entendu parler des vecteurs et des espaces vectoriels. Il est maintenant temps de les formaliser à l'aide de l'algèbre linéaire et d'apprendre comment fonctionnent les matrices et les transformations linéaires."
    },
    "lem-in": {
        parents: ["n-puzzle"],
        position: { x: -324, y: 529 },
        desc: "Déplacez une colonie de fourmis d'un point à un autre le plus rapidement possible en implémentant des algorithmes de parcours de graphe.",
    },
    "dr-quine": {
        parents: ["woody-woodpacker"],
        position: { x: 452, y: -71 },
        desc: "Explorez les problématiques d'auto-réplication et affrontez le théorème de récursion de Kleene dans ce petit projet d'algorithmie.",
    },
    "xv": {
        parents: ["in-the-shadows"],
        position: { x: 253, y: 1332 },
        desc: "Développez une interface graphique sous Unity pour optimiser des processus industriels, en partenariat avec l'entreprise Daher.",
    },
    "matcha": {
        parents: ["piscine-web"],
        position: { x: -352, y: 814 },
        lang: ["react", "python", "mariadb", "docker"],
        desc: "Créez un site de rencontres avec un micro-framework de votre choix, en mettant les interactions entre utilisateurs au cœur du projet.",
        langPdf: "fr",
    },
    "camagru": {
        parents: ["piscine-web"],
        position: { x: -287, y: 1033 },
        lang: "php",
        desc: "Réalisez en PHP pur (sans framework) un mini site Instagram-like permettant aux utilisateurs de créer et partager des photo-montages.",
    },
    "dslr": {
        parents: ["piscine-data-science"],
        position: { x: -245, y: 108 },
        lang: "python",
        desc: "Initiez-vous à la Data Science en recréant le Choixpeau Magique de Poudlard, un sujet proposé par l'association 42AI."
    },
    "multilayer-perceptron": {
        parents: ["dslr"],
        position: { x: -237, y: -25 },
        desc: "Introduction aux réseaux de neurones artificiels via l'implémentation d'un multilayer perceptron, proposée par 42AI.",
    },
    "doom-nukem": {
        parents: ["scop"],
        position: { x: 498, y: 1209 },
        lang: "c",
        desc: "Suite avancée du Wolf3D mêlant Doom et Duke Nukem 3D : poussez le Raycasting à l'extrême tout en concevant un vrai jeu jouable.",
    },
    "corewar": {
        parents: ["abstract-vm"],
        position: { x: 1249, y: 965 },
        desc: "Créez une arène virtuelle où s'affrontent des programmes en langage assembleur, en concevant votre propre VM et compilateur bytecode."
    },
    "ft-linear-regression": {
        parents: ["dslr"],
        position: { x: -152, y: 28 },
        desc: "Premiers pas en IA et Machine Learning : créez un programme qui prédit le prix d'une voiture via une régression linéaire entraînée par descente de gradient."
    },
    "music-room": {
        parents: ["piscine-web"],
        position: { x: -461, y: 947 },
        lang: "go",
        desc: "En partenariat avec Deezer, créez en groupe une application mobile de playlist collaborative intégrant les SDK et API de Deezer."
    },
    "libasm": {
        lang: "assemblyscript",
        parents: ["tronc-commun"],
        position: { x: 1020, y: 406 },
        desc: "Codez une mini-libc en assembleur en recodant des fonctions basiques de la libc, indispensable pour aborder les projets de sécurité.",
    },
    "scop": {
        parents: ["tronc-commun"],
        position: { x: 593, y: 1230 },
        lang: "opengl",
        desc: "Premiers pas dans la 3D sur GPU avec OpenGL à travers un projet ludique couvrant les concepts principaux.",
    },
    "war": {
        parents: ["pestilence"],
        position: { x: 621, y: -252 },
        desc: "Troisième projet virus : reprenez Pestilence et faites en sorte que votre binaire modifie sa propre signature au runtime."
    },
    "snow-crash": {
        parents: ["piscine-cybersecurite"],
        position: { x: 993, y: 123 },
        desc: "Introduction à la sécurité informatique orientée développeur : trouvez des failles dans des programmes via reverse engineering et manipulation de plusieurs langages."
    },
    "taskmaster": {
        parents: ["tronc-commun"],
        position: { x: 1033, y: 780 },
        desc: "Réalisez un programme de job control similaire à supervisor, dans le langage de votre choix."
    },
    "rubik": {
        parents: ["n-puzzle"],
        position: { x: -265, y: 687 },
        desc: "Réalisez un résolveur de Rubik's Cube dans le langage de votre choix — un projet d'algorithmie non trivial.",
    },
    "shaderpixel": {
        parents: ["humangl"],
        position: { x: 584, y: 1452 },
        desc: "Travaillez directement dans l'espace de la carte graphique en programmant des shaders pour créer des objets et effets visuels avancés."
    },
    "famine": {
        parents: ["woody-woodpacker"],
        position: { x: 531, y: -157 },
        desc: "Créez votre premier virus en C à but pédagogique, en manipulant des fichiers binaires pour infecter d'autres exécutables."
    },
    "ft-script": {
        parents: ["tronc-commun"],
        position: { x: 835, y: 57 },
        desc: "Recodez la commande script pour comprendre les interactions entre input utilisateur, TTY et pseudo-terminaux."
    },
    "strace": {
        parents: ["lem-ipc"],
        position: { x: 1354, y: 868 },
        desc: "Recodez strace, un outil listant tous les appels système effectués par un programme en cours d'exécution — premier pas vers un mini-GDB."
    },
    "swifty-proteins": {
        parents: ["swifty-companion"],
        position: { x: -244, y: 1166 },
        lang: "flutter",
        desc: "Initiez-vous à SceneKit en créant une application iOS qui modélise des ligands en 3D, avec Touch ID, gestures et recherche."
    },
    "woody-woodpacker": {
        parents: ["tronc-commun"],
        position: { x: 533, y: -69 },
        desc: "Modifiez les headers d'un fichier ELF64 pour y injecter du code et obfusquer une partie d'un binaire non strippé."
    },
    "ft-traceroute": {
        parents: ["ft-ping"],
        position: { x: 224, y: -82 },
        desc: "Recodez la commande traceroute pour suivre le chemin qu'un paquet IP emprunte entre deux machines sur un réseau TCP/IP."
    },
    "ft-ping": {
        parents: ["tronc-commun"],
        position: { x: 350, y: -85 },
        lang: "c",
        desc: "Recodez la commande ping pour comprendre la communication TCP/IP entre deux machines dans un réseau."
    },
    "ft-nmap": {
        parents: ["ft-traceroute"],
        position: { x: 236, y: -290 },
        desc: "Recodez nmap pour approfondir vos connaissances en réseau TCP/IP et explorer l'usage avancé des threads."
    },
    "kfs-4": {
        parents: ["kfs-3"],
        position: { x: 1348, y: 550 },
        desc: "Créez une Interrupt Description Table et gérez les interruptions au sein de votre kernel."
    },
    "bomberman": {
        parents: ["humangl"],
        position: { x: 693, y: 1347 },
        desc: "Recodez Bomberman en C++ avec OpenGL pour réaliser votre premier gros projet C++ de facture professionnelle."
    },
    "nibbler": {
        parents: ["lem-ipc"],
        position: { x: 1383, y: 741 },
        desc: "Recodez le jeu Snake en C++ avec plusieurs interfaces graphiques différentes."
    },
    "abstract-vm": {
        parents: ["libftpp"],
        position: { x: 1180, y: 919 },
        desc: "Réalisez une machine virtuelle capable d'exécuter du pseudo-ASM en utilisant une stack pour effectuer des opérations arithmétiques."
    },
    "abstract-data": {
        parents: ["libftpp"],
        position: { x: 1165, y: 1008 },
        desc: "Réimplémentez les différents containers du C++ pour bien comprendre leurs usages et spécificités."
    },
    "avaj-launcher": {
        parents: ["tronc-commun"],
        position: { x: 961, y: 953 },
        lang: "java",
        desc: "Premier projet Java du cursus : implémentez un programme simple à partir d'un diagramme de classes UML fourni.",
    },
    "42run": {
        parents: ["scop"],
        position: { x: 519, y: 1307 },
        desc: "Recréez Temple Run en C++ avec OpenGL dans ce projet intermédiaire de programmation graphique.",
    },
    "krpsim": {
        parents: ["n-puzzle"],
        position: { x: -394, y: 590 },
        desc: "Optimisez le rendement d'un graphe de processus avec contraintes de ressources en explorant et choisissant les algorithmes les plus adaptés.",
    },
    "total-perspective-vortex": {
        parents: ["dslr"],
        position: { x: -384, y: 75 },
        desc: "Traitez des données en grandes dimensions avec Python et créez une interface homme-machine pilotée par les ondes cérébrales.",
    },
    "kfs-5": {
        parents: ["kfs-4"],
        position: { x: 1392, y: 665 },
        desc: "Implémentez la gestion des processus dans votre kernel, notamment l'interprétation de la fork bomb :(){ :|:& }."
    },
    "userspace-digressions": {
        parents: ["little-penguin-1"],
        position: { x: 1107, y: 479 },
        desc: "Créez votre propre binaire init en espace utilisateur.",
    },
    "computorv2": {
        parents: ["computorv1"],
        position: { x: -335, y: 411 },
        desc: "Étendez votre résolveur d'équations en une calculatrice complète gérant les matrices, nombres imaginaires et résolution de fonctions."
    },
    "ft-select": {
        parents: ["ft-ls"],
        position: { x: 1283, y: 877 },
        lang: "c",
        desc: "Initiez-vous à la manipulation du terminal via les termcaps en créant une interface utilisateur pour un programme lancé en terminal."
    },
    "computorv1": {
        parents: ["tronc-commun"],
        position: { x: -257, y: 408 },
        lang: "go",
        desc: "Recodez un résolveur d'équations mathématiques élémentaires dans le langage de votre choix, socle pour de nombreux autres projets."
    },
    "ft-ssl-rsa": {
        parents: ["ft-ssl-des"],
        position: { x: 357, y: -292 },
        desc: "Codez votre propre générateur de nombres premiers aléatoires pour générer des clés RSA privées.",
    },
    "ft-vox": {
        parents: ["scop"],
        position: { x: 700, y: 1236 },
        lang: "c++",
        desc: "Créez un moteur de voxel inspiré de Minecraft avec génération de monde aléatoire.",
    },
    "override": {
        parents: ["rainfall"],
        position: { x: 1174, y: 56 },
        desc: "Recherchez des failles dans des binaires protégés et reconstruisez-les — un challenge de sécurité plus corsé que Rainfall.",
    },
    "boot2root": {
        parents: ["snow-crash"],
        position: { x: 1003, y: 27 },
        desc: "Challenge sécurité en groupe : trouvez tous les moyens possibles de passer root sur l'ISO fournie.",
    },
    "death": {
        parents: ["war"],
        position: { x: 520, y: -255 },
        desc: "Projet virus final : créez un véritable code métamorphique en combinant les acquis de Famine, Pestilence et War.",
    },
    "pestilence": {
        parents: ["famine"],
        position: { x: 625, y: -153 },
        desc: "Second projet virus : reprenez Famine et ajoutez une méthode d'obfuscation de votre code.",
    },
    "kfs-9": {
        parents: ["kfs-8"],
        position: { x: 1560, y: 654 },
        desc: "Créez un parser et loader ELF pour votre kernel.",
    },
    "kfs-x": {
        parents: ["kfs-9"],
        position: { x: 1605, y: 562 },
        desc: "Projet kernel final : créez un environnement Linux complet, éventuellement avec votre propre nom de kernel.",
    },
    "kfs-8": {
        parents: ["kfs-7"],
        position: { x: 1521, y: 530 },
        desc: "Construisez une interface de modules pour votre kernel.",
    },
    "kfs-7": {
        parents: ["kfs-6"],
        position: { x: 1474, y: 658 },
        desc: "Ajoutez vos propres syscalls, comptes utilisateurs, sockets et une hiérarchie Unix à votre kernel.",
    },
    "kfs-6": {
        parents: ["kfs-5"],
        position: { x: 1442, y: 535 },
        desc: "Continuez le développement de votre kernel en y intégrant votre propre système de fichiers.",
    },
    "fix-me": {
        parents: ["swingy"],
        position: { x: 1104, y: 1063 },
        desc: "Projet Java final : simulez des échanges boursiers avec des algorithmes de trading, du networking et des sockets.",
    },
    "swingy": {
        parents: ["avaj-launcher"],
        position: { x: 1030, y: 1012 },
        lang: "java",
        desc: "Créez un jeu RPG en Java avec le framework SWING pour apprendre le développement d'applications GUI.",
    },
    "gomoku": {
        parents: ["n-puzzle"],
        position: { x: -381, y: 522 },
        desc: "Créez un jeu de Gomoku avec une IA capable de battre un humain, en implémentant un algorithme min-max et des heuristiques adaptées."
    },
    "n-puzzle": {
        parents: ["tronc-commun"],
        position: { x: -276, y: 620 },
        lang: "c++",
        desc: "Réalisez un programme capable de résoudre des Taquins de tailles variées de façon aussi optimale que possible.",
    },
    "mod1": {
        parents: ["tronc-commun"],
        position: { x: 769, y: 1112 },
        lang: "c++",
        desc: "Simulez et représentez en 3D un écoulement d'eau sur une surface — vague, tsunami ou simple pluie."
    },
    "kfs-3": {
        parents: ["kfs-2"],
        position: { x: 1311, y: 665 },
        desc: "Troisième projet kernel : implémentez la gestion de la mémoire dans votre kernel."
    },
    "filesystem": {
        parents: ["drivers-and-interrupts","process-and-memory"],
        position: { x: 1225, y: 411 },
        desc: "Créez votre propre système de fichiers pour votre kernel Linux."
    },
    "drivers-and-interrupts": {
        parents: ["little-penguin-1"],
        position: { x: 1174, y: 473 },
        desc: "Apprenez à connecter un driver (clavier) à votre kernel Linux."
    },
    "process-and-memory": {
        parents: ["little-penguin-1"],
        position: { x: 1266, y: 485 },
        desc: "Introduction aux syscalls et à la gestion de la mémoire au sein du kernel Linux."
    },
    "little-penguin-1": {
        parents: ["ft-linux"],
        position: { x: 1179, y: 575 },
        desc: "Série de challenges inspirés du challenge Eudyptula pour aborder de nombreux points du développement kernel."
    },
    "rainfall": {
        parents: ["snow-crash"],
        position: { x: 1094, y: 118 },
        desc: "ISO de challenge de reverse engineering plus complexe que Snow Crash : reconstruisez et analysez des binaires pour en trouver les failles."
    },
    "matt-daemon": {
        parents: ["taskmaster"],
        position: { x: 1126, y: 823 },
        desc: "Créez un daemon-serveur Unix qui écoute sur un port donné et interprète une liste de commandes."
    },
    "ft-linux": {
        parents: ["tronc-commun"],
        position: { x: 1060, y: 580 },
        desc: "Construisez votre propre distribution Linux (LFS) — premier projet de la branche Kernel.",
    },
    "particle-system": {
        parents: ["humangl"],
        position: { x: 481, y: 1434 },
        desc: "Introduction au GPU via OpenGL et OpenCL : créez un système de particules performant grâce à la parallélisation massive des calculs.",
    },
    "ft-turing": {
        parents: ["piscine-ocaml"],
        position: { x: 971, y: 1100 },
        lang: "ocaml",
        desc: "Découvrez le modèle de Turing, fondement du paradigme impératif, en l'implémentant en OCaml.",
    },
    "humangl": {
        parents: ["scop"],
        position: { x: 595, y: 1344 },
        lang: "c++",
        desc: "Introduction à la modélisation hiérarchique avec OpenGL : liez et animez les parties d'un humanoïde via des matrices."
    },
    "ft-hangouts": {
        parents: ["piscine-mobile"],
        position: { x: -15, y: 1165 },
        lang: "kotlin",
        desc: "Créez une application Android de gestion de contacts en Java pour comprendre le cycle de vie d'une app et l'utilisation du SDK Android."
    },
    "lem-ipc": {
        parents: ["malloc"],
        position: { x: 1283, y: 772 },
        desc: "Approfondissez la communication inter-processus en explorant les mécanismes IPC, complémentaires à TCP/IP."
    },
    "kfs-2": {
        parents: ["kfs-1"],
        position: { x: 1274, y: 563 },
        desc: "Plongez dans la programmation noyau et créez votre propre kernel from scratch."
    },
    "h42n42": {
        parents: ["ft-turing"],
        position: { x: 1067, y: 1139 },
        lang: "ocaml",
        desc: "Introduction au framework Ocsigen pour créer des applications web riches en OCaml, illustrée par un simulateur de bestioles fuyant un virus.",
    },
    "open-project": {
        parents: ["tronc-commun"],
        position: { x: 151, y: 1135 },
        lang: "react",
        desc: "Gérez un projet long terme de 6 mois en groupe avec d'autres étudiants de 42, sur un sujet libre comportant des éléments informatiques.",
    },
    "piscine-web": {
        parents: ["tronc-commun"],
        position: { x: -233, y: 859 },
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
        position: { x: -91, y: 1059 },
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
        position: { x: 827, y: 1042 },
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
        position: { x: 296, y: 1166 },
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
        position: { x: 890, y: 183 },
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
        position: { x: 965, y: 871 },
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
        position: { x: -165, y: 175 },
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
        position: { x: 983, y: 1213 },
        desc: "Ce projet va vous initier aux problématiques liées à l'analyse syntaxique automatique, en étudiant les automates finis avec un jeu de combat."
    },
    "ft-minecraft": {
        parents: ["ft-vox"],
        position: { x: 801, y: 1321 },
        lang: "java",
        desc: "ft_minecraft est la suite de ft_vox, avec une approche plus avancée en matière de génération procédurale, de techniques de rendu et de mise en réseau.",
    },
    "libftpp": {
        parents: ["piscine-objet"],
        position: { x: 1089, y: 912 },
        lang: "c++",
        desc: "Ce sujet a pour objectif de vous initier aux concepts avancés du C++ à travers le développement d'outils et de systèmes complexes.",
    },
    "peace-break": {
        parents: ["swifty-proteins"],
        position: { x: -321, y: 1233 },
        desc: "Inspiré de Brick Breaker, ce projet est une introduction au développement mobile : concevez une interface, gérez des données utilisateur et implémentez les mécaniques de jeu.",
    },
    "ft-lex": {
        parents: ["tronc-commun"],
        position: { x: 990, y: 300 },
        lang: "C",
        desc: "Un projet sur l'analyse lexicale et les automates finis. Dans le cadre de ce projet, vous devrez mettre en œuvre un puissant moteur d'expressions régulières"
    },
    "ft-yacc": {
        parents: ["ft-lex"],
        position: { x: 1105, y: 256 },
        desc: "Implémentez l'utilitaire POSIX yacc, un générateur de parsers, en explorant la théorie des automates, les langages formels et la hiérarchie de Chomsky.",
    },
    "cc1": {
        parents: ["ft-yacc","b"],
        position: { x: 1208, y: 288 },
        desc: "Ce projet consiste à créer un compilateur C",
    },
    "b": {
        parents: ["libasm"],
        position: { x: 1108, y: 358 },
        desc: "La lettre qui précéde C",
    },
    "darkly": {
        parents: ["piscine-web"],
        position: { x: -476, y: 854 },
        desc: "Disséquez un site web vulnérable pour vous initier à la sécurité web et prendre conscience des failles liées aux erreurs de développement et de conception.",
    },
    "ftl-quantum": {
        parents: ["tronc-commun"],
        position: { x: -199, y: 349 },
        lang: "python",
        desc: "Ce projet est une introduction à la programmation quantique. Il vous mettra au défi de créer différents programmes quantiques et de les exécuter sur un véritable ordinateur quantique.",
    },
    "unleashthebox": {
        parents: ["boot2root"],
        position: { x: 1076, y: -18 },
        desc: "Un projet immersif consacré à la cybersécurité, dans le cadre duquel les participants apprennent à exploiter des systèmes et acquièrent les compétences indispensables pour évoluer dans le monde en constante évolution de la sécurité de l'information.",
    },
    "freddie-mercury": {
        parents: ["xv"],
        position: { x: 225, y: 1413 },
        desc: "Créez un escape game complet en VR avec au moins deux niveaux, en maîtrisant les contrôles VR, les interactions avec les objets et le game design.",
    },
    "ft-newton": {
        parents: ["humangl"],
        position: { x: 718, y: 1459 },
        desc: "Codez un moteur physique basique from scratch, illustré par un jeu inspiré d'Angry Birds, avec détection de collisions, corps rigides et gravité.",
    },
    "very-real-engine": {
        parents: ["ft-minecraft","ft-newton"],
        position: { x: 831, y: 1451 },
        desc: "Créer et mettre en œuvre une bibliothèque contenant tous les outils nécessaires, notamment un moteur graphique et un moteur physique."
    },
    "learn2slither": {
        parents: ["dslr"],
        position: { x: -365, y: 160 },
        desc: "Créer une intelligence artificielle utilisant le reinforcement learning pour entraîner un serpent à survivre et maximiser ses récompenses sur une grille de jeu.",
    },
    "leaffliction": {
        parents: ["dslr"],
        position: { x: -326, y: -1 },
        desc: "Un projet novateur en vision par ordinateur qui utilise l'analyse d'images de feuilles pour détecter les maladies."
    },
    "tokenizer": {
        parents: ["tronc-commun"],
        position: { x: -154, y: 717 },
        desc: "Créez et déployez votre propre token fongible sur une blockchain publique",
    },
    "tokenizeart": {
        parents: ["tokenizer"],
        position: { x: -229, y: 742 },
        desc: "Créez et mintez votre propre NFT sur une blockchain publique, en gérant son image via IPFS, son smart contract et ses métadonnées.",
    },
    "ft-kalman": {
        parents: ["matrix"],
        position: { x: -249, y: 519 },
        desc: "Implémentez un filtre de Kalman pour suivre les coordonnées d'un véhicule équipé de capteurs défectueux — une introduction au filtrage de signaux et aux opérations matricielles.",
        langPdf: "fr",
    },
    "ready-set-boole": {
        parents: ["tronc-commun"],
        position: { x: -189, y: 477 },
        lang: "rust",
        desc: "Découvrez les bases des mathématiques appliquées à l'informatique grâce à l'algèbre booléenne et à la théorie des ensembles !",
    },
    "tinky-winkey": {
        parents: ["tronc-commun"],
        position: { x: 709, y: 9 },
        desc: "Introduction au système d'exploitation Windows à travers la création d'un service exécutant un keylogger."
    },
    "ft-malcolm": {
        parents: ["tronc-commun"],
        position: { x: 202, y: -13 },
        desc: "Introduction à la sécurité des réseaux : l'attaque de type 'Man-in-the-middle'",
    },
    "ft-ssl-md5": {
        parents: ["ft-ping"],
        position: { x: 355, y: -183 },
        desc: "Vous allez réécrire une partie du programme OpenSSL, plus précisément l'algorithme de hachage MD5.",
    },
    "bgp-at-doors-of-autonomous-systems-is-simple": {
        parents: ["tronc-commun"],
        position: { x: 92, y: 19 },
        desc: "Ce projet a pour but d'approfondir vos connaissances apprises par NetPractice. Vous allez devoir simuler plusieurs réseaux dans GNS3.",
    },
    "ft-shield": {
        parents: ["woody-woodpacker"],
        position: { x: 642, y: -59 },
        desc: "Utilisez vos skills sur la création de daemon pour créer votre premier trojan basique.",
    },
    "nm": {
        parents: ["malloc"],
        position: { x: 1252, y: 710 },
        desc: "Réécrivez les outils nm et otool pour décortiquer le format des exécutables et comprendre comment le kernel lance les binaires - une ouverture essentielle sur la culture UNIX système.",
    },
    "inception-of-things": {
        parents: ["cloud-1"],
        position: { x: -37, y: 26 },
        desc: "Découvrez Kubernetes côté développeur en déployant des clusters dans Docker et en mettant en place une pipeline d'intégration continue pour vos applications.",
    },
    "call-me-maybe": {
        parents: ["piscine-data-science"],
        position: { x: -272, y: 232 },
        lang: "python",
        desc: "Découvrir le function calling des modèles de langage en transformant des instructions en langage naturel en appels de fonctions structurés, avec des arguments typés et un décodage contraint garantissant la génération de JSON valide et fiable.",
    },
    "rag-against-the-machine": {
        parents: ["call-me-maybe"],
        position: { x: -355, y: 239 },
        lang: "python",
        desc: "Concevoir un système de Retrieval-Augmented Generation (RAG) capable de répondre à des questions sur une base de code en retrouvant les informations pertinentes, grâce à un découpage intelligent des données et à des méthodes de recherche comme TF-IDF et BM25, puis en générant des réponses fondées sur les éléments récupérés.",
    },
    "agent-smith": {
        parents: ["rag-against-the-machine"],
        position: { x: -437, y: 244 },
        lang: "python",
        desc: "Concevoir un agent d’intelligence artificielle autonome capable de raisonner, générer, exécuter et améliorer du code de manière itérative afin de résoudre des problèmes de programmation dans un environnement sécurisé et isolé.",
    },
    "retroemu": {
        parents: ["lem-ipc"],
        position: { x: 1419, y: 818 },
        lang: "rust",
        desc: "Développer un émulateur de console portable 8 bits, compatible avec les modèles DMG et CGB, afin de comprendre l’émulation matérielle et le fonctionnement des cartouches ROM.",
    },
    "supercharge": {
        parents: ["ftl-quantum"],
        position: { x: -296, y: 315 },
        lang: "react",
        desc: "Créer une application web optimisant l’emplacement de bornes de recharge électrique et comparant une résolution classique par force brute à l’algorithme quantique QAOA.",
    },
    "ft-lgtm": {
        parents: ["inception-of-things"],
        position: { x: -75, y: -53 },
        desc: "Créer une application web exécutant du code non fiable de façon sécurisée avec WASM/WASI, le stockant sur IPFS et supervisée via une stack LGTM sur Kubernetes.",
    },
    "inception-of-context": {
        parents: ["ft-lgtm"],
        position: { x: -32, y: -126 },
        desc: "Créer un assistant de programmation IA entièrement local, capable d’indexer le code, répondre avec contexte et appliquer, valider ou annuler automatiquement des modifications.",
    },
    "inception-of-wisdom": {
        parents: ["ft-lgtm"],
        position: { x: -154, y: -87 },
        desc: "Créer un agent autonome capable de surveiller un service, détecter les pannes, corriger automatiquement le code avec une IA locale, redéployer et annuler les modifications en cas d’échec.",
    },
    "datomic": {
        position: { x: -152, y: 780 },
        parents: ["tronc-commun"],
        desc: "Découvrez plusieurs types de bases de données et apprenez à choisir et combiner la technologie adaptée à chaque problème."
    },
    "tokenzwap": {
        position: { x: -313, y: 745 },
        parents: ["tokenizeart"],
        desc: "Découvrez les bases de la DeFi en créant un AMM permettant d’échanger des tokens et d’acheter ou vendre des NFT."
    }
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

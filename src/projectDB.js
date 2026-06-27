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
        linkID: "60889",
        desc: "L'objectif de ce projet sera pour vous de réaliser une librairie d'interface graphique. Vous devrez prouver son bon fonctionnement avec un petit logiciel d'édition d'image 2D.",
    },
    "rt": {
        parents: ["tronc-commun"],
        position: { x: 413, y: 1110 },
        linkID: "188636",
        desc: "Suite du projet RTv1, RT consiste à développer un moteur de raytracing avancé capable de gérer des effets réalistes comme les réflexions, la transparence, les textures et les découpes d’objets. Le projet demande de concevoir une architecture flexible et performante afin de produire des scènes 3D complexes et des images de synthèse de haute qualité."
    },
    "ft-ls": {
        parents: ["malloc"],
        position: { x: 1076, y: 770 },
        lang: "c",
        logoColor: "#2a6bcc",
        linkID: "61383",
        desc: "Pour tout connaitre du filesystem, de la façon dont sont rangés les fichiers et répertoires, codez par vous-même une des commandes les plus utilisées : ls .",
    },
    "red-tetris": {
        parents: ["piscine-web"],
        position: { x: -273, y: 925 },
        linkID: "194982",
        desc: "L’objectif de ce projet est de développer un jeu de tetris multijoueurs en réseau à partir d’une pile logicielle exclusivement Full Stack Javascript",
    },
    "zappy": {
        parents: ["bomberman"],
        position: { x: 704, y: 1249 },
        linkID: "169700",
        desc: "Zappy est un projet réseau avancé consistant à développer un jeu multijoueur en TCP/IP avec un serveur, un client graphique et des intelligences artificielles capables d’interagir sur une même carte en temps réel.",
    },
    "ft-ssl-des": {
        parents: ["ft-ssl-md5"],
        position: { x: 366, y: -89 },
        linkID: "163456",
        desc: "Recodez une partie du programme OpenSSL, notamment les encodages BASE64, DES-ECB et DES-CBC.",
    },
    "expert-system": {
        parents: ["n-puzzle"],
        position: { x: -215, y: 652 },
        linkID: "149318",
        lang: "rust",
        desc: "Créez un système expert en calcul des propositions, capable de raisonner sur un ensemble de règles et de faits pour en déduire de nouveaux.",
    },
    "cloud-1": {
        parents: ["tronc-commun"],
        position: { x: 59, y: 223 },
        linkID: "202197",
        desc: "Introduction à la gestion et au déploiement de serveurs dans le cloud.",
    },
    "hypertube": {
        parents: ["matcha"],
        position: { x: -316, y: 706 },
        linkID: "188588",
        desc: "Réalisez un site de streaming de vidéos téléchargées via BitTorrent en utilisant un framework MVC de votre choix.",
    },
    "in-the-shadows": {
        parents: ["piscine-unity"],
        position: { x: 307, y: 1103 },
        linkID: "60851",
        desc: "Développez un jeu complet alliant algorithmie et créativité.",
    },
    "swifty-companion": {
        parents: ["piscine-mobile"],
        position: { x: -74, y: 997 },
        linkID: "127182",
        lang: "flutter",
        desc: "Développer une application mobile qui récupère et affiche les informations des utilisateurs de l’API 42 avec une interface interactive.",
    },
    "kfs-1": {
        parents: ["little-penguin-1"],
        position: { x: 1066, y: 638 },
        linkID: "105932",
        desc: "Plongez dans la programmation noyau et créez votre propre kernel from scratch.",
    },
    "malloc": {
        parents: ["tronc-commun"],
        position: { x: 1010, y: 688 },
        lang: "c",
        logoColor: "#2a6bcc",
        linkID: "188766",
        desc: "Découvrez les rouages d'une gestion optimale de la mémoire en recodant malloc, free et realloc.",
    },
    "42sh": {
        parents: ["ft-script"],
        position: { x: 798, y: 115 },
        linkID: "188062",
        desc: "Créez un shell complet et abouti depuis zéro, en couvrant une large palette de fonctionnalités UNIX/POSIX (pipes, redirections, job control, etc.).",
    },
    "matrix": {
        parents: ["tronc-commun"],
        position: { x: -35, y: 561 },
        linkID: "187935",
        lang: "rust",
        desc: "Vous avez sans doute déjà entendu parler des vecteurs et des espaces vectoriels. Il est maintenant temps de les formaliser à l'aide de l'algèbre linéaire et d'apprendre comment fonctionnent les matrices et les transformations linéaires."
    },
    "lem-in": {
        parents: ["n-puzzle"],
        position: { x: -170, y: 512 },
        linkID: "67419",
        desc: "Déplacez une colonie de fourmis d'un point à un autre le plus rapidement possible en implémentant des algorithmes de parcours de graphe.",
    },
    "dr-quine": {
        parents: ["woody-woodpacker"],
        position: { x: 441, y: 79 },
        linkID: "177267",
        desc: "Explorez les problématiques d'auto-réplication et affrontez le théorème de récursion de Kleene dans ce petit projet d'algorithmie.",
    },
    "xv": {
        parents: ["in-the-shadows"],
        position: { x: 282, y: 1185 },
        linkID: "60856",
        desc: "Développez une interface graphique sous Unity pour optimiser des processus industriels, en partenariat avec l'entreprise Daher.",
    },
    "matcha": {
        parents: ["piscine-web"],
        position: { x: -214, y: 726 },
        linkID: "196067",
        lang: "react",
        logoColor: "#61dbfb",
        desc: "Créez un site de rencontres avec un micro-framework de votre choix, en mettant les interactions entre utilisateurs au cœur du projet.",
        langPdf: "fr",
    },
    "camagru": {
        parents: ["piscine-web"],
        position: { x: -164, y: 947 },
        linkID: "196064",
        lang: "php",
        logoColor: "#474A8A",
        desc: "Réalisez en PHP pur (sans framework) un mini site Instagram-like permettant aux utilisateurs de créer et partager des photo-montages.",
    },
    "dslr": {
        parents: ["piscine-data-science"],
        position: { x: -103, y: 295 },
        linkID: "169568",
        lang: "python",
        logoColor: "marine",
        desc: "Initiez-vous à la Data Science en recréant le Choixpeau Magique de Poudlard, un sujet proposé par l'association 42AI."
    },
    "multilayer-perceptron": {
        parents: ["dslr"],
        position: { x: -167, y: 195 },
        linkID: "172235",
        desc: "Introduction aux réseaux de neurones artificiels via l'implémentation d'un multilayer perceptron, proposée par 42AI.",
    },
    "doom-nukem": {
        parents: ["scop"],
        position: { x: 478, y: 1060 },
        linkID: "164309",
        lang: "c",
        logoColor: "#2a6bcc",
        desc: "Suite avancée du Wolf3D mêlant Doom et Duke Nukem 3D : poussez le Raycasting à l'extrême tout en concevant un vrai jeu jouable.",
    },
    "corewar": {
        parents: ["abstract-vm"],
        position: { x: 1115, y: 898 },
        linkID: "60869",
        desc: "Créez une arène virtuelle où s'affrontent des programmes en langage assembleur, en concevant votre propre VM et compilateur bytecode."
    },
    "ft-linear-regression": {
        parents: ["dslr"],
        position: { x: -83, y: 161 },
        linkID: "191256",
        desc: "Premiers pas en IA et Machine Learning : créez un programme qui prédit le prix d'une voiture via une régression linéaire entraînée par descente de gradient."
    },
    "music-room": {
        parents: ["piscine-web"],
        position: { x: -324, y: 862 },
        linkID: "191956",
        lang: "go",
        logoColor: "teal",
        desc: "En partenariat avec Deezer, créez en groupe une application mobile de playlist collaborative intégrant les SDK et API de Deezer."
    },
    "libasm": {
        lang: "assemblyscript",
        logoColor: "red",
        parents: ["tronc-commun"],
        position: { x: 874, y: 440 },
        linkID: "176883",
        desc: "Codez une mini-libc en assembleur en recodant des fonctions basiques de la libc, indispensable pour aborder les projets de sécurité.",
    },
    "scop": {
        parents: ["tronc-commun"],
        position: { x: 554, y: 1085 },
        linkID: "164248",
        lang: "opengl",
        logoColor: "teal",
        desc: "Premiers pas dans la 3D sur GPU avec OpenGL à travers un projet ludique couvrant les concepts principaux.",
    },
    "war": {
        parents: ["pestilence"],
        position: { x: 582, y: -107 },
        linkID: "184571",
        desc: "Troisième projet virus : reprenez Pestilence et faites en sorte que votre binaire modifie sa propre signature au runtime."
    },
    "snow-crash": {
        parents: ["piscine-cybersecurite"],
        position: { x: 872, y: 211 },
        linkID: "158896",
        desc: "Introduction à la sécurité informatique orientée développeur : trouvez des failles dans des programmes via reverse engineering et manipulation de plusieurs langages."
    },
    "taskmaster": {
        parents: ["tronc-commun"],
        position: { x: 892, y: 728 },
        linkID: "172857",
        desc: "Réalisez un programme de job control similaire à supervisor, dans le langage de votre choix."
    },
    "rubik": {
        parents: ["n-puzzle"],
        position: { x: -143, y: 685 },
        linkID: "169923",
        desc: "Réalisez un résolveur de Rubik's Cube dans le langage de votre choix — un projet d'algorithmie non trivial.",
    },
    "shaderpixel": {
        parents: ["humangl"],
        position: { x: 555, y: 1305 },
        linkID: "188671",
        desc: "Travaillez directement dans l'espace de la carte graphique en programmant des shaders pour créer des objets et effets visuels avancés."
    },
    "famine": {
        parents: ["woody-woodpacker"],
        position: { x: 505, y: -9 },
        linkID: "79560",
        desc: "Créez votre premier virus en C à but pédagogique, en manipulant des fichiers binaires pour infecter d'autres exécutables."
    },
    "ft-script": {
        parents: ["tronc-commun"],
        position: { x: 737, y: 170 },
        linkID: "188784",
        desc: "Recodez la commande script pour comprendre les interactions entre input utilisateur, TTY et pseudo-terminaux."
    },
    "strace": {
        parents: ["lem-ipc"],
        position: { x: 1207, y: 796 },
        linkID: "65612",
        desc: "Recodez strace, un outil listant tous les appels système effectués par un programme en cours d'exécution — premier pas vers un mini-GDB."
    },
    "swifty-proteins": {
        parents: ["swifty-companion"],
        position: { x: -135, y: 1063 },
        linkID: "199713",
        lang: "flutter",
        desc: "Initiez-vous à SceneKit en créant une application iOS qui modélise des ligands en 3D, avec Touch ID, gestures et recherche."
    },
    "woody-woodpacker": {
        parents: ["tronc-commun"],
        position: { x: 503, y: 78 },
        linkID: "79590",
        desc: "Modifiez les headers d'un fichier ELF64 pour y injecter du code et obfusquer une partie d'un binaire non strippé."
    },
    "ft-traceroute": {
        parents: ["ft-ping"],
        position: { x: 266, y: 62 },
        linkID: "106626",
        desc: "Recodez la commande traceroute pour suivre le chemin qu'un paquet IP emprunte entre deux machines sur un réseau TCP/IP."
    },
    "ft-ping": {
        parents: ["tronc-commun"],
        position: { x: 364, y: 64 },
        linkID: "164068",
        lang: "c",
        logoColor: "#2a6bcc",
        desc: "Recodez la commande ping pour comprendre la communication TCP/IP entre deux machines dans un réseau."
    },
    "ft-nmap": {
        parents: ["ft-traceroute"],
        position: { x: 266, y: -143 },
        linkID: "141053",
        desc: "Recodez nmap pour approfondir vos connaissances en réseau TCP/IP et explorer l'usage avancé des threads."
    },
    "kfs-4": {
        parents: ["kfs-3"],
        position: { x: 1198, y: 550 },
        linkID: "105936",
        desc: "Créez une Interrupt Description Table et gérez les interruptions au sein de votre kernel."
    },
    "bomberman": {
        parents: ["humangl"],
        position: { x: 643, y: 1206 },
        linkID: "119169",
        desc: "Recodez Bomberman en C++ avec OpenGL pour réaliser votre premier gros projet C++ de facture professionnelle."
    },
    "nibbler": {
        parents: ["lem-ipc"],
        position: { x: 1231, y: 725 },
        linkID: "60850",
        desc: "Recodez le jeu Snake en C++ avec plusieurs interfaces graphiques différentes."
    },
    "abstract-vm": {
        parents: ["libftpp"],
        position: { x: 1045, y: 854 },
        linkID: "204684",
        desc: "Réalisez une machine virtuelle capable d'exécuter du pseudo-ASM en utilisant une stack pour effectuer des opérations arithmétiques."
    },
    "abstract-data": {
        parents: ["libftpp"],
        position: { x: 1037, y: 930 },
        linkID: "147612",
        desc: "Réimplémentez les différents containers du C++ pour bien comprendre leurs usages et spécificités."
    },
    "avaj-launcher": {
        parents: ["tronc-commun"],
        position: { x: 840, y: 864 },
        lang: "java",
        linkID: "164042",
        desc: "Premier projet Java du cursus : implémentez un programme simple à partir d'un diagramme de classes UML fourni.",
    },
    "42run": {
        parents: ["scop"],
        position: { x: 497, y: 1159 },
        linkID: "172830",
        desc: "Recréez Temple Run en C++ avec OpenGL dans ce projet intermédiaire de programmation graphique.",
    },
    "krpsim": {
        parents: ["n-puzzle"],
        position: { x: -257, y: 585 },
        linkID: "60875",
        desc: "Optimisez le rendement d'un graphe de processus avec contraintes de ressources en explorant et choisissant les algorithmes les plus adaptés.",
    },
    "total-perspective-vortex": {
        parents: ["dslr"],
        position: { x: -218, y: 239 },
        linkID: "83234",
        desc: "Traitez des données en grandes dimensions avec Python et créez une interface homme-machine pilotée par les ondes cérébrales.",
    },
    "kfs-5": {
        parents: ["kfs-4"],
        position: { x: 1243, y: 647 },
        linkID: "177268",
        desc: "Implémentez la gestion des processus dans votre kernel, notamment l'interprétation de la fork bomb :(){ :|:& }."
    },
    "userspace-digressions": {
        parents: ["little-penguin-1"],
        position: { x: 958, y: 494 },
        linkID: "105944",
        desc: "Créez votre propre binaire init en espace utilisateur.",
    },
    "computorv2": {
        parents: ["computorv1"],
        position: { x: -187, y: 438 },
        linkID: "188792",
        desc: "Étendez votre résolveur d'équations en une calculatrice complète gérant les matrices, nombres imaginaires et résolution de fonctions."
    },
    "ft-select": {
        parents: ["ft-ls"],
        position: { x: 1143, y: 824 },
        linkID: "188785",
        lang: "c",
        logoColor: "#2a6bcc",
        desc: "Initiez-vous à la manipulation du terminal via les termcaps en créant une interface utilisateur pour un programme lancé en terminal."
    },
    "computorv1": {
        parents: ["tronc-commun"],
        position: { x: -110, y: 439 },
        linkID: "175880",
        lang: "go",
        logoColor: "teal",
        desc: "Recodez un résolveur d'équations mathématiques élémentaires dans le langage de votre choix, socle pour de nombreux autres projets."
    },
    "ft-ssl-rsa": {
        parents: ["ft-ssl-des"],
        position: { x: 366, y: -142 },
        linkID:"88500",
        desc: "Codez votre propre générateur de nombres premiers aléatoires pour générer des clés RSA privées.",
    },
    "ft-vox": {
        parents: ["scop"],
        position: { x: 641, y: 1098 },
        linkID: "176882",
        lang: "c++",
        logoColor: "marine",
        desc: "Créez un moteur de voxel inspiré de Minecraft avec génération de monde aléatoire.",
    },
    "override": {
        parents: ["rainfall"],
        position: { x: 1048, y: 137 },
        linkID: "143036",
        desc: "Recherchez des failles dans des binaires protégés et reconstruisez-les — un challenge de sécurité plus corsé que Rainfall.",
    },
    "boot2root": {
        parents: ["snow-crash"],
        position: { x: 890, y: 126 },
        linkID: "75162",
        desc: "Challenge sécurité en groupe : trouvez tous les moyens possibles de passer root sur l'ISO fournie.",
    },
    "death": {
        parents: ["war"],
        position: { x: 499, y: -106 },
        linkID: "60180",
        desc: "Projet virus final : créez un véritable code métamorphique en combinant les acquis de Famine, Pestilence et War.",
    },
    "pestilence": {
        parents: ["famine"],
        position: { x: 581, y: -10 },
        linkID: "60802",
        desc: "Second projet virus : reprenez Famine et ajoutez une méthode d'obfuscation de votre code.",
    },
    "kfs-9": {
        parents: ["kfs-8"],
        position: { x: 1411, y: 640 },
        linkID: "105941",
        desc: "Créez un parser et loader ELF pour votre kernel.",
    },
    "kfs-x": {
        parents: ["kfs-9"],
        position: { x: 1455, y: 560 },
        linkID: "105942",
        desc: "Projet kernel final : créez un environnement Linux complet, éventuellement avec votre propre nom de kernel.",
    },
    "kfs-8": {
        parents: ["kfs-7"],
        position: { x: 1371, y: 532 },
        linkID: "105940",
        desc: "Construisez une interface de modules pour votre kernel.",
    },
    "kfs-7": {
        parents: ["kfs-6"],
        position: { x: 1325, y: 643 },
        linkID: "193430",
        desc: "Ajoutez vos propres syscalls, comptes utilisateurs, sockets et une hiérarchie Unix à votre kernel.",
    },
    "kfs-6": {
        parents: ["kfs-5"],
        position: { x: 1292, y: 537 },
        linkID: "105938",
        desc: "Continuez le développement de votre kernel en y intégrant votre propre système de fichiers.",
    },
    "fix-me": {
        parents: ["swingy"],
        position: { x: 983, y: 974 },
        linkID: "163437",
        desc: "Projet Java final : simulez des échanges boursiers avec des algorithmes de trading, du networking et des sockets.",
    },
    "swingy": {
        parents: ["avaj-launcher"],
        position: { x: 910, y: 922 },
        linkID: "147108",
        lang: "java",
        desc: "Créez un jeu RPG en Java avec le framework SWING pour apprendre le développement d'applications GUI.",
    },
    "gomoku": {
        parents: ["n-puzzle"],
        position: { x: -231, y: 527 },
        linkID: "162538",
        desc: "Créez un jeu de Gomoku avec une IA capable de battre un humain, en implémentant un algorithme min-max et des heuristiques adaptées."
    },
    "n-puzzle": {
        parents: ["tronc-commun"],
        position: { x: -127, y: 604 },
        lang: "c++",
        logoColor: "marine",
        linkID: "163452",
        desc: "Réalisez un programme capable de résoudre des Taquins de tailles variées de façon aussi optimale que possible.",
    },
    "mod1": {
        parents: ["tronc-commun"],
        position: { x: 688, y: 986 },
        lang: "c++",
        logoColor: "marine",
        linkID: "60868",
        desc: "Simulez et représentez en 3D un écoulement d'eau sur une surface — vague, tsunami ou simple pluie."
    },
    "kfs-3": {
        parents: ["kfs-2"],
        position: { x: 1162, y: 646 },
        linkID: "116842",
        desc: "Troisième projet kernel : implémentez la gestion de la mémoire dans votre kernel."
    },
    "filesystem": {
        parents: ["drivers-and-interrupts","process-and-memory"],
        position: { x: 1077, y: 436 },
        linkID: "187172",
        desc: "Créez votre propre système de fichiers pour votre kernel Linux."
    },
    "drivers-and-interrupts": {
        parents: ["little-penguin-1"],
        position: { x: 1025, y: 488 },
        linkID: "105945",
        desc: "Apprenez à connecter un driver (clavier) à votre kernel Linux."
    },
    "process-and-memory": {
        parents: ["little-penguin-1"],
        position: { x: 1116, y: 496 },
        linkID: "187171",
        desc: "Introduction aux syscalls et à la gestion de la mémoire au sein du kernel Linux."
    },
    "little-penguin-1": {
        parents: ["ft-linux"],
        position: { x: 1029, y: 570 },
        linkID: "164526",
        desc: "Série de challenges inspirés du challenge Eudyptula pour aborder de nombreux points du développement kernel."
    },
    "rainfall": {
        parents: ["snow-crash"],
        position: { x: 967, y: 198 },
        linkID: "66683",
        desc: "ISO de challenge de reverse engineering plus complexe que Snow Crash : reconstruisez et analysez des binaires pour en trouver les failles."
    },
    "matt-daemon": {
        parents: ["taskmaster"],
        position: { x: 986, y: 769 },
        linkID: "198307",
        desc: "Créez un daemon-serveur Unix qui écoute sur un port donné et interprète une liste de commandes."
    },
    "ft-linux": {
        parents: ["tronc-commun"],
        position: { x: 910, y: 573 },
        linkID: "197599",
        desc: "Construisez votre propre distribution Linux (LFS) — premier projet de la branche Kernel.",
    },
    "particle-system": {
        parents: ["humangl"],
        position: { x: 469, y: 1285 },
        linkID: "188670",
        desc: "Introduction au GPU via OpenGL et OpenCL : créez un système de particules performant grâce à la parallélisation massive des calculs.",
    },
    "ft-turing": {
        parents: ["piscine-ocaml"],
        position: { x: 864, y: 995 },
        linkID: "163926",
        lang: "ocaml",
        logoColor: "orange",
        desc: "Découvrez le modèle de Turing, fondement du paradigme impératif, en l'implémentant en OCaml.",
    },
    "humangl": {
        parents: ["scop"],
        position: { x: 561, y: 1198 },
        lang: "c++",
        logoColor: "marine",
        linkID: "163924",
        desc: "Introduction à la modélisation hiérarchique avec OpenGL : liez et animez les parties d'un humanoïde via des matrices."
    },
    "ft-hangouts": {
        parents: ["piscine-mobile"],
        position: { x: 70, y: 1041 },
        linkID: "158895",
        lang: "kotlin",
        desc: "Créez une application Android de gestion de contacts en Java pour comprendre le cycle de vie d'une app et l'utilisation du SDK Android."
    },
    "lem-ipc": {
        parents: ["malloc"],
        position: { x: 1138, y: 735 },
        linkID: "176959",
        desc: "Approfondissez la communication inter-processus en explorant les mécanismes IPC, complémentaires à TCP/IP."
    },
    "kfs-2": {
        parents: ["kfs-1"],
        position: { x: 1124, y: 560 },
        linkID: "105933",
        desc: "Plongez dans la programmation noyau et créez votre propre kernel from scratch."
    },
    "h42n42": {
        parents: ["ft-turing"],
        position: { x: 955, y: 1039 },
        linkID: "196674",
        lang: "ocaml",
        logoColor: "orange",
        desc: "Introduction au framework Ocsigen pour créer des applications web riches en OCaml, illustrée par un simulateur de bestioles fuyant un virus.",
    },
    "open-project": {
        parents: ["tronc-commun"],
        position: { x: 211, y: 998 },
        lang: "42",
        linkID: "128727",
        lang: "react",
        logoColor: "#61dbfb",
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
        logoColor: "marine",
        linkID: "204454",
        langPdf: "fr",
        modules: [
            { id: "django-0", label: "Initiation", parents: [], linkID: "150444" },
            { id: "django-1", label: "Starting", parents: ["django-0"], linkID: "205300", langPdf: "en" },
            { id: "django-2", label: "Oob", parents: ["django-1"], linkID: "149888" },
            { id: "django-3", label: "Lib", parents: ["django-2"], linkID: "188527" },
            { id: "django-4", label: "Base Django", parents: ["django-3"], linkID: "171958" },
            { id: "django-5", label: "SQL", parents: ["django-4"], linkID: "96069" },
            { id: "django-6", label: "Sessions", parents: ["django-5"], linkID: "96071" },
            { id: "django-7", label: "Advanced", parents: ["django-6"], linkID: "111323" },
            { id: "django-8", label: "Final", parents: ["django-7"], linkID: "64998" },
        ]
    },
    "piscine-ror": {
        lang: "ruby",
        logoColor: "red",
        linkID: "95536",
        langPdf: "fr",
        modules: [
            { id: "ruby-0", label: "Initiation", parents: [], linkID: "59696" },
            { id: "ruby-1", label: "Starting", parents: ["ruby-0"], linkID: "87964" },
            { id: "ruby-2", label: "Oob", parents: ["ruby-1"], linkID: "204967", langPdf: "en" },
            { id: "ruby-3", label: "Gems", parents: ["ruby-2"], linkID: "89151" },
            { id: "ruby-4", label: "Base Rails", parents: ["ruby-3"], linkID: "166788" },
            { id: "ruby-5", label: "SQL", parents: ["ruby-4"], linkID: "96837", langPdf: "en" },
            { id: "ruby-6", label: "Sessions", parents: ["ruby-5"], linkID: "97709", langPdf: "en" },
            { id: "ruby-7", label: "Advanced", parents: ["ruby-6"], linkID: "97708" },
            { id: "ruby-8", label: "Final", parents: ["ruby-7"], linkID: "97983", langPdf: "en" },
        ],
    },
    "piscine-symfony": {
        linkID: "147157",
        lang: "php",
        logoColor: "#474A8A",
        langPdf: "fr",
        modules: [
            { id: "symfony-0", label: "Initiation", parents: [], linkID: "193441" },
            { id: "symfony-1", label: "Starting", parents: ["symfony-0"], linkID: "140681" },
            { id: "symfony-2", label: "Oob", parents: ["symfony-1"], linkID: "66668" },
            { id: "symfony-3", label: "Composer", parents: ["symfony-2"], linkID: "151068", langPdf: "en" },
            { id: "symfony-4", label: "Base Symfony", parents: ["symfony-3"], linkID: "124939", langPdf: "en" },
            { id: "symfony-5", label: "SQL", parents: ["symfony-4"], linkID: "124940", langPdf: "en" },
            { id: "symfony-6", label: "Sessions", parents: ["symfony-5"], linkID: "124941", langPdf: "en" },
            { id: "symfony-7", label: "Advanced", parents: ["symfony-6"], linkID: "124952", langPdf: "en" },
            { id: "symfony-8", label: "Final", parents: ["symfony-7"], linkID: "124952", langPdf: "en" },
        ],
    },
    "piscine-mobile": {
        parents: ["tronc-commun"],
        position: { x: 14, y: 952 },
        lang: "dart",
        logoColor: "darkturquoise",
        linkID: "95370",
        modules: [
            { id: "mobile-0", label: "Mobile Basics", parents: [], linkID: "143028" },
            { id: "mobile-1", label: "Structure and Logic", parents: ["mobile-0"], linkID: "143029" },
            { id: "mobile-2", label: "API and data", parents: ["mobile-1"], linkID: "143030" },
            { id: "mobile-3", label: "Design", parents: ["mobile-2"], linkID: "143031" },
            { id: "mobile-4", label: "Auth and dataBase", parents: ["mobile-3"], linkID: "143032" },
            { id: "mobile-5", label: "Manage data and display", parents: ["mobile-4"], linkID: "143034" },
        ],
    },
    "piscine-ocaml": {
        parents: ["tronc-commun"],
        position: { x: 730, y: 928 },
        linkID: "143947",
        lang: "ocaml",
        logoColor: "orange",
        modules : [
            { id: "ocaml-0", label: "Basic syntax and semantics", parents: [], linkID: "144426" },
            { id: "ocaml-1", label: "Recursion and higher-order functions", parents: ["ocaml-0"], linkID: "144419" },
            { id: "ocaml-2", label: "Pattern matching and data type", parents: ["ocaml-1"], linkID: "144531" },
            { id: "ocaml-3", label: "Ocaml's modules language", parents: ["ocaml-2"], linkID: "144421" },
            { id: "ocaml-4", label: "Imperative features", parents: ["ocaml-3"], linkID: "144424" },
            { id: "ocaml-5", label: "Functor", parents: ["ocaml-4"], linkID: "144533" },
            { id: "ocaml-6", label: "OOP 1", parents: ["ocaml-5"], linkID: "144423" },
            { id: "ocaml-7", label: "OOP 2", parents: ["ocaml-6"], linkID: "144535" },
            { id: "ocaml-8", label: "Monoids and Monads", parents: ["ocaml-7"], linkID: "176269" },
        ]
    },
    "piscine-unity": {
        parents: ["tronc-commun"],
        position: { x: 323, y: 1018 },
        lang: "unity",
        logoColor: "grey",
        linkID: "164067",
        modules : [
            { id: "unity-0", label: "The basics unity tools", parents: [], linkID: "164019" },
            { id: "unity-1", label: "3D physics, Tags, Layers and Scene", parents: ["unity-0"], linkID: "164020" },
            { id: "unity-2", label: "2D environment, tiles and sprites", parents: ["unity-1"], linkID: "164021" },
            { id: "unity-3", label: "Advanced inputs and 2D GUI", parents: ["unity-2"], linkID: "181153" },
            { id: "unity-4", label: "Animations and Sound", parents: ["unity-3"], linkID: "164023" },
            { id: "unity-5", label: "Singleton, playerPrefs and coroutines", parents: ["unity-4"], linkID: "164024" },
            { id: "unity-6", label: "Navmesh, light, sound and camera", parents: ["unity-5"], linkID: "164025" },
        ]
    },
    "piscine-cybersecurite": {
        parents: ["tronc-commun"],
        position: { x: 770, y: 274 },
        lang: "nextdns",
        linkID: "83768",
        modules: [
            { id: "cyber-0", label: "Arachnida", parents: [], linkID: "86432" },
            { id: "cyber-1", label: "ft_otp", parents: ["cyber-0"], linkID: "86433" },
            { id: "cyber-2", label: "ft_onion", parents: ["cyber-1"], linkID: "86434" },
            { id: "cyber-3", label: "Reverse me", parents: ["cyber-2"], linkID: "86435" },
            { id: "cyber-4", label: "Stockholm", parents: ["cyber-3"], linkID: "86436" },
            { id: "cyber-5", label: "Inquisitor", parents: ["cyber-4"], linkID: "141052" },
            { id: "cyber-6", label: "Vaccine", parents: ["cyber-5"], linkID: "86438" }
        ]
    },
    "piscine-objet": {
        parents: ["tronc-commun"],
        position: { x: 835, y: 796 },
        lang: "c++",
        logoColor: "marine",
        linkID: "143096",
        modules: [
            { id: "object-0", label: "Encapsulation", parents: [], linkID: "88947" },
            { id: "object-1", label: "Relationship", parents: ["object-0"], linkID: "109506" },
            { id: "object-2", label: "UML", parents: ["object-1"], linkID: "109505" },
            { id: "object-3", label: "SOLID", parents: ["object-2"], linkID: "104801" },
            { id: "object-4", label: "Design pattern", parents: ["object-3"], linkID: "101072" },
            { id: "object-5", label: "Pattern work", parents: ["object-4"], linkID: "204481" },
        ]
    },
    "piscine-data-science": {
        parents: ["tronc-commun"],
        position: { x: -32, y: 316 },
        lang: "python",
        logoColor: "marine",
        linkID: "95527",
        modules: [
            { id: "data-0", label: "Data Engineer", parents: [], linkID: "172236" },
            { id: "data-1", label: "Data Warehouse", parents: ["data-0"], linkID: "141738" },
            { id: "data-2", label: "Data Analyst", parents: ["data-1"], linkID: "117974" },
            { id: "data-3", label: "Data Scientist p.1", parents: ["data-2"], linkID: "130602" },
            { id: "data-4", label: "Data Scientist p.2", parents: ["data-3"], linkID: "86442" },
        ]
    },
    "ft-ality": {
        lang: "ocaml",
        logoColor: "orange",
        parents: ["ft-turing"],
        position: { x: 885, y: 1100 },
        linkID: "149158",
        desc: "Ce projet va vous initier aux problématiques liées à l'analyse syntaxique automatique, en étudiant les automates finis avec un jeu de combat."
    },
    "ft-minecraft": {
        parents: ["ft-vox"],
        position: { x: 733, y: 1187 },
        linkID: "164015",
        lang: "java",
        desc: "ft_minecraft est la suite de ft_vox, avec une approche plus avancée en matière de génération procédurale, de techniques de rendu et de mise en réseau.",
    },
    "libftpp": {
        parents: ["piscine-objet"],
        position: { x: 957, y: 841 },
        linkID: "157707",
        lang: "c++",
        logoColor: "marine",
        desc: "Ce sujet a pour objectif de vous initier aux concepts avancés du C++ à travers le développement d'outils et de systèmes complexes.",
    },
    "peace-break": {
        parents: ["swifty-proteins"],
        position: { x: -212, y: 1130 },
        linkID: "158877",
        desc: "Inspiré de Brick Breaker, ce projet est une introduction au développement mobile : concevez une interface, gérez des données utilisateur et implémentez les mécaniques de jeu.",
    },
    "ft-lex": {
        parents: ["tronc-commun"],
        position: { x: 852, y: 359 },
        linkID: "183541",
        lang: "C",
        logoColor: "#2a6bcc",
        desc: "Un projet sur l'analyse lexicale et les automates finis. Dans le cadre de ce projet, vous devrez mettre en œuvre un puissant moteur d'expressions régulières"
    },
    "ft-yacc": {
        parents: ["ft-lex"],
        position: { x: 967, y: 314 },
        linkID: "150709",
        desc: "Implémentez l'utilitaire POSIX yacc, un générateur de parsers, en explorant la théorie des automates, les langages formels et la hiérarchie de Chomsky.",
    },
    "cc1": {
        parents: ["ft-yacc","b"],
        position: { x: 1065, y: 334 },
        linkID: "149442",
        desc: "Ce projet consiste à créer un compilateur C",
    },
    "b": {
        parents: ["libasm"],
        position: { x: 963, y: 397 },
        linkID: "174908",
        desc: "La lettre qui précéde C",
    },
    "darkly": {
        parents: ["piscine-web"],
        position: { x: -320, y: 785 },
        linkID: "158872",
        desc: "Disséquez un site web vulnérable pour vous initier à la sécurité web et prendre conscience des failles liées aux erreurs de développement et de conception.",
    },
    "ftl-quantum": {
        parents: ["tronc-commun"],
        position: { x: -56, y: 396 },
        linkID: "204750",
        lang: "python",
        logoColor: "marine",
        desc: "Ce projet est une introduction à la programmation quantique. Il vous mettra au défi de créer différents programmes quantiques et de les exécuter sur un véritable ordinateur quantique.",
    },
    "unleashthebox": {
        parents: ["boot2root"],
        position: { x: 962, y: 79 },
        linkID: "206045",
        desc: "Un projet immersif consacré à la cybersécurité, dans le cadre duquel les participants apprennent à exploiter des systèmes et acquièrent les compétences indispensables pour évoluer dans le monde en constante évolution de la sécurité de l'information.",
    },
    "freddie-mercury": {
        parents: ["xv"],
        position: { x: 256, y: 1266 },
        linkID: "134608",
        desc: "Créez un escape game complet en VR avec au moins deux niveaux, en maîtrisant les contrôles VR, les interactions avec les objets et le game design.",
    },
    "ft-newton": {
        parents: ["humangl"],
        position: { x: 670, y: 1317 },
        linkID: "188672",
        desc: "Codez un moteur physique basique from scratch, illustré par un jeu inspiré d'Angry Birds, avec détection de collisions, corps rigides et gravité.",
    },
    "very-real-engine": {
        parents: ["ft-minecraft","ft-newton"],
        position: { x: 767, y: 1315 },
        linkID: "147905",
        desc: "Créer et mettre en œuvre une bibliothèque contenant tous les outils nécessaires, notamment un moteur graphique et un moteur physique."
    },
    "learn2slither": {
        parents: ["dslr"],
        position: { x: -139, y: 360 },
        linkID: "202349",
        desc: "Créer une intelligence artificielle utilisant le reinforcement learning pour entraîner un serpent à survivre et maximiser ses récompenses sur une grille de jeu.",
    },
    "leaffliction": {
        parents: ["dslr"],
        position: { x: -206, y: 306 },
        linkID: "177685",
        desc: "Un projet novateur en vision par ordinateur qui utilise l'analyse d'images de feuilles pour détecter les maladies."
    },
    "tokenizer": {
        parents: ["tronc-commun"],
        position: { x: -10, y: 674 },
        linkID: "144411",
        desc: "Créez et déployez votre propre token fongible sur une blockchain publique",
    },
    "tokenizeart": {
        parents: ["tokenizer"],
        position: { x: -74, y: 706 },
        linkID: "144427",
        desc: "Créez et mintez votre propre NFT sur une blockchain publique, en gérant son image via IPFS, son smart contract et ses métadonnées.",
    },
    "ft-kalman": {
        parents: ["matrix"],
        position: { x: -106, y: 542 },
        linkID: "127291",
        desc: "Implémentez un filtre de Kalman pour suivre les coordonnées d'un véhicule équipé de capteurs défectueux — une introduction au filtrage de signaux et aux opérations matricielles.",
        langPdf: "fr",
    },
    "ready-set-boole": {
        parents: ["tronc-commun"],
        position: { x: -40, y: 495 },
        linkID: "179422",
        lang: "rust",
        desc: "Découvrez les bases des mathématiques appliquées à l'informatique grâce à l'algèbre booléenne et à la théorie des ensembles !",
    },
    "tinky-winkey": {
        parents: ["tronc-commun"],
        position: { x: 636, y: 140 },
        linkID: "127289",
        desc: "Introduction au système d'exploitation Windows à travers la création d'un service exécutant un keylogger."
    },
    "ft-malcolm": {
        parents: ["tronc-commun"],
        position: { x: 230, y: 134 },
        linkID: "163439",
        desc: "Introduction à la sécurité des réseaux : l'attaque de type 'Man-in-the-middle'",
    },
    "ft-ssl-md5": {
        parents: ["ft-ping"],
        position: { x: 366, y: -33 },
        linkID: "163454",
        desc: "Vous allez réécrire une partie du programme OpenSSL, plus précisément l'algorithme de hachage MD5.",
    },
    "bgp-at-doors-of-autonomous-systems-is-simple": {
        parents: ["tronc-commun"],
        position: { x: 103, y: 117 },
        linkID: "158468",
        desc: "Ce projet a pour but d'approfondir vos connaissances apprises par NetPractice. Vous allez devoir simuler plusieurs réseaux dans GNS3.",
    },
    "ft-shield": {
        parents: ["woody-woodpacker"],
        position: { x: 588, y: 81 },
        linkID: "193442",
        desc: "Utilisez vos skills sur la création de daemon pour créer votre premier trojan basique.",
    },
    "nm": {
        parents: ["malloc"],
        position: { x: 1105, y: 682 },
        linkID: "202344",
        desc: "Réécrivez les outils nm et otool pour décortiquer le format des exécutables et comprendre comment le kernel lance les binaires — une ouverture essentielle sur la culture UNIX système.",
    },
    "inception-of-things": {
        parents: ["cloud-1"],
        position: { x: 7, y: 171 },
        linkID: "188852",
        desc: "Découvrez Kubernetes côté développeur en déployant des clusters dans Docker et en mettant en place une pipeline d'intégration continue pour vos applications.",
    },
};

export const rushList = [
    { id: "rush-00", label: "Libunit", linkID: "1234" },
    { id: "rush-01", label: "Hotrace" },
    { id: "rush-02", label: "AlCu" },
    { id: "rush-03", label: "Wong kar Wai" },
    { id: "rush-04", label: "yasl" },
    { id: "rush-05", label: "wordle" },
    { id: "rush-06", label: "Connect4" },
    { id: "rush-07", label: "Retro-MFA" },
    { id: "rush-08", label: "ft_shmup" },
];

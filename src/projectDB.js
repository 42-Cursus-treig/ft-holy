export const generateId = (name) => name.toLowerCase().replace(/\s+/g, '-').replace(/_/g, '-');

export const projectDefinitions = {
    "tronc-commun": {
        size: 800,
        locked: true,
        position: { x: 38, y: 178 },
    },
    "guimp": {
        parents: ["mod1"],
        position: { x: 743, y: 1068 }
    },
    "rt": {
        parents: ["tronc-commun"],
        position: { x: 413, y: 1110 }
    },
    "ft-ls": {
        parents: ["malloc"],
        position: { x: 1076, y: 770 }
    },
    "red-tetris": {
        parents: ["piscine-web"],
        position: { x: -273, y: 925 }
    },
    "zappy": {
        parents: ["bomberman"],
        position: { x: 704, y: 1249 }
    },
    "ft-ssl-des": {
        parents: ["ft-ssl-md5"],
        position: { x: 366, y: -89 }
    },
    "expert-system": {
        parents: ["n-puzzle"],
        position: { x: -208, y: 647 }
    },
    "cloud-1": {
        parents: ["tronc-commun"],
        position: { x: 48, y: 228 }
    },
    "hypertube": {
        parents: ["matcha"],
        position: { x: -313, y: 695 }
    },
    "in-the-shadows": {
        parents: ["piscine-unity"],
        position: { x: 307, y: 1103 }
    },
    "swifty-companion": {
        parents: ["piscine-mobile"],
        position: { x: -74, y: 997 }
    },
    "kfs-1": {
        parents: ["little-penguin-1"],
        position: { x: 1066, y: 638 }
    },
    "malloc": {
        parents: ["tronc-commun"],
        position: { x: 1010, y: 688 }
    },
    "42sh": {
        parents: ["ft-script"],
        position: { x: 798, y: 115 }
    },
    "matrix": {
        parents: ["tronc-commun"],
        position: { x: -30, y: 548 }
    },
    "lem-in": {
        parents: ["n-puzzle"],
        position: { x: -172, y: 525 }
    },
    "dr-quine": {
        parents: ["woody-woodpacker"],
        position: { x: 441, y: 79 }
    },
    "xv": {
        parents: ["in-the-shadows"],
        position: { x: 282, y: 1185 }
    },
    "matcha": {
        parents: ["piscine-web"],
        position: { x: -214, y: 717 }
    },
    "camagru": {
        parents: ["piscine-web"],
        position: { x: -164, y: 947 }
    },
    "dslr": {
        parents: ["piscine-data-science"],
        position: { x: -103, y: 295 }
    },
    "multilayer-perceptron": {
        parents: ["dslr"],
        position: { x: -167, y: 195 }
    },
    "doom-nukem": {
        parents: ["scop"],
        position: { x: 478, y: 1060 }
    },
    "corewar": {
        parents: ["abstract-vm"],
        position: { x: 1119, y: 875 }
    },
    "ft-linear-regression": {
        parents: ["dslr"],
        position: { x: -100, y: 201 }
    },
    "music-room": {
        parents: ["piscine-web"],
        position: { x: -324, y: 862 }
    },
    "libasm": {
        lang: "assemblyscript",
        logoColor: "red",
        parents: ["tronc-commun"],
        position: { x: 874, y: 440 }
    },
    "scop": {
        lang: "opengl",
        logoColor: "teal",
        parents: ["tronc-commun"],
        position: { x: 554, y: 1085 }
    },
    "war": {
        parents: ["pestilence"],
        position: { x: 582, y: -107 }
    },
    "snow-crash": {
        parents: ["piscine-cybersecurite"],
        position: { x: 862, y: 221 }
    },
    "taskmaster": {
        parents: ["tronc-commun"],
        position: { x: 892, y: 728 }
    },
    "rubik": {
        parents: ["n-puzzle"],
        position: { x: -145, y: 674 }
    },
    "shaderpixel": {
        parents: ["humangl"],
        position: { x: 555, y: 1305 }
    },
    "famine": {
        parents: ["woody-woodpacker"],
        position: { x: 505, y: -9 }
    },
    "ft-script": {
        parents: ["tronc-commun"],
        position: { x: 737, y: 170 }
    },
    "strace": {
        parents: ["lem-ipc"],
        position: { x: 1201, y: 812 }
    },
    "swifty-proteins": {
        parents: ["swifty-companion"],
        position: { x: -135, y: 1063 }
    },
    "woody-woodpacker": {
        parents: ["tronc-commun"],
        position: { x: 503, y: 78 }
    },
    "ft-traceroute": {
        parents: ["ft-ping"],
        position: { x: 266, y: 62 }
    },
    "ft-ping": {
        parents: ["tronc-commun"],
        position: { x: 364, y: 64 }
    },
    "ft-nmap": {
        parents: ["ft-traceroute"],
        position: { x: 266, y: -143 }
    },
    "kfs-4": {
        parents: ["kfs-3"],
        position: { x: 1198, y: 550 }
    },
    "bomberman": {
        parents: ["humangl"],
        position: { x: 643, y: 1206 }
    },
    "nibbler": {
        parents: ["lem-ipc"],
        position: { x: 1219, y: 733 }
    },
    "abstract-vm": {
        parents: ["libftpp"],
        position: { x: 1045, y: 854 }
    },
    "abstract-data": {
        parents: ["libftpp"],
        position: { x: 1037, y: 930 }
    },
    "avaj-launcher": {
        parents: ["tronc-commun"],
        position: { x: 840, y: 864 }
    },
    "42run": {
        parents: ["scop"],
        position: { x: 497, y: 1159 }
    },
    "krpsim": {
        parents: ["n-puzzle"],
        position: { x: -250, y: 599 }
    },
    "total-perspective-vortex": {
        parents: ["dslr"],
        position: { x: -215, y: 245 }
    },
    "kfs-5": {
        parents: ["kfs-4"],
        position: { x: 1243, y: 647 }
    },
    "userspace-digressions": {
        parents: ["little-penguin-1"],
        position: { x: 958, y: 494 }
    },
    "computorv2": {
        parents: ["computorv1"],
        position: { x: -183, y: 425 }
    },
    "ft-select": {
        parents: ["ft-ls"],
        position: { x: 1135, y: 798 }
    },
    "computorv1": {
        parents: ["tronc-commun"],
        position: { x: -110, y: 439 }
    },
    "ft-ssl-rsa": {
        parents: ["ft-ssl-des"],
        position: { x: 366, y: -142 }
    },
    "ft-vox": {
        parents: ["scop"],
        position: { x: 641, y: 1098 },
        lang: "c++",
        logoColor: "marine",
    },
    "override": {
        parents: ["rainfall"],
        position: { x: 1048, y: 137 }
    },
    "boot2root": {
        parents: ["snow-crash"],
        position: { x: 890, y: 126 }
    },
    "death": {
        parents: ["war"],
        position: { x: 499, y: -106 }
    },
    "pestilence": {
        parents: ["famine"],
        position: { x: 581, y: -10 }
    },
    "kfs-9": {
        parents: ["kfs-8"],
        position: { x: 1411, y: 640 }
    },
    "kfs-x": {
        parents: ["kfs-9"],
        position: { x: 1455, y: 560 }
    },
    "kfs-8": {
        parents: ["kfs-7"],
        position: { x: 1371, y: 532 }
    },
    "kfs-7": {
        parents: ["kfs-6"],
        position: { x: 1325, y: 643 }
    },
    "kfs-6": {
        parents: ["kfs-5"],
        position: { x: 1292, y: 537 }
    },
    "fix-me": {
        parents: ["swingy"],
        position: { x: 969, y: 956 }
    },
    "swingy": {
        parents: ["avaj-launcher"],
        position: { x: 894, y: 906 }
    },
    "gomoku": {
        parents: ["n-puzzle"],
        position: { x: -235, y: 540 }
    },
    "n-puzzle": {
        parents: ["tronc-commun"],
        position: { x: -127, y: 604 },
        lang: "c++",
        logoColor: "marine",
    },
    "mod1": {
        parents: ["tronc-commun"],
        position: { x: 688, y: 986 },
        lang: "c++",
        logoColor: "marine",
    },
    "kfs-3": {
        parents: ["kfs-2"],
        position: { x: 1162, y: 646 }
    },
    "filesystem": {
        parents: ["drivers-and-interrupts","process-and-memory"],
        position: { x: 1077, y: 436 }
    },
    "drivers-and-interrupts": {
        parents: ["little-penguin-1"],
        position: { x: 1025, y: 488 }
    },
    "process-and-memory": {
        parents: ["little-penguin-1"],
        position: { x: 1116, y: 496 }
    },
    "little-penguin-1": {
        parents: ["ft-linux"],
        position: { x: 1029, y: 570 }
    },
    "rainfall": {
        parents: ["snow-crash"],
        position: { x: 967, y: 198 }
    },
    "matt-daemon": {
        parents: ["taskmaster"],
        position: { x: 986, y: 769 }
    },
    "ft-linux": {
        parents: ["tronc-commun"],
        position: { x: 910, y: 573 }
    },
    "particle-system": {
        parents: ["humangl"],
        position: { x: 469, y: 1285 }
    },
    "ft-turing": {
        lang: "ocaml",
        logoColor: "orange",
        parents: ["piscine-ocaml"],
        position: { x: 864, y: 995 }
    },
    "humangl": {
        parents: ["scop"],
        position: { x: 561, y: 1198 }
    },
    "ft-hangouts": {
        parents: ["piscine-mobile"],
        position: { x: 52, y: 985 }
    },
    "lem-ipc": {
        parents: ["malloc"],
        position: { x: 1138, y: 735 }
    },
    "kfs-2": {
        parents: ["kfs-1"],
        position: { x: 1124, y: 560 }
    },
    "h42n42": {
        parents: ["ft-turing"],
        position: { x: 955, y: 1039 }
    },
    "open-project": {
        parents: ["tronc-commun"],
        position: { x: 211, y: 998 },
        lang: "react",
        logoColor: "cornflowerblue"
    },
    "piscine-web": {
        subProjects: ["Piscine Django","Piscine RoR","Piscine Symfony"],
        parents: ["tronc-commun"],
        position: { x: -98, y: 780 },
    },
    "piscine-mobile": {
        parents: ["tronc-commun"],
        position: { x: -3, y: 911 },
        lang: "dart",
        logoColor: "darkturquoise",
    },
    "piscine-ocaml": {
        lang: "ocaml",
        logoColor: "orange",
        parents: ["tronc-commun"],
        position: { x: 794, y: 925 }
    },
    "piscine-unity": {
        parents: ["tronc-commun"],
        position: { x: 323, y: 1018 },
        lang: "unity",
        logoColor: "grey",
    },
    "piscine-cybersecurite": {
        parents: ["tronc-commun"],
        position: { x: 790, y: 258 },
        lang: "nextdns",
    },
    "piscine-objet": {
        parents: ["tronc-commun"],
        position: { x: 888, y: 802 },
        lang: "c++",
        logoColor: "marine",
    },
    "piscine-data-science": {
        parents: ["tronc-commun"],
        position: { x: -38, y: 337 },
        lang: "python",
        logoColor: "marine",
    },
    "ft-ality": {
        lang: "ocaml",
        logoColor: "orange",
        parents: ["ft-turing"],
        position: { x: 885, y: 1100 }
    },
    "ft-minecraft": {
        parents: ["ft-vox"],
        position: { x: 733, y: 1187 }
    },
    "libftpp": {
        parents: ["piscine-objet"],
        position: { x: 957, y: 841 }
    },
    "peace-break": {
        parents: ["swifty-proteins"],
        position: { x: -212, y: 1130 }
    },
    "ft-lex": {
        parents: ["tronc-commun"],
        position: { x: 852, y: 359 }
    },
    "ft-yacc": {
        parents: ["ft-lex"],
        position: { x: 967, y: 314 }
    },
    "cc1": {
        parents: ["ft-yacc","b"],
        position: { x: 1065, y: 334 }
    },
    "b": {
        parents: ["libasm"],
        position: { x: 963, y: 397 }
    },
    "darkly": {
        parents: ["piscine-web"],
        position: { x: -320, y: 785 }
    },
    "ftl-quantum": {
        parents: ["tronc-commun"],
        position: { x: -56, y: 396 }
    },
    "unleashthebox": {
        parents: ["boot2root"],
        position: { x: 962, y: 79 }
    },
    "freddie-mercury": {
        parents: ["xv"],
        position: { x: 256, y: 1266 }
    },
    "ft-newton": {
        parents: ["humangl"],
        position: { x: 670, y: 1317 }
    },
    "very-real-engine": {
        parents: ["ft-minecraft","ft-newton"],
        position: { x: 767, y: 1315 }
    },
    "learn2slither": {
        parents: ["dslr"],
        position: { x: -139, y: 360 }
    },
    "leaffliction": {
        parents: ["dslr"],
        position: { x: -206, y: 306 }
    },
    "tokenizer": {
        parents: ["tronc-commun"],
        position: { x: -14, y: 678 }
    },
    "tokenizeart": {
        parents: ["tokenizer"],
        position: { x: -80, y: 705 }
    },
    "ft-kalman": {
        parents: ["matrix"],
        position: { x: -94, y: 545 }
    },
    "ready-set-boole": {
        parents: ["tronc-commun"],
        position: { x: -40, y: 491 }
    },
    "tinky-winkey": {
        parents: ["tronc-commun"],
        position: { x: 636, y: 140 }
    },
    "ft-malcolm": {
        parents: ["tronc-commun"],
        position: { x: 230, y: 134 }
    },
    "ft-ssl-md5": {
        parents: ["ft-ping"],
        position: { x: 366, y: -33 }
    },
    "bgp-at-doors-of-autonomous-systems-is-simple": {
        parents: ["tronc-commun"],
        position: { x: 103, y: 117 }
    },
    "ft-shield": {
        parents: ["woody-woodpacker"],
        position: { x: 588, y: 81 }
    },
    "nm": {
        parents: ["malloc"],
        position: { x: 1105, y: 682 }
    },
    "inception-of-things": {
        parents: ["cloud-1"],
        position: { x: 7, y: 191 }
    },
};
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
        linkID: "60889"
    },
    "rt": {
        parents: ["tronc-commun"],
        position: { x: 413, y: 1110 },
        linkID: "188636"
    },
    "ft-ls": {
        parents: ["malloc"],
        position: { x: 1076, y: 770 },
        lang: "c",
        logoColor: "6e7ccb",
        linkID: "61383",
    },
    "red-tetris": {
        parents: ["piscine-web"],
        position: { x: -273, y: 925 },
        linkID: "194982",
    },
    "zappy": {
        parents: ["bomberman"],
        position: { x: 704, y: 1249 },
        linkID: "169700",
    },
    "ft-ssl-des": {
        parents: ["ft-ssl-md5"],
        position: { x: 366, y: -89 },
        linkID: "163456"
    },
    "expert-system": {
        parents: ["n-puzzle"],
        position: { x: -208, y: 647 },
        linkID: "149318"
    },
    "cloud-1": {
        parents: ["tronc-commun"],
        position: { x: 48, y: 228 },
        linkID: "198305"
    },
    "hypertube": {
        parents: ["matcha"],
        position: { x: -313, y: 695 },
        linkID: "188588"
    },
    "in-the-shadows": {
        parents: ["piscine-unity"],
        position: { x: 307, y: 1103 },
        linkID: "60851"
    },
    "swifty-companion": {
        parents: ["piscine-mobile"],
        position: { x: -74, y: 997 },
        linkID: "127182"
    },
    "kfs-1": {
        parents: ["little-penguin-1"],
        position: { x: 1066, y: 638 },
        linkID: "105932"
    },
    "malloc": {
        parents: ["tronc-commun"],
        position: { x: 1010, y: 688 },
        lang: "c",
        logoColor: "6e7ccb",
        linkID: "188766"
    },
    "42sh": {
        parents: ["ft-script"],
        position: { x: 798, y: 115 },
        linkID: "188062"
    },
    "matrix": {
        parents: ["tronc-commun"],
        position: { x: -30, y: 548 },
        linkID: "187935"
    },
    "lem-in": {
        parents: ["n-puzzle"],
        position: { x: -172, y: 525 },
        linkID: "67419"
    },
    "dr-quine": {
        parents: ["woody-woodpacker"],
        position: { x: 441, y: 79 },
        linkID: "177267"
    },
    "xv": {
        parents: ["in-the-shadows"],
        position: { x: 282, y: 1185 },
        linkID: "60856"
    },
    "matcha": {
        parents: ["piscine-web"],
        position: { x: -214, y: 717 },
        linkID: "196067"
    },
    "camagru": {
        parents: ["piscine-web"],
        position: { x: -164, y: 947 },
        linkID: "196064"
    },
    "dslr": {
        parents: ["piscine-data-science"],
        position: { x: -103, y: 295 },
        linkID: "169568"
    },
    "multilayer-perceptron": {
        parents: ["dslr"],
        position: { x: -167, y: 195 },
        linkID: "172235"
    },
    "doom-nukem": {
        parents: ["scop"],
        position: { x: 478, y: 1060 },
        linkID: "164309"
    },
    "corewar": {
        parents: ["abstract-vm"],
        position: { x: 1119, y: 875 },
        linkID: "60869"
    },
    "ft-linear-regression": {
        parents: ["dslr"],
        position: { x: -100, y: 201 },
        linkID: "191256"
    },
    "music-room": {
        parents: ["piscine-web"],
        position: { x: -324, y: 862 },
        linkID: "191956"
    },
    "libasm": {
        lang: "assemblyscript",
        logoColor: "red",
        parents: ["tronc-commun"],
        position: { x: 874, y: 440 },
        linkID: "176883",
    },
    "scop": {
        lang: "opengl",
        logoColor: "teal",
        parents: ["tronc-commun"],
        position: { x: 554, y: 1085 },
        linkID: "164248",
    },
    "war": {
        parents: ["pestilence"],
        position: { x: 582, y: -107 },
        linkID: "184571"
    },
    "snow-crash": {
        parents: ["piscine-cybersecurite"],
        position: { x: 862, y: 221 },
        linkID: "158896"
    },
    "taskmaster": {
        parents: ["tronc-commun"],
        position: { x: 892, y: 728 },
        linkID: "172857"
    },
    "rubik": {
        parents: ["n-puzzle"],
        position: { x: -145, y: 674 },
        linkID: "169923"
    },
    "shaderpixel": {
        parents: ["humangl"],
        position: { x: 555, y: 1305 },
        linkID: "188671"
    },
    "famine": {
        parents: ["woody-woodpacker"],
        position: { x: 505, y: -9 },
        linkID: "79560"
    },
    "ft-script": {
        parents: ["tronc-commun"],
        position: { x: 737, y: 170 },
        linkID: "188784"
    },
    "strace": {
        parents: ["lem-ipc"],
        position: { x: 1201, y: 812 },
        linkID: "65612"
    },
    "swifty-proteins": {
        parents: ["swifty-companion"],
        position: { x: -135, y: 1063 },
        linkID: "199713"
    },
    "woody-woodpacker": {
        parents: ["tronc-commun"],
        position: { x: 503, y: 78 },
        linkID: "79590"
    },
    "ft-traceroute": {
        parents: ["ft-ping"],
        position: { x: 266, y: 62 },
        linkID: "106626"
    },
    "ft-ping": {
        parents: ["tronc-commun"],
        position: { x: 364, y: 64 },
        linkID: "164068"
    },
    "ft-nmap": {
        parents: ["ft-traceroute"],
        position: { x: 266, y: -143 },
        linkID: "141053"
    },
    "kfs-4": {
        parents: ["kfs-3"],
        position: { x: 1198, y: 550 },
        linkID: "105936"
    },
    "bomberman": {
        parents: ["humangl"],
        position: { x: 643, y: 1206 },
        linkID: "119169"
    },
    "nibbler": {
        parents: ["lem-ipc"],
        position: { x: 1219, y: 733 },
        linkID: "60850"
    },
    "abstract-vm": {
        parents: ["libftpp"],
        position: { x: 1045, y: 854 },
        linkID: "176920"
    },
    "abstract-data": {
        parents: ["libftpp"],
        position: { x: 1037, y: 930 },
        linkID: "147612"
    },
    "avaj-launcher": {
        parents: ["tronc-commun"],
        position: { x: 840, y: 864 },
        lang: "java",
        linkID: "164042"
    },
    "42run": {
        parents: ["scop"],
        position: { x: 497, y: 1159 },
        linkID: "172830"
    },
    "krpsim": {
        parents: ["n-puzzle"],
        position: { x: -250, y: 599 },
        linkID: "60875"
    },
    "total-perspective-vortex": {
        parents: ["dslr"],
        position: { x: -215, y: 245 },
        linkID: "83234"
    },
    "kfs-5": {
        parents: ["kfs-4"],
        position: { x: 1243, y: 647 },
        linkID: "177268"
    },
    "userspace-digressions": {
        parents: ["little-penguin-1"],
        position: { x: 958, y: 494 },
        linkID: "105944"
    },
    "computorv2": {
        parents: ["computorv1"],
        position: { x: -183, y: 425 },
        linkID: "188792"
    },
    "ft-select": {
        parents: ["ft-ls"],
        position: { x: 1135, y: 798 },
        linkID: "188785"
    },
    "computorv1": {
        parents: ["tronc-commun"],
        position: { x: -110, y: 439 },
        linkID: "175880"
    },
    "ft-ssl-rsa": {
        parents: ["ft-ssl-des"],
        position: { x: 366, y: -142 },
        linkID:"88500"
    },
    "ft-vox": {
        parents: ["scop"],
        position: { x: 641, y: 1098 },
        lang: "c++",
        logoColor: "marine",
        linkID: "176882"
    },
    "override": {
        parents: ["rainfall"],
        position: { x: 1048, y: 137 },
        linkID: "143036"
    },
    "boot2root": {
        parents: ["snow-crash"],
        position: { x: 890, y: 126 },
        linkID: "75162"
    },
    "death": {
        parents: ["war"],
        position: { x: 499, y: -106 },
        linkID: "60180"
    },
    "pestilence": {
        parents: ["famine"],
        position: { x: 581, y: -10 },
        linkID: "60802"
    },
    "kfs-9": {
        parents: ["kfs-8"],
        position: { x: 1411, y: 640 },
        linkID: "105941"
    },
    "kfs-x": {
        parents: ["kfs-9"],
        position: { x: 1455, y: 560 },
        linkID: "105942"
    },
    "kfs-8": {
        parents: ["kfs-7"],
        position: { x: 1371, y: 532 },
        linkID: "105940"
    },
    "kfs-7": {
        parents: ["kfs-6"],
        position: { x: 1325, y: 643 },
        linkID: "193430"
    },
    "kfs-6": {
        parents: ["kfs-5"],
        position: { x: 1292, y: 537 },
        linkID: "105938"
    },
    "fix-me": {
        parents: ["swingy"],
        position: { x: 969, y: 956 },
        linkID: "163437"
    },
    "swingy": {
        parents: ["avaj-launcher"],
        position: { x: 894, y: 906 },
        linkID: "147108"
    },
    "gomoku": {
        parents: ["n-puzzle"],
        position: { x: -235, y: 540 },
        linkID: "162538"
    },
    "n-puzzle": {
        parents: ["tronc-commun"],
        position: { x: -127, y: 604 },
        lang: "c++",
        logoColor: "marine",
        linkID: "163452"
    },
    "mod1": {
        parents: ["tronc-commun"],
        position: { x: 688, y: 986 },
        lang: "c++",
        logoColor: "marine",
        linkID: "60868"
    },
    "kfs-3": {
        parents: ["kfs-2"],
        position: { x: 1162, y: 646 },
        linkID: "116842"
    },
    "filesystem": {
        parents: ["drivers-and-interrupts","process-and-memory"],
        position: { x: 1077, y: 436 },
        linkID: "187172"
    },
    "drivers-and-interrupts": {
        parents: ["little-penguin-1"],
        position: { x: 1025, y: 488 },
        linkID: "105945"
    },
    "process-and-memory": {
        parents: ["little-penguin-1"],
        position: { x: 1116, y: 496 },
        linkID: "187171"
    },
    "little-penguin-1": {
        parents: ["ft-linux"],
        position: { x: 1029, y: 570 },
        linkID: "164526"
    },
    "rainfall": {
        parents: ["snow-crash"],
        position: { x: 967, y: 198 },
        linkID: "66683"
    },
    "matt-daemon": {
        parents: ["taskmaster"],
        position: { x: 986, y: 769 },
        linkID: "198307"
    },
    "ft-linux": {
        parents: ["tronc-commun"],
        position: { x: 910, y: 573 },
        linkID: "197599"
    },
    "particle-system": {
        parents: ["humangl"],
        position: { x: 469, y: 1285 },
        linkID: "188670"
    },
    "ft-turing": {
        lang: "ocaml",
        logoColor: "orange",
        parents: ["piscine-ocaml"],
        position: { x: 864, y: 995 },
        linkID: "163926"
    },
    "humangl": {
        parents: ["scop"],
        position: { x: 561, y: 1198 },
        lang: "c++",
        logoColor: "marine",
        linkID: "163924"
    },
    "ft-hangouts": {
        parents: ["piscine-mobile"],
        position: { x: 52, y: 985 },
        linkID: "158895"
    },
    "lem-ipc": {
        parents: ["malloc"],
        position: { x: 1138, y: 735 },
        linkID: "176959"
    },
    "kfs-2": {
        parents: ["kfs-1"],
        position: { x: 1124, y: 560 },
        linkID: "105933"
    },
    "h42n42": {
        parents: ["ft-turing"],
        position: { x: 955, y: 1039 },
        linkID: "196674"
    },
    "open-project": {
        parents: ["tronc-commun"],
        position: { x: 211, y: 998 },
        lang: "42",
        linkID: "128727"
    },
    "piscine-web": {
        subProjects: ["Piscine Django", "Piscine RoR", "Piscine Symfony"],
        parents: ["tronc-commun"],
        position: { x: -98, y: 780 },
    },
    "piscine-mobile": {
        parents: ["tronc-commun"],
        position: { x: -3, y: 911 },
        lang: "dart",
        logoColor: "darkturquoise",
        linkID: "95370",
        modules: [
            { id: "mobile-0", label: "Mobile Basics", parents: [] },
            { id: "mobile-1", label: "Structure and Logic", parents: ["mobile-0"] },
            { id: "mobile-2", label: "API and data", parents: ["mobile-1"] },
            { id: "mobile-3", label: "Design", parents: ["mobile-2"] },
            { id: "mobile-4", label: "Auth and dataBase", parents: ["mobile-3"] },
            { id: "mobile-5", label: "Manage data and display", parents: ["mobile-4"] }
        ]
    },
    "piscine-ocaml": {
        lang: "ocaml",
        logoColor: "orange",
        parents: ["tronc-commun"],
        position: { x: 794, y: 925 },
        linkID: "143947",
        // modules : [
        //     { id: "ocaml-0", label: "Basic syntax and semantics", parents: [], linkID: "144426" },
        //     { id: "ocaml-1", label: "Recursion and higher-order functions", parents: ["ocaml-0"], linkID: "144419" },
        //     { id: "ocaml-2", label: "Pattern matching and data type", parents: ["ocaml-1"], linkID: "144531" },
        //     { id: "ocaml-3", label: "Ocaml's modules language", parents: ["ocaml-2"], linkID: "144421" },
        //     { id: "ocaml-4", label: "Imperative features", parents: ["ocaml-3"], linkID: "144424" },
        //     { id: "ocaml-5", label: "Functor", parents: ["ocaml-4"], linkID: "144533" },
        //     { id: "ocaml-6", label: "OOP 1", parents: ["ocaml-5"], linkID: "144423" },
        //     { id: "ocaml-7", label: "OOP 2", parents: ["ocaml-6"], linkID: "144535" },
        //     { id: "ocaml-8", label: "Monoids and Monads", parents: ["ocaml-7"], linkID: "176269" },
        // ]
    },
    "piscine-unity": {
        parents: ["tronc-commun"],
        position: { x: 323, y: 1018 },
        lang: "unity",
        logoColor: "grey",
        linkID: "164067"
    },
    "piscine-cybersecurite": {
        parents: ["tronc-commun"],
        position: { x: 770, y: 274 },
        lang: "nextdns",
        linkID: "83768"
    },
    "piscine-objet": {
        parents: ["tronc-commun"],
        position: { x: 835, y: 796 },
        lang: "c++",
        logoColor: "marine",
        linkID: "143096"
    },
    "piscine-data-science": {
        parents: ["tronc-commun"],
        position: { x: -38, y: 337 },
        lang: "python",
        logoColor: "marine",
        linkID: "95527"
    },
    "ft-ality": {
        lang: "ocaml",
        logoColor: "orange",
        parents: ["ft-turing"],
        position: { x: 885, y: 1100 },
        linkID: "149158"
    },
    "ft-minecraft": {
        parents: ["ft-vox"],
        position: { x: 733, y: 1187 },
        linkID: "164015",
    },
    "libftpp": {
        parents: ["piscine-objet"],
        position: { x: 957, y: 841 },
        linkID: "157707",
    },
    "peace-break": {
        parents: ["swifty-proteins"],
        position: { x: -212, y: 1130 },
        linkID: "158877"
    },
    "ft-lex": {
        parents: ["tronc-commun"],
        position: { x: 852, y: 359 },
        linkID: "183541"
    },
    "ft-yacc": {
        parents: ["ft-lex"],
        position: { x: 967, y: 314 },
        linkID: "150709"
    },
    "cc1": {
        parents: ["ft-yacc","b"],
        position: { x: 1065, y: 334 },
        linkID: "149442"
    },
    "b": {
        parents: ["libasm"],
        position: { x: 963, y: 397 },
        linkID: "174908"
    },
    "darkly": {
        parents: ["piscine-web"],
        position: { x: -320, y: 785 },
        linkID: "158872"
    },
    "ftl-quantum": {
        parents: ["tronc-commun"],
        position: { x: -56, y: 396 },
        linkID: "191294"
    },
    "unleashthebox": {
        parents: ["boot2root"],
        position: { x: 962, y: 79 },
        linkID: "94609"
    },
    "freddie-mercury": {
        parents: ["xv"],
        position: { x: 256, y: 1266 },
        linkID: "134608"
    },
    "ft-newton": {
        parents: ["humangl"],
        position: { x: 670, y: 1317 },
        linkID: "188672"
    },
    "very-real-engine": {
        parents: ["ft-minecraft","ft-newton"],
        position: { x: 767, y: 1315 },
        linkID: "147905"
    },
    "learn2slither": {
        parents: ["dslr"],
        position: { x: -139, y: 360 },
        linkID: "202349"
    },
    "leaffliction": {
        parents: ["dslr"],
        position: { x: -206, y: 306 },
        linkID: "177685"
    },
    "tokenizer": {
        parents: ["tronc-commun"],
        position: { x: -14, y: 678 },
        linkID: "144411"
    },
    "tokenizeart": {
        parents: ["tokenizer"],
        position: { x: -80, y: 705 },
        linkID: "144427"
    },
    "ft-kalman": {
        parents: ["matrix"],
        position: { x: -94, y: 545 },
        linkID: "127291"
    },
    "ready-set-boole": {
        parents: ["tronc-commun"],
        position: { x: -40, y: 491 },
        linkID: "179422"
    },
    "tinky-winkey": {
        parents: ["tronc-commun"],
        position: { x: 636, y: 140 },
        linkID: "127289"
    },
    "ft-malcolm": {
        parents: ["tronc-commun"],
        position: { x: 230, y: 134 },
        linkID: "163439"
    },
    "ft-ssl-md5": {
        parents: ["ft-ping"],
        position: { x: 366, y: -33 },
        linkID: "163454"
    },
    "bgp-at-doors-of-autonomous-systems-is-simple": {
        parents: ["tronc-commun"],
        position: { x: 103, y: 117 },
        linkID: "158468"
    },
    "ft-shield": {
        parents: ["woody-woodpacker"],
        position: { x: 588, y: 81 },
        linkID: "193442"
    },
    "nm": {
        parents: ["malloc"],
        position: { x: 1105, y: 682 },
        linkID: "192774"
    },
    "inception-of-things": {
        parents: ["cloud-1"],
        position: { x: 7, y: 191 },
        linkID: "188852",
    },
};
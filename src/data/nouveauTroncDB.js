import { place } from "./troncCommunDB";

export const nouveauTroncDefinitions = {
  ...place({
    "tc-libft": 0,

    "tc-ft-printf": 1,
    "tc-get-next-line": 1,
    "tc-push-swap": 1,
    
    "tc-born2beroot": 2,
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

  "tc-python-00-04": {
    label: "Python Modules 00-04",
    rank: 2,
    lang: "python",
    desc: "Découvrir les bases de Python, la programmation orientée objet, la gestion des exceptions, les structures de données ainsi que la manipulation de fichiers et de flux de données.",
  },
  "ntc-A-Maze-Ing": {
    label: "A-Maze-Ing",
    rank: 2,
    lang: "python",
    desc: "Concevoir un générateur de labyrinthes en respectant différentes contraintes, manipuler des algorithmes de génération et produire un affichage exploitable du résultat.",
  },
  "tc-python-05-10": {
    label: "Python Modules 05-10",
    rank: 2,
    lang: "python",
    desc: "Approfondir Python avec les classes abstraites, le polymorphisme, les imports et les packages, les design patterns, la gestion des environnements et des dépendances, la validation de données avec Pydantic ainsi que la programmation fonctionnelle.",
  },

  "tc-codexion": {
    label: "Codexion",
    rank: 3,
    lang: "c",
    desc: "Maîtriser la programmation concurrente en C avec les threads POSIX, les mutex et les variables de condition, tout en implémentant des algorithmes d’ordonnancement FIFO et EDF pour gérer le partage des ressources, prévenir les interblocages et garantir un accès équitable.",
  },
  "tc-fly-in": {
    label: "Fly-in",
    rank: 3,
    lang: "python",
    desc: "Concevoir en Python un système de routage pour plusieurs drones autonomes en s’appuyant sur les graphes et le pathfinding, tout en gérant les déplacements simultanés, les coûts, les conflits, les zones restreintes et les interblocages afin d’optimiser le nombre de tours de simulation.",
  },
  "tc-call-me-maybe": {
    label: "Call Me Maybe",
    rank: 3,
    lang: "python",
    desc: "Découvrir le function calling des modèles de langage en transformant des instructions en langage naturel en appels de fonctions structurés, avec des arguments typés et un décodage contraint garantissant la génération de JSON valide et fiable.",
  },

  "tc-rag-against-the-machine": {
    label: "RAG against the machine",
    rank: 4,
    lang: "python",
    desc: "Concevoir un système de Retrieval-Augmented Generation (RAG) capable de répondre à des questions sur une base de code en retrouvant les informations pertinentes, grâce à un découpage intelligent des données et à des méthodes de recherche comme TF-IDF et BM25, puis en générant des réponses fondées sur les éléments récupérés.",
  },
  "tc-pacman": {
    label: "Pac-Man",
    rank: 4,
    lang: "python",
    desc: "Recréer Pac-Man en Python en concevant une base de code moderne, une architecture de projet claire et maintenable, ainsi qu’une version pouvant être facilement construite et déployée.",
  },

  "tc-the-answer-protocol": {
    label: "The Answer Protocol",
    rank: 5,
    lang: ["java", "zig", "cpp", "c", "go"],
    desc: "Concevoir en équipe un jeu d’aventure textuel multijoueur reposant sur un serveur TCP et un protocole réseau conforme à une RFC, avec des clients en ligne de commande et graphiques, la gestion des joueurs, du chat, des groupes et d’objets uniques dans un monde persistant.",
  },
  "ntc-choix": {
    label: "Projet au choix",
    rank: 5,
    subProjects: [
      {
        id: "ntc-agent-smith",
        label: "Agent-Smith",
        desc: "Concevoir un agent d’intelligence artificielle autonome capable de raisonner, générer, exécuter et améliorer du code de manière itérative afin de résoudre des problèmes de programmation dans un environnement sécurisé et isolé."
      },
      {
        id: "ntc-tree-nity",
        label: "tree_nity",
        desc: "Créez un système de file de messages avec producteurs, consommateurs et topics, en gérant la concurrence et les communications asynchrones. Brought by Kyfontan.",
        pdfUrl: "subjects/treenity.subject.pdf",
      },  
    ],
  },
};

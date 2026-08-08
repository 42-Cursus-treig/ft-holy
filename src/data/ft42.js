const POOL = {
  "shell-00": "c-piscine-shell-00",
  "shell-01": "c-piscine-shell-01",
  ...Object.fromEntries(
    Array.from({ length: 14 }, (_, i) => {
      const n = String(i).padStart(2, "0");
      return [`c-${n}`, `c-piscine-c-${n}`];
    })
  ),
  "exam-00": "c-piscine-exam-00",
  "exam-01": "c-piscine-exam-01",
  "exam-02": "c-piscine-exam-02",
  "exam-final": "c-piscine-final-exam",
  bsq: "c-piscine-bsq",
  "rush-00": "c-piscine-rush-00",
  "rush-01": "c-piscine-rush-01",
  "rush-02": "c-piscine-rush-02",
};

const COMMON = {
  "tc-libft": "42cursus-libft",
  "tc-ft-printf": "42cursus-ft_printf",
  "tc-get-next-line": "42cursus-get_next_line",
  "tc-push-swap": ["42next-push_swap", "42cursus-push_swap"],
  "tc-born2beroot": ["42next-born2beroot", "born2beroot"],
  "tc-netpractice": "netpractice",
  "tc-inception": "inception",
  "tc-transcendence": "ft_transcendence",
  "tc-collaborative-resume": "42_collaborative_resume",
  "tc-exam-02": ["42next-exam-rank-02", "exam-rank-02"],
  "tc-exam-03": ["42next-exam-rank-03", "exam-rank-03"],
  "tc-exam-04": ["42next-exam-rank-04", "exam-rank-04"],
  "tc-exam-05": ["42next-exam-rank-05", "exam-rank-05"],
  "tc-exam-06": ["42next-exam-rank-06", "exam-rank-06"],
};

// ─── Ancien tronc commun ────────────────────────────────────────────────────
const OLD = {
  "tc-minitalk": ["42adv-minitalk", "minitalk"],
  "tc-pipex": ["42adv-pipex", "pipex"],
  "tc-so-long": ["42adv-so_long", "so_long"],
  "tc-fdf": ["42adv-fdf", "42cursus-fdf"],
  "tc-fract-ol": ["42adv-fract-ol", "42cursus-fract-ol"],
  "tc-philosophers": ["42cursus-philosophers", "old-philosophers"],
  "tc-minishell": ["42cursus-minishell", "minishell-d972f7c4-dbec-4811-b575-c967db09f1f1"],
  "tc-cub3d": ["42cursus-cub3d", "cub3d"],
  "tc-minirt": ["42cursus-minirt", "minirt"],
  "tc-ft-irc": ["ft_irc", "old-irc"],
  "tc-webserv": "webserv",
  "tc-cpp-00-04": ["cpp-module-00", "cpp-module-01", "cpp-module-02", "cpp-module-03", "cpp-module-04"],
  "tc-cpp-05-09": ["cpp-module-05", "cpp-module-06", "cpp-module-07", "cpp-module-08", "cpp-module-09"],
};

// ─── Nouveau tronc commun ───────────────────────────────────────────────────
const NEW = {
  "tc-python-00-04": ["python-module-00", "python-module-01", "python-module-02", "python-module-03", "python-module-04"],
  "tc-python-05-10": ["python-module-05", "python-module-06", "python-module-07", "python-module-08", "python-module-09", "python-module-10"],
  "ntc-A-Maze-Ing": "a-maze-ing",
  "tc-codexion": "codexion",
  "tc-fly-in": "fly-in",
  "tc-call-me-maybe": ["42cursus-call-me-maybe", "call-me-maybe"],
  "tc-rag-against-the-machine": ["42cursus-rag-against-the-machine", "rag-against-the-machine"],
  "tc-pacman": "pac-man",
  "tc-the-answer-protocol": "the-answer-protocol",
  "ntc-agent-smith": ["42cursus-agent-smith", "agent-smith"],
};

// ─── Mastery ──────────────────────────
const MASTERY = {
  "42run": "42cursus-42run",
  "42sh": "42cursus-42sh",
  "abstract-data": "abstract_data",
  "abstract-vm": "42cursus-abstract-vm",
  "agent-smith": ["42cursus-agent-smith", "agent-smith"],
  "avaj-launcher": "42cursus-avaj-launcher",
  "b": "b",
  "bgp-at-doors-of-autonomous-systems-is-simple": "bgp-at-doors-of-autonomous-systems-is-simple",
  "bomberman": "42cursus-bomberman",
  "boot2root": "42cursus-boot2root",
  "camagru": "42cursus-camagru",
  "call-me-maybe": ["42cursus-call-me-maybe", "call-me-maybe"],
  "cc1": "cc1",
  "cloud-1": "42cursus-cloud-1",
  "computorv1": "42cursus-computorv1",
  "computorv2": "42cursus-computorv2",
  "corewar": "42cursus-corewar",
  "darkly": "42cursus-darkly",
  "death": "42cursus-death",
  "doom-nukem": "42cursus-doom-nukem",
  "dr-quine": "42cursus-dr-quine",
  "drivers-and-interrupts": "42cursus-drivers-and-interrupts",
  "dslr": "42cursus-dslr",
  "expert-system": "42cursus-expert-system",
  "famine": "42cursus-famine",
  "filesystem": "42cursus-filesystem",
  "fix-me": "42cursus-fix-me",
  "freddie-mercury": "freddie-mercury",
  "ft-ality": "42cursus-ft_ality",
  "ft-hangouts": "42cursus-ft_hangouts",
  "ft-kalman": "ft_kalman",
  "ft-lex": "ft_lex",
  "ft-lgtm": "ft_lgtm",
  "ft-linear-regression": "42cursus-ft_linear_regression",
  "ft-linux": "42cursus-ft_linux",
  "ft-ls": "42cursus-ft_ls",
  "ft-malcolm": "ft_malcolm",
  "ft-minecraft": "ft_minecraft",
  "ft-newton": "ft_newton",
  "ft-nmap": "42cursus-ft_nmap",
  "ft-ping": "42cursus-ft_ping",
  "ft-script": "42cursus-ft_script",
  "ft-select": "42cursus-ft_select",
  "ft-shield": "42cursus-ft_shield",
  "ft-ssl-des": "42cursus-ft_ssl_des",
  "ft-ssl-md5": "42cursus-ft_ssl_md5",
  "ft-ssl-rsa": "42cursus-ft_ssl_rsa",
  "ft-traceroute": "42cursus-ft_traceroute",
  "ft-turing": "42cursus-ft_turing",
  "ft-vox": "42cursus-ft_vox",
  "ft-yacc": "ft_yacc",
  "ftl-quantum": "ftl_quantum",
  "gomoku": "42cursus-gomoku",
  "guimp": "42cursus-guimp",
  "h42n42": "42cursus-h42n42",
  "humangl": "42cursus-humangl",
  "hypertube": "42cursus-hypertube",
  "in-the-shadows": "42cursus-in-the-shadows",
  "inception-of-context": "inception-of-context",
  "inception-of-things": "inception-of-things",
  "inception-of-wisdom": "inception-of-wisdom",
  "kfs-1": "42cursus-kfs-1",
  "kfs-2": "42cursus-kfs-2",
  "kfs-3": "42cursus-kfs-3",
  "kfs-4": "42cursus-kfs-4",
  "kfs-5": "42cursus-kfs-5",
  "kfs-6": "42cursus-kfs-6",
  "kfs-7": "42cursus-kfs-7",
  "kfs-8": "42cursus-kfs-8",
  "kfs-9": "42cursus-kfs-9",
  "kfs-x": "42cursus-kfs-x",
  "krpsim": "42cursus-krpsim",
  "leaffliction": "leaffliction",
  "learn2slither": "learn2slither",
  "lem-in": "42cursus-lem_in",
  "lem-ipc": "42cursus-lem-ipc",
  "libasm": "libasm",
  "libftpp": "libftpp",
  "little-penguin-1": "42cursus-little-penguin-1",
  "malloc": "42cursus-malloc",
  "matcha": "42cursus-matcha",
  "matrix": "matrix",
  "matt-daemon": "42cursus-matt-daemon",
  "mod1": "42cursus-mod1",
  "multilayer-perceptron": "42cursus-multilayer-perceptron",
  "music-room": "42cursus-music-room",
  "n-puzzle": "42cursus-n-puzzle",
  "nibbler": "42cursus-nibbler",
  "nm": "nm",
  "open-project": "open-project",
  "override": "42cursus-override",
  "particle-system": "42cursus-particle-system",
  "peace-break": "peace_break",
  "pestilence": "42cursus-pestilence",
  "piscine-data-science": "piscine-data-science",
  "piscine-django": "piscine-django",
  "piscine-ocaml": "42cursus-piscine-ocaml",
  "process-and-memory": "42cursus-process-and-memory",
  "rag-against-the-machine": ["42cursus-rag-against-the-machine", "rag-against-the-machine"],
  "rainfall": "42cursus-rainfall",
  "ready-set-boole": "ready-set-boole",
  "red-tetris": "42cursus-red-tetris",
  "retroemu": "retroemu",
  "rt": "42cursus-rt",
  "rubik": "42cursus-rubik",
  "scop": "42cursus-scop",
  "shaderpixel": "42cursus-shaderpixel",
  "snow-crash": "42cursus-snow-crash",
  "strace": "42cursus-strace",
  "supercharge" : "supercharge",
  "swifty-companion": "42cursus-swifty-companion",
  "swifty-proteins": "42cursus-swifty-proteins",
  "swingy": "42cursus-swingy",
  "taskmaster": "42cursus-taskmaster",
  "tinky-winkey": "tinky-winkey",
  "tokenizeart": "tokenizeart",
  "tokenizer": "tokenizer",
  "total-perspective-vortex": "42cursus-total-perspective-vortex",
  "unleashthebox": "unleashthebox",
  "userspace-digressions": "42cursus-userspace_digressions",
  "very-real-engine": "very_real_engine",
  "war": "42cursus-war",
  "woody-woodpacker": "42cursus-woody-woodpacker",
  "xv": "42cursus-xv",
  "zappy": "42cursus-zappy",
};

const AGGREGATES = new Set(["tc-cpp-00-04", "tc-cpp-05-09", "tc-python-00-04", "tc-python-05-10"]);

export const FT_SLUGS = { ...POOL, ...COMMON, ...OLD, ...NEW, ...MASTERY };

const NEW_ONLY = new Set([
  "python-module-00", "a-maze-ing", "codexion", "fly-in", "pac-man", "the-answer-protocol",
]);

const OLD_ONLY = new Set([
  "cpp-module-00", "42cursus-philosophers", "old-philosophers", "42cursus-minishell",
  "42cursus-cub3d", "cub3d", "42cursus-minirt", "minirt", "ft_irc", "old-irc", "webserv",
]);

export const detectTronc = (payload, cutoff = "2025-09-01") => {
  const slugs = Object.keys(payload.projects || {});

  if (slugs.some((s) => s.startsWith("42next-"))) return "tronc-nouveau";
  if (slugs.some((s) => s.startsWith("42adv-"))) return "tronc-ancien";

  const neuf = slugs.filter((s) => NEW_ONLY.has(s)).length;
  const ancien = slugs.filter((s) => OLD_ONLY.has(s)).length;
  if (neuf !== ancien) return neuf > ancien ? "tronc-nouveau" : "tronc-ancien";

  const cursus = (payload.cursus || []).find((c) => c.id === 21);
  if (cursus?.beginAt) {
    return Date.parse(cursus.beginAt) >= Date.parse(cutoff) ? "tronc-nouveau" : "tronc-ancien";
  }
  return "tronc-nouveau";
};

const MASTERY_LEVEL = 21;

const CORE_DONE = ["42next-exam-rank-06", "exam-rank-06", "ft_transcendence"];

export const allowedWorlds = (payload, tronc) => {
  const cursus = payload.cursus || [];
  const ids = new Set(cursus.map((c) => c.id));
  const worlds = [];

  if (ids.has(9)) worlds.push("pool");
  if (!ids.has(21)) return worlds;

  worlds.push(tronc);

  const projects = payload.projects || {};
  const coreDone = CORE_DONE.some((s) => projects[s]?.status === "validated");
  const level = cursus.find((c) => c.id === 21)?.level ?? 0;
  if (coreDone || level >= MASTERY_LEVEL) worlds.push("cursus");

  return worlds;
};

const closedCursusIds = (payload) =>
  new Set(
    (payload.cursus || [])
      .filter((c) => c.endAt && Date.parse(c.endAt) < Date.now())
      .map((c) => c.id)
  );

const PRIORITY = { validated: 3, "in-progress": 2, failed: 1 };

const mergeAggregate = (entries, expected) => {
  if (entries.length === expected && entries.every((e) => e.status === "validated")) {
    const marks = entries.map((e) => e.mark).filter((m) => m != null);
    return {
      status: "validated",
      mark: marks.length ? Math.round(marks.reduce((a, b) => a + b, 0) / marks.length) : null,
    };
  }
  return { status: "in-progress", mark: null };
};

const mergeVariants = (entries) =>
  entries.reduce((a, b) => (PRIORITY[b.status] > PRIORITY[a.status] ? b : a));

export const toProgress = (payload) => {
  const statuses = {};
  const marks = {};
  const closed = closedCursusIds(payload);

  const stale = (entry) =>
    entry.status === "in-progress" &&
    (entry.cursusIds || []).length > 0 &&
    (entry.cursusIds || []).every((id) => closed.has(id));

  for (const [id, slugs] of Object.entries(FT_SLUGS)) {
    const list = Array.isArray(slugs) ? slugs : [slugs];
    const found = list
      .map((s) => payload.projects?.[s])
      .filter(Boolean)
      .filter((e) => !stale(e));
    if (found.length === 0) continue;

    const merged = AGGREGATES.has(id)
      ? mergeAggregate(found, list.length)
      : mergeVariants(found);

    statuses[id] = merged.status;
    if (merged.mark != null) marks[id] = merged.mark;
  }

  return {
    version: 1,
    updatedAt: payload.updatedAt || new Date().toISOString(),
    statuses,
    marks,
  };
};

const IGNORED = new Set(["42cursus-rushes"]);

export const unmappedSlugs = (payload) => {
  const known = new Set(Object.values(FT_SLUGS).flat());
  return Object.keys(payload.projects || {}).filter(
    (s) => !known.has(s) && !IGNORED.has(s)
  );
};

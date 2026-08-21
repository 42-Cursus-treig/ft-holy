import { Panel, useReactFlow } from "@xyflow/react";
import { toPng } from "html-to-image";
import { LS_POSITIONS_PREFIX, positionsKey } from "../config";
import { useTheme } from "../theme";

const SOURCES = {
  cursus: {
    file: "src/data/projectDB.js",
    load: () => import("../data/projectDB.js?raw"),
  },
  pool: {
    file: "src/data/poolDB.js",
    load: () => import("../data/poolDB.js?raw"),
  },
};

const POSITION_RE = /position:\s*\{\s*x:\s*-?[\d.]+\s*,\s*y:\s*-?[\d.]+\s*\}/;

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const findBlock = (text, id) => {
  const opener = new RegExp(`"${escapeRe(id)}"\\s*:\\s*\\{`).exec(text);
  if (!opener) return null;

  const start = opener.index;
  let depth = 0;
  let inString = false;
  let quote = "";

  for (let i = text.indexOf("{", start); i < text.length; i++) {
    const ch = text[i];

    if (inString) {
      if (ch === "\\") i++;
      else if (ch === quote) inString = false;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") {
      inString = true;
      quote = ch;
      continue;
    }
    if (ch === "{") depth++;
    else if (ch === "}" && --depth === 0) return { start, end: i + 1 };
  }
  return null;
};

const applyPositions = (raw, stored) => {
  let text = raw;
  const applied = [];
  const inserted = [];
  const unknown = [];

  const jobs = [];
  for (const [id, pos] of Object.entries(stored)) {
    if (!pos || typeof pos.x !== "number" || typeof pos.y !== "number") continue;
    const block = findBlock(text, id);
    if (block) jobs.push({ id, pos, block });
    else unknown.push(id);
  }

  jobs.sort((a, b) => b.block.start - a.block.start);

  for (const { id, pos, block } of jobs) {
    const body = text.slice(block.start, block.end);
    const line = `position: { x: ${Math.round(pos.x)}, y: ${Math.round(pos.y)} }`;
    let next;

    if (POSITION_RE.test(body)) {
      next = body.replace(POSITION_RE, line);
      applied.push(id);
    } else {
      const lineStart = text.lastIndexOf("\n", block.start) + 1;
      const indent = text.slice(lineStart, block.start) + "    ";
      const brace = body.indexOf("{");
      next = `${body.slice(0, brace + 1)}\n${indent}${line},${body.slice(brace + 1)}`;
      inserted.push(id);
    }

    text = text.slice(0, block.start) + next + text.slice(block.end);
  }

  return { text, applied, inserted, unknown };
};

function DevToolbar({ worldId }) {
  const { fitView } = useReactFlow();
  const { c } = useTheme();

  if (!import.meta.env.DEV) return null;

  const dumpSource = async () => {
    const source = SOURCES[worldId];
    if (!source) {
      console.warn(
        `[ft_holy] La planche "${worldId}" est en layout radial : ses positions sont ` +
          `calculées, il n'y a pas de source à régénérer.`
      );
      alert(`Planche "${worldId}" : layout automatique, rien à exporter.`);
      return;
    }

    try {
      const stored = JSON.parse(localStorage.getItem(positionsKey(worldId)) || "{}");
      const { default: raw } = await source.load();
      const { text, applied, inserted, unknown } = applyPositions(raw, stored);

      console.log(`=== ${source.file} — positions à jour ===`);
      console.log(text);

      const count = applied.length + inserted.length;
      console.log(
        `${count} position(s) réinjectée(s)` +
          (inserted.length ? ` — dont ${inserted.length} ajoutée(s) : ${inserted.join(", ")}` : "")
      );
      if (unknown.length) {
        console.warn(
          `${unknown.length} id(s) sans définition de premier niveau (modules ou ` +
            `sous-graphes, non réinjectés) : ${unknown.join(", ")}`
        );
      }

      const others = Object.keys(localStorage)
        .filter((k) => k.startsWith(LS_POSITIONS_PREFIX) && k !== positionsKey(worldId))
        .map((k) => k.slice(LS_POSITIONS_PREFIX.length));
      if (others.length) console.log("Autres planches enregistrées :", others.join(", "));

      let copied = false;
      try {
        await navigator.clipboard.writeText(text);
        copied = true;
      } catch {
        //
      }

      alert(
        `${source.file} régénéré (${count} position(s)).\n` +
          (copied ? "Copié dans le presse-papier." : "Disponible dans la console.")
      );
    } catch (e) {
      console.error("Régénération impossible", e);
      alert("Régénération impossible — voir la console.");
    }
  };

  const clearStorageAndRefresh = () => {
    if (window.confirm("Vider TOUT le LocalStorage et recharger la page ?")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const takeScreenshot = async () => {
    fitView({ padding: 0.2, duration: 0 });
    await new Promise((resolve) => setTimeout(resolve, 200));

    const element = document.querySelector(".react-flow");
    if (!element) return;

    const uiElements = document.querySelectorAll(".react-flow__panel, .react-flow__controls");
    uiElements.forEach((el) => (el.style.opacity = "0"));

    try {
      const dataUrl = await toPng(element, { backgroundColor: c.inkDeep, pixelRatio: 4 });
      const link = document.createElement("a");
      link.download = `ft_holy_${worldId}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Capture impossible :", error);
      alert("Capture impossible. Vérifie que html-to-image est installé.");
    } finally {
      uiElements.forEach((el) => (el.style.opacity = "1"));
    }
  };

  const btnClass =
    "flex-1 text-vellum-dim hover:text-vellum hover:bg-white/10 transition-colors flex items-center justify-center";

  return (
    <Panel position="top-right">
      <div
        className="hud-bar overflow-hidden"
        style={{ width: "var(--hud-bar-width)" }}
      >
        <button
          onClick={dumpSource}
          className={btnClass}
          title="Régénérer le fichier source avec les positions à jour"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
          </svg>
        </button>

        <div className="w-px my-2" style={{ background: c.inkLine }} />

        <button onClick={takeScreenshot} className={btnClass} title="Capture d'écran HD">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
            <circle cx="12" cy="13" r="4"></circle>
          </svg>
        </button>

        <div className="w-px my-2" style={{ background: c.inkLine }} />

        <button onClick={clearStorageAndRefresh} className={btnClass} title="Vider le LocalStorage">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
            <polyline points="3 3 3 8 8 8"></polyline>
          </svg>
        </button>
      </div>
    </Panel>
  );
}

export default DevToolbar;

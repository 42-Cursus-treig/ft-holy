import { Panel, useReactFlow } from "@xyflow/react";
import { toPng } from "html-to-image";
import { LS_POSITIONS_PREFIX, positionsKey } from "../config";

function DevToolbar({ worldId }) {
  const { fitView } = useReactFlow();

  if (!import.meta.env.DEV) return null;

  const logPositions = () => {
    try {
      const current = localStorage.getItem(positionsKey(worldId));
      console.log(`=== POSITIONS — planche "${worldId}" ===`);
      console.log(JSON.stringify(current ? JSON.parse(current) : {}, null, 2));

      const others = Object.keys(localStorage)
        .filter((k) => k.startsWith(LS_POSITIONS_PREFIX) && k !== positionsKey(worldId))
        .map((k) => k.slice(LS_POSITIONS_PREFIX.length));
      if (others.length) console.log("Autres planches enregistrées :", others.join(", "));

      alert(`Positions de la planche "${worldId}" affichées dans la console.`);
    } catch (e) {
      console.error("Lecture des positions impossible", e);
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
      const dataUrl = await toPng(element, { backgroundColor: "#05060A", pixelRatio: 4 });
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
        <button onClick={logPositions} className={btnClass} title="Log des positions dans la console">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
          </svg>
        </button>

        <div className="w-px my-2" style={{ background: "var(--ink-line)" }} />

        <button onClick={takeScreenshot} className={btnClass} title="Capture d'écran HD">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
            <circle cx="12" cy="13" r="4"></circle>
          </svg>
        </button>

        <div className="w-px my-2" style={{ background: "var(--ink-line)" }} />

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

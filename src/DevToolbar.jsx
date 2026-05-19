import { Panel, useReactFlow } from "@xyflow/react";
import { toPng } from "html-to-image";
import { LS_POSITIONS_KEY } from "./config";

function DevToolbar() {
  const { fitView } = useReactFlow();

  if (!import.meta.env.DEV) return null;

  const logPositions = () => {
    try {
      const raw = localStorage.getItem(LS_POSITIONS_KEY);
      const positions = raw ? JSON.parse(raw) : {};
      console.log("=== NOUVELLES POSITIONS POUR projectDB.js ===");
      console.log(JSON.stringify(positions, null, 2));
      alert("Positions affichées dans la console du navigateur !");
    } catch (e) {
      console.error("Erreur lors de la lecture des positions", e);
    }
  };

  const clearStorageAndRefresh = () => {
    if (window.confirm("Voulez-vous vraiment vider TOUT le LocalStorage et recharger la page ?")) {
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
      const dataUrl = await toPng(element, {
        backgroundColor: "#05060A", 
        pixelRatio: 4,
      });
      
      const link = document.createElement("a");
      link.download = "ft_holy_constellation.png";
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Erreur lors de la capture:", error);
      alert("Erreur de capture. As-tu bien installé html-to-image ?");
    } finally {
      uiElements.forEach((el) => (el.style.opacity = "1"));
    }
  };

  const btnClass = "p-2 text-vellum-dim hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center";

  return (
    <Panel position="top-right">
      <div
        className="flex items-center gap-1 backdrop-blur-md transition-opacity duration-200"
        style={{
          background: "rgba(10, 12, 20, 0.85)",
          border: "1px solid #475569",
          borderRadius: 4,
          overflow: "hidden"
        }}
      >
        <button
          onClick={logPositions}
          className={btnClass}
          title="Log BDD dans la console"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
          </svg>
        </button>

        <div className="w-[1px] h-4 bg-slate-600 opacity-50" />

        <button
          onClick={takeScreenshot}
          className={btnClass}
          title="Capture d'écran HD"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
            <circle cx="12" cy="13" r="4"></circle>
          </svg>
        </button>

        <div className="w-[1px] h-4 bg-slate-600 opacity-50" />

        <button
          onClick={clearStorageAndRefresh}
          className={btnClass}
          title="Vider le LocalStorage"
        >
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
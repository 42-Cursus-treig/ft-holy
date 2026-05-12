import { Panel } from "@xyflow/react";
import { LS_POSITIONS_KEY } from "./config";

function DownloadButton() {
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

  return (
    <Panel position="top-right">
      <button
        onClick={logPositions}
        className="smallcaps text-[10px] text-vellum-dim hover:text-white transition-colors backdrop-blur-md px-3 py-2"
        style={{
          background: "rgba(10, 12, 20, 0.85)",
          border: "1px solid #475569",
          borderRadius: 2,
        }}
        title="Afficher les coordonnées dans la console"
      >
        Log BDD
      </button>
    </Panel>
  );
}

export default DownloadButton;
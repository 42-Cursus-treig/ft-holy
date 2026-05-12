import { useState, useCallback, useMemo, useEffect } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  Panel,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import FloatingEdge from "./FloatingEdge";
import { SearchBar } from "./SearchBar";
import { StatusNode } from "./StatusNode";
import { DetailPanel } from "./DetailPanel";
import { Hud } from "./Hud";
import { AuthModal } from "./AuthModal";
import DownloadButton from "./DownloadButton";

import { activeProjects } from "./projectList";
import { projectDefinitions, generateId } from "./projectDB";
import { useProgress } from "./useProgress";
import { useGitHubAuth, commitProgress } from "./useGitHubAuth";
import { LS_POSITIONS_KEY } from "./config";

const styleEdges = (nodes, edges, currentGraph) => {
  return edges.map((edge) => {
    const sourceNode = nodes.find((n) => n.id === edge.source);
    const status = sourceNode?.data?.status;
    const isPiscineModule = currentGraph !== "main";

    const color =
      status === "validated" ? "#D4AF37" : status === "failed" ? "#A63D2A" : "#1C2030";

    const base = {
      ...edge,
      type: "floating",
      markerEnd: isPiscineModule
        ? { type: "arrowclosed", width: 14, height: 14, color }
        : undefined,
    };

    if (status === "validated") {
      return { ...base, animated: true, style: { stroke: "#D4AF37", strokeWidth: 1.2, opacity: 0.85 } };
    }
    if (status === "failed") {
      return { ...base, animated: false, style: { stroke: "#A63D2A", strokeWidth: 1, strokeDasharray: "4,4", opacity: 0.8 } };
    }
    return { ...base, animated: false, style: { stroke: "#2A2F40", strokeWidth: 0.8, opacity: 0.55 } };
  });
};

const readPositions = () => {
  try {
    const raw = localStorage.getItem(LS_POSITIONS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};
const writePositions = (positions) => {
  try {
    localStorage.setItem(LS_POSITIONS_KEY, JSON.stringify(positions));
  } catch {}
};

export default function App() {
  const [nodes, setNodes, onNodesChanges] = useNodesState([]);
  const [edges, setEdges, onEdgesChanges] = useEdgesState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [currentGraph, setCurrentGraph] = useState("main");
  const [authOpen, setAuthOpen] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [syncError, setSyncError] = useState(null);

  const { fitView } = useReactFlow();
  const edgeTypes = useMemo(() => ({ floating: FloatingEdge }), []);
  const nodeTypes = useMemo(() => ({ statusNode: StatusNode }), []);

  const progress = useProgress();
  const auth = useGitHubAuth();
  const isAdmin = auth.isAdmin;

  const buildGraph = useCallback(
    (graphId) => {
      const customPositions = isAdmin ? readPositions() : {};
      let freshNodes = [];
      let freshEdges = [];

      if (graphId === "main") {
        freshNodes = activeProjects
          .map((name) => {
            const id = generateId(name);
            const def = projectDefinitions[id];
            if (!def) return null;
            return {
              id,
              type: "statusNode",
              position: customPositions[id] || def.position || { x: 0, y: 0 },
              draggable: isAdmin && !def.locked,
              data: {
                label: name,
                status: progress.getStatus(id),
                language: def.lang,
                logoColor: def.logoColor,
                description: def.desc,
                size: def.size,
                subProjects: def.subProjects,
                linkID: def.linkID,
                modules: def.modules,
                moduleStatuses: def.modules
                  ? Object.fromEntries(def.modules.map((m) => [m.id, progress.getStatus(m.id)]))
                  : undefined,
              },
            };
          })
          .filter(Boolean);

        freshNodes.forEach((node) => {
          const def = projectDefinitions[node.id];
          if (def?.parents) {
            def.parents.forEach((pid) => {
              if (activeProjects.some((p) => generateId(p) === pid)) {
                freshEdges.push({ id: `e-${pid}-${node.id}`, source: pid, target: node.id });
              }
            });
          }
        });
      } else {
        const def = projectDefinitions[graphId];
        if (def?.modules?.length) {
          const radius = 300;
          freshNodes = def.modules.map((mod, i) => {
            const angle = (i / def.modules.length) * 2 * Math.PI;
            const x = customPositions[mod.id]?.x ?? radius * Math.cos(angle);
            const y = customPositions[mod.id]?.y ?? radius * Math.sin(angle);
            return {
              id: mod.id,
              type: "statusNode",
              position: { x, y },
              draggable: isAdmin,
              data: {
                label: mod.label,
                status: progress.getStatus(mod.id),
                size: 75,
                linkID: mod.linkID,
                description: mod.description,
                language: def.lang,
                logoColor: def.logoColor,
              },
            };
          });
          def.modules.forEach((mod) => {
            (mod.parents || []).forEach((pid) => {
              freshEdges.push({ id: `e-${pid}-${mod.id}`, source: pid, target: mod.id });
            });
          });
        } else {
          freshNodes = [
            {
              id: "wip",
              type: "statusNode",
              position: { x: 0, y: 0 },
              data: { label: "Contenu à venir", status: "available", size: 80 },
            },
          ];
        }
      }

      setNodes(freshNodes);
      setEdges(styleEdges(freshNodes, freshEdges, graphId));
      setTimeout(() => fitView({ duration: 800, padding: 0.2 }), 50);
    },
    [progress, isAdmin, setNodes, setEdges, fitView]
  );

  // Rebuild quand la progression change ou quand on switche de graphe.
  useEffect(() => {
    buildGraph(currentGraph);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentGraph, progress.data, isAdmin]);

  // -------------------------------------------------------------------------
  // Interactions
  // -------------------------------------------------------------------------
  const onNodeDoubleClick = useCallback((_e, node) => {
    if (node.data.label?.toLowerCase().includes("piscine") && projectDefinitions[node.id]?.modules) {
      setCurrentGraph(node.id);
      setSelectedProjectId(null);
    }
  }, []);

  const onPaneClick = useCallback(() => setSelectedProjectId(null), []);

  const onNodeClick = useCallback((e, node) => {
    e.stopPropagation();
    setSelectedProjectId(node.id);
  }, []);

  const selectedNode = nodes.find((n) => n.id === selectedProjectId);

  const updateStatus = (newStatus) => {
    if (!selectedNode || !isAdmin) return;
    progress.setStatus(selectedNode.id, newStatus);
  };

  // Sauvegarde des positions quand l'admin drag les nodes.
  const onNodesChangeWithSave = useCallback(
    (changes) => {
      onNodesChanges(changes);
      if (!isAdmin) return;
      const positionChanges = changes.filter((c) => c.type === "position" && c.position);
      if (positionChanges.length === 0) return;
      const stored = readPositions();
      positionChanges.forEach((c) => {
        stored[c.id] = c.position;
      });
      writePositions(stored);
    },
    [onNodesChanges, isAdmin]
  );

  // -------------------------------------------------------------------------
  // Push vers GitHub
  // -------------------------------------------------------------------------
  const handleSync = async () => {
    if (!auth.user?.token) return;
    setSyncing(true);
    setSyncError(null);
    try {
      await commitProgress(auth.user.token, progress.data);
      progress.markSynced(progress.data);
    } catch (e) {
      setSyncError(e.message || String(e));
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="w-screen h-screen relative bg-ink-deep parchment-vignette">
      <div className="starfield" />

      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChangeWithSave}
        onEdgesChange={onEdgesChanges}
        onNodeClick={onNodeClick}
        onNodeDoubleClick={onNodeDoubleClick}
        onPaneClick={onPaneClick}
        fitView
        minZoom={0.15}
        maxZoom={2.5}
        proOptions={{ hideAttribution: true }}
        style={{ zIndex: 2 }}
      >
        <Background color="#1C2030" gap={40} size={1} />
        <Controls showInteractive={false} />

        {currentGraph !== "main" && (
          <Panel position="top-center">
            <button
              onClick={() => setCurrentGraph("main")}
              className="mt-4 px-4 py-2 smallcaps text-[10px] text-vellum-dim hover:text-gold transition-colors backdrop-blur-md"
              style={{
                background: "rgba(10, 12, 20, 0.85)",
                border: "1px solid var(--ink-line)",
                borderRadius: 2,
              }}
            >
              ← retour à la carte principale
            </button>
          </Panel>
        )}

        <Panel position="top-left">
          <SearchBar nodes={nodes} onSelectNode={setSelectedProjectId} />
        </Panel>

        <DownloadButton />
      </ReactFlow>

      {selectedNode && (
        <DetailPanel
          node={selectedNode}
          isAdmin={isAdmin}
          onUpdateStatus={updateStatus}
          onClose={() => setSelectedProjectId(null)}
        />
      )}

      <Hud
        progress={progress.data}
        definitions={projectDefinitions}
        isAdmin={isAdmin}
        user={auth.user}
        hasLocalDraft={progress.hasLocalDraft}
        onOpenAuth={() => setAuthOpen(true)}
        onSync={handleSync}
        syncing={syncing}
        onLogout={auth.logout}
      />

      {syncError && (
        <div
          className="absolute bottom-20 left-5 max-w-md px-4 py-2 text-xs font-mono text-rust z-20"
          style={{
            background: "rgba(10, 12, 20, 0.95)",
            border: "1px solid var(--rust-soft)",
            borderRadius: 2,
          }}
        >
          {syncError}
        </div>
      )}

      {authOpen && !isAdmin && (
        <AuthModal auth={auth} onClose={() => setAuthOpen(false)} />
      )}

      {/* Titre discret en haut à droite, signature de la carte */}
      <div
        className="absolute top-5 left-1/2 -translate-x-1/2 z-0 pointer-events-none text-center"
        style={{ opacity: 0.5 }}
      >
        <div className="smallcaps text-[9px] text-vellum-mute">CHARTA STELLARUM</div>
        <div className="font-serif italic text-vellum-dim text-sm">ft_holy</div>
      </div>
    </div>
  );
}
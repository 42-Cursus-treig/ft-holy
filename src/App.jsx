import { useState, useCallback, useMemo, useEffect, useRef } from "react";
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
import DevToolbar from "./DevToolbar";

import { activeProjects } from "./projectList";
import { generateId, rushList } from "./projectDB";
import { getDefinitions } from "./graphs";
import { useProgress } from "./useProgress";
import { useGitHubAuth, commitProgress } from "./useGitHubAuth";
import { LS_POSITIONS_KEY, GRAPH, READ_ONLY, COMPACT } from "./config";

const styleEdges = (nodes, edges, currentGraph) => {
  return edges.map((edge) => {
    const sourceNode = nodes.find((n) => n.id === edge.source);
    let status = sourceNode?.data?.status;

    if (sourceNode?.data?.subProjects && sourceNode.data.subProjectStatuses) {
      const isGroupValidated = sourceNode.data.subProjects.some((sub) => {
        const subId = sub.id || sub;
        return sourceNode.data.subProjectStatuses[subId] === "validated";
      });
      if (isGroupValidated) {
        status = "validated";
      }
    }

    const isPiscineModule = currentGraph !== "main";

    const color =
      status === "validated"
        ? "#D4AF37"
        : status === "failed"
        ? "#A63D2A"
        : status === "in-progress"
        ? "#4A90D9"
        : "#7C86A8";

    const base = {
      ...edge,
      type: "floating",
      markerEnd: isPiscineModule
        ? { type: "arrowclosed", width: 18, height: 18, color }
        : undefined,
    };

    if (status === "validated") {
      return { ...base, animated: true, style: { stroke: "#D4AF37", strokeWidth: 1.6, opacity: 1 } };
    }
    if (status === "failed") {
      return { ...base, animated: false, style: { stroke: "#A63D2A", strokeWidth: 1.4, strokeDasharray: "4,4", opacity: 0.9 } };
    }
    if (status === "in-progress") {
      return { ...base, animated: true, style: { stroke: "#4A90D9", strokeWidth: 1.6, opacity: 0.9 } };
    }
    return { ...base, animated: false, style: { stroke: "#7C86A8", strokeWidth: 1.6, opacity: 0.95 } };
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
  const isPool = GRAPH === "pool";
  const definitions = useMemo(() => getDefinitions(GRAPH), []);

  const [nodes, setNodes, onNodesChanges] = useNodesState([]);
  const [edges, setEdges, onEdgesChanges] = useEdgesState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [currentGraph, setCurrentGraph] = useState(isPool ? "pool" : "main");
  const [authOpen, setAuthOpen] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [syncError, setSyncError] = useState(null);

  const { fitView } = useReactFlow();
  const edgeTypes = useMemo(() => ({ floating: FloatingEdge }), []);
  const nodeTypes = useMemo(() => ({ statusNode: StatusNode }), []);

  const progress = useProgress();
  const auth = useGitHubAuth();
  const isAdmin = auth.isAdmin && !READ_ONLY;

  const buildGraph = useCallback(
    (graphId, shouldFitView = false) => {
      const customPositions = isAdmin ? readPositions() : {};
      let freshNodes = [];
      let freshEdges = [];

      if (graphId === "pool") {
        freshNodes = Object.entries(definitions).map(([id, def]) => ({
          id,
          type: "statusNode",
          position: customPositions[id] || def.position || { x: 0, y: 0 },
          draggable: !COMPACT,
          data: {
            label: def.label || id,
            status: progress.getStatus(id),
            mark: progress.getMark(id),
            language: def.lang,
            logoColor: def.logoColor,
            description: def.desc,
            size: def.size || 70,
            linkID: def.linkID,
            langPdf: def.langPdf,
            isPool: true,
          },
        }));

        Object.entries(definitions).forEach(([id, def]) => {
          (def.parents || []).forEach((pid) => {
            if (definitions[pid]) {
              freshEdges.push({ id: `e-${pid}-${id}`, source: pid, target: id });
            }
          });
        });

        setNodes(freshNodes);
        setEdges(styleEdges(freshNodes, freshEdges, graphId));
        if (shouldFitView) {
          setTimeout(() => fitView({ duration: 800, padding: COMPACT ? 0.05 : 0.15 }), 50);
        }
        return;
      }

      if (graphId === "main") {
        freshNodes = activeProjects
          .map((name) => {
            const id = generateId(name);
            const def = definitions[id];
            if (!def) return null;
            return {
              id,
              type: "statusNode",
              position: customPositions[id] || def.position || { x: 0, y: 0 },
              draggable: !def.locked,
              data: {
                label: name,
                status: progress.getStatus(id),
                mark: progress.getMark(id),
                language: def.lang,
                logoColor: def.logoColor,
                description: def.desc,
                size: def.size,
                subProjects: def.subProjects,
                subProjectStatuses: def.subProjects
                  ? Object.fromEntries(def.subProjects.map((sub) => [sub.id, progress.getStatus(sub.id)]))
                  : undefined,
                subProjectModules: def.subProjects
                  ? Object.fromEntries(def.subProjects.map((sub) => {
                      const subId = sub.id || sub;
                      const subDef = definitions[subId];
                      if (subDef && subDef.modules) {
                        const valCount = subDef.modules.filter(m => progress.getStatus(m.id) === "validated").length;
                        return [subId, `${valCount}/${subDef.modules.length}`];
                      }
                      return [subId, null];
                    }))
                  : undefined,
                onSubClick: (subId) => setSelectedProjectId(subId),
                onSubDoubleClick: (subId) => {
                  if (definitions[subId]?.modules) {
                    setCurrentGraph(subId);
                    setSelectedProjectId(null);
                  }
                },
                linkID: def.linkID,
                langPdf: def.langPdf,
                modules: def.modules,
                moduleStatuses: def.modules
                  ? Object.fromEntries(def.modules.map((m) => [m.id, progress.getStatus(m.id)]))
                  : undefined,
              },
            };
          })
          .filter(Boolean);

        freshNodes.forEach((node) => {
          const def = definitions[node.id];
          if (def?.parents) {
            def.parents.forEach((pid) => {
              if (activeProjects.some((p) => generateId(p) === pid)) {
                freshEdges.push({ id: `e-${pid}-${node.id}`, source: pid, target: node.id });
              }
            });
          }
        });
      } else if (graphId === "rush") {
        const gap = 150;
        const rushSize = 70;
        const perRow = 5;
        const rowCounts = [];
        let remaining = rushList.length;
        while (remaining > 0) {
          rowCounts.push(Math.min(perRow, remaining));
          remaining -= perRow;
        }
        const maxCols = Math.max(...rowCounts, 0);

        let rushIndex = 0;
        rowCounts.forEach((count, row) => {
          const rowOffset = ((maxCols - count) * gap) / 2;
          for (let col = 0; col < count; col++) {
            const rush = rushList[rushIndex];
            freshNodes.push({
              id: rush.id,
              type: "statusNode",
              position: { x: rowOffset + col * gap, y: row * gap },
              draggable: true,
              data: {
                label: rush.label,
                status: progress.getStatus(rush.id),
                mark: progress.getMark(rush.id),
                size: rushSize,
                linkID: rush.linkID,
                pdfUrl: rush.pdfUrl,
                langPdf: rush.langPdf,
                description: rush.description ?? rush.desc,
                language: rush.lang,
                logoColor: rush.logoColor,
              },
            });
            rushIndex++;
          }
        });
      } else {
        const def = definitions[graphId];
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
              draggable: true,
              data: {
                label: mod.label,
                status: progress.getStatus(mod.id),
                mark: progress.getMark(mod.id),
                size: 75,
                linkID: mod.linkID,
                langPdf: mod.langPdf ?? def.langPdf,
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

      if (shouldFitView) {
        if (graphId === "rush") {
          setTimeout(() => fitView({ duration: 800, padding: 0.45, maxZoom: 1 }), 50);
        } else {
          setTimeout(() => fitView({ duration: 800, padding: 0.2 }), 50);
        }
      }
    },
    [progress, isAdmin, definitions, setNodes, setEdges, fitView]
  );

  const lastGraph = useRef(null);

  useEffect(() => {
    const isNewGraph = lastGraph.current !== currentGraph;
    buildGraph(currentGraph, isNewGraph);
    lastGraph.current = currentGraph;
  }, [currentGraph, progress.data, isAdmin]);

  const onNodeDoubleClick = useCallback((_e, node) => {
    if (isPool || COMPACT) return;
    if (node.data.label?.toLowerCase().includes("piscine") && definitions[node.id]?.modules) {
      setCurrentGraph(node.id);
      setSelectedProjectId(null);
    }
  }, [isPool, definitions]);

  const onPaneClick = useCallback(() => {
    if (COMPACT) {
      window.parent.postMessage({ type: "holy:expand" }, "*");
      return;
    }
    setSelectedProjectId(null);
  }, []);

  const onNodeClick = useCallback((e, node) => {
    e.stopPropagation();
    if (COMPACT) {
      window.parent.postMessage({ type: "holy:expand" }, "*");
      return;
    }
    setSelectedProjectId(node.id);
  }, []);

  let selectedNode = nodes.find((n) => n.id === selectedProjectId);

  if (!selectedNode && selectedProjectId) {
    for (const n of nodes) {
      if (n.data.subProjects) {
        const sub = n.data.subProjects.find(s => s.id === selectedProjectId);
        if (sub) {
          selectedNode = {
            id: sub.id,
            data: {
              label: sub.label,
              status: progress.getStatus(sub.id),
              mark: progress.getMark(sub.id),
            },
          };
          break;
        }
      }
    }
  }

  const updateStatus = (newStatus) => {
    if (!selectedNode || !isAdmin) return;
    progress.setStatus(selectedNode.id, newStatus);
  };

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
        panOnDrag={!COMPACT}
        zoomOnScroll={!COMPACT}
        proOptions={{ hideAttribution: true }}
        style={{ zIndex: 2 }}
      >
        <Background color="#1C2030" gap={40} size={1} />
        {!COMPACT && <Controls showInteractive={false} />}

        {currentGraph !== "main" && !isPool && !COMPACT && (
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

        {!COMPACT && (
          <Panel position="top-left">
            <SearchBar nodes={nodes} onSelectNode={setSelectedProjectId} />
          </Panel>
        )}

        {!READ_ONLY && <DevToolbar />}
      </ReactFlow>

      {selectedNode && !COMPACT && (
        <DetailPanel
          node={selectedNode}
          isAdmin={isAdmin}
          onUpdateStatus={updateStatus}
          onClose={() => setSelectedProjectId(null)}
        />
      )}

      {!isPool && !COMPACT && (
        <Hud
          progress={progress.data}
          definitions={definitions}
          isAdmin={isAdmin}
          user={auth.user}
          hasLocalDraft={progress.hasLocalDraft}
          onOpenAuth={() => setAuthOpen(true)}
          onSync={handleSync}
          syncing={syncing}
          onLogout={auth.logout}
          onOpenRush={() => setCurrentGraph("rush")}
          currentGraph={currentGraph}
        />
      )}

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

      {authOpen && !isAdmin && !READ_ONLY && (
        <AuthModal auth={auth} onClose={() => setAuthOpen(false)} />
      )}

      {!COMPACT && (
        <div
          className="absolute top-5 left-1/2 -translate-x-1/2 z-0 pointer-events-none text-center"
          style={{ opacity: 0.5 }}
        >
          <div className="font-serif italic text-vellum-dim text-sm">ft_holy</div>
        </div>
      )}
    </div>
  );
}

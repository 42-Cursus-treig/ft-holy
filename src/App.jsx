import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import {
  ReactFlow,
  Background,
  Panel,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import FloatingEdge from "./graph/FloatingEdge";
import { SearchBar } from "./ui/SearchBar";
import { StatusNode } from "./graph/StatusNode";
import { DetailPanel } from "./ui/DetailPanel";
import { Hud } from "./ui/Hud";
import { AuthModal } from "./ui/AuthModal";
import { GraphSwitcher } from "./ui/GraphSwitcher";
import { OrbitRing } from "./graph/OrbitRing";
import { Starfield } from "./graph/Starfield";
import DevToolbar from "./ui/DevToolbar";
import { NotFound } from "./ui/NotFound";

import { generateId, rushList } from "./data/projectDB";
import {
  WORLDS,
  WORLD_ORDER,
  INITIAL_WORLD,
  getWorld,
  childIdsOf,
  radialLayout,
} from "./data/graphs";
import { useProgress } from "./hooks/useProgress";
import { useGitHubAuth } from "./hooks/useGitHubAuth";
import { commitProgress } from "./lib/github";
import { positionsKey, READ_ONLY, COMPACT, LOGIN } from "./config";

const EDGE_COLORS = {
  validated: "#D4AF37",
  failed: "#A63D2A",
  "in-progress": "#4A90D9",
  idle: "#7C86A8",
};

const styleEdges = (nodes, edges, showArrows) =>
  edges.map((edge) => {
    const sourceNode = nodes.find((n) => n.id === edge.source);
    let status = sourceNode?.data?.status;

    if (sourceNode?.data?.subProjects && sourceNode.data.subProjectStatuses) {
      const isGroupValidated = sourceNode.data.subProjects.some((sub) => {
        const subId = sub.id || sub;
        return sourceNode.data.subProjectStatuses[subId] === "validated";
      });
      if (isGroupValidated) status = "validated";
    }

    const color = EDGE_COLORS[status] || EDGE_COLORS.idle;

    const base = {
      ...edge,
      type: "floating",
      markerEnd: showArrows
        ? { type: "arrowclosed", width: 18, height: 18, color }
        : undefined,
    };

    if (status === "validated") {
      return { ...base, animated: true, style: { stroke: color, strokeWidth: 1.6, opacity: 1 } };
    }
    if (status === "failed") {
      return {
        ...base,
        animated: false,
        style: { stroke: color, strokeWidth: 1.4, strokeDasharray: "4,4", opacity: 0.9 },
      };
    }
    if (status === "in-progress") {
      return { ...base, animated: true, style: { stroke: color, strokeWidth: 1.6, opacity: 0.9 } };
    }
    return { ...base, animated: false, style: { stroke: color, strokeWidth: 1.6, opacity: 0.95 } };
  });

const readPositions = (worldId) => {
  try {
    const raw = localStorage.getItem(positionsKey(worldId));
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

const writePositions = (worldId, positions) => {
  try {
    localStorage.setItem(positionsKey(worldId), JSON.stringify(positions));
  } catch {}
};

export default function App() {
  const [worldId, setWorldId] = useState(INITIAL_WORLD);
  const [subGraph, setSubGraph] = useState(null);
  const [nodes, setNodes, onNodesChanges] = useNodesState([]);
  const [edges, setEdges, onEdgesChanges] = useEdgesState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [syncError, setSyncError] = useState(null);
  const paneRef = useRef(null);

  const world = getWorld(worldId);
  const definitions = world.definitions;
  const childIds = useMemo(() => childIdsOf(definitions), [definitions]);

  const { fitView, getViewport, setViewport } = useReactFlow();
  const edgeTypes = useMemo(() => ({ floating: FloatingEdge }), []);
  const nodeTypes = useMemo(() => ({ statusNode: StatusNode, orbitRing: OrbitRing }), []);

  const progress = useProgress();
  const auth = useGitHubAuth();
  const isAdmin = auth.isAdmin && !READ_ONLY;

  const worldOrder = useMemo(
    () =>
      progress.worlds
        ? WORLD_ORDER.filter((id) => progress.worlds.includes(id))
        : WORLD_ORDER,
    [progress.worlds]
  );

  useEffect(() => {
    if (worldOrder.length && !worldOrder.includes(worldId)) {
      setWorldId(worldOrder[0]);
      setSubGraph(null);
      setSelectedProjectId(null);
    }
  }, [worldOrder, worldId]);

  const buildGraph = useCallback(
    (shouldFitView = false) => {
      const customPositions = isAdmin ? readPositions(worldId) : {};
      let freshNodes = [];
      let freshEdges = [];
      let showArrows = true;
      let padding = world.fitPadding ?? 0.2;
      let maxZoom = world.fitMaxZoom;

      // ---- Grille des rushes ------------------------------------------
      if (subGraph === "rush") {
        const gap = 150;
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
                size: 70,
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
        padding = 0.45;
        maxZoom = 1;
      }

      // ---- Modules d'un projet ------------------
      else if (subGraph) {
        const def = definitions[subGraph];
        if (def?.modules?.length) {
          const radius = 300;
          freshNodes = def.modules.map((mod, i) => {
            const angle = (i / def.modules.length) * 2 * Math.PI;
            return {
              id: mod.id,
              type: "statusNode",
              position: {
                x: customPositions[mod.id]?.x ?? radius * Math.cos(angle),
                y: customPositions[mod.id]?.y ?? radius * Math.sin(angle),
              },
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

      // ---- Racine d'une planche ---------------------------------------
      else {
        showArrows = world.showArrows ?? true;

        const entries = world.order
          ? world.order
              .map((name) => {
                const id = generateId(name);
                const def = definitions[id];
                return def ? { id, def, label: name } : null;
              })
              .filter(Boolean)
          : Object.entries(definitions)
              .filter(([id]) => !childIds.has(id))
              .map(([id, def]) => ({ id, def, label: def.label || id }));

        const radial =
          world.layout === "radial"
            ? radialLayout(entries, world, progress.getStatus)
            : null;

        freshNodes = entries.map(({ id, def, label }) => ({
          id,
          type: "statusNode",
          position:
            customPositions[id] || radial?.positions[id] || def.position || { x: 0, y: 0 },
          draggable: !def.locked && !COMPACT,
          data: {
            label,
            status: progress.getStatus(id),
            mark: progress.getMark(id),
            language: def.lang,
            logoColor: def.logoColor,
            description: def.desc,
            size: def.size ?? world.nodeSize,
            shape: def.shape,
            linkID: def.linkID,
            pdfUrl: def.pdfUrl,
            url: def.url,
            langPdf: def.langPdf,
            subProjects: def.subProjects,
            subProjectStatuses: def.subProjects
              ? Object.fromEntries(
                  def.subProjects.map((sub) => {
                    const subId = sub.id || sub;
                    return [subId, progress.getStatus(subId)];
                  })
                )
              : undefined,
            subProjectModules: def.subProjects
              ? Object.fromEntries(
                  def.subProjects.map((sub) => {
                    const subId = sub.id || sub;
                    const subDef = definitions[subId];
                    if (subDef?.modules) {
                      const done = subDef.modules.filter(
                        (m) => progress.getStatus(m.id) === "validated"
                      ).length;
                      return [subId, `${done}/${subDef.modules.length}`];
                    }
                    return [subId, null];
                  })
                )
              : undefined,
            onSubClick: (subId) => setSelectedProjectId(subId),
            onSubDoubleClick: (subId) => {
              if (definitions[subId]?.modules) {
                setSubGraph(subId);
                setSelectedProjectId(null);
              }
            },
            modules: def.modules,
            moduleStatuses: def.modules
              ? Object.fromEntries(def.modules.map((m) => [m.id, progress.getStatus(m.id)]))
              : undefined,
          },
        }));

        if (world.showEdges !== false) {
          const nodeIds = new Set(freshNodes.map((n) => n.id));
          entries.forEach(({ id, def }) => {
            (def.parents || []).forEach((pid) => {
              if (nodeIds.has(pid)) {
                freshEdges.push({ id: `e-${pid}-${id}`, source: pid, target: id });
              }
            });
          });
        }

        if (freshNodes.length === 0) {
          freshNodes = [
            {
              id: "wip",
              type: "statusNode",
              position: { x: 0, y: 0 },
              data: { label: "Contenu à venir", status: "available", size: 90 },
            },
          ];
        }

        if (radial) {
          freshNodes = [
            ...radial.rings.map((ring) => ({
              id: `orbit-${Math.round(ring.rx)}-${Math.round(ring.ry)}`,
              type: "orbitRing",
              position: { x: -ring.rx, y: -ring.ry },
              data: ring,
              draggable: false,
              selectable: false,
              focusable: false,
              zIndex: -1,
              style: { pointerEvents: "none" },
            })),
            ...freshNodes,
          ];
        }
      }

      setNodes(freshNodes);
      setEdges(styleEdges(freshNodes, freshEdges, showArrows));

      if (shouldFitView) {
        const inset = COMPACT ? 0 : world.topInset ?? 0;
        setTimeout(() => {
          Promise.resolve(
            fitView({
              duration: inset ? 0 : 800,
              padding: COMPACT ? 0.05 : padding,
              maxZoom,
            })
          ).then(() => {
            const pane = paneRef.current;
            if (!inset || !pane) return;

            const { width, height } = pane.getBoundingClientRect();
            if (height <= inset) return;

            const { x, y, zoom } = getViewport();
            const centerX = (width / 2 - x) / zoom;
            const centerY = (height / 2 - y) / zoom;
            const nextZoom = zoom * ((height - inset) / height);

            setViewport({
              x: width / 2 - centerX * nextZoom,
              y: inset + (height - inset) / 2 - centerY * nextZoom,
              zoom: nextZoom,
            });
          });
        }, 50);
      }
    },
    [
      worldId,
      subGraph,
      world,
      definitions,
      childIds,
      progress,
      isAdmin,
      setNodes,
      setEdges,
      fitView,
      getViewport,
      setViewport,
    ]
  );

  const lastGraphKey = useRef(null);

  useEffect(() => {
    const key = `${worldId}/${subGraph ?? "root"}`;
    buildGraph(lastGraphKey.current !== key);
    lastGraphKey.current = key;
  }, [worldId, subGraph, progress.data, isAdmin]);

  useEffect(() => {
    if (COMPACT || window.parent === window) return;
    const onKey = (e) => {
      if (e.key === "Escape") window.parent.postMessage({ type: "holy:collapse" }, "*");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const selectWorld = useCallback((id) => {
    setWorldId(id);
    setSubGraph(null);
    setSelectedProjectId(null);
  }, []);

  const onNodeDoubleClick = useCallback(
    (_e, node) => {
      if (COMPACT || subGraph) return;
      if (definitions[node.id]?.modules?.length) {
        setSubGraph(node.id);
        setSelectedProjectId(null);
      }
    },
    [definitions, subGraph]
  );

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

  let selectedNode = nodes.find((n) => n.id === selectedProjectId) || null;
  if (!selectedNode && selectedProjectId) {
    const parent = nodes.find((n) =>
      n.data.subProjects?.some((s) => (s.id || s) === selectedProjectId)
    );
    const sub = parent?.data.subProjects.find((s) => (s.id || s) === selectedProjectId);
    const def = definitions[selectedProjectId];

    if (sub || def) {
      const source = { ...def, ...(typeof sub === "object" ? sub : null) };
      selectedNode = {
        id: selectedProjectId,
        data: {
          label: source.label || selectedProjectId,
          status: progress.getStatus(selectedProjectId),
          mark: progress.getMark(selectedProjectId),
          description: source.desc,
          language: source.lang,
          logoColor: source.logoColor,
          linkID: source.linkID,
          pdfUrl: source.pdfUrl,
          url: source.url,
          langPdf: source.langPdf,
        },
      };
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
      const stored = readPositions(worldId);
      positionChanges.forEach((c) => {
        stored[c.id] = c.position;
      });
      writePositions(worldId, stored);
    },
    [onNodesChanges, isAdmin, worldId]
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

  const subLabel =
    subGraph === "rush"
      ? "Rushes"
      : subGraph
      ? definitions[subGraph]?.label || subGraph
      : null;

  if (progress.error && progress.remoteLoaded) {
    return <NotFound login={LOGIN} message={progress.error} />;
  }

  return (
    <div
      ref={paneRef}
      className="w-screen h-screen relative bg-ink-deep parchment-vignette"
    >
      <Starfield />

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
        {!COMPACT && (
          <Panel position="top-center">
            <GraphSwitcher
              worlds={WORLDS}
              order={worldOrder}
              currentWorld={worldId}
              subLabel={subLabel}
              onSelect={selectWorld}
              onBack={() => {
                setSubGraph(null);
                setSelectedProjectId(null);
              }}
            />
          </Panel>
        )}

        {!COMPACT && (
          <Panel position="top-left">
            <SearchBar nodes={nodes} onSelectNode={setSelectedProjectId} />
          </Panel>
        )}

        {!READ_ONLY && <DevToolbar worldId={worldId} />}
      </ReactFlow>

      {selectedNode && !COMPACT && (
        <DetailPanel
          node={selectedNode}
          isAdmin={isAdmin}
          onUpdateStatus={updateStatus}
          onClose={() => setSelectedProjectId(null)}
        />
      )}

      {!COMPACT && (
        <Hud
          progress={progress.data}
          definitions={definitions}
          world={world}
          isAdmin={isAdmin}
          user={auth.user}
          hasLocalDraft={progress.hasLocalDraft}
          onOpenAuth={() => setAuthOpen(true)}
          onSync={handleSync}
          syncing={syncing}
          onLogout={auth.logout}
          onOpenRush={() => setSubGraph(subGraph === "rush" ? null : "rush")}
          subGraph={subGraph}
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
    </div>
  );
}

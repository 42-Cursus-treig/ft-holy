import { useState, useCallback, useMemo, useEffect } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  Panel,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import FloatingEdge from "./FloatingEdge";
import { SearchBar } from "./SearchBar";
import { StatusNode, getIconUrl } from "./StatusNode";
import { activeProjects } from "./projectList"; 
import { projectDefinitions, generateId } from "./projectDB";
import DownloadButton from './DownloadButton';

const getStyledEdges = (nodes, edges) => {
  return edges.map((edge) => {
    const sourceNode = nodes.find((n) => n.id === edge.source);
    const status = sourceNode?.data?.status;

    const baseEdge = {
      ...edge,
      type: 'floating',
    };

    if (status === 'validated') {
      return { 
        ...baseEdge, 
        animated: true, 
        style: { stroke: '#34d399', strokeWidth: 2 } 
      };
    }
    if (status === 'failed') {
      return { 
        ...baseEdge, 
        animated: false, 
        style: { stroke: '#ef4444', strokeWidth: 2, strokeDasharray: '5,5' } 
      };
    }
    
    return { 
      ...baseEdge, 
      animated: false, 
      style: { stroke: '#475569', strokeWidth: 1 } 
    };
  });
};

export default function App() {
  const [nodes, setNodes, onNodesChanges] = useNodesState([]);
  const [edges, setEdges, onEdgesChanges] = useEdgesState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const edgeTypes = useMemo(() => ({ floating: FloatingEdge }), []);
  const nodeTypes = useMemo(() => ({ statusNode: StatusNode }), []);

  useEffect(() => {
    const freshNodes = activeProjects.map((name, index) => {
      const id = generateId(name);
      const def = projectDefinitions[id] || {};
      
      return {
        id: id,
        type: "statusNode",
        position: def.position || { x: 0, y: 0 },
        draggable: !def.locked,
        data: {
          label: name,
          status: "available",
          language: def.lang,
          logoColor: def.logoColor,
          description: def.desc,
          size: def.size,
          subProjects: def.subProjects
        }
      };
    });

    const freshEdges = [];
    freshNodes.forEach(node => {
      const def = projectDefinitions[node.id];
      if (def && def.parents) {
        def.parents.forEach(parentId => {
          if (activeProjects.some(p => generateId(p) === parentId)) {
            freshEdges.push({
              id: `e-${parentId}-${node.id}`,
              source: parentId,
              target: node.id
            });
          }
        });
      }
    });

    const savedJSON = localStorage.getItem("holy-nodes");
    const savedNodes = savedJSON ? JSON.parse(savedJSON) : [];
    
    const mergedNodes = freshNodes.map((freshNode) => {
      const savedNode = savedNodes.find((n) => n.id === freshNode.id);
      if (savedNode) {
        return {
          ...freshNode,
          position: savedNode.position,
          data: { ...freshNode.data, status: savedNode.data.status }
        };
      }
      return freshNode;
    });

    const styledEdges = getStyledEdges(mergedNodes, freshEdges);
    setNodes(mergedNodes);
    setEdges(styledEdges);
  }, []);

  const onPaneClick = useCallback(() => setSelectedProjectId(null), []);
  
  const onNodeClick = useCallback((event, node) => {
    event.stopPropagation();
    setSelectedProjectId(node.id);
  }, []);

  const selectedNode = nodes.find(n => n.id === selectedProjectId);

  const updateStatus = (newStatus) => {
    if (!selectedNode) return;

    const updatedNodes = nodes.map((n) => {
      if (n.id === selectedNode.id) {
        return { ...n, data: { ...n.data, status: newStatus } };
      }
      return n;
    });

    setNodes(updatedNodes);
    localStorage.setItem("holy-nodes", JSON.stringify(updatedNodes));
    const newEdges = getStyledEdges(updatedNodes, edges);
    setEdges(newEdges);
  };

  const onNodesChangeWithSave = useCallback((changes) => {
    onNodesChanges(changes);
    setNodes((nds) => {
        localStorage.setItem("holy-nodes", JSON.stringify(nds));
        return nds;
    });
  }, [onNodesChanges, setNodes]);

  return (
    <div className="w-screen h-screen bg-slate-950 relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChangeWithSave}
        onEdgesChange={onEdgesChanges}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        fitView
      >
        <Background color="#334155" gap={30} size={1} />
        <Controls className="fill-slate-500" />
        <Panel position="top-left">
          <SearchBar nodes={nodes} onSelectNode={setSelectedProjectId} />
        </Panel>
        <DownloadButton />
      </ReactFlow>

      {selectedNode && (
        <div className="absolute top-5 right-5 w-[300px] p-5 bg-slate-800/90 text-white rounded-xl backdrop-blur-lg border border-slate-600 shadow-2xl z-10 transition-all duration-300">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-lg font-bold">{selectedNode.data.label}</h2>
            
            {selectedNode.data.language && (
               <img 
                 src={getIconUrl(selectedNode.data.language, selectedNode.data.logoColor)} 
                 className="w-6 h-6 opacity-90" 
                 alt="" 
               />
            )}
          </div>

          <div className="bg-slate-950/50 p-2 rounded mb-4 font-mono text-xs text-sky-400 border border-slate-700/50 flex justify-between">
            <span>x: <span className="text-white">{Math.round(selectedNode.position.x)}</span></span>
            <span>y: <span className="text-white">{Math.round(selectedNode.position.y)}</span></span>
          </div>

          <p className="text-slate-300 text-sm mb-4">
            {selectedNode.data.description || "Pas de description."}
          </p>
          
          {selectedNode.data.link && (
            <a href={selectedNode.data.link} target="_blank" rel="noreferrer" className="block mb-6 text-sky-400 hover:text-sky-300 transition text-sm font-medium">
              Lien vers le sujet
            </a>
          )}

          <div className="flex gap-2.5">
            <button onClick={() => updateStatus("validated")} className="flex-1 py-2 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold transition shadow-lg shadow-emerald-900/20">Valider</button>
            <button onClick={() => updateStatus("failed")} className="flex-1 py-2 rounded-md bg-red-500 hover:bg-red-400 text-white text-sm font-bold transition shadow-lg shadow-red-900/20">Invalider</button>
            <button onClick={() => updateStatus("available")} className="py-2 px-3 rounded-md border border-slate-600 text-slate-400 hover:text-white hover:border-slate-400 hover:bg-slate-700 transition" title="Reset">↺</button>
          </div>
        </div>
      )}
    </div>
  );
}
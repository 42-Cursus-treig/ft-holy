import { useState, useRef, useEffect } from "react";
import { useReactFlow } from "@xyflow/react";

export const SearchBar = ({ nodes, onSelectNode }) => {
  const [term, setTerm] = useState("");
  const inputRef = useRef(null);
  const { setCenter } = useReactFlow();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key == 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
  
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const results = term.trim() === "" 
    ? [] 
    : nodes.filter(n => n.data.label.toLowerCase().includes(term.toLowerCase()));

  const handleSelect = (node) => {
    setTerm("");
    inputRef.current?.blur();
    onSelectNode(node.id);
    
    const size = node.data.size || 60;
    const x = node.position.x + size / 2;
    const y = node.position.y + size / 2;
    
    setCenter(x, y, { zoom: 1.5, duration: 800 });
  };

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text" 
        placeholder="Rechercher..." 
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        className="w-64 px-4 py-2 bg-slate-800/90 text-white border border-slate-600 rounded-lg shadow-lg backdrop-blur-md focus:outline-none focus:border-sky-400 transition-colors"
      />
      {results.length > 0 && (
        <div className="absolute top-full left-0 w-full mt-2 bg-slate-800/95 border border-slate-600 rounded-lg shadow-2xl backdrop-blur-md overflow-hidden max-h-60 overflow-y-auto z-50">
          {results.map(n => (
            <div 
              key={n.id} 
              onClick={() => handleSelect(n)}
              className="px-4 py-3 hover:bg-slate-700 cursor-pointer text-sm font-bold text-slate-200 border-b border-slate-700/50 last:border-0 transition-colors"
            >
              {n.data.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
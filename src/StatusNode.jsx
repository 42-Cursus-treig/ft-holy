import { Handle, Position } from "@xyflow/react";

export const getIconUrl = (language, color) => {
  if (language && language.toLowerCase() === 'java')
    return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg';

  const safeColor = color ? color.replace('#', '') : 'white';
  return `https://cdn.simpleicons.org/${language}/${safeColor}`;
};

export const StatusNode = ({ data }) => {
  const size = data.size || 50;
  const isGroup = data.subProjects && data.subProjects.length > 0;
  const isPiscine = data.label && data.label.toLowerCase().includes("piscine");

  let progressText = null;
  
  if (isPiscine && data.modules && data.modules.length > 0) {
    try {
      const savedJSON = localStorage.getItem("holy-nodes");
      const savedNodes = savedJSON ? JSON.parse(savedJSON) : [];
      
      const validatedCount = data.modules.filter(mod => {
        const savedNode = savedNodes.find(n => n.id === mod.id);
        return savedNode?.data?.status === 'validated';
      }).length;

      progressText = `${validatedCount}/${data.modules.length}`;
    } catch (e) {
      console.error("Erreur lecture progression", e);
    }
  }

  const nodeBase = "flex items-center justify-center text-[10px] font-bold border-2 cursor-pointer transition-all duration-300 relative shrink-0 overflow-visible";
  const stackBase = "rounded-md flex flex-col text-[10px] font-bold border-2 cursor-pointer transition-all duration-300 relative shrink-0 overflow-hidden bg-slate-900/80 backdrop-blur-sm";

  const variants = {
    validated: "bg-emerald-600 border-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.6)] text-white",
    failed: "bg-red-500 border-red-400 shadow-[0_0_15px_rgba(248,113,113,0.6)] text-white",
    available: isGroup 
      ? "bg-slate-800/80 border-slate-600 text-slate-300" 
      : "bg-slate-800 border-slate-600 text-slate-400 hover:border-slate-400 hover:text-slate-200",
  };

  const dynamicStyle = isGroup 
    ? { minWidth: size * 1.5 }
    : isPiscine
      ? { width: size * 1.8, height: size * 0.9, minWidth: size * 1.8, minHeight: size * 0.9, fontSize: size / 5 }
      : { width: size, height: size, minWidth: size, minHeight: size, fontSize: size / 6 };

  const shapeClass = isPiscine ? "rounded-md" : "rounded-full";
  
  const finalBaseClass = isGroup ? stackBase : `${nodeBase} ${shapeClass}`;

  return (
    <div 
      className={`${finalBaseClass} ${variants[data.status] || variants.available}`}
      style={dynamicStyle}
    >
      <Handle type="target" position={Position.Top} className="w-1 h-1 !bg-transparent !border-0 opacity-0 absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none" />
      
      {progressText && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-sky-600 text-white text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border border-slate-900 shadow-[0_0_10px_rgba(14,165,233,0.5)] z-30 whitespace-nowrap pointer-events-none">
          {progressText}
        </div>
      )}

      {isGroup ? (
        <div className="w-full">
          {data.subProjects.map((label, index) => (
            <div 
              key={index} 
              className={`w-full py-2 px-3 text-center border-b border-white/2 last:border-0 transition-colors`}
            >
              {label}
            </div>
          ))}
        </div>
      ) : (
        <>
          <span className="text-center px-1 leading-tight z-10 pointer-events-none select-none">
            {data.label}
          </span>

          {data.language && (
            <div className={`absolute ${isPiscine ? '-bottom-2 -right-2' : '-bottom-1 -right-1'} w-[45%] h-[45%] bg-slate-900 rounded-full border border-slate-600 flex items-center justify-center shadow-sm p-1 z-20`}>
              <img src={getIconUrl(data.language, data.logoColor)} alt={data.language} className="w-full h-full object-contain pointer-events-none" />
            </div>
          )}
        </>
      )}

      <Handle type="source" position={Position.Bottom} className="w-1 h-1 !bg-transparent !border-0 opacity-0 absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none" />
    </div>
  );
};
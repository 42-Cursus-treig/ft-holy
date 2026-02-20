import { Handle, Position } from "@xyflow/react";

export const getIconUrl = (language, color) => {
  const safeColor = color ? color.replace('#', '') : 'white';
  return `https://cdn.simpleicons.org/${language}/${safeColor}`;
};

export const StatusNode = ({ data }) => {
  const size = data.size || 50;
  
  const isGroup = data.subProjects && data.subProjects.length > 0;

  const circleBase = "rounded-full flex items-center justify-center text-[10px] font-bold border-2 cursor-pointer transition-all duration-300 relative shrink-0 overflow-visible";
  
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
    : { width: size, height: size, minWidth: size, minHeight: size, fontSize: size / 6 };

  return (
    <div 
      className={`${isGroup ? stackBase : circleBase} ${variants[data.status] || variants.available}`}
      style={dynamicStyle}
    >
      <Handle type="target" position={Position.Top} className="w-1 h-1 !bg-transparent !border-0 opacity-0 absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none" />
      
      {isGroup ? (
        <div className="w-full">
          {data.subProjects.map((label, index) => (
            <div 
              key={index} 
              className={`
                w-full py-2 px-3 text-center border-b border-white/2 last:border-0 transition-colors
              `}
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
            <div className="absolute -bottom-1 -right-1 w-[45%] h-[45%] bg-slate-900 rounded-full border border-slate-600 flex items-center justify-center shadow-sm p-1 z-20">
              <img src={getIconUrl(data.language, data.logoColor)} alt={data.language} className="w-full h-full object-contain pointer-events-none" />
            </div>
          )}
        </>
      )}

      <Handle type="source" position={Position.Bottom} className="w-1 h-1 !bg-transparent !border-0 opacity-0 absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none" />
    </div>
  );
};
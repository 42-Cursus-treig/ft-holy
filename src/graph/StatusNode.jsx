import { Handle, Position } from "@xyflow/react";

const C = {
  inkDeep: "#05060A",
  ink: "#0A0C14",
  inkSoft: "#11141E",
  inkLine: "#1C2030",
  vellum: "#F4F1E8",
  vellumDim: "#B8B3A0",
  vellumMute: "#6D6A5C",
  gold: "#D4AF37",
  goldSoft: "#8A7223",
  rust: "#A63D2A",
  rustSoft: "#6B281C",
  azure: "#4A90D9",
  azureSoft: "#2C5A8A",
};

const LANG_COLORS = {
  c: "#2a6bcc",
  "c++": "marine",
  python: "marine",
  ocaml: "orange",
  go: "teal",
  opengl: "teal",
  react: "#61dbfb",
  php: "#474A8A",
  ruby: "red",
  assemblyscript: "red",
  unity: "grey",
  dart: "darkturquoise",
  rust: "#dea584",
};

export const getIconUrl = (language, color) => {
  const customIcons = {
    java: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
    flutter: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg",
    dart: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dart/dart-original.svg",
    kotlin: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg",
  };

  const ICON_SLUGS = {
    bash: "gnubash",
    shell: "gnubash",
    "c++": "cplusplus",
  };

  const key = language?.toLowerCase();

  if (customIcons[key]) {
    return customIcons[key];
  }

  const slug = ICON_SLUGS[key] || key;
  const resolvedColor = color || LANG_COLORS[key] || "F4F1E8";
  const safeColor = resolvedColor.replace("#", "");
  return `https://cdn.simpleicons.org/${slug}/${safeColor}`;
};

export const FrameNode = ({ data }) => {
  return (
    <div
      style={{
        width: data.width,
        height: data.height,
        border: `1px solid ${C.inkLine}`,
        borderRadius: 4,
        background: "rgba(17, 20, 30, 0.35)",
        pointerEvents: "none",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 8,
          left: 12,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11,
          letterSpacing: "0.25em",
          color: C.vellumMute,
          textTransform: "uppercase",
        }}
      >
        {data.label}
      </div>
    </div>
  );
};

const Halo = ({ size, color, opacity }) => {
  const haloSize = size * 2.4;
  const offset = (haloSize - size) / 2;
  const idSuffix = color.replace("#", "");
  return (
    <svg
      width={haloSize}
      height={haloSize}
      viewBox="0 0 100 100"
      style={{
        position: "absolute",
        left: -offset,
        top: -offset,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <defs>
        <radialGradient id={`halo-${idSuffix}`}>
          <stop offset="0%" stopColor={color} stopOpacity={opacity} />
          <stop offset="40%" stopColor={color} stopOpacity={opacity * 0.4} />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="50" fill={`url(#halo-${idSuffix})`} />
    </svg>
  );
};

export const StatusNode = ({ data, selected }) => {
  const size = data.size || 60;
  const isLocked = data.locked === true;
  const isGroup = data.subProjects && data.subProjects.length > 0;
  const isPiscine =
    !isLocked && data.label && data.label.toLowerCase().includes("piscine");
  const status = data.status || "available";

  if (isLocked) {
    return (
      <div
        style={{
          position: "relative",
          width: size,
          height: size,
          pointerEvents: "none",
        }}
      >
        <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          style={{ position: "absolute", inset: 0, opacity: 0.22 }}
        >
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke={C.vellumDim}
            strokeWidth="0.15"
            strokeDasharray="0.6 0.8"
          />
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke={C.goldSoft}
            strokeWidth="0.08"
          />
        </svg>
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            bottom: -size * 0.05,
            textAlign: "center",
            whiteSpace: "nowrap",
            opacity: 0.45,
            color: C.vellumMute,
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: size / 45,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          ✦ Tronc commun ✦
        </div>
        <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
      </div>
    );
  }

  if (isGroup) {
    let progressText = null;
    let isGroupValidated = false;

    if (data.subProjects && data.subProjects.length > 0 && data.subProjectStatuses) {
      const validatedCount = data.subProjects.filter((sub) => {
        const subId = sub.id || sub;
        return data.subProjectStatuses[subId] === "validated";
      }).length;
      
      progressText = `${validatedCount} / ${data.subProjects.length}`;
      isGroupValidated = validatedCount > 0;
    }

    return (
      <div
        style={{
          position: "relative",
          minWidth: size * 1.5,
          background: "rgba(17, 20, 30, 0.92)",
          border: `1px solid ${selected ? C.gold : isGroupValidated ? C.goldSoft : C.vellumMute}`,
          borderRadius: 2,
          overflow: "visible",
          boxShadow: selected ? `0 0 0 1px ${C.goldSoft}, 0 0 16px ${C.goldSoft}80` : isGroupValidated ? `0 0 12px ${C.gold}30` : "none",
        }}
      >
        <Handle type="target" position={Position.Top} style={{ opacity: 0, pointerEvents: "none" }} />
        
        {progressText && (
          <div
            style={{
              position: "absolute",
              top: -12,
              left: "50%",
              transform: "translateX(-50%)",
              padding: "2px 6px",
              fontSize: 10,
              fontFamily: '"JetBrains Mono", monospace',
              background: C.inkDeep,
              color: isGroupValidated ? C.gold : C.vellumDim,
              border: `1px solid ${isGroupValidated ? C.goldSoft : C.inkLine}`,
              borderRadius: 1,
              whiteSpace: "nowrap",
              zIndex: 10,
            }}
          >
            {progressText}
          </div>
        )}

        <div style={{ padding: "8px 12px", borderBottom: `1px solid ${C.inkLine}` }}>
          <div
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 16,
              fontWeight: 600,
              color: isGroupValidated ? C.gold : C.vellum,
            }}
          >
            {data.label}
          </div>
        </div>
        
        {data.subProjects.map((sub, i) => {
          const subId = sub.id || sub;
          const subLabel = sub.label || sub;
          const subStatus = data.subProjectStatuses?.[subId] || "available";
          const moduleProgress = data.subProjectModules?.[subId];
          
          const isSubValidated = subStatus === "validated";
          const isSubFailed = subStatus === "failed";
          const color = isSubValidated ? C.gold : isSubFailed ? C.rust : C.vellum;

          return (
            <div
              key={subId}
              onClick={(e) => {
                if (data.onSubClick) {
                  e.stopPropagation();
                  data.onSubClick(subId);
                }
              }}
              onDoubleClick={(e) => {
                if (data.onSubDoubleClick) {
                  e.stopPropagation();
                  data.onSubDoubleClick(subId);
                }
              }}
              style={{
                padding: "6px 12px",
                margin: "4px 8px",
                borderRadius: "2px",
                fontSize: 12,
                fontFamily: '"JetBrains Mono", monospace',
                color: color,
                border: isSubValidated ? `1px solid ${C.gold}` : "1px solid transparent",
                borderBottom: !isSubValidated && i < data.subProjects.length - 1 ? `1px solid ${C.inkLine}` : isSubValidated ? `1px solid ${C.gold}` : "1px solid transparent",
                background: isSubValidated ? "rgba(212, 175, 55, 0.08)" : "transparent",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              className="hover:bg-slate-800/50 transition-colors"
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                <span>{subLabel}</span>
                {moduleProgress && (
                  <span style={{ fontSize: 10, color: C.vellumDim }}>
                    [{moduleProgress}]
                  </span>
                )}
              </div>
              
              <div>
                {isSubFailed && <span style={{ fontSize: 10, color: C.rust }}>✗</span>}
              </div>
            </div>
          );
        })}
        <Handle type="source" position={Position.Bottom} style={{ opacity: 0, pointerEvents: "none" }} />
      </div>
    );
  }

  if (isPiscine) {
    const w = size * 1.9;
    const h = size * 0.95;
    const palette =
      status === "validated"
        ? { bg: "rgba(212, 175, 55, 0.12)", border: C.gold, text: C.gold }
        : status === "failed"
        ? { bg: "rgba(166, 61, 42, 0.12)", border: C.rust, text: C.rust }
        : status === "in-progress"
        ? { bg: "rgba(74, 144, 217, 0.12)", border: C.azure, text: C.azure }
        : { bg: "rgba(28, 32, 48, 0.9)", border: C.vellumMute, text: C.vellum };

    let progressText = null;
    if (data.modules && data.modules.length > 0 && data.moduleStatuses) {
      const v = data.modules.filter((m) => data.moduleStatuses[m.id] === "validated").length;
      progressText = `${v} / ${data.modules.length}`;
    }

    return (
      <div
        style={{
          position: "relative",
          width: w,
          height: h,
          background: palette.bg,
          border: `1px solid ${palette.border}`,
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: palette.text,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: Math.max(11, size / 4.5),
          fontWeight: 500,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          transition: "all 0.3s",
          boxShadow: selected ? `0 0 0 1px ${palette.border}, 0 0 24px ${palette.border}60` : "none",
          overflow: "visible",
        }}
      >
        <Handle type="target" position={Position.Top} style={{ opacity: 0, pointerEvents: "none" }} />

        <span style={{ position: "absolute", top: 0, left: 0, width: 8, height: 8, borderTop: `1px solid ${palette.border}`, borderLeft: `1px solid ${palette.border}` }} />
        <span style={{ position: "absolute", top: 0, right: 0, width: 8, height: 8, borderTop: `1px solid ${palette.border}`, borderRight: `1px solid ${palette.border}` }} />
        <span style={{ position: "absolute", bottom: 0, left: 0, width: 8, height: 8, borderBottom: `1px solid ${palette.border}`, borderLeft: `1px solid ${palette.border}` }} />
        <span style={{ position: "absolute", bottom: 0, right: 0, width: 8, height: 8, borderBottom: `1px solid ${palette.border}`, borderRight: `1px solid ${palette.border}` }} />

        <span style={{ textAlign: "center", padding: "0 8px", lineHeight: 1.1, userSelect: "none", pointerEvents: "none" }}>
          {data.label.replace(/^Piscine /i, "")}
        </span>

        {progressText && (
          <div style={{ position: "absolute", top: -14, left: 0, width: "100%", display: "flex", justifyContent: "center", pointerEvents: "none", zIndex: 10 }}>
            <div
              style={{
                padding: "2px 6px",
                fontSize: 10,
                fontFamily: '"JetBrains Mono", monospace',
                background: C.inkDeep,
                color: C.vellumDim,
                border: `1px solid ${C.inkLine}`,
                borderRadius: 1,
                whiteSpace: "nowrap",
                pointerEvents: "auto",
              }}
            >
              {progressText}
            </div>
          </div>
        )}

        {data.language && (
          <div
            style={{
              position: "absolute",
              bottom: -8,
              right: -8,
              width: size * 0.42,
              height: size * 0.42,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: C.inkDeep,
              border: `1px solid ${C.inkLine}`,
              borderRadius: "50%",
            }}
          >
            <img
              src={getIconUrl(data.language, data.logoColor)}
              alt=""
              style={{
                width: "75%",
                height: "75%",
                objectFit: "contain",
                filter: "saturate(0.7) brightness(0.95)",
                pointerEvents: "none",
              }}
            />
          </div>
        )}

        <Handle type="source" position={Position.Bottom} style={{ opacity: 0, pointerEvents: "none" }} />
      </div>
    );
  }

  const isMainNode = data.label && data.label.toUpperCase() === "TRONC COMMUN";
  const isValidated = status === "validated";
  const isFailed = status === "failed";

  const isInProgress = status === "in-progress";

  const starBg = isValidated ? C.gold : isFailed ? C.rust : C.inkSoft;
  const borderColor = isValidated ? C.goldSoft : isFailed ? C.rustSoft
    : isInProgress ? C.azureSoft : C.vellumMute;
  const textColor = isValidated || isFailed ? C.inkDeep : C.vellum;
  const selectionGlow = isValidated ? C.gold : isFailed ? C.rust
    : isInProgress ? C.azure : C.vellumDim;

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.3s",
      }}
    >
      {isValidated && !isMainNode && <Halo size={size} color={C.gold} opacity={0.55} />}
      {isFailed && !isMainNode && <Halo size={size} color={C.rust} opacity={0.4} />}

      <Handle type="target" position={Position.Top} style={{ opacity: 0, pointerEvents: "none" }} />

      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          background: starBg,
          border: `1px solid ${borderColor}`,
          color: textColor,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: Math.max(9, size / 5.5),
          fontWeight: 500,
          letterSpacing: "0.03em",
          textTransform: "uppercase",
          animation: isValidated
            ? "star-pulse 4s ease-in-out infinite"
            : isFailed
            ? "star-flicker 5s linear infinite"
            : "none",
          boxShadow: isMainNode 
            ? "none" 
            : selected
            ? `0 0 0 1.5px ${selectionGlow}, 0 0 24px ${selectionGlow}90`
            : isValidated
            ? `0 0 12px ${C.gold}30`
            : "none",
          zIndex: 2,
          transition: "box-shadow 0.2s",
        }}
      >
        <span
          style={{
            textAlign: "center",
            padding: "0 4px",
            lineHeight: 1.05,
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          {data.label}
        </span>

        {data.language && (
          <div
            style={{
              position: "absolute",
              bottom: -size * 0.08,
              right: -size * 0.08,
              width: size * 0.4,
              height: size * 0.4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: C.inkDeep,
              border: `1px solid ${C.inkLine}`,
              borderRadius: "50%",
              zIndex: 3,
            }}
          >
            <img
              src={getIconUrl(data.language, data.logoColor)}
              alt=""
              style={{
                width: "75%",
                height: "75%",
                objectFit: "contain",
                filter: "saturate(0.7) brightness(0.95)",
                pointerEvents: "none",
              }}
            />
          </div>
        )}
      </div>

      <Handle type="source" position={Position.Bottom} style={{ opacity: 0, pointerEvents: "none" }} />
    </div>
  );
};

import { useState } from "react";
import { Handle, Position } from "@xyflow/react";
import { getIconList } from "./iconUrl";
import { useTheme } from "../theme";
import { alpha, slugColor } from "../theme/color";
import { MaskFace } from "./MaskFace";
import { usePresence } from "./usePresence";

const IconDisc = ({ src, title, diameter, background, border, style }) => (
  <div
    title={title}
    style={{
      position: "relative",
      width: diameter,
      height: diameter,
      boxSizing: "border-box",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background,
      border: `1px solid ${border}`,
      borderRadius: "50%",
      ...style,
    }}
  >
    <img
      src={src}
      alt=""
      style={{ width: "72%", height: "72%", objectFit: "contain", pointerEvents: "none" }}
    />
  </div>
);

const IconRow = ({ language, color, size = 16, gap = 4 }) => {
  const icons = getIconList(language, color);
  if (!icons.length) return null;
  return (
    <div style={{ display: "flex", alignItems: "center", gap, flexShrink: 0 }}>
      {icons.map((icon) => (
        <img
          key={icon.key}
          src={icon.src}
          alt=""
          title={icon.name}
          style={{ width: size, height: size, objectFit: "contain" }}
        />
      ))}
    </div>
  );
};

const LangBadge = ({
  language,
  color,
  size,
  scale = 0.4,
  offset = 0.08,
  overlap = 0.45,
  max = 3,
}) => {
  const { theme } = useTheme();
  const icons = getIconList(language, color).slice(0, max);
  if (!icons.length) return null;

  const d = size * scale;

  return (
    <div
      style={{
        position: "absolute",
        bottom: -size * offset,
        right: -size * offset,
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: "center",
        zIndex: 3,
      }}
    >
      {icons.map((icon, i) => (
        <IconDisc
          key={icon.key}
          src={icon.src}
          title={icon.name}
          diameter={d}
          background={theme.node.badgeBackground}
          border={theme.node.borderColor}
          style={{ marginRight: i === 0 ? 0 : -d * overlap, zIndex: icons.length - i }}
        />
      ))}
    </div>
  );
};

export const FrameNode = ({ data }) => {
  const { c, theme } = useTheme();
  return (
    <div
      style={{
        width: data.width,
        height: data.height,
        border: `1px solid ${theme.node.borderColor}`,
        borderRadius: 4,
        background: alpha(c.inkSoft, 0.35),
        pointerEvents: "none",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 8,
          left: 12,
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.25em",
          color: c.vellumMute,
          textTransform: "uppercase",
        }}
      >
        {data.label}
      </div>
    </div>
  );
};

const Halo = ({ width, height, color, opacity }) => {
  const haloW = width * 2.4;
  const haloH = height * 2.4;
  const idSuffix = slugColor(color);
  return (
    <svg
      width={haloW}
      height={haloH}
      viewBox="0 0 100 100"
      style={{
        position: "absolute",
        left: -(haloW - width) / 2,
        top: -(haloH - height) / 2,
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

const RECT_RATIO = { w: 1.6, h: 0.62 };

export const StatusNode = ({ data, selected }) => {
  const { c, theme, statusOf } = useTheme();
  const [hovered, setHovered] = useState(false);

  const size = data.size || 60;
  const isLocked = data.locked === true;
  const isGroup = data.subProjects && data.subProjects.length > 0;
  const isPiscine =
    !isLocked && data.label && data.label.toLowerCase().includes("piscine");
  const status = data.status || "available";
  const tone = statusOf(status);

  // Calculé ici, avant les retours anticipés des branches verrouillée, groupe
  // et piscine : usePresence est un hook, son appel ne peut pas être
  // conditionnel. Les booléens de forme se déduisent de `data` sans attendre.
  const isMasked =
    theme.node.shape === "mask" &&
    Boolean(theme.node.mask) &&
    status !== "available" &&
    !isLocked &&
    !isGroup &&
    !isPiscine &&
    data.shape !== "rect" &&
    !(data.label && data.label.toUpperCase() === "TRONC COMMUN");

  const maskPresence = usePresence(isMasked, 400);
  const revealLabel = hovered || selected;

  if (isLocked) {
    return (
      <div
        style={{ position: "relative", width: size, height: size, pointerEvents: "none" }}
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
            stroke={c.vellumDim}
            strokeWidth="0.15"
            strokeDasharray="0.6 0.8"
          />
          <circle cx="50" cy="50" r="46" fill="none" stroke={c.goldSoft} strokeWidth="0.08" />
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
            color: c.vellumMute,
            fontFamily: "var(--font-mono)",
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

    const done = statusOf("validated");

    return (
      <div
        style={{
          position: "relative",
          minWidth: size * 1.5,
          background: alpha(c.inkSoft, 0.92),
          border: `1px solid ${
            selected ? done.main : isGroupValidated ? done.soft : c.vellumMute
          }`,
          borderRadius: 2,
          overflow: "visible",
          boxShadow: selected
            ? `0 0 0 1px ${done.soft}, 0 0 16px ${alpha(done.soft, 0.5)}`
            : isGroupValidated
            ? `0 0 12px ${alpha(done.main, done.glow)}`
            : "none",
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
              fontFamily: "var(--font-mono)",
              background: c.inkDeep,
              color: isGroupValidated ? done.main : c.vellumDim,
              border: `1px solid ${isGroupValidated ? done.soft : theme.node.borderColor}`,
              borderRadius: 1,
              whiteSpace: "nowrap",
              zIndex: 10,
            }}
          >
            {progressText}
          </div>
        )}

        <div
          style={{
            padding: "8px 12px",
            borderBottom: `1px solid ${theme.node.borderColor}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 10,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 16,
              fontWeight: 600,
              color: isGroupValidated ? done.main : c.vellum,
            }}
          >
            {data.label}
          </div>

          <IconRow language={data.language} color={data.logoColor} size={16} />
        </div>

        {data.subProjects.map((sub, i) => {
          const subId = sub.id || sub;
          const subLabel = sub.label || sub;
          const subStatus = data.subProjectStatuses?.[subId] || "available";
          const moduleProgress = data.subProjectModules?.[subId];

          const isSubValidated = subStatus === "validated";
          const isSubFailed = subStatus === "failed";
          const subTone = statusOf(subStatus);
          const color = isSubValidated || isSubFailed ? subTone.main : c.vellum;

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
                fontFamily: "var(--font-mono)",
                color,
                border: isSubValidated ? `1px solid ${done.main}` : "1px solid transparent",
                borderBottom: !isSubValidated && i < data.subProjects.length - 1
                  ? `1px solid ${theme.node.borderColor}`
                  : isSubValidated
                  ? `1px solid ${done.main}`
                  : "1px solid transparent",
                background: isSubValidated ? alpha(done.main, 0.08) : "transparent",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              className="hover:bg-slate-800/50 transition-colors"
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <IconRow language={sub.lang} color={sub.logoColor} size={12} gap={3} />
                <span>{subLabel}</span>
                {moduleProgress && (
                  <span style={{ fontSize: 10, color: c.vellumDim }}>[{moduleProgress}]</span>
                )}
              </div>

              <div>
                {isSubFailed && (
                  <span style={{ fontSize: 10, color: statusOf("failed").main }}>✗</span>
                )}
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
    const isIdle = status === "available";
    const palette = {
      bg: isIdle ? alpha(c.inkHairline, 0.9) : alpha(tone.main, 0.12),
      border: isIdle ? c.vellumMute : tone.main,
      text: isIdle ? c.vellum : tone.main,
    };

    let progressText = null;
    if (data.modules && data.modules.length > 0 && data.moduleStatuses) {
      const v = data.modules.filter((m) => data.moduleStatuses[m.id] === "validated").length;
      progressText = `${v} / ${data.modules.length}`;
    }

    const corner = (pos) => ({
      position: "absolute",
      width: 8,
      height: 8,
      ...pos,
    });

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
          fontFamily: "var(--font-mono)",
          fontSize: Math.max(11, size / 4.5),
          fontWeight: 500,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          transition: "all 0.3s",
          boxShadow: selected
            ? `0 0 0 1px ${palette.border}, 0 0 24px ${alpha(palette.border, 0.376)}`
            : "none",
          overflow: "visible",
        }}
      >
        <Handle type="target" position={Position.Top} style={{ opacity: 0, pointerEvents: "none" }} />

        <span style={corner({ top: 0, left: 0, borderTop: `1px solid ${palette.border}`, borderLeft: `1px solid ${palette.border}` })} />
        <span style={corner({ top: 0, right: 0, borderTop: `1px solid ${palette.border}`, borderRight: `1px solid ${palette.border}` })} />
        <span style={corner({ bottom: 0, left: 0, borderBottom: `1px solid ${palette.border}`, borderLeft: `1px solid ${palette.border}` })} />
        <span style={corner({ bottom: 0, right: 0, borderBottom: `1px solid ${palette.border}`, borderRight: `1px solid ${palette.border}` })} />

        <span style={{ textAlign: "center", padding: "0 8px", lineHeight: 1.1, userSelect: "none", pointerEvents: "none" }}>
          {data.label.replace(/^Piscine /i, "")}
        </span>

        {progressText && (
          <div style={{ position: "absolute", top: -14, left: 0, width: "100%", display: "flex", justifyContent: "center", pointerEvents: "none", zIndex: 10 }}>
            <div
              style={{
                padding: "2px 6px",
                fontSize: 10,
                fontFamily: "var(--font-mono)",
                background: c.inkDeep,
                color: c.vellumDim,
                border: `1px solid ${theme.node.borderColor}`,
                borderRadius: 1,
                whiteSpace: "nowrap",
                pointerEvents: "auto",
              }}
            >
              {progressText}
            </div>
          </div>
        )}

        <LangBadge
          language={data.language}
          color={data.logoColor}
          size={size}
          scale={0.42}
          offset={0.1}
        />

        <Handle type="source" position={Position.Bottom} style={{ opacity: 0, pointerEvents: "none" }} />
      </div>
    );
  }

  const isRect = data.shape === "rect";
  const boxW = isRect ? size * RECT_RATIO.w : size;
  const boxH = isRect ? size * RECT_RATIO.h : size;

  const isMainNode = data.label && data.label.toUpperCase() === "TRONC COMMUN";
  const isIdle = status === "available";

  const starBg = isIdle ? theme.node.idleFill : tone.main;
  const borderColor = isIdle ? theme.node.idleBorder : tone.soft;
  const textColor = isIdle ? theme.node.idleText : tone.onMain;
  const selectionGlow = isIdle ? c.vellumDim : tone.main;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        width: boxW,
        height: boxH,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.3s",
      }}
    >
      {tone.halo > 0 && !isMainNode && (
        <Halo width={boxW} height={boxH} color={tone.main} opacity={tone.halo} />
      )}

      <Handle type="target" position={Position.Top} style={{ opacity: 0, pointerEvents: "none" }} />

      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: isRect ? 10 : "50%",
          background: starBg,
          border: `1px solid ${borderColor}`,
          color: textColor,
          fontFamily: "var(--font-mono)",
          fontSize: Math.max(9, size / 5.5),
          fontWeight: 500,
          letterSpacing: "0.03em",
          textTransform: "uppercase",
          animation: tone.animation,
          boxShadow: isMainNode
            ? "none"
            : selected
            ? `0 0 0 1.5px ${selectionGlow}, 0 0 24px ${alpha(selectionGlow, 0.565)}`
            : tone.glow > 0
            ? `0 0 12px ${alpha(tone.main, tone.glow)}`
            : "none",
          zIndex: 2,
          transition: "box-shadow 0.2s",
        }}
      >
        {maskPresence.mounted && (
          <MaskFace
            size={boxW}
            tone={tone}
            mask={theme.node.mask}
            exiting={maskPresence.exiting}
          />
        )}

        {!isMasked && (
          <span
            className={maskPresence.mounted ? "fade-in" : undefined}
            style={{
              textAlign: "center",
              padding: "0 4px",
              lineHeight: 1.05,
              userSelect: "none",
              pointerEvents: "none",
              zIndex: 1,
            }}
          >
            {data.label}
          </span>
        )}

        <LangBadge language={data.language} color={data.logoColor} size={Math.min(boxW, boxH)} />
      </div>

      {maskPresence.mounted && (
        <div
          className={`node-reveal${revealLabel ? " is-shown" : ""}`}
          style={{
            position: "absolute",
            bottom: "100%",
            left: "50%",
            marginBottom: size * 0.14,
            textAlign: "center",
            whiteSpace: "nowrap",
            fontFamily: "var(--font-mono)",
            fontSize: Math.max(8, size / 6),
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: c.vellum,
            textShadow: `0 1px 4px ${c.inkDeep}, 0 0 8px ${c.inkDeep}`,
            userSelect: "none",
            pointerEvents: "none",
            zIndex: 4,
          }}
        >
          {data.label}
        </div>
      )}

      <Handle type="source" position={Position.Bottom} style={{ opacity: 0, pointerEvents: "none" }} />
    </div>
  );
};

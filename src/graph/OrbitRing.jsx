import { useStore } from "@xyflow/react";

export const OrbitRing = ({ data }) => {
  const zoom = useStore((s) => s.transform[2]);
  const { radius, done } = data;

  const strokeWidth = 1.4 / Math.max(zoom, 0.05);
  const size = radius * 2;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ pointerEvents: "none", overflow: "visible", display: "block" }}
    >
      <circle
        cx={radius}
        cy={radius}
        r={radius}
        fill="none"
        stroke={done ? "var(--gold)" : "var(--ink-line)"}
        strokeOpacity={done ? 0.6 : 0.75}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

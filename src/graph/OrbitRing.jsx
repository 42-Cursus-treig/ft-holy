import { useStore } from "@xyflow/react";
import { useTheme } from "../theme";

export const OrbitRing = ({ data }) => {
  const zoom = useStore((s) => s.transform[2]);
  const { orbit } = useTheme().theme;
  const { rx, ry, done } = data;

  const strokeWidth = orbit.strokeWidth / Math.max(zoom, 0.05);
  const width = rx * 2;
  const height = ry * 2;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ pointerEvents: "none", overflow: "visible", display: "block" }}
    >
      <ellipse
        cx={rx}
        cy={ry}
        rx={rx}
        ry={ry}
        fill="none"
        stroke={done ? orbit.done : orbit.idle}
        strokeOpacity={done ? orbit.doneOpacity : orbit.idleOpacity}
        strokeWidth={strokeWidth}
        strokeDasharray={orbit.dash || undefined}
      />
    </svg>
  );
};

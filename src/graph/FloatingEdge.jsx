import { getStraightPath } from "@xyflow/react";
import { useInternalNode } from "@xyflow/react";
import { edgeEndpoints } from "./edgeGeometry";

const FloatingEdge = ({ id, source, target, markerEnd, style }) => {
  const sourceNode = useInternalNode(source);
  const targetNode = useInternalNode(target);

  const points = edgeEndpoints(sourceNode, targetNode);
  if (!points) return null;

  const [edgePath] = getStraightPath(points);

  return (
    <path
      id={id}
      className="react-flow__edge-path"
      d={edgePath}
      markerEnd={markerEnd}
      style={style}
    />
  );
};

export default FloatingEdge;

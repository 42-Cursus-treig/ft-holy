import { getStraightPath, useInternalNode } from '@xyflow/react';

const FloatingEdge = ({ id, source, target, markerEnd, style }) => {
  const sourceNode = useInternalNode(source);
  const targetNode = useInternalNode(target);

  if (!sourceNode || !targetNode || !sourceNode.measured || !targetNode.measured) {
    return null;
  }

  const sourceRadius = sourceNode.measured.width / 2;
  const targetRadius = targetNode.measured.width / 2;

  const sourceCenterX = sourceNode.position.x + sourceRadius;
  const sourceCenterY = sourceNode.position.y + sourceNode.measured.height / 2;
  
  const targetCenterX = targetNode.position.x + targetRadius;
  const targetCenterY = targetNode.position.y + targetNode.measured.height / 2;

  const angle = Math.atan2(targetCenterY - sourceCenterY, targetCenterX - sourceCenterX);

  const sourceX = sourceCenterX + sourceRadius * Math.cos(angle);
  const sourceY = sourceCenterY + sourceRadius * Math.sin(angle);

  const targetX = targetCenterX - targetRadius * Math.cos(angle);
  const targetY = targetCenterY - targetRadius * Math.sin(angle);

  const [edgePath] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

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
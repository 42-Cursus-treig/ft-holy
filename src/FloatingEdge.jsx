import { getStraightPath, useInternalNode } from '@xyflow/react';

const getRectIntersection = (sourceNode, targetNode) => {
  const sourceW = sourceNode.measured.width / 2;
  const sourceH = sourceNode.measured.height / 2;
  
  const sourceCenterX = sourceNode.position.x + sourceW;
  const sourceCenterY = sourceNode.position.y + sourceH;
  
  const targetW = targetNode.measured.width / 2;
  const targetH = targetNode.measured.height / 2;
  
  const targetCenterX = targetNode.position.x + targetW;
  const targetCenterY = targetNode.position.y + targetH;

  const dx = targetCenterX - sourceCenterX;
  const dy = targetCenterY - sourceCenterY;
  
  if (Math.abs(dx) < 0.01 && Math.abs(dy) < 0.01) {
    return { x: sourceCenterX, y: sourceCenterY };
  }

  const xx1 = dx / (2 * sourceW) - dy / (2 * sourceH);
  const yy1 = dx / (2 * sourceW) + dy / (2 * sourceH);
  const a = 1 / (Math.abs(xx1) + Math.abs(yy1));
  const xx3 = a * xx1;
  const yy3 = a * yy1;
  
  return {
    x: sourceW * (xx3 + yy3) + sourceCenterX,
    y: sourceH * (-xx3 + yy3) + sourceCenterY
  };
};

const getCircleIntersection = (sourceNode, targetNode) => {
  const sourceRadius = sourceNode.measured.width / 2;
  const sourceCenterX = sourceNode.position.x + sourceRadius;
  const sourceCenterY = sourceNode.position.y + sourceNode.measured.height / 2;
  
  const targetCenterX = targetNode.position.x + targetNode.measured.width / 2;
  const targetCenterY = targetNode.position.y + targetNode.measured.height / 2;

  const angle = Math.atan2(targetCenterY - sourceCenterY, targetCenterX - sourceCenterX);

  return {
    x: sourceCenterX + sourceRadius * Math.cos(angle),
    y: sourceCenterY + sourceRadius * Math.sin(angle)
  };
};

const FloatingEdge = ({ id, source, target, markerEnd, style }) => {
  const sourceNode = useInternalNode(source);
  const targetNode = useInternalNode(target);

  if (!sourceNode || !targetNode || !sourceNode.measured || !targetNode.measured) {
    return null;
  }

  const isSourcePiscine = sourceNode.data?.label?.toLowerCase().includes("piscine");
  const isTargetPiscine = targetNode.data?.label?.toLowerCase().includes("piscine");

  const { x: sourceX, y: sourceY } = isSourcePiscine 
    ? getRectIntersection(sourceNode, targetNode)
    : getCircleIntersection(sourceNode, targetNode);

  const { x: targetX, y: targetY } = isTargetPiscine
    ? getRectIntersection(targetNode, sourceNode)
    : getCircleIntersection(targetNode, sourceNode);

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
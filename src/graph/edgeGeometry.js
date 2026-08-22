const rectIntersection = (sourceNode, targetNode) => {
  const sourceW = sourceNode.measured.width / 2;
  const sourceH = sourceNode.measured.height / 2;
  const sourceCenterX = sourceNode.position.x + sourceW;
  const sourceCenterY = sourceNode.position.y + sourceH;
  const targetCenterX = targetNode.position.x + targetNode.measured.width / 2;
  const targetCenterY = targetNode.position.y + targetNode.measured.height / 2;

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
    y: sourceH * (-xx3 + yy3) + sourceCenterY,
  };
};

const circleIntersection = (sourceNode, targetNode) => {
  const sourceRadius = sourceNode.measured.width / 2;
  const sourceCenterX = sourceNode.position.x + sourceRadius;
  const sourceCenterY = sourceNode.position.y + sourceNode.measured.height / 2;
  const targetCenterX = targetNode.position.x + targetNode.measured.width / 2;
  const targetCenterY = targetNode.position.y + targetNode.measured.height / 2;

  const angle = Math.atan2(targetCenterY - sourceCenterY, targetCenterX - sourceCenterX);

  return {
    x: sourceCenterX + sourceRadius * Math.cos(angle),
    y: sourceCenterY + sourceRadius * Math.sin(angle),
  };
};

const isRectNode = (node) => {
  if (!node?.data) return false;
  if (node.data.subProjects && node.data.subProjects.length > 0) return true;
  if (node.data.label && node.data.label.toLowerCase().includes("piscine")) return true;
  return false;
};

export const edgeEndpoints = (sourceNode, targetNode) => {
  if (!sourceNode || !targetNode || !sourceNode.measured || !targetNode.measured) {
    return null;
  }

  const from = isRectNode(sourceNode)
    ? rectIntersection(sourceNode, targetNode)
    : circleIntersection(sourceNode, targetNode);

  const to = isRectNode(targetNode)
    ? rectIntersection(targetNode, sourceNode)
    : circleIntersection(targetNode, sourceNode);

  return { sourceX: from.x, sourceY: from.y, targetX: to.x, targetY: to.y };
};

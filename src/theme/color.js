const expand = (hex) => {
  const h = hex.replace("#", "");
  if (h.length === 3) return h.split("").map((c) => c + c).join("");
  return h.slice(0, 6);
};

export const alpha = (hex, a) => {
  if (!hex) return "transparent";
  const h = expand(hex);
  const n = parseInt(h, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
};

export const slugColor = (hex) => expand(hex);

export const cssVarName = (key) => `--${key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}`;

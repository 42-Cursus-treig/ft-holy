const SIMPLE_ICONS = "https://cdn.simpleicons.org";

const EXTERNAL_ICONS = {
  java: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
};

const ICON_SLUGS = {
  bash: "gnubash",
  shell: "gnubash",
  "c++": "cplusplus",
  cpp: "cplusplus",
  js: "javascript",
  ts: "typescript",
};

const UNREADABLE_ON_INK = {
  rust: "DEA584",
  express: "F4F1E8",
  github: "F4F1E8",
  apple: "F4F1E8",
};

export const getIconUrl = (language, color) => {
  const key = language?.toLowerCase();
  if (!key) return null;
  if (EXTERNAL_ICONS[key]) return EXTERNAL_ICONS[key];

  const slug = ICON_SLUGS[key] || key;
  const tint = (color || UNREADABLE_ON_INK[key] || "").replace("#", "");

  return tint ? `${SIMPLE_ICONS}/${slug}/${tint}` : `${SIMPLE_ICONS}/${slug}`;
};

const pickColor = (color, key, index) => {
  if (!color) return null;
  if (Array.isArray(color)) return color[index] ?? null;
  if (typeof color === "object") return color[key] ?? null;
  return color;
};

export const getIconList = (language, color) => {
  const entries = Array.isArray(language) ? language : language == null ? [] : [language];
  const seen = new Set();

  return entries.reduce((acc, entry, i) => {
    const name = typeof entry === "string" ? entry : entry?.name || entry?.lang;
    if (!name) return acc;

    const key = name.toLowerCase();
    if (seen.has(key)) return acc;

    const tint =
      (typeof entry === "object" ? entry.color : null) ?? pickColor(color, key, i);
    const src = getIconUrl(name, tint);
    if (!src) return acc;

    seen.add(key);
    acc.push({ key, name, src });
    return acc;
  }, []);
};

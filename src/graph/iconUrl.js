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

  return tint
    ? `${SIMPLE_ICONS}/${slug}/${tint}`
    : `${SIMPLE_ICONS}/${slug}`;
};

import { createContext, useContext } from "react";
import { inkTheme } from "./themes/ink";
import { spiderTheme } from "./themes/spider";
import { cssVarName } from "./color";

export const THEMES = {
  ink: inkTheme,
  spider: spiderTheme,
};

export const THEME_ORDER = ["ink", "spider"];
export const DEFAULT_THEME = "ink";

export const LS_THEME_KEY = "ft_holy:theme";

const themeParam = new URLSearchParams(window.location.search).get("theme");

export const getTheme = (id) => THEMES[id] || THEMES[DEFAULT_THEME];

export const readStoredThemeId = () => {
  if (themeParam && THEMES[themeParam]) return themeParam;
  try {
    const stored = localStorage.getItem(LS_THEME_KEY);
    return stored && THEMES[stored] ? stored : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
};

export const applyThemeVars = (theme) => {
  const root = document.documentElement;
  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(cssVarName(key), value);
  });
  root.dataset.theme = theme.id;
};

applyThemeVars(getTheme(readStoredThemeId()));

export const ThemeContext = createContext(null);

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme doit être utilisé dans un <ThemeProvider>");
  return ctx;
};

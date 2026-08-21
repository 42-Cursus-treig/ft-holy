import { useMemo, useState, useEffect, useCallback } from "react";
import {
  THEMES,
  THEME_ORDER,
  LS_THEME_KEY,
  ThemeContext,
  applyThemeVars,
  getTheme,
  readStoredThemeId,
} from "./index";
import { alpha } from "./color";

export const ThemeProvider = ({ children }) => {
  const [themeId, setThemeId] = useState(readStoredThemeId);

  const theme = getTheme(themeId);

  useEffect(() => {
    applyThemeVars(theme);
    try {
      localStorage.setItem(LS_THEME_KEY, theme.id);
    } catch {
      //
    }
  }, [theme]);

  const selectTheme = useCallback((id) => {
    if (THEMES[id]) setThemeId(id);
  }, []);

  const value = useMemo(
    () => ({
      theme,
      themeId: theme.id,
      selectTheme,
      themes: THEME_ORDER.map((id) => THEMES[id]),
      c: theme.colors,
      statusOf: (s) => theme.status[s] || theme.status.available,
      alpha,
    }),
    [theme, selectTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

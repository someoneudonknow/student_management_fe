import { createTheme, CssBaseline, useMediaQuery, ThemeProvider as MuiThemeProvider } from "@mui/material";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { DEFAULT } from "../../constants/themesName";
import { themes } from "./theme";

const ThemeContext = createContext({
  mode: null,
  theme: null,
  toggleMode: () => { },
  setTheme: () => { },
});

const ThemeProvider = ({ children }) => {
  const prefersDarkMode = useMediaQuery("prefers-color-scheme: dark");
  const [mode, setMode] = useState(prefersDarkMode ? "dark" : "light");
  const [theme, setTheme] = useState(DEFAULT);

  useEffect(() => {
    setMode(prefersDarkMode ? "dark" : "light");
  }, [prefersDarkMode]);

  const _theme = useMemo(() => createTheme(themes[theme][mode]), [theme, mode]);

  const _contextValue = useMemo(
    () => ({
      mode: mode,
      theme: theme,
      toggleMode: () => {
        setMode((prev) => (prev === "dark" ? "light" : "dark"));
      },
      setTheme: (theme) => {
        if (themes[theme]) {
          setTheme(theme);
        }
      },
    }),
    [mode, theme],
  );

  return (
    <ThemeContext.Provider value={_contextValue}>
      <MuiThemeProvider theme={_theme}>
        <CssBaseline enableColorScheme />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => useContext(ThemeContext)

export default ThemeProvider;

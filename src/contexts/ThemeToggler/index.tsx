import { useState } from "react";
import { createContext, useContext } from "react";
import { Theme, useMediaQuery } from "@mui/material";
import { darkMode, lightMode } from "./theme";

type PropsType = {
  children: React.ReactNode;
};

type ValueType = {
  mode: "dark" | "light";
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeTogglerContext = createContext<ValueType>({
  mode: "dark",
  theme: darkMode,
  toggleTheme: () => {},
});

export const ThemeTogglerProvider = ({ children }: PropsType) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState<"dark" | "light">(
    prefersDarkMode ? "dark" : "light"
  );

  const theme = mode === "dark" ? darkMode : lightMode;

  function toggleTheme(callback?: () => void) {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
    if (typeof callback === "function") callback();
  }

  return (
    <ThemeTogglerContext.Provider value={{ mode, theme, toggleTheme }}>
      {""}
      {children}
      {""}
    </ThemeTogglerContext.Provider>
  );
};

export const useThemeToggler = () => useContext(ThemeTogglerContext);

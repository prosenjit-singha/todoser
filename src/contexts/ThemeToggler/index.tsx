import { Theme } from "@mui/material";
import { createContext, useContext, useState } from "react";
import { darkMode } from "./darkMode";
import { lightMode } from "./lightMode";

type ValueType = {
  theme: Theme;
  mode: "light" | "dark";
  toggleTheme: () => void;
};

const ThemeTogglerContext = createContext({} as ValueType);

const ThemeTogglerProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<"light" | "dark">("dark");
  const theme = mode === "dark" ? darkMode : lightMode;

  function toggleTheme() {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  }
  return (
    <ThemeTogglerContext.Provider value={{ theme, mode, toggleTheme }}>
      {children}
    </ThemeTogglerContext.Provider>
  );
};

export default ThemeTogglerProvider;

export const useThemeToggler = () => useContext(ThemeTogglerContext);

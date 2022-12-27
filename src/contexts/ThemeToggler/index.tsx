import { useState } from "react";
import { createContext, useContext } from "react";
import { Theme } from "@mui/material";
import { darkMode, lightMode } from "./theme";

type PropsType = {
  children: React.ReactNode;
};

type ValueType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeTogglerContext = createContext<ValueType>({
  theme: darkMode,
  toggleTheme: () => {},
});

export const ThemeTogglerProvider = ({ children }: PropsType) => {
  const [theme, setTheme] = useState(darkMode);

  function toggleTheme(callback?: () => void) {
    if (theme.palette.mode === "dark") setTheme(lightMode);
    else setTheme(darkMode);
    if (typeof callback === "function") callback();
  }

  return (
    <ThemeTogglerContext.Provider value={{ theme, toggleTheme }}>
      {""}
      {children}
      {""}
    </ThemeTogglerContext.Provider>
  );
};

export const useThemeToggler = () => useContext(ThemeTogglerContext);

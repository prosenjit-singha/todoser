import { RouterProvider } from "react-router-dom";
import { ThemeProvider, CssBaseline, GlobalStyles } from "@mui/material";
import { router } from "./routes";
import { darkMode, lightMode } from "./contexts/ThemeToggler/theme";
import { useThemeToggler } from "./contexts/ThemeToggler";

function App() {
  const { theme } = useThemeToggler();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <GlobalStyles styles={{ boxSizing: "border-box" }} />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;

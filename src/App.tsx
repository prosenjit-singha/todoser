import { RouterProvider } from "react-router-dom";
import { ThemeProvider, CssBaseline, GlobalStyles } from "@mui/material";
import { router } from "./routes";
import { darkMode, lightMode } from "./contexts/ThemeToggler/theme";
import { useThemeToggler } from "./contexts/ThemeToggler";
import globalStyles from "./styles/global.styles";

function App() {
  const { theme } = useThemeToggler();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <GlobalStyles styles={(p) => globalStyles(p)} />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;

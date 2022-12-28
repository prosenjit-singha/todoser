import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ThemeProvider, CssBaseline, GlobalStyles } from "@mui/material";
import { router } from "./routes";
import { useThemeToggler } from "./contexts/ThemeToggler";
import globalStyles from "./styles/global.styles";
import TasksProvider from "./contexts/TasksProvider";
import AuthProvider from "./contexts/AuthContext";

function App() {
  const { theme } = useThemeToggler();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <GlobalStyles styles={(p) => globalStyles(p)} />
      <ToastContainer />
      <AuthProvider>
        <TasksProvider>
          <RouterProvider router={router} />
        </TasksProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

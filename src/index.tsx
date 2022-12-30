import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeTogglerProvider } from "./contexts/ThemeToggler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "react-toastify/dist/ReactToastify.css";
import "react-photo-view/dist/react-photo-view.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <ThemeTogglerProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ThemeTogglerProvider>
  </React.StrictMode>
);

import { createTheme } from "@mui/material";
import { commonMuiStyles } from "./common.styles";

export const darkMode = createTheme({
  palette: {
    mode: "dark",
  },
  ...commonMuiStyles,
});

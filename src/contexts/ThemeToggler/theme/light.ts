import { createTheme } from "@mui/material";
import { commonStyles } from "./common.styles";

export const lightMode = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#5eb071",
    },
  },
  ...commonStyles,
});

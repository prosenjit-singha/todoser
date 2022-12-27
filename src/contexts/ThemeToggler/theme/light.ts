import { createTheme } from "@mui/material";
import { commonStyles } from "./common.styles";

export const lightMode = createTheme({
  palette: {
    mode: "light",
  },
  ...commonStyles,
});

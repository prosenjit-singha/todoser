import { css, Theme } from "@mui/material";

const globalStyles = (theme: Theme) => css`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  html {
    scroll-behavior: smooth;
  }
  a {
    text-decoration: none;
    color: initial;
  }
`;

export default globalStyles;

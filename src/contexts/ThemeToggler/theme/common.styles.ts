import { ThemeOptions } from "@mui/material";

export const commonStyles: ThemeOptions = {
  shape: {
    borderRadius: 0,
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: false,
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiTooltip: {
      defaultProps: {
        arrow: true,
        enterDelay: 500,
      },
      styleOverrides: {
        tooltip: {
          borderRadius: 2.5,
        },
      },
    },
    MuiSkeleton: {
      defaultProps: {
        variant: "rectangular",
      },
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto","Helvetica","Arial",sans-serif',
  },
};

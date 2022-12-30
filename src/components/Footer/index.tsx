import { Stack, lighten, Typography } from "@mui/material";
import { useThemeToggler } from "../../contexts/ThemeToggler";
import Logo from "../Logo";

function Footer() {
  const { mode, theme } = useThemeToggler();
  return (
    <Stack
      sx={{
        pt: [1, 2],
        pb: 1,
        alignItems: "center",
        bgcolor: mode === "dark" ? "#1a211c" : "#d1e8d7",
      }}
    >
      <Logo />
      <Typography variant="body2" sx={{ mt: 1 }}>
        Mady with ❤️ by Prosenjit Singha
      </Typography>
    </Stack>
  );
}

export default Footer;

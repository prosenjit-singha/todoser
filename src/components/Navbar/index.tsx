import {
  AppBar,
  Toolbar,
  Stack,
  styled,
  IconButton,
  lighten,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import navlinks from "../../data/navlinks";
import Logo from "../Logo";
import {
  MdOutlineDarkMode as DarkModeIcon,
  MdOutlineLightMode as LightModeIcon,
} from "react-icons/md";
import { useThemeToggler } from "../../contexts/ThemeToggler";

function Navbar() {
  const { pathname } = useLocation();
  const { mode, theme, toggleTheme } = useThemeToggler();
  function isActive(link: string) {
    return pathname === link ? "active" : undefined;
  }
  return (
    <AppBar
      sx={{
        bgcolor: lighten(theme.palette.background.paper, 0.035),
      }}
    >
      <Toolbar>
        <Logo />
        <Stack direction="row" ml="auto" spacing={2} mr={1}>
          {navlinks.map((link, i) => (
            <Navlink active={isActive(link.path)} key={i} to={link.path}>
              {link.name}
            </Navlink>
          ))}
        </Stack>
        {/* Toggle Theme Button */}
        <IconButton onClick={toggleTheme}>
          {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

export const Navlink = styled(Link)<{ active?: string | undefined }>`
  color: ${({ theme, active }) =>
    active ? theme.palette.text.primary : theme.palette.text.secondary};
  :hover {
    color: ${({ theme }) => theme.palette.text.primary};
  }
`;

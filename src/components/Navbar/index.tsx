import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Stack,
  styled,
  IconButton,
  lighten,
  Button,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import navlinks from "../../data/navlinks";
import Logo from "../Logo";
import {
  MdOutlineDarkMode as DarkModeIcon,
  MdOutlineLightMode as LightModeIcon,
} from "react-icons/md";
import { RxHamburgerMenu as MenuIcon } from "react-icons/rx";
import { useThemeToggler } from "../../contexts/ThemeToggler";
import NavDrawer from "./NavDrawer";

function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const { pathname } = useLocation();
  const { mode, theme, toggleTheme } = useThemeToggler();

  function toggleOpenMenu() {
    setOpenMenu((prev) => !prev);
  }

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
        <Logo sx={{ mr: "auto" }} />
        <Stack
          direction="row"
          spacing={2}
          mr={3}
          sx={{ display: ["none", "none", "flex"] }}
        >
          {navlinks.map((link, i) => (
            <Navlink active={isActive(link.path)} key={i} to={link.path}>
              {link.name}
            </Navlink>
          ))}
        </Stack>
        {/* Login / Register  */}
        <Stack direction="row" spacing={2} mr={1} alignItems="center">
          <Navlink to="/login">Login</Navlink>
          <Button component={Link} to="/register" variant="outlined">
            Register
          </Button>
        </Stack>
        {/* Toggle Theme Button */}
        <IconButton onClick={toggleTheme}>
          {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
        {/* Toggle Menu */}
        <IconButton onClick={toggleOpenMenu}>
          <MenuIcon />
        </IconButton>
      </Toolbar>
      <NavDrawer open={openMenu} onClose={toggleOpenMenu} />
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

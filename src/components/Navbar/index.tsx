import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Stack,
  styled,
  IconButton,
  lighten,
  Button,
  Avatar,
  Menu,
  MenuItem,
  colors,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import navlinks from "../../data/navlinks";
import Logo from "../Logo";
import {
  MdOutlineDarkMode as DarkModeIcon,
  MdOutlineLightMode as LightModeIcon,
  MdLogout as LogOutIcon,
} from "react-icons/md";
import { RxHamburgerMenu as MenuIcon } from "react-icons/rx";
import { useThemeToggler } from "../../contexts/ThemeToggler";
import NavDrawer from "./NavDrawer";
import { useAuth } from "../../contexts/AuthContext";

function Navbar() {
  const [menuEl, setMenuEl] = useState<null | HTMLElement>(null);
  const open = Boolean(menuEl);
  const { user, loading, logOut } = useAuth();
  const [openMenu, setOpenMenu] = useState(false);
  const { pathname } = useLocation();
  const { mode, theme, toggleTheme } = useThemeToggler();

  function handleAvatarClick(event: React.MouseEvent<HTMLElement>) {
    setMenuEl(event.currentTarget);
  }

  function handleAvatarMenuClose() {
    setMenuEl(null);
  }

  function toggleOpenMenu() {
    setOpenMenu((prev) => !prev);
  }

  function isActive(link: string) {
    return pathname === link ? "active" : undefined;
  }

  function handleLogOutClick() {
    logOut()
      .then(() => localStorage.removeItem("access-token"))
      .catch((err) => console.error(err));
  }

  return (
    <AppBar
      sx={{
        bgcolor: lighten(theme.palette.background.paper, 0.035),
      }}
    >
      <Toolbar>
        <Logo sx={{ mr: "auto" }} />
        {user && user.uid && (
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
        )}
        {/* Login / Register  */}
        <Stack
          direction="row"
          spacing={2}
          mr={1}
          alignItems="center"
          sx={{ display: !loading && !user?.uid ? "flex" : "none" }}
        >
          <Button component={Link} to="/login" variant="outlined">
            Login
          </Button>
        </Stack>
        {/* Toggle Theme Button */}
        <IconButton onClick={toggleTheme}>
          {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
        {/* Avatar */}
        <IconButton
          size="small"
          onClick={handleAvatarClick}
          sx={{ display: !loading && !user?.uid ? "none" : "flex" }}
        >
          <Avatar>{user && user.displayName && user.displayName[0]}</Avatar>
        </IconButton>
        {/* Toggle Menu */}
        <IconButton
          onClick={toggleOpenMenu}
          sx={{
            display: { md: "none" },
          }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
      <NavDrawer open={openMenu} onClose={toggleOpenMenu} />
      <Menu
        anchorEl={menuEl}
        id="account-menu"
        open={open}
        onClose={handleAvatarMenuClose}
        onClick={handleAvatarMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            bgcolor: mode === "dark" ? colors.grey[900] : colors.grey[100],
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: mode === "dark" ? colors.grey[900] : colors.grey[100],
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleLogOutClick}>
          <ListItemIcon>
            <LogOutIcon size="1.2em" />
          </ListItemIcon>
          <ListItemText>Log Out</ListItemText>
        </MenuItem>
      </Menu>
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

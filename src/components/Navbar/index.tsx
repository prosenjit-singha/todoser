import { AppBar, Toolbar } from "@mui/material";
import Logo from "../Logo";

function Navbar() {
  return (
    <AppBar>
      <Toolbar>
        <Logo />
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

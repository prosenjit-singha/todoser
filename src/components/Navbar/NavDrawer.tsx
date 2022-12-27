import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import navlinks from "../../data/navlinks";

import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";

type PropsType = {
  open: boolean;
  onClose: () => void;
};
function NavDrawer({ open, onClose }: PropsType) {
  return (
    <Drawer
      open={open}
      onClose={onClose}
      anchor="right"
      PaperProps={{
        sx: { minWidth: "min(300px, 100%)" },
      }}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={onClose}>
            <ListItemIcon>
              <MdClose size="1.5em" />
            </ListItemIcon>
            <ListItemText>Close Menu</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
      <List>
        {navlinks.map((link, i) => (
          <ListItem key={i} component={Link} to={link.path} disablePadding>
            <ListItemButton onClick={onClose}>
              <ListItemIcon>
                <link.Icon size="1.25em" />
              </ListItemIcon>
              <ListItemText>{link.name}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default NavDrawer;

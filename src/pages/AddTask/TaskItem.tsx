import {
  ListItem,
  IconButton,
  Checkbox,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { BsThreeDotsVertical as ThreeDotsVertical } from "react-icons/bs";

function TaskItem() {
  return (
    <ListItem
      sx={{
        ".MuiListItemSecondaryAction-root": {
          display: "flex",
        },
        ":hover > .MuiListItemSecondaryAction-root": {
          display: "flex !important",
        },
      }}
      secondaryAction={
        <IconButton>
          <ThreeDotsVertical />
        </IconButton>
      }
      disablePadding
    >
      <Checkbox sx={{ position: "absolute", left: "16px" }} />
      <ListItemButton>
        <ListItemText sx={{ ml: 8 }}>Task 1</ListItemText>
      </ListItemButton>
    </ListItem>
  );
}

export default TaskItem;

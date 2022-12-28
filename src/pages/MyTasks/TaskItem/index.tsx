import {
  ListItem,
  Checkbox,
  IconButton,
  Stack,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  colors,
} from "@mui/material";
import { useState } from "react";
import TaskType from "../../../types/task.type";
import { BsThreeDotsVertical as ThreeDotsVertical } from "react-icons/bs";
import { FiEdit as EditIcon } from "react-icons/fi";
import { MdDeleteOutline as DeleteIcon } from "react-icons/md";
import { useThemeToggler } from "../../../contexts/ThemeToggler";

function TaskItem({ task }: { task: TaskType }) {
  const { mode, theme } = useThemeToggler();
  const [enableEdit, setEnableEdit] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(menuAnchor);
  const closeMenu = () => setMenuAnchor(null);

  return (
    <>
      <ListItem
        onClick={() => setEnableEdit(true)}
        sx={{
          borderRadius: 0.5,
          ":hover": {
            bgcolor: mode === "dark" ? colors.grey[900] : colors.grey[100],
            outline: `1px solid ${theme.palette.divider}`,
          },
          ":hover .MuiIconButton-root": {
            visibility: "visible",
          },
        }}
      >
        <Checkbox sx={{ mr: 2, mb: "auto" }} />
        <Stack>
          <Typography sx={{ fontSize: 18 }}>{task.title}</Typography>
        </Stack>
        <IconButton
          sx={{ ml: "auto", visibility: "hidden" }}
          onClick={(e) => setMenuAnchor(e.currentTarget)}
        >
          <ThreeDotsVertical />
        </IconButton>
      </ListItem>
      {/* <Divider /> */}
      <Menu
        id="task-menu"
        anchorEl={menuAnchor}
        open={openMenu}
        onClose={closeMenu}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={closeMenu}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText>Edit Task</ListItemText>
        </MenuItem>
        <MenuItem onClick={closeMenu}>
          <ListItemIcon>
            <DeleteIcon size="1.25em" />
          </ListItemIcon>
          <ListItemText>Delete Task</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}

export default TaskItem;

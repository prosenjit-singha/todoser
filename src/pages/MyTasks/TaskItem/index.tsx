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
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import TaskType from "../../../types/task.type";
import { BsThreeDotsVertical as ThreeDotsVertical } from "react-icons/bs";
import { FiEdit as EditIcon } from "react-icons/fi";
import { MdDeleteOutline as DeleteIcon } from "react-icons/md";
import { useThemeToggler } from "../../../contexts/ThemeToggler";
import { useTasks } from "../../../contexts/TasksProvider";

type PropsType = {
  index: number;
  task: TaskType;
  openUpdateTaskModal: (data: { index: number; task: TaskType }) => void;
};

function TaskItem({ task, openUpdateTaskModal, index }: PropsType) {
  const [currentTask, setCurrentTask] = useState<{
    index: number;
    task: TaskType;
  } | null>(null);
  const { mode, theme } = useThemeToggler();
  const [enableEdit, setEnableEdit] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(menuAnchor);
  const { updateTask } = useTasks();
  const closeMenu = () => {
    setMenuAnchor(null);
    setCurrentTask(null);
  };

  function handleOpenMenu(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number,
    task: TaskType
  ) {
    setCurrentTask({ index, task });
    setMenuAnchor(e.currentTarget);
  }

  function handleEditClick() {
    setMenuAnchor(null);
    currentTask && openUpdateTaskModal(currentTask);
  }

  function handleCompleted() {
    const updatedTask: TaskType = { ...task, isCompleted: true };
    setTimeout(() => updateTask(index, updatedTask), 350);
  }

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
        <Tooltip title="Mark as completed" describeChild>
          <Checkbox onChange={handleCompleted} sx={{ mr: 2, mb: "auto" }} />
        </Tooltip>
        <Stack>
          <Typography sx={{ fontSize: 18 }}>{task.title}</Typography>
        </Stack>
        <IconButton
          sx={{ ml: "auto", visibility: "hidden" }}
          onClick={(e) => handleOpenMenu(e, index, task)}
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
        <MenuItem onClick={handleEditClick}>
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

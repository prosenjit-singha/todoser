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
  Collapse,
  Chip,
  Avatar,
  AvatarGroup,
} from "@mui/material";
import { useState } from "react";
import TaskType from "../../../types/task.type";
import { BsThreeDotsVertical as ThreeDotsVertical } from "react-icons/bs";
import { FiEdit as EditIcon } from "react-icons/fi";
import { MdDeleteOutline as DeleteIcon } from "react-icons/md";
import { RxDoubleArrowUp as DetailsUpIcon } from "react-icons/rx";
import { useThemeToggler } from "../../../contexts/ThemeToggler";
import { toast } from "react-toastify";
import { useMutateTasks } from "../../../hooks/useTasks";
import { User } from "firebase/auth";
import { PhotoProvider, PhotoView } from "react-photo-view";

type PropsType = {
  user: User | null;
  index: number;
  task: TaskType;
  tasks: TaskType[];
  openUpdateTaskModal: (data: { index: number; task: TaskType }) => void;
};

function TaskItem({ task, tasks, openUpdateTaskModal, index }: PropsType) {
  const [currentTask, setCurrentTask] = useState<{
    index: number;
    task: TaskType;
  } | null>(null);
  const { mode, theme } = useThemeToggler();
  const [viewDetails, setViewDetails] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(menuAnchor);
  const { mutateAsync: mutateTask } = useMutateTasks();

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
    toast.promise(
      mutateTask({
        tasks: tasks,
        index,
        newTask: updatedTask,
        operation: "update",
      }),
      {
        pending: "Adding to completed list...",
        success: "Task Completed!",
        error: "An error while completing task",
      },
      {
        autoClose: 3000,
      }
    );
  }

  function handleDeleteTask() {
    closeMenu();
    toast.promise(
      mutateTask({
        operation: "delete",
        index,
        tasks,
      }),
      {
        pending: "Deleting task...",
        success: "Task Deleted!",
        error: "An error occur while deleting!",
      },
      {
        autoClose: 3000,
      }
    );
  }

  return (
    <>
      <ListItem
        sx={{
          p: 1,
          borderRadius: 0.5,
          alignItems: "flex-start",
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
        {/* middle section */}
        <Stack
          onClick={() => setViewDetails(true)}
          sx={{ cursor: viewDetails ? "auto" : "pointer", width: "100%" }}
        >
          <Typography variant="h6" sx={{ mt: 0.5 }}>
            {task.title}
          </Typography>
          <Collapse in={viewDetails}>
            <Typography>{task.details}</Typography>
            <Stack direction="row" sx={{ gap: 1, my: 1 }}>
              {task.labels.map((label, i) => (
                <Chip label={label} key={i} size="small" />
              ))}
            </Stack>
            <PhotoProvider>
              <AvatarGroup sx={{ my: 1, width: "fit-content" }}>
                {task.images.map((image, i) => (
                  <PhotoView src={image.url} key={i}>
                    <Avatar src={image.url} alt={image.title} />
                  </PhotoView>
                ))}
              </AvatarGroup>
            </PhotoProvider>
          </Collapse>
        </Stack>
        {/* side buttons */}
        <Stack sx={{ ml: "auto", height: "100%" }}>
          <IconButton
            sx={{ visibility: "hidden", mb: "auto" }}
            onClick={(e) => handleOpenMenu(e, index, task)}
          >
            <ThreeDotsVertical />
          </IconButton>
          <IconButton
            sx={{
              visibility: "hidden",
              display: viewDetails ? "flex" : "none",
            }}
            onClick={() => setViewDetails(false)}
          >
            <DetailsUpIcon />
          </IconButton>
        </Stack>
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
        <MenuItem onClick={handleDeleteTask}>
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

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
import { toast } from "react-toastify";
import { useMutateTasks } from "../../../hooks/useTasks";
import { User } from "firebase/auth";
import {
  RefetchOptions,
  RefetchQueryFilters,
  QueryObserverResult,
} from "@tanstack/react-query";
// import { useTasks } from "../../../contexts/TasksProvider";

type PropsType = {
  user: User | null;
  index: number;
  task: TaskType;
  tasks: TaskType[];
  openUpdateTaskModal: (data: { index: number; task: TaskType }) => void;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<TaskType[], unknown>>;
};

function TaskItem({ task, tasks, openUpdateTaskModal, index }: PropsType) {
  const [currentTask, setCurrentTask] = useState<{
    index: number;
    task: TaskType;
  } | null>(null);
  const { mode, theme } = useThemeToggler();
  const [enableEdit, setEnableEdit] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(menuAnchor);
  // const { updateTask, deleteTask } = useTasks();
  const { mutateAsync: mutateTask } = useMutateTasks();
  // const {refetch, data=[]} = useTasks(user && user.uid ? user.uid : "" );

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
        onClick={() => setEnableEdit(true)}
        sx={{
          p: 1,
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
          <Typography sx={{ fontSize: 16 }}>{task.title}</Typography>
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

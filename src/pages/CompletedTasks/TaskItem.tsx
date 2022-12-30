import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemText,
  Tooltip,
  colors,
  Typography,
  Collapse,
  TextField,
} from "@mui/material";
import { useRef, useState } from "react";
import {
  MdOutlineDeleteForever as DeleteIcon,
  MdOutlineComment as CommentIcon,
} from "react-icons/md";
import { BiCommentCheck as CheckIcon } from "react-icons/bi";
import { useThemeToggler } from "../../contexts/ThemeToggler";
import TaskType from "../../types/task.type";
import { useTasks } from "../../contexts/TasksProvider";
import { toast } from "react-toastify";
import { useMutateTasks } from "../../hooks/useTasks";

type PropsType = {
  task: TaskType;
  tasks: TaskType[];
  index: number;
};

function TaskItem({ task, index, tasks }: PropsType) {
  const { updateTask, deleteTask } = useTasks();
  const { mode, theme } = useThemeToggler();
  const [openComment, setOpenComment] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { mutate: mutateTask } = useMutateTasks();

  async function handleClick() {
    setOpenComment((prev) => !prev);
    setTimeout(() => inputRef.current?.focus(), 100);
  }

  function handleSaveComment() {
    if (inputRef.current) {
      const comment = inputRef.current.value;
      updateTask(index, { ...task, comment });
    }
  }

  function handleDeleteClick() {
    // deleteTask(index);
    mutateTask({
      tasks,
      index,
      operation: "delete",
    });
    toast.success("Task deleted!");
  }

  return (
    <ListItem
      sx={{
        alignItems: "flex-start",
        borderRadius: 0.5,
        ".MuiIconButton-root": {
          color: "text.secondary",
        },
        ".MuiIconButton-root:hover": {
          color: "text.primary",
        },
        ":hover .MuiIconButton-root": {
          visibility: "visible",
        },
        ":hover": {
          outline: `1px solid ${theme.palette.divider}`,
          bgcolor: mode === "dark" ? colors.grey[900] : colors.grey[200],
        },
      }}
    >
      <Tooltip title="Not Completed">
        <Checkbox sx={{ mr: [2, 3] }} />
      </Tooltip>

      <ListItemText>
        <Typography variant="h6" component="p">
          {task.title}
        </Typography>
        <Collapse
          in={openComment}
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSaveComment();
          }}
        >
          <TextField
            inputRef={inputRef}
            label="Comment"
            defaultValue={task.comment}
            variant="standard"
            fullWidth
            InputProps={{
              endAdornment: (
                <Tooltip title="Save">
                  <IconButton
                    onClick={handleSaveComment}
                    sx={{ display: openComment ? "flex" : "none" }}
                  >
                    <CheckIcon />
                  </IconButton>
                </Tooltip>
              ),
            }}
            autoComplete="off"
          />
        </Collapse>
      </ListItemText>

      {/* Side Icons */}
      <Tooltip title="Add Comment" describeChild>
        <IconButton onClick={handleClick} sx={{ visibility: "hidden" }}>
          <CommentIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete Forever" describeChild>
        <IconButton onClick={handleDeleteClick} sx={{ visibility: "hidden" }}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </ListItem>
  );
}

export default TaskItem;

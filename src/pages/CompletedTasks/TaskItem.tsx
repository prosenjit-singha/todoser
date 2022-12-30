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
  const { mode, theme } = useThemeToggler();
  const [openComment, setOpenComment] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { mutateAsync: mutateTask } = useMutateTasks();

  async function handleClick() {
    setOpenComment((prev) => !prev);
    setTimeout(() => inputRef.current?.focus(), 100);
  }

  function handleSaveComment() {
    if (inputRef.current) {
      const comment = inputRef.current.value;
      toast.promise(
        mutateTask({
          operation: "update",
          index,
          tasks,
          newTask: { ...task, comment },
        }),
        {
          pending: "Adding comment...",
          success: "Comment added!",
          error: "An error occur while adding comment!",
        }
      );
    }
  }

  function handleDeleteClick() {
    toast.promise(
      mutateTask({
        tasks,
        index,
        operation: "delete",
      }),
      {
        pending: "Removing task from the list...",
        success: "Task removed from the list!",
        error: "An error occur while removing the task!",
      }
    );
  }

  function undoCompletedTask() {
    toast.promise(
      mutateTask({
        index,
        tasks,
        operation: "update",
        newTask: { ...task, isCompleted: false },
      }),
      {
        pending: "Updating task...",
        success: "Set as uncompleted!",
        error: "An error occur while updating task!",
      }
    );
  }

  return (
    <ListItem
      sx={{
        p: 1,
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
        <Checkbox
          onClick={undoCompletedTask}
          sx={{ mr: [2, 3] }}
          defaultChecked={task.isCompleted}
        />
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
                  <IconButton onClick={handleSaveComment}>
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

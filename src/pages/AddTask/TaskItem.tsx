import {
  ListItem,
  IconButton,
  Checkbox,
  ListItemText,
  Divider,
  Tooltip,
} from "@mui/material";
import TaskType from "../../types/task.type";
import { CgUndo } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { useMutateTasks } from "../../hooks/useTasks";
import { toast } from "react-toastify";

type PropsType = {
  task: TaskType;
  tasks: TaskType[];
  index: number;
};

function TaskItem({ task, index, tasks }: PropsType) {
  const navigate = useNavigate();
  const { mutateAsync: mutateTask } = useMutateTasks();

  function handleUndo() {
    toast.promise(
      mutateTask({
        operation: "delete",
        index,
        tasks,
      }),
      {
        pending: "Removing task...",
        success: "Task removed!",
        error: "An error occur while removing task!",
      }
    );
  }
  return (
    <>
      <Divider sx={{ mx: 3 }} />
      <ListItem
        sx={{
          ".MuiListItemSecondaryAction-root": {
            display: "flex",
          },
          ":hover > .MuiListItemSecondaryAction-root": {
            display: "flex !important",
          },
        }}
      >
        <Checkbox disabled sx={{ position: "absolute", left: "16px" }} />

        <ListItemText
          sx={{ ml: 8, cursor: "pointer" }}
          onClick={() => navigate("/my-tasks")}
        >
          {task.title}
        </ListItemText>
        {index === 0 && (
          <Tooltip title="Undo" describeChild>
            <IconButton onClick={handleUndo} sx={{ color: "text.secondary" }}>
              <CgUndo />
            </IconButton>
          </Tooltip>
        )}
      </ListItem>
    </>
  );
}

export default TaskItem;

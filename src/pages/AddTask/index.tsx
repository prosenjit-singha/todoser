import { List, Paper } from "@mui/material";
import { Main } from "../../components/styled";
import TaskItem from "./TaskItem";
import AddForm from "./AddForm";
import { useAuth } from "../../contexts/AuthContext";
import TaskType from "../../types/task.type";
import useTasks from "../../hooks/useTasks";
// import { useTasks } from "../../contexts/TasksProvider";

function AddTask() {
  // const { tasks } = useTasks();
  const { user } = useAuth();
  const { data: tasks = [] } = useTasks(user && user.uid ? user.uid : "");

  return (
    <Main sx={{ p: [0, 2, 3] }}>
      <Paper
        sx={({ shadows }) => ({
          my: [2, 3],
          boxShadow: ["none", shadows[5], shadows[10]],
        })}
      >
        <List>
          <AddForm />
          {tasks.map((task, i) => (
            <TaskItem key={i} task={task} />
          ))}
        </List>
      </Paper>
    </Main>
  );
}

export default AddTask;

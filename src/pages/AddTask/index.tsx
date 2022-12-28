import { List, Paper } from "@mui/material";
import { Main } from "../../components/styled";
import TaskItem from "./TaskItem";
import AddForm from "./AddForm";
import { useTasks } from "../../contexts/TasksProvider";

function AddTask() {
  const { tasks } = useTasks();
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

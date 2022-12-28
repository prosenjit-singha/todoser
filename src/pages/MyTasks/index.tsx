import { Main } from "../../components/styled";
import { Paper, Typography, List } from "@mui/material";
import TaskItem from "./TaskItem";
import { useTasks } from "../../contexts/TasksProvider";

function MyTasks() {
  const { tasks } = useTasks();
  return (
    <Main sx={{ p: [2, 3] }}>
      <Paper
        sx={({ shadows }) => ({
          my: [2, 3],
          p: 1,
          boxShadow: ["none", shadows[5], shadows[10]],
        })}
      >
        <Typography variant="h5" component="h1" textAlign="center">
          My Task List
        </Typography>
        <List>
          {tasks.map((task, i) => (
            <TaskItem task={task} key={i} />
          ))}
        </List>
      </Paper>
    </Main>
  );
}

export default MyTasks;

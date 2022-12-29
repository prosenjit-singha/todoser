import { List, Paper, Typography } from "@mui/material";
import { Main } from "../../components/styled";
import useTasks from "../../hooks/useTasks";
import TaskItem from "./TaskItem";
// import { useTasks } from "../../contexts/TasksProvider";

function CompletedTasks() {
  const { data: tasks = [] } = useTasks();
  return (
    <Main sx={{ p: [2, 3] }}>
      <Paper
        sx={({ shadows }) => ({
          p: [1, 2],
          boxShadow: ["none", shadows[5], shadows[10]],
        })}
      >
        <Typography variant="h5" textAlign="center" sx={{ mb: 2 }}>
          Completed Tasks
        </Typography>
        <List>
          {/* <TaskItem /> */}
          {tasks.map(
            (task, i) =>
              task.isCompleted && <TaskItem index={i} task={task} key={i} />
          )}
        </List>
      </Paper>
    </Main>
  );
}

export default CompletedTasks;

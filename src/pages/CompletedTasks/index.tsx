import { Divider, List, Paper, Typography, lighten } from "@mui/material";
import { Main } from "../../components/styled";
import useTasks from "../../hooks/useTasks";
import TaskItemSkeleton from "../MyTasks/TaskItemSkeleton";
import TaskItem from "./TaskItem";

function CompletedTasks() {
  const { data: tasks = [], isLoading } = useTasks();

  return (
    <Main sx={{ p: [2, 3] }}>
      <Paper
        elevation={0}
        sx={({ shadows, palette }) => ({
          p: [1, 2],
          my: [2, 3],
          boxShadow: ["none", shadows[5], shadows[10]],
          bgcolor: ["transparent", lighten(palette.background.paper, 0.035)],
        })}
      >
        <Typography variant="h5" textAlign="center">
          Completed Tasks
        </Typography>
        <Divider sx={{ my: 2 }} />
        <List>
          {/* <TaskItem /> */}
          {isLoading &&
            [1, 2, 3, 4, 5].map((i) => <TaskItemSkeleton key={i} />)}
          {tasks.map(
            (task, i) =>
              task.isCompleted && (
                <TaskItem index={i} task={task} key={i} tasks={tasks} />
              )
          )}
        </List>
      </Paper>
    </Main>
  );
}

export default CompletedTasks;

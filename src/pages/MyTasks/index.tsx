import { useState } from "react";
import { Main } from "../../components/styled";
import { Paper, Typography, List, Divider, lighten } from "@mui/material";
import TaskItem from "./TaskItem";
import EditModal from "./EditModal";
import TaskType from "../../types/task.type";
import useTasks from "../../hooks/useTasks";
import { useAuth } from "../../contexts/AuthContext";
import TaskItemSkeleton from "./TaskItemSkeleton";
import Oops from "./Oops";

function MyTasks() {
  // const { tasks } = useTasks();
  const { user } = useAuth();
  const { data: tasks = [], isLoading } = useTasks();
  const notCompletedTasks = tasks.filter((task) => !task.isCompleted);
  const [taskToBeUpdated, setTaskToBeUpdated] = useState<{
    index: number;
    task: TaskType;
  } | null>(null);

  function openUpdateTaskModal(data: { index: number; task: TaskType }) {
    setTaskToBeUpdated(data);
  }

  function handleTaskModalClose() {
    setTaskToBeUpdated(null);
  }
  if (!isLoading && !notCompletedTasks.length) return <Oops />;
  return (
    <Main sx={{ p: [0, 2, 3] }}>
      <Paper
        elevation={0}
        sx={({ shadows, palette }) => ({
          p: [1, 2, 3],
          my: [2, 3],
          boxShadow: ["none", shadows[5], shadows[10]],
          bgcolor: ["transparent", lighten(palette.background.paper, 0.035)],
        })}
      >
        <Typography variant="h5" component="h1" textAlign="center">
          My Task List
        </Typography>
        <Divider sx={{ my: 2 }} />

        <List>
          {isLoading &&
            [1, 2, 3, 4, 5].map((i) => <TaskItemSkeleton key={i} />)}
          {tasks.map(
            (task, i) =>
              !task.isCompleted && (
                <TaskItem
                  user={user}
                  openUpdateTaskModal={openUpdateTaskModal}
                  task={task}
                  key={i}
                  index={i}
                  tasks={tasks}
                />
              )
          )}
        </List>
      </Paper>
      {taskToBeUpdated && (
        <EditModal
          data={taskToBeUpdated}
          open={!!taskToBeUpdated}
          onClose={handleTaskModalClose}
        />
      )}
    </Main>
  );
}

export default MyTasks;

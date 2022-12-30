import { useState } from "react";
import { Main } from "../../components/styled";
import { Paper, Typography, List, Divider, lighten } from "@mui/material";
import TaskItem from "./TaskItem";
import EditModal from "./EditModal";
import TaskType from "../../types/task.type";
import useTasks from "../../hooks/useTasks";
import { useAuth } from "../../contexts/AuthContext";
import Loading from "../../components/Loading";

function MyTasks() {
  // const { tasks } = useTasks();
  const { user } = useAuth();
  const { data: tasks = [], isLoading } = useTasks();
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
  if (isLoading) return <Loading />;
  return (
    <Main sx={{ p: [2, 3] }}>
      <Paper
        elevation={0}
        sx={({ shadows, palette }) => ({
          my: [2, 3],
          p: 2,
          boxShadow: ["none", shadows[5], shadows[10]],
          bgcolor: ["transparent", lighten(palette.background.paper, 0.035)],
        })}
      >
        <Typography variant="h5" component="h1" textAlign="center">
          My Task List
        </Typography>
        <Divider sx={{ my: 2 }} />

        <List>
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

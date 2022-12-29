import { useState } from "react";
import { Main } from "../../components/styled";
import { Paper, Typography, List } from "@mui/material";
import TaskItem from "./TaskItem";
import EditModal from "./EditModal";
import TaskType from "../../types/task.type";
import useTasks from "../../hooks/useTasks";
import { useAuth } from "../../contexts/AuthContext";
// import { useTasks } from "../../contexts/TasksProvider";

function MyTasks() {
  // const { tasks } = useTasks();
  const { user } = useAuth();
  const { data: tasks = [], refetch } = useTasks(
    user && user.uid ? user.uid : ""
  );
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
                  refetch={refetch}
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

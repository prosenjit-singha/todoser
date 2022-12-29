import { useState } from "react";
import { Main } from "../../components/styled";
import { Paper, Typography, List } from "@mui/material";
import TaskItem from "./TaskItem";
import { useTasks } from "../../contexts/TasksProvider";
import EditModal from "./EditModal";
import TaskType from "../../types/task.type";

function MyTasks() {
  const { tasks } = useTasks();
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
                  openUpdateTaskModal={openUpdateTaskModal}
                  task={task}
                  key={i}
                  index={i}
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

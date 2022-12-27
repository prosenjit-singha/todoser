import { Stack, List } from "@mui/material";
import { Main } from "../../components/styled";
import TaskItem from "./TaskItem";
import AddForm from "./AddForm";
import { useTasks } from "../../contexts/TasksProvider";

function AddTask() {
  const { tasks } = useTasks();
  return (
    <Main>
      <List>
        <AddForm />
        {tasks.map((task, i) => (
          <TaskItem key={i} task={task} />
        ))}
      </List>
    </Main>
  );
}

export default AddTask;

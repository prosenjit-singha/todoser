import { Stack, List } from "@mui/material";
import { Main } from "../../components/styled";
import TaskItem from "./TaskItem";
import AddForm from "./AddForm";
import { useTasks } from "../../contexts/TasksProvider";

function AddTask() {
  const { tasks } = useTasks();
  return (
    <Main>
      <Stack mt={3} mx={4}>
        AddTask
      </Stack>
      <List>
        <AddForm />
        {tasks.map((task, i) => (
          <TaskItem key={i} />
        ))}
      </List>
    </Main>
  );
}

export default AddTask;

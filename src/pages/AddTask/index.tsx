import { List, Paper, lighten } from "@mui/material";
import { Main } from "../../components/styled";
import TaskItem from "./TaskItem";
import AddForm from "./AddForm";
import useTasks from "../../hooks/useTasks";

function AddTask() {
  const { data: tasks = [] } = useTasks();

  return (
    <Main sx={{ p: [0, 2, 3] }}>
      <Paper
        elevation={0}
        sx={({
          shadows,
          palette: {
            background: { paper },
          },
        }) => ({
          my: [2, 3],
          boxShadow: ["none", shadows[5], shadows[10]],
          bgcolor: ["transparent", lighten(paper, 0.035)],
        })}
      >
        <List>
          <AddForm />
          {tasks.slice(0, 3).map((task, i) => (
            <TaskItem key={i} task={task} />
          ))}
        </List>
      </Paper>
    </Main>
  );
}

export default AddTask;

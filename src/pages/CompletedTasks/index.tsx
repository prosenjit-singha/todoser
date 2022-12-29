import { List, Paper, Typography } from "@mui/material";
import { Main } from "../../components/styled";
import TaskItem from "./TaskItem";

function CompletedTasks() {
  return (
    <Main sx={{ p: [2, 3] }}>
      <Paper
        sx={({ shadows }) => ({
          p: [1, 2],
          boxShadow: ["none", shadows[5], shadows[10]],
        })}
      >
        <Typography variant="h5">Completed Tasks</Typography>
        <List>
          <TaskItem />
        </List>
      </Paper>
    </Main>
  );
}

export default CompletedTasks;

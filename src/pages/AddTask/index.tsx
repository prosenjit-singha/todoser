import {
  List,
  Paper,
  lighten,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { AiOutlineFieldTime as RecentIcon } from "react-icons/ai";
import { Main } from "../../components/styled";
import TaskItem from "./TaskItem";
import AddForm from "./AddForm";
import useTasks from "../../hooks/useTasks";
import { useRecentTasks } from "../../contexts/TasksProvider";

function AddTask() {
  const { data: tasks = [] } = useTasks();
  const { tasks: recentTasks } = useRecentTasks();
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
          <Divider />
          <ListItem sx={{ color: "text.secondary" }}>
            <ListItemIcon
              sx={{ minWidth: "fit-content", color: "text.secondary" }}
            >
              <RecentIcon size="1.5em" style={{ margin: 4, marginLeft: 10 }} />
            </ListItemIcon>
            <ListItemText sx={{ ml: 3 }}>Recently Added task</ListItemText>
          </ListItem>

          {recentTasks.map((task, i) => (
            <TaskItem tasks={tasks} index={i} key={i} task={task} />
          ))}
        </List>
      </Paper>
    </Main>
  );
}

export default AddTask;

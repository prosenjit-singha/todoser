import {
  ListItem,
  IconButton,
  Checkbox,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import { BsThreeDotsVertical as ThreeDotsVertical } from "react-icons/bs";
import TaskType from "../../types/task.type";

type PropsType = {
  task: TaskType;
};

function TaskItem({ task }: PropsType) {
  return (
    <>
      <Divider sx={{ mx: 3 }} />
      <ListItem
        sx={{
          ".MuiListItemSecondaryAction-root": {
            display: "flex",
          },
          ":hover > .MuiListItemSecondaryAction-root": {
            display: "flex !important",
          },
        }}
        // secondaryAction={
        //   <IconButton>
        //     <ThreeDotsVertical />
        //   </IconButton>
        // }
      >
        <Checkbox disabled sx={{ position: "absolute", left: "16px" }} />

        <ListItemText sx={{ ml: 8 }}>{task.title}</ListItemText>
      </ListItem>
    </>
  );
}

export default TaskItem;

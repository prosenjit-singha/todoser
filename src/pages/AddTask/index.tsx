import { useState } from "react";
import {
  Stack,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Checkbox,
  Collapse,
  IconButton,
  InputBase,
} from "@mui/material";
import { Main } from "../../components/styled";
import { MdAdd, MdClose } from "react-icons/md";
import { BsThreeDotsVertical as ThreeDotsVertical } from "react-icons/bs";

function AddTask() {
  const [add, setAdd] = useState(false);
  return (
    <Main>
      <Stack mt={3} mx={4}>
        AddTask
      </Stack>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => setAdd((prev) => !prev)}>
            <ListItemIcon sx={{ ml: 1 }}>
              <MdAdd size={24} />
            </ListItemIcon>
            <ListItemText>Add Task</ListItemText>
          </ListItemButton>
        </ListItem>
        <Collapse in={add}>
          <ListItem
            sx={{
              ".MuiListItemSecondaryAction-root": {
                display: "flex",
              },
              ":hover > .MuiListItemSecondaryAction-root": {
                display: "flex !important",
              },
            }}
            secondaryAction={
              <IconButton>
                <MdClose />
              </IconButton>
            }
            disablePadding
          >
            <Checkbox disabled sx={{ position: "absolute", left: "16px" }} />

            <ListItemText sx={{ ml: 10 }}>
              <InputBase
                sx={{ fontSize: "1.2rem" }}
                placeholder="Task title"
                fullWidth
              />
              <InputBase size="small" placeholder="Details" fullWidth />
            </ListItemText>
          </ListItem>
        </Collapse>
        <ListItem
          sx={{
            ".MuiListItemSecondaryAction-root": {
              display: "flex",
            },
            ":hover > .MuiListItemSecondaryAction-root": {
              display: "flex !important",
            },
          }}
          secondaryAction={
            <IconButton>
              <ThreeDotsVertical />
            </IconButton>
          }
          disablePadding
        >
          <Checkbox sx={{ position: "absolute", left: "16px" }} />
          <ListItemButton>
            <ListItemText sx={{ ml: 8 }}>Task 1</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Main>
  );
}

export default AddTask;

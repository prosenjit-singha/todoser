import { useState } from "react";
import {
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Checkbox,
  Collapse,
  IconButton,
  InputBase,
} from "@mui/material";
import { MdAdd, MdClose } from "react-icons/md";
import { useTasks } from "../../contexts/TasksProvider";
import { useFormik } from "formik";
import addTaskSchema from "../../schemas/addTask.schema";
import { FormikHelpers } from "formik/dist/types";

const initialValues = {
  title: "",
  desc: "",
  label: "",
  imageURL: "",
};

function AddForm() {
  const [open, setOpen] = useState(false);
  const { values, errors, handleSubmit, handleBlur, handleChange, touched } =
    useFormik({
      initialValues,
      onSubmit,
      validationSchema: addTaskSchema,
    });
  const { addTask } = useTasks();

  function onSubmit(
    v: typeof initialValues,
    actions: FormikHelpers<typeof initialValues>
  ) {
    console.info("submittion");
    addTask({
      title: v.title,
      desc: v.desc,
      label: [],
      isCompleted: false,
      imageURL: "",
    });

    actions.resetForm();
  }

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton onClick={() => setOpen((prev) => !prev)}>
          <ListItemIcon sx={{ ml: 1 }}>
            <MdAdd size={24} />
          </ListItemIcon>
          <ListItemText>Add Task</ListItemText>
        </ListItemButton>
      </ListItem>
      <Collapse in={open}>
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
            <form onSubmit={handleSubmit}>
              <InputBase
                name="title"
                value={values.title}
                onChange={handleChange}
                sx={{ fontSize: "1.2rem" }}
                placeholder="Task title"
                fullWidth
              />
              <InputBase
                name="desc"
                value={values.desc}
                onChange={handleChange}
                size="small"
                placeholder="Details"
                fullWidth
              />
              <input type="submit" hidden />
            </form>
          </ListItemText>
        </ListItem>
      </Collapse>
    </>
  );
}

export default AddForm;

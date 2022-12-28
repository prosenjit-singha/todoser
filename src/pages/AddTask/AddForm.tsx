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
  Tooltip,
} from "@mui/material";
import {
  MdAdd,
  MdClose,
  MdOutlineNewLabel as AddLabelIcon,
} from "react-icons/md";
import { BiImageAdd as AddImageIcon } from "react-icons/bi";
import { useTasks } from "../../contexts/TasksProvider";
import { useFormik } from "formik";
import addTaskSchema from "../../schemas/addTask.schema";
import { FormikHelpers } from "formik/dist/types";
import { Stack } from "@mui/system";

const initialValues = {
  title: "",
  desc: "",
  label: "",
  image: [],
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

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      console.info(typeof e.target.files[0]);
    }
  }

  function onSubmit(
    v: typeof initialValues,
    actions: FormikHelpers<typeof initialValues>
  ) {
    addTask({
      title: v.title,
      desc: v.desc,
      label: [],
      isCompleted: false,
      image: [],
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
              <Stack direction="row" spacing={1}>
                <Tooltip title="Add label" describeChild>
                  <IconButton sx={{ color: "text.secondary" }}>
                    <AddLabelIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Add Image" describeChild>
                  <IconButton
                    component="label"
                    sx={{ color: "text.secondary" }}
                  >
                    <AddImageIcon />
                    <input
                      hidden
                      onChange={handleImageUpload}
                      accept="image/*"
                      type="file"
                    />
                  </IconButton>
                </Tooltip>
              </Stack>
              <input type="submit" hidden />
            </form>
          </ListItemText>
        </ListItem>
      </Collapse>
    </>
  );
}

export default AddForm;

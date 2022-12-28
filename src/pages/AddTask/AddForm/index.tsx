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
  CircularProgress,
  Divider,
  Chip,
  Alert,
  Typography,
  Box,
} from "@mui/material";
import {
  MdAdd,
  MdClose,
  MdOutlineNewLabel as AddLabelIcon,
} from "react-icons/md";
import { CgUndo as UndoIcon } from "react-icons/cg";
import { BiImageAdd as AddImageIcon } from "react-icons/bi";
import { useTasks } from "../../../contexts/TasksProvider";
import { useFormik } from "formik";
import addTaskSchema from "../../../schemas/addTask.schema";
import { FormikHelpers } from "formik/dist/types";
import { Stack } from "@mui/system";
import uploadImage from "../../../api/uploadImage";
import AttachedImages from "./AttachedImages";
import AddLabelModal from "./AddLabelModal";
import Toast from "./Toast";
import { toast } from "react-toastify";
import { useThemeToggler } from "../../../contexts/ThemeToggler";

const initialValues = {
  title: "",
  desc: "",
  labels: [],
  images: [],
};

function AddForm() {
  const { mode } = useThemeToggler();
  const [open, setOpen] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [openAddLabel, setOpenAddLabel] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const {
    values,
    errors,
    handleSubmit,
    handleBlur,
    handleChange,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues,
    onSubmit,
    validationSchema: addTaskSchema,
  });
  const { addTask, deleteTask } = useTasks();

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    try {
      console.info(e);
      setIsUploading(true);
      if (e.target.files && e.target.files[0]) {
        const res = await uploadImage(e.target.files[0]);
        setFieldValue("images", [...values.images, res]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      e.target.value = "";

      if (!/safari/i.test(navigator.userAgent)) {
        e.target.type = "";
        e.target.type = "file";
      }
      setIsUploading(false);
    }
  }

  function onSubmit(
    v: typeof initialValues,
    actions: FormikHelpers<typeof initialValues>
  ) {
    addTask({
      title: v.title,
      desc: v.desc,
      labels: [],
      isCompleted: false,
      images: [],
    });
    toast.success(<Success onUndo={() => deleteTask(0)} />, {
      theme: mode,
      position: "top-center",
      autoClose: 3000,
      closeButton: () => (
        <Tooltip title="Close Toast" describeChild>
          <IconButton
            sx={{
              display: "flex",
              height: "fit-content",
              width: "fit-content",
              mx: "auto",
            }}
          >
            <MdClose />
          </IconButton>
        </Tooltip>
      ),
    });
    actions.resetForm();
  }

  function removeLabel(name: string) {
    setFieldValue(
      "labels",
      values.labels.filter((label) => label !== name)
    );
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
          disablePadding
        >
          <Checkbox disabled sx={{ mx: 2, mb: "auto" }} />
          <ListItemText>
            <form onSubmit={handleSubmit}>
              <InputBase
                name="title"
                value={values.title}
                onChange={handleChange}
                sx={{ fontSize: "1.2rem" }}
                placeholder="Task title"
                fullWidth
                autoComplete="off"
              />
              <InputBase
                name="desc"
                value={values.desc}
                onChange={handleChange}
                size="small"
                placeholder="Details"
                fullWidth
                autoComplete="off"
                // multiline
              />
              <Divider />
              <AttachedImages
                images={values.images}
                setFieldValue={setFieldValue}
              />
              <Stack direction="row" sx={{ gap: 1, my: 1 }}>
                {values.labels.map((label, i) => (
                  <Chip
                    size="small"
                    label={label}
                    key={i}
                    onDelete={() => removeLabel(label)}
                  />
                ))}
              </Stack>
              {/* Action buttons */}
              <Stack direction="row" spacing={1}>
                <Tooltip title="Add label" describeChild>
                  <IconButton
                    disabled={isUploading}
                    sx={{ color: "text.secondary" }}
                    onClick={() => setOpenAddLabel((prev) => !prev)}
                  >
                    <AddLabelIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Add Image" describeChild>
                  <IconButton
                    component="label"
                    sx={{ color: "text.secondary" }}
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <CircularProgress color="inherit" size="1em" />
                    ) : (
                      <AddImageIcon />
                    )}
                    <input
                      multiple
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
          <Tooltip
            title="Cancel"
            describeChild
            sx={{ mx: [1, 2], mb: "auto", color: "error.light" }}
          >
            <IconButton onClick={() => setOpen(false)}>
              <MdClose />
            </IconButton>
          </Tooltip>
        </ListItem>
      </Collapse>
      <AddLabelModal
        labels={values.labels}
        setFieldValue={setFieldValue}
        open={openAddLabel}
        onClose={() => setOpenAddLabel(false)}
      />
      <Toast
        open={openToast}
        onClose={() => setOpenToast(false)}
        text="Task Added!"
      />
    </>
  );
}

export default AddForm;

const Success = ({ onUndo }: { onUndo: () => void }) => {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Typography>Task Added!</Typography>

      <Tooltip title="Undo" describeChild>
        <IconButton onClick={onUndo} sx={{ ml: 1 }}>
          <UndoIcon />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};

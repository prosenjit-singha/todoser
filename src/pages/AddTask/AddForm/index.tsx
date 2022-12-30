import { useState, useRef } from "react";
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
  Typography,
  Button,
} from "@mui/material";
import {
  MdAdd,
  MdClose,
  MdOutlineNewLabel as AddLabelIcon,
} from "react-icons/md";
import { HiPlus } from "react-icons/hi";
import { CgUndo as UndoIcon } from "react-icons/cg";
import { BiImageAdd as AddImageIcon } from "react-icons/bi";
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
import useTasks, { useMutateTasks } from "../../../hooks/useTasks";
import { useRecentTasks } from "../../../contexts/TasksProvider";
// import { useTasks } from "../../../contexts/TasksProvider";

const initialValues = {
  title: "",
  details: "",
  labels: [],
  images: [],
};

function AddForm() {
  const [open, setOpen] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [openAddLabel, setOpenAddLabel] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { addTask } = useRecentTasks();

  const { data = [] } = useTasks();
  const { values, handleSubmit, handleChange, setFieldValue } = useFormik({
    initialValues,
    onSubmit,
    validationSchema: addTaskSchema,
  });
  const { mutateAsync: mutateTaskAsync, isLoading: isAdding } =
    useMutateTasks();

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    try {
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

  async function onSubmit(
    v: typeof initialValues,
    actions: FormikHelpers<typeof initialValues>
  ) {
    const newTask = {
      title: v.title,
      details: v.details,
      labels: v.labels,
      isCompleted: false,
      images: v.images,
      comment: "",
    };
    toast.promise(
      mutateTaskAsync({
        newTask,
        tasks: data,
        operation: "add",
      }).then(() => addTask(newTask)),
      {
        pending: "Adding task...",
        success: "Task added!",
        error: "An error occur while adding the task!",
      }
    );

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
                disabled={isAdding}
                required
              />
              <InputBase
                name="details"
                value={values.details}
                onChange={handleChange}
                size="small"
                placeholder="Details"
                fullWidth
                autoComplete="off"
                disabled={isAdding}
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
                    disabled={isAdding}
                  />
                ))}
              </Stack>
              {/* Action buttons */}
              <Stack
                direction="row"
                spacing={1}
                sx={{ width: "100%", alignItems: "center" }}
              >
                <Tooltip title="Add label" describeChild>
                  <IconButton
                    disabled={isUploading || isAdding}
                    sx={{ color: "text.secondary" }}
                    onClick={() => setOpenAddLabel((prev) => !prev)}
                  >
                    <AddLabelIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Upload Image" describeChild>
                  <IconButton
                    component="label"
                    sx={{ color: "text.secondary" }}
                    disabled={isUploading || isAdding}
                  >
                    {isUploading ? (
                      <CircularProgress color="inherit" size="1em" />
                    ) : (
                      <AddImageIcon />
                    )}
                    <input
                      hidden
                      onChange={handleImageUpload}
                      accept="image/*"
                      type="file"
                    />
                  </IconButton>
                </Tooltip>
                <Button
                  disabled={isUploading || isAdding}
                  variant="outlined"
                  size="small"
                  sx={{ ml: "auto !important", height: "fit-content" }}
                  startIcon={<HiPlus />}
                >
                  Add Task
                </Button>
              </Stack>
              <input type="submit" hidden />
            </form>
          </ListItemText>
          <Tooltip
            title="Cancel"
            describeChild
            sx={{ mr: [1, 2], mb: "auto", color: "error.light" }}
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

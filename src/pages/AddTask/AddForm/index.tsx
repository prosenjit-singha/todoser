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
import updateTaskToServer from "../../../api/updateTask";
import { useAuth } from "../../../contexts/AuthContext";
import useTasks, { useAddTask } from "../../../hooks/useTasks";
// import { useTasks } from "../../../contexts/TasksProvider";

const initialValues = {
  title: "",
  details: "",
  labels: [],
  images: [],
};

function AddForm() {
  const toastId = useRef("");
  const { mode } = useThemeToggler();
  const [open, setOpen] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [openAddLabel, setOpenAddLabel] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { user } = useAuth();

  const { data = [], refetch } = useTasks(user && user.uid ? user.uid : "");
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
  const { mutate } = useAddTask();
  // const { addTask, deleteTask } = useTasks();

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

    mutate({ uid: (user && user.uid) || "", newTask, tasks: data });

    // toast.promise(
    //   updateTaskToServer({
    //     uid: user?.uid || "",
    //     email: user?.email || "",
    //     tasks: [newTask, ...data],
    //   }).then(() => refetch()),
    //   {
    //     pending: "Adding...",
    //     success: "Task added!",
    //     error: "An error occur while adding the task",
    //   }
    // );

    // addTask(newTask);
    // toast.success(<Success onUndo={() => deleteTask(0)} />, {
    //   theme: mode,
    //   position: "top-center",
    //   autoClose: 3000,
    //   closeButton: () => (
    //     <Tooltip title="Close Toast" describeChild>
    //       <IconButton
    //         sx={{
    //           display: "flex",
    //           height: "fit-content",
    //           width: "fit-content",
    //           mx: "auto",
    //         }}
    //       >
    //         <MdClose />
    //       </IconButton>
    //     </Tooltip>
    //   ),
    // });
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
                name="details"
                value={values.details}
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
              <Stack
                direction="row"
                spacing={1}
                sx={{ width: "100%", alignItems: "center" }}
              >
                <Tooltip title="Add label" describeChild>
                  <IconButton
                    disabled={isUploading}
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
                <Button
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

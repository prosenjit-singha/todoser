import { useRef, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Stack,
  Chip,
  IconButton,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import { HiPlus } from "react-icons/hi";
import TaskType from "../../../types/task.type";
import { toast } from "react-toastify";
import { useMutateTasks } from "../../../hooks/useTasks";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../../contexts/AuthContext";
import { BiImageAdd } from "react-icons/bi";
import ImageList from "./ImageList";
import uploadImage from "../../../api/uploadImage";

type PropsType = {
  open: boolean;
  onClose: () => void;
  data: { task: TaskType; index: number };
};

function EditModal({ open, onClose, data }: PropsType) {
  const [uploading, setUploading] = useState(false);
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const uid = (user && user.uid) || "";
  const tasks: TaskType[] = queryClient.getQueryData(["tasks", uid]) || [];
  const [task, setTask] = useState<TaskType>(data.task);
  const { mutateAsync: mutateTask } = useMutateTasks();
  const addLabelRef = useRef<null | HTMLInputElement>(null);
  const titleRef = useRef<null | HTMLInputElement>(null);
  const detailsRef = useRef<null | HTMLInputElement>(null);

  const addLabel = (label: string, labels: string[]) => {
    if (labels.indexOf(label) > -1) {
      toast.warn("Label already included!");
      return labels;
    } else return [label, ...labels];
  };
  function handleAddLabel() {
    if (addLabelRef.current) {
      const newLabel = addLabelRef.current?.value;
      setTask((prev) => ({ ...prev, labels: addLabel(newLabel, prev.labels) }));
      addLabelRef.current.value = "";
    }
  }
  function removeLabel(text: string) {
    setTask((prev) => ({
      ...prev,
      labels: prev.labels.filter((label) => label !== text),
    }));
  }

  function handleSave() {
    if (titleRef.current && detailsRef.current && addLabelRef.current) {
      const title = titleRef.current.value;
      const details = detailsRef.current.value;
      toast.promise(
        mutateTask({
          index: data.index,
          tasks,
          newTask: { ...task, title, details },
          operation: "update",
        }),
        {
          pending: "Updating task",
          success: "Task updated!",
          error: "An occur while updating!",
        }
      );
      onClose();
    }
  }

  function removeImage(index: number) {
    setTask((prev) => ({
      ...prev,
      images: task.images.filter((_img, i) => i !== index),
    }));
  }
  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    try {
      setUploading(true);
      if (e.target.files && e.target.files[0]) {
        const res = await uploadImage(e.target.files[0]);
        setTask({ ...task, images: [...task.images, res] });
      }
    } catch (error) {
      console.error(error);
    } finally {
      e.target.value = "";

      if (!/safari/i.test(navigator.userAgent)) {
        e.target.type = "";
        e.target.type = "file";
      }
      setUploading(false);
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { maxWidth: "500px" } }}
    >
      <DialogTitle>Edit Task</DialogTitle>

      <DialogContent>
        <Stack sx={{ mt: 1, gap: 2 }}>
          <TextField
            inputRef={titleRef}
            size="small"
            label="Title"
            defaultValue={task.title}
            required
          />
          <TextField
            inputRef={detailsRef}
            size="small"
            label="Details"
            defaultValue={task.details}
          />
          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              handleAddLabel();
            }}
          >
            <TextField
              required
              inputRef={addLabelRef}
              name="addLabel"
              size="small"
              label="Add Label"
              InputProps={{
                sx: { borderRadius: 3 },
                endAdornment: (
                  <Tooltip title="Add" describeChild>
                    <IconButton type="submit" edge="end">
                      <HiPlus />
                    </IconButton>
                  </Tooltip>
                ),
              }}
            />
          </Box>
          <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
            {task.labels.map((label, i) => (
              <Chip
                label={label}
                key={i}
                size="small"
                onDelete={() => removeLabel(label)}
              />
            ))}
          </Stack>
          <Tooltip title="Add image">
            <IconButton
              disabled={uploading}
              component="label"
              sx={{ width: "fit-content", height: "fit-content", mx: "auto" }}
            >
              {uploading ? (
                <CircularProgress color="inherit" size="1em" />
              ) : (
                <BiImageAdd />
              )}
              <input
                accept="image/*"
                hidden
                onChange={handleImageUpload}
                type="file"
              />
            </IconButton>
          </Tooltip>
          {!!task.images.length && (
            <ImageList images={task.images} handleDelete={removeImage} />
          )}
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, flexWrap: "wrap", gap: 1 }}>
        <Button onClick={onClose} variant="outlined" color="error">
          Descard
        </Button>
        <Button
          onClick={handleSave}
          variant="outlined"
          color="success"
          style={{ marginLeft: 0 }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditModal;

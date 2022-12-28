import { useRef, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Button,
  IconButton,
  Tooltip,
  Chip,
  Stack,
  Box,
  Snackbar,
  Alert,
  Slide,
} from "@mui/material";
import { FormikErrors } from "formik";
import { MdAdd } from "react-icons/md";

type PropsType = {
  open: boolean;
  onClose: () => void;
  labels: string[];
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) =>
    | Promise<void>
    | Promise<
        FormikErrors<{
          title: string;
          desc: string;
          labels: never[];
          images: never[];
        }>
      >;
};

function AddLabelModal({ open, onClose, labels, setFieldValue }: PropsType) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [openToast, setOpenToast] = useState(false);
  function handleClose() {
    onClose();
  }

  function addLabel(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inputRef.current) {
      const label = inputRef.current.value;
      if (labels.indexOf(label) > -1) {
        setOpenToast(true);
      } else {
        setFieldValue("labels", [label, ...labels]);
        inputRef.current.value = "";
      }
    }
  }

  function removeLabel(name: string) {
    setFieldValue(
      "labels",
      labels.filter((label) => label !== name)
    );
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <Box component="form" onSubmit={addLabel}>
          <TextField
            autoComplete="off"
            autoFocus
            required
            name="label"
            margin="dense"
            label="Label"
            fullWidth
            variant="standard"
            InputProps={{
              inputProps: {
                ref: inputRef,
              },
              endAdornment: (
                <Tooltip title="Add label" describeChild>
                  <IconButton type="submit">
                    {" "}
                    <MdAdd />
                  </IconButton>
                </Tooltip>
              ),
            }}
          />
        </Box>
        <Stack mt={2} direction="row" flexWrap="wrap" sx={{ gap: 1 }}>
          {labels.map((label, i) => (
            <Chip
              key={i}
              size="small"
              label={label}
              onDelete={() => removeLabel(label)}
            />
          ))}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="error" onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openToast}
        autoHideDuration={3000}
        onClose={() => setOpenToast(false)}
        TransitionComponent={Slide}
      >
        <Alert
          onClose={() => setOpenToast(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Entered text is already included
        </Alert>
      </Snackbar>
    </Dialog>
  );
}

export default AddLabelModal;

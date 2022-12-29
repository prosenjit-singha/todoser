import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  InputBase,
  Stack,
} from "@mui/material";

type PropsType = {
  open: boolean;
  onClose: () => void;
};

function EditModal({ open, onClose }: PropsType) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent>
        <Stack sx={{ mt: 1, gap: 2 }}>
          <TextField size="small" label="Title" />
          <TextField
            size="small"
            label="Add Label"
            InputProps={{ sx: { borderRadius: 3 } }}
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2, flexWrap: "wrap", gap: 1 }}>
        <Button onClick={onClose} variant="outlined" color="error">
          Descard
        </Button>
        <Button variant="outlined" color="success" style={{ marginLeft: 0 }}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditModal;

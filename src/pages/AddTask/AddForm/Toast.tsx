import { Snackbar, Alert, List, Paper } from "@mui/material";

type ToastPropsType = {
  open: boolean;
  onClose: () => void;
  text: string;
};

const Toast = ({ open, onClose, text }: ToastPropsType) => (
  <Snackbar open={open} autoHideDuration={3000} onClose={onClose}>
    <Alert onClose={onClose} severity="success" sx={{ width: "100%" }}>
      {text}
    </Alert>
  </Snackbar>
);
export default Toast;

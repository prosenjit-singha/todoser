import {
  Paper,
  Typography,
  TextField,
  Stack,
  Button,
  Divider,
} from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import OrDivider from "./OrDivider";

function RegForm() {
  return (
    <Paper
      elevation={3}
      sx={{ p: 2, m: [0, 2, 3], minWidth: "min(100%, 350px)" }}
    >
      <Typography component="h1" variant="h4" textAlign="center" gutterBottom>
        Register
      </Typography>
      <Stack spacing={2} mt={3}>
        <TextField label="Full Name" size="small" fullWidth />
        <TextField label="Email" size="small" fullWidth />
        <TextField label="Password" size="small" fullWidth />
        <TextField label="Confirm Password" size="small" fullWidth />
        <Button type="submit" variant="outlined">
          Register
        </Button>
        <OrDivider />
        <Button variant="outlined" startIcon={<FcGoogle />}>
          {" "}
          Register With Google{" "}
        </Button>
      </Stack>
    </Paper>
  );
}

export default RegForm;

import { useState } from "react";
import {
  Paper,
  Typography,
  TextField,
  Stack,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import {
  MdOutlineVisibility as VisibilityIcon,
  MdOutlineVisibilityOff as VisibilityOffIcon,
} from "react-icons/md";
import OrDivider from "./OrDivider";

function RegForm() {
  const [showPass, setShowPass] = useState(false);
  return (
    <Paper
      elevation={3}
      sx={{ p: 2, m: [0, 2, 3], minWidth: "min(100%, 350px)" }}
    >
      <Typography component="h1" variant="h4" textAlign="center" gutterBottom>
        Register
      </Typography>
      <Stack spacing={2} mt={3}>
        <TextField
          name="fullName"
          label="Full Name"
          size="small"
          fullWidth
          autoComplete="off"
          placeholder="John Cina"
        />
        <TextField
          name="email"
          label="Email"
          type="email"
          size="small"
          fullWidth
          placeholder="john@example.com"
        />
        <TextField
          name="password"
          type={showPass ? "text" : "password"}
          placeholder="password"
          label="Password"
          size="small"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPass(!showPass)}
                  aria-label="toggle password visibility"
                  edge="end"
                >
                  {showPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          name="confirmPassword"
          label="Confirm Password"
          type={showPass ? "text" : "password"}
          placeholder="password"
          size="small"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPass(!showPass)}
                  aria-label="toggle password visibility"
                  edge="end"
                >
                  {showPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
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

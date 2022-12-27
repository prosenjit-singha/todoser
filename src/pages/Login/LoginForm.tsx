import { useState } from "react";
import {
  Paper,
  Typography,
  TextField,
  Stack,
  Button,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import {
  MdOutlineVisibility as VisibilityIcon,
  MdOutlineVisibilityOff as VisibilityOffIcon,
} from "react-icons/md";
import OrDivider from "./OrDivider";
import { useFormik, FormikHelpers } from "formik";
import loginFormSchema from "../../schemas/loginForm.schema";
import LogInWithGoogleButton from "../../components/LogInWithGoogleButton";

const initialValues = {
  email: "",
  password: "",
};

function RegForm() {
  const [showPass, setShowPass] = useState(false);
  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    isSubmitting,
    setSubmitting,
  } = useFormik({
    initialValues,
    onSubmit,
    validationSchema: loginFormSchema,
  });

  function onSubmit(
    v: typeof initialValues,
    actions: FormikHelpers<typeof initialValues>
  ) {}
  return (
    <Paper
      elevation={3}
      sx={({ shadows }) => ({
        p: 2,
        pb: 3,
        m: [0, 2, 3],
        minWidth: "min(100%, 350px)",
        boxShadow: ["none", shadows[5]],
      })}
    >
      <Typography component="h1" variant="h4" textAlign="center" gutterBottom>
        Login
      </Typography>
      <Stack spacing={2} mt={3}>
        <TextField
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          error={!!errors.email && !!touched.email}
          helperText={
            !!errors.email && !!touched.email ? errors.email : undefined
          }
          label="Email"
          type="email"
          size="small"
          fullWidth
          placeholder="john@example.com"
        />
        <TextField
          name="password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          error={!!errors.password && !!touched.password}
          helperText={
            !!errors.password && !!touched.password
              ? errors.password
              : undefined
          }
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
        <Button
          disabled={isSubmitting}
          type="button"
          onClick={() => setSubmitting(!isSubmitting)}
          variant="outlined"
        >
          {isSubmitting ? (
            <CircularProgress color="inherit" size="1.75em" />
          ) : (
            "Log In"
          )}
        </Button>
        <OrDivider />
        <LogInWithGoogleButton
          isSubmitting={isSubmitting}
          setSubmitting={setSubmitting}
        />
      </Stack>
    </Paper>
  );
}

export default RegForm;

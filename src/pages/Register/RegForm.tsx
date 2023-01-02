import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Paper,
  Typography,
  TextField,
  Stack,
  Button,
  InputAdornment,
  IconButton,
  CircularProgress,
  lighten,
} from "@mui/material";
import {
  MdOutlineVisibility as VisibilityIcon,
  MdOutlineVisibilityOff as VisibilityOffIcon,
} from "react-icons/md";
import OrDivider from "./OrDivider";
import { useFormik, FormikHelpers } from "formik";
import registerFormSchema from "../../schemas/registerForm.schema";
import LogInWithGoogleButton from "../../components/LogInWithGoogleButton";
import { useAuth } from "../../contexts/AuthContext";
import { updateProfile } from "firebase/auth";
import AuthAlert from "../../components/AuthAlert";
import { getAccessToken } from "../../api/jwtHandler";

const initialValues = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function RegForm() {
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const navigate = useNavigate();
  const { register, setAccessToken } = useAuth();
  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    isSubmitting,
    setSubmitting,
  } = useFormik({
    initialValues,
    onSubmit,
    validationSchema: registerFormSchema,
  });

  async function onSubmit(
    v: typeof initialValues,
    actions: FormikHelpers<typeof initialValues>
  ) {
    setIsLoading(true);
    try {
      const { user } = await register({ email: v.email, password: v.password });
      await getAccessToken({
        payload: {
          uid: user.uid,
          email: user.email || "",
        },
        onSuccess: () =>
          setAccessToken(localStorage.getItem("access-token") || ""),
      });
      await updateProfile(user, { displayName: v.fullName });
      actions.resetForm();
      setErrorText("");
      navigate("/", { replace: true });
    } catch (err: any) {
      if (err.code === "auth/email-already-in-use")
        setErrorText("Email already in use");
      else setErrorText("Registration Failed");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      elevation={0}
      sx={({ shadows, palette }) => ({
        p: 2,
        pb: 3,
        m: [0, 2, 3],
        minWidth: "min(100%, 350px)",
        bgcolor: ["transparent", lighten(palette.background.paper, 0.035)],
        boxShadow: ["none", shadows[5], shadows[10]],
      })}
    >
      <Typography component="h1" variant="h4" textAlign="center" gutterBottom>
        Register
      </Typography>
      <AuthAlert text={errorText} setText={setErrorText} />
      <Stack spacing={2} mt={3}>
        <TextField
          name="fullName"
          value={values.fullName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!errors.fullName && !!touched.fullName}
          disabled={isSubmitting}
          helperText={
            !!errors.fullName && !!touched.fullName
              ? errors.fullName
              : undefined
          }
          label="Full Name"
          size="small"
          fullWidth
          autoComplete="off"
          placeholder="John Cina"
        />
        <TextField
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          error={!!errors.email && !!touched.email}
          disabled={isSubmitting}
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
          disabled={isSubmitting}
          helperText={
            !!errors.password && !!touched.password
              ? errors.password
              : undefined
          }
          type={showPass ? "text" : "password"}
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
                  sx={{ color: "text.secondary" }}
                >
                  {showPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          name="confirmPassword"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.confirmPassword}
          error={!!errors.confirmPassword && !!touched.confirmPassword}
          disabled={isSubmitting}
          helperText={
            !!errors.confirmPassword && !!touched.confirmPassword
              ? errors.confirmPassword
              : undefined
          }
          label="Confirm Password"
          type={showPass ? "text" : "password"}
          size="small"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPass(!showPass)}
                  aria-label="toggle password visibility"
                  edge="end"
                  sx={{ color: "text.secondary" }}
                >
                  {showPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button disabled={isSubmitting} type="submit" variant="outlined">
          {isLoading ? (
            <CircularProgress color="inherit" size="1.75em" />
          ) : (
            "Register"
          )}
        </Button>
        <OrDivider />
        <LogInWithGoogleButton
          isSubmitting={isSubmitting}
          setSubmitting={setSubmitting}
          label="Register With Google"
        />
        <Typography textAlign="center">
          Have an account?{" "}
          <Button component={Link} to="/login" disabled={isSubmitting}>
            Login Here
          </Button>
        </Typography>
      </Stack>
    </Paper>
  );
}

export default RegForm;

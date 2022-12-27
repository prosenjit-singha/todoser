import { Button, CircularProgress } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import React from "react";
import { useAuth } from "../contexts/AuthContext";

type PropsType = {
  isSubmitting: boolean;
  setSubmitting: (isSubmitting: boolean) => void;
} & React.ComponentProps<typeof Button>;

function LogInWithGoogleButton({
  isSubmitting,
  setSubmitting,
  ...rest
}: PropsType) {
  const { logInWithGoogle } = useAuth();

  function handleClick() {
    setSubmitting(true);
    logInWithGoogle()
      .then(() => {})
      .catch((err) => console.warn(err))
      .finally(() => setSubmitting(false));
  }

  return (
    <Button
      onClick={handleClick}
      variant="outlined"
      startIcon={
        isSubmitting ? (
          <CircularProgress color="inherit" size="1.1em" />
        ) : (
          <FcGoogle />
        )
      }
      disabled={isSubmitting}
      {...rest}
    >
      {" "}
      Log In With Google{" "}
    </Button>
  );
}

export default LogInWithGoogleButton;

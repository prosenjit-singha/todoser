import { Button, CircularProgress } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

type PropsType = {
  label?: string;
  isSubmitting: boolean;
  setSubmitting: (isSubmitting: boolean) => void;
} & React.ComponentProps<typeof Button>;

function LogInWithGoogleButton({
  isSubmitting,
  setSubmitting,
  label,
  ...rest
}: PropsType) {
  const [loading, setLoading] = useState(false);
  const { logInWithGoogle } = useAuth();

  function handleClick() {
    setSubmitting(true);
    setLoading(true);
    logInWithGoogle()
      .then(() => {})
      .catch((err) => console.warn(err))
      .finally(() => {
        setSubmitting(false);
        setLoading(false);
      });
  }

  return (
    <Button
      onClick={handleClick}
      variant="outlined"
      startIcon={
        loading ? (
          <CircularProgress color="inherit" size="1.1em" />
        ) : (
          <FcGoogle />
        )
      }
      disabled={isSubmitting}
      {...rest}
    >
      {label || "Log In With Google"}
    </Button>
  );
}

export default LogInWithGoogleButton;

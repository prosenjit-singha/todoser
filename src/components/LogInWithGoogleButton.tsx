import { Button, CircularProgress } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getAccessToken } from "../api/jwtHandler";

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
  const { logInWithGoogle, setAccessToken } = useAuth();

  function handleClick() {
    setSubmitting(true);
    setLoading(true);
    logInWithGoogle()
      .then(({ user }) =>
        getAccessToken({
          payload: {
            uid: user.uid,
            email: user.email || "",
          },
          onSuccess: () =>
            setAccessToken(localStorage.getItem("access-token") || ""),
        })
      )
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

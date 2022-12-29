import { CircularProgress } from "@mui/material";
import React from "react";
import { Main } from "../styled";

function Loading() {
  return (
    <Main
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <CircularProgress size={80} />
    </Main>
  );
}

export default Loading;

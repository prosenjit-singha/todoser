import { Box, Typography } from "@mui/material";
import React from "react";
import { Main } from "../../components/styled";

function Home() {
  return (
    <Main sx={{ p: [2, 3] }}>
      <Box sx={{ minHeight: "calc(100vh - 56px)" }}>
        <Typography variant="h2" component="h1" textAlign="center">
          Todoser
        </Typography>
        <Typography variant="h6" textAlign="center">
          A web app to manage your daily task easily at free of cost
        </Typography>
      </Box>
    </Main>
  );
}

export default Home;

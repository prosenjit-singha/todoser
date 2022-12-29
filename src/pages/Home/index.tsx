import { Box, Typography, styled, Stack, Button } from "@mui/material";
import React from "react";
import { Main } from "../../components/styled";
import logo from "../../assets/svgs/logo.svg";
import { useThemeToggler } from "../../contexts/ThemeToggler";
import { Link } from "react-router-dom";

function Home() {
  const { mode } = useThemeToggler();
  return (
    <Main sx={{ p: [2, 3] }}>
      <Stack sx={{ minHeight: "calc(100vh - 56px)" }}>
        <Logo src={logo} alt="Logo" />
        <Typography
          variant="h2"
          component="h1"
          textAlign="center"
          fontWeight="bold"
          gutterBottom
        >
          Todoser
        </Typography>
        <Typography variant="h5" textAlign="center" gutterBottom>
          A web app to manage your daily task easily at{" "}
          <Box component="span" sx={{ color: "primary.main" }}>
            free of cost
          </Box>
        </Typography>

        <Button
          component={Link}
          to="/register"
          variant="contained"
          size="large"
          sx={{
            borderRadius: 3,
            color: mode === "dark" ? "black" : "white",
            mx: "auto",
            my: 4,
          }}
        >
          Get started now
        </Button>
      </Stack>
    </Main>
  );
}

export default Home;

const Logo = styled("img")`
  width: clamp(80px, 10vw, 300px);
  margin-inline: auto;
`;

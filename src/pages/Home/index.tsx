import { Box, Typography, styled, Stack, Button } from "@mui/material";
import React from "react";
import { Main } from "../../components/styled";
import logo from "../../assets/svgs/logo.svg";
import { useThemeToggler } from "../../contexts/ThemeToggler";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Loading from "../../components/Loading";

function Home() {
  const { mode } = useThemeToggler();
  const { user, loading } = useAuth();

  if (loading) return <Loading />;
  if (user && user.uid) return <Navigate to="/add-task" replace />;

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

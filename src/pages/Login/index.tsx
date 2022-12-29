import { styled, Box } from "@mui/material";
import { Navigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { Main } from "../../components/styled";
import { useAuth } from "../../contexts/AuthContext";
import RegForm from "./LoginForm";

function Login() {
  const { user, loading, accessToken } = useAuth();
  if (loading) return <Loading />;
  if (!!accessToken && user && user.uid)
    return <Navigate to="/add-task" replace />;
  return (
    <Main>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: ["calc(100vh - 56px)", "calc(100vh - 64px)"],
        }}
      >
        <RegForm />
      </Box>
    </Main>
  );
}

export default Login;

const Image = styled("img")`
  max-width: 300px;
  height: clamp(200px, 80vh, 500px);
  object-fit: cover;
  object-position: center;
`;

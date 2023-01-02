import { Box } from "@mui/material";
import { Navigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { Main } from "../../components/styled";
import { useAuth } from "../../contexts/AuthContext";
import RegForm from "./RegForm";

function Register() {
  const { user, loading } = useAuth();
  if (loading) return <Loading />;
  if (user && user.uid) return <Navigate to="/add-task" replace />;
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

export default Register;

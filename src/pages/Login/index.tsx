import { styled, Box } from "@mui/material";
import { Main } from "../../components/styled";
import RegForm from "./LoginForm";

function Login() {
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

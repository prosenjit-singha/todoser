import { Box, Button, Stack, Typography } from "@mui/material";
import { Main } from "../../components/styled";
import img from "../../assets/svgs/complete-task.svg";
import { Link } from "react-router-dom";

function Oops() {
  return (
    <Main
      sx={{
        p: [2, 3],
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack alignItems="center">
        <Box
          sx={{ width: "clamp(200px, 40vw, 500px)" }}
          component="img"
          src={img}
          alt="Zero completed tasks"
        />
        <Typography textAlign="center" variant="h5">
          You have not completed any task!
        </Typography>
        <Button component={Link} to="/my-tasks" variant="outlined" sx={{ mt: [2, 3] }}>
          Go back to my task
        </Button>
      </Stack>
    </Main>
  );
}

export default Oops;

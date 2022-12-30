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
          You have no task on the list!
        </Typography>
        <Button
          component={Link}
          to="/add-task"
          variant="outlined"
          sx={{ mt: [2, 3] }}
        >
          Add A Task Now
        </Button>
      </Stack>
    </Main>
  );
}

export default Oops;

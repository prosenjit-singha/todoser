import { Box } from "@mui/material";
import { Main } from "../../components/styled";
import FourOFour from "../../assets/svgs/404.svg";

function PageNotFound() {
  return (
    <Main
      sx={{
        p: [2, 3],
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        component="img"
        src={FourOFour}
        alt="Page Not Found"
        sx={{
          width: "clamp(200px, 40vw, 500px)",
        }}
      ></Box>
    </Main>
  );
}

export default PageNotFound;

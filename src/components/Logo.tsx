import { styled, Typography, Stack, Box } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../assets/svgs/logo.svg";

function Logo(props: React.ComponentProps<typeof Stack>) {
  return (
    <Stack {...props} direction="row">
      <LinkContainer to="/">
        <Box
          component="img"
          src={logo}
          width={30}
          alt="Logo Icon"
          sx={{ mr: 1, display: ["none", "inline"] }}
        />
        <Typography color="primary" variant="h5">
          Todoser
        </Typography>
      </LinkContainer>
    </Stack>
  );
}

export default Logo;

const LinkContainer = styled(Link)`
  display: flex;
  gap: 4;
`;

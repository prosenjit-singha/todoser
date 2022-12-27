import { Divider, Stack, Typography } from "@mui/material";

function OrDivider() {
  return (
    <Stack
      direction="row"
      sx={{ width: "100%" }}
      alignItems="center"
      justifyContent="space-between"
    >
      <Divider sx={{ flexBasis: "40%" }} />
      <Typography color="text.secondary">OR</Typography>
      <Divider sx={{ flexBasis: "40%" }} />
    </Stack>
  );
}

export default OrDivider;

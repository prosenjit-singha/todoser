import { Typography } from "@mui/material";

function Logo(props: React.ComponentProps<typeof Typography>) {
  return (
    <Typography variant="h5" color="primary" {...props}>
      Todoser
    </Typography>
  );
}

export default Logo;

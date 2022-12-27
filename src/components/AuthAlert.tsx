import { Alert, Collapse, IconButton } from "@mui/material";
import { MdClose } from "react-icons/md";

type PropsType = {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
};

function AuthAlert({ text, setText }: PropsType) {
  return (
    <Collapse in={!!text}>
      <Alert
        severity="error"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => setText("")}
          >
            <MdClose fontSize="inherit" />
          </IconButton>
        }
        sx={{ mt: 2 }}
      >
        {text}
      </Alert>
    </Collapse>
  );
}

export default AuthAlert;

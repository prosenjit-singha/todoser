import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemText,
  Tooltip,
  colors,
  Typography,
  Collapse,
  TextField,
} from "@mui/material";
import { useRef, useState } from "react";
import {
  MdOutlineDeleteForever as DeleteIcon,
  MdOutlineComment as CommentIcon,
} from "react-icons/md";
import { BiCommentCheck as CheckIcon } from "react-icons/bi";
import { useThemeToggler } from "../../contexts/ThemeToggler";

function TaskItem() {
  const { mode, theme } = useThemeToggler();
  const [openComment, setOpenComment] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  async function handleClick() {
    setOpenComment((prev) => !prev);
    setTimeout(() => inputRef.current?.focus(), 100);
  }

  return (
    <ListItem
      sx={{
        alignItems: "flex-start",
        borderRadius: 0.5,
        ".MuiIconButton-root": {
          color: "text.secondary",
        },
        ".MuiIconButton-root:hover": {
          color: "text.primary",
        },
        ":hover .MuiIconButton-root": {
          visibility: "visible",
        },
        ":hover": {
          outline: `1px solid ${theme.palette.divider}`,
          bgcolor: mode === "dark" ? colors.grey[900] : colors.grey[200],
        },
      }}
    >
      <Tooltip title="Not Completed">
        <Checkbox sx={{ mr: [2, 3] }} />
      </Tooltip>

      <ListItemText>
        <Typography variant="h6" component="p">
          Task 1
        </Typography>
        <Collapse in={openComment} component="form">
          <TextField
            inputRef={inputRef}
            label="Comment"
            variant="standard"
            fullWidth
            InputProps={{
              endAdornment: (
                <Tooltip title="Save">
                  <IconButton>
                    <CheckIcon />
                  </IconButton>
                </Tooltip>
              ),
            }}
          />
        </Collapse>
      </ListItemText>

      {/* Side Icons */}
      <Tooltip title="Add Comment" onClick={handleClick} describeChild>
        <IconButton sx={{ visibility: "hidden" }}>
          <CommentIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete Forever" describeChild>
        <IconButton sx={{ visibility: "hidden" }}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </ListItem>
  );
}

export default TaskItem;

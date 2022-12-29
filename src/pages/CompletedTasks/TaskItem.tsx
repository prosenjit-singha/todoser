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
import {
  MdOutlineDeleteForever as DeleteIcon,
  MdOutlineComment as CommentIcon,
} from "react-icons/md";
import { useThemeToggler } from "../../contexts/ThemeToggler";

function TaskItem() {
  const { mode, theme } = useThemeToggler();
  return (
    <ListItem
      sx={{
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
        <Collapse in component="form">
          <TextField label="Comment" variant="standard" fullWidth />
        </Collapse>
      </ListItemText>

      {/* Side Icons */}
      <Tooltip title="Comment" describeChild>
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

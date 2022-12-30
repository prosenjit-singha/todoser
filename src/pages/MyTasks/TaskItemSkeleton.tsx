import { Checkbox, ListItem, Skeleton } from "@mui/material";

function TaskItemSkeleton() {
  return (
    <ListItem disablePadding>
      <Checkbox disabled sx={{ ml: 1 }} />
      <Skeleton
        variant="rounded"
        height={25}
        width="100%"
        sx={{ ml: 2, mr: 5 }}
      />
    </ListItem>
  );
}

export default TaskItemSkeleton;

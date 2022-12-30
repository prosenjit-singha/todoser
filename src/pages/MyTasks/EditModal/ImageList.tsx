import React from "react";
import {
  List,
  ListItem,
  Avatar,
  Typography,
  Tooltip,
  IconButton,
} from "@mui/material";
import { MdClose } from "react-icons/md";
import { Image } from "../../../types/task.type";

type ImageListProps = {
  images: Image[];
  handleDelete: (index: number) => void;
};

function ImageList({ images, handleDelete }: ImageListProps) {
  return (
    <>
      {!!images.length && <Typography>Images</Typography>}
      <List disablePadding>
        {images.map((image, i) => (
          <ListItem
            disablePadding
            sx={({ palette }) => ({
              borderRadius: 8.5,
              ":hover": {
                outline: `1px solid ${palette.divider}`,
              },
            })}
            key={i}
          >
            <Avatar
              src="https://thumbs.dreamstime.com/b/no-thumbnail-images-placeholder-forums-blogs-websites-148010338.jpg"
              sx={{ height: 30, width: 30 }}
            />
            <Typography
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: "1",
                WebkitBoxOrient: "vertical",
                textOverflow: "ellipsis",
                overflow: "hidden",
                mx: 1,
              }}
            >
              {image.title}
            </Typography>
            <Tooltip title="Delete image">
              <IconButton
                onClick={() => handleDelete(i)}
                size="small"
                sx={{ ml: "auto" }}
              >
                <MdClose />
              </IconButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default ImageList;

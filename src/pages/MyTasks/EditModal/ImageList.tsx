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
import { PhotoProvider, PhotoView } from "react-photo-view";

type ImageListProps = {
  images: Image[];
  handleDelete: (index: number) => void;
};

function ImageList({ images, handleDelete }: ImageListProps) {
  return (
    <>
      {!!images.length && <Typography>Images</Typography>}
      <PhotoProvider>
        <List
          disablePadding
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          {images.map((image, i) => (
            <ListItem
              disablePadding
              sx={({ palette }) => ({
                borderRadius: 8.5,
                ":hover": {
                  outline: `1px solid ${palette.divider}`,
                },
              })}
            >
              <PhotoView src={image.url} key={i}>
                <Avatar
                  src={image.url}
                  sx={{ height: 30, width: 30, cursor: "pointer" }}
                  alt={image.title}
                />
              </PhotoView>
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
      </PhotoProvider>
    </>
  );
}

export default ImageList;

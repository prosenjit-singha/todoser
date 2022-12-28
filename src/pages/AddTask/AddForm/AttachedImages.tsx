import { useState } from "react";
import {
  IconButton,
  ListItem,
  ListItemIcon,
  colors,
  Typography,
} from "@mui/material";
import { FormikErrors } from "formik";
import { MdClose } from "react-icons/md";
import { BiImage } from "react-icons/bi";
import axios from "axios";

type AttachedImagesPropsType = {
  images: {
    fileName: string;
    title: string;
    url: string;
    delete_url: string;
  }[];
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) =>
    | Promise<void>
    | Promise<
        FormikErrors<{
          title: string;
          desc: string;
          label: string;
          images: never[];
        }>
      >;
};

const AttachedImages = ({ images, setFieldValue }: AttachedImagesPropsType) => {
  const [isDeleting, setDeleting] = useState(false);
  function handleDeleteImage(url: string) {
    setDeleting(true);
    setFieldValue(
      "images",
      images.filter((image) => image.delete_url !== url)
    );
    setDeleting(false);
  }
  return (
    <>
      {images.map((image, i) => (
        <ListItem
          key={i}
          sx={({ palette }) => ({
            color: "text.secondary",
            borderRadius: 0.5,
            py: 0.5,
            my: 0.5,
            bgcolor:
              palette.mode === "dark" ? colors.grey[900] : colors.grey[200],
            // outline: `1px solid ${theme.palette.divider}`,
          })}
        >
          <ListItemIcon sx={{ color: "text.secondary" }}>
            <BiImage size="1.35em" />
          </ListItemIcon>
          <Typography
            sx={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {image.fileName}
          </Typography>
          <IconButton
            disabled={isDeleting}
            size="small"
            sx={{ ml: "auto", color: "text.secondary" }}
            onClick={() => handleDeleteImage(image.delete_url)}
          >
            <MdClose />
          </IconButton>
        </ListItem>
      ))}
    </>
  );
};

export default AttachedImages;

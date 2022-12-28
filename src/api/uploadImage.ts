import axios from "axios";

const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMGBB_API_KEY}`;

const uploadImage = async (img: File) => {
  const form = new FormData();
  form.append("image", img);
  const { data: res } = await axios.post(url, form);
  const data = {
    fileName: res.data?.image?.filename,
    title: res.data?.title,
    url: res.data?.image?.url,
    delete_url: res.data?.delete_url,
  };
  console.info(res.data);
  console.info(data);
  return data;
};

export default uploadImage;

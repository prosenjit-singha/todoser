import * as yup from "yup";

const addTaskSchema = yup.object().shape({
  title: yup.string().required("Required"),
  desc: yup.string(),
  imgURL: yup.string(),
  label: yup.string(),
});

export default addTaskSchema;

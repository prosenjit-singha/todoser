import * as yup from "yup";

const addTaskSchema = yup.object().shape({
  title: yup.string().required("required"),
  desc: yup.string(),
  imgURL: yup.string(),
  label: yup.string(),
});

export default addTaskSchema;

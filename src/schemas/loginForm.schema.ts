import * as yup from "yup";

const loginFormSchema = yup.object().shape({
  email: yup.string().email().required("required"),
  password: yup.string().min(6).required("required"),
});

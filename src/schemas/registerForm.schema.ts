import * as yup from "yup";

const registerFormSchema = yup.object().shape({
  fullName: yup.string().required("required"),
  email: yup
    .string()
    .email("please enter an valid email address")
    .required("required"),
  password: yup.string().min(6).required("required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "passwords must be matched")
    .required("required"),
});

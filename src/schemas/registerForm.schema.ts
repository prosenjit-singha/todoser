import * as yup from "yup";

const registerFormSchema = yup.object().shape({
  fullName: yup.string().required("Required"),
  email: yup
    .string()
    .email("Please enter an valid email address")
    .required("Required"),
  password: yup.string().min(6).required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must be matched")
    .required("Required"),
});

export default registerFormSchema;

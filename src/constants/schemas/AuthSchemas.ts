import * as yup from "yup";

export const signUpSchema = yup.object({
  userName: yup
    .string()
    .required("User Name is required")
    .min(6, "User Name must be at least 6 characters"),
  email: yup.string().email("Please enter a valid Email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Paswword must be at least 6 characters"),
  confirmPassword: yup
    .string()
    .required("Password confirmation is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

export const loginSchema = yup.object({
  email: yup.string().email("Please enter a valid Email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Paswword must be at least 6 characters"),
});

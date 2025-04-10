import * as Yup from "yup";

const emailSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email("Invalid email")
    .required("Email is required"),
});

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const signupSchema = Yup.object({
  role: Yup.string()
    .oneOf(["client", "provider"], "Invalid role")
    .required("Role is required"),
  email: Yup.string()
    .trim()
    .email("Invalid email")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .matches(/\d/, "Must contain at least one number")
    .matches(/[@$!%*?&#]/, "Must contain at least one special character"),
  termsAccepted: Yup.boolean().oneOf(
    [true],
    "You must accept the Terms and Privacy Policy"
  ),
});

const resetSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  code: Yup.string()
    .length(6, "Code must be 6 characters")
    .required("Code is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .matches(/\d/, "Must contain at least one number")
    .matches(/[@$!%*?&#]/, "Must contain at least one special character"),
});

export { emailSchema, loginSchema, signupSchema, resetSchema };

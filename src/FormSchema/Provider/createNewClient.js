import * as Yup from "yup";

const createNewClientSchema = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  id_number: Yup.string(),
  phone_number: Yup.string(),
  members: Yup.array()
    .of(Yup.string().required("Member is required"))
    .min(1, "At least one member is required")
    .default([]),
});

export { createNewClientSchema };

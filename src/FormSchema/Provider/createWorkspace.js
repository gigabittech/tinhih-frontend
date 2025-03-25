import * as Yup from "yup";

const createWorkspaceSchema = Yup.object().shape({
  name: Yup.string().required("Workspace name is required"),
  country: Yup.string().required("Country is required"),
  profession: Yup.string().required("Profession is required"),
});

export { createWorkspaceSchema };

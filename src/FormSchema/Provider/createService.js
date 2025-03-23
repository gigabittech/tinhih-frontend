import * as Yup from "yup";

const createServiceSchema = Yup.object({
  user_id: Yup.string().required("User ID is required"),
  service_name: Yup.string().required("Service name is required"),
  display_name: Yup.string(),
  code: Yup.string(),
  duration: Yup.number().min(0, "Must be 0 or more"),
  price: Yup.number().default(0),
  description: Yup.string(),
  group_event: Yup.boolean().default(false),
  max_attendees: Yup.number(),
  taxable: Yup.boolean().default(true),
  bookable_online: Yup.boolean().default(true),
  allow_new_clients: Yup.boolean().default(true),
  team_members: Yup.array(),
  locations: Yup.array().min(1, "This is required"),
});

export default createServiceSchema;

import * as Yup from "yup";

const createServiceSchema = Yup.object().shape({
  service_name: Yup.string().required("Service Name is required"),
  display_name: Yup.string(),
  code: Yup.string(),
  duration: Yup.number().min(0, "Must be 0 or more"),

  price: Yup.number().min(0, "Must be 0 or more"),
  description: Yup.string().nullable(),
  group_event: Yup.boolean(),

  max_attendees: Yup.number()
    .nullable()
    .when("group_event", {
      is: true,
      then: (schema) =>
        schema
          .min(1, "At least one attendee required")
          .required("Max attendees is required"),
      otherwise: (schema) => schema.notRequired().nullable(),
    }),

  taxable: Yup.boolean(),
  bookable_online: Yup.boolean(),

  allow_new_clients: Yup.boolean()
    .nullable()
    .when("bookable_online", {
      is: true,
      then: (schema) => schema.required("Required when bookable online"),
      otherwise: (schema) => schema.notRequired(),
    }),

  team_members: Yup.string().nullable(),
  locations: Yup.string().nullable(),
});

export { createServiceSchema };

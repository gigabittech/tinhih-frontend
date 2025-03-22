import * as Yup from "yup";

const formTypes = {
  PERSON: "PERSON",
  ONLINE: "ONLINE",
  PHONE: "PHONE",
};

const createLocationSchema = (locationType) => {
  let schema = {
    type_id: Yup.string().required("Location type is required"),
    display_name: Yup.string().required("Display name is required"),
  };

  if (locationType === formTypes.PERSON) {
    schema.address = Yup.string().required("Address is required");
    schema.suburb_province = Yup.string().nullable().default("");
    schema.city = Yup.string().nullable().default("");
    schema.state = Yup.string().nullable().default("");
    schema.zip_code = Yup.string().nullable().default("");
    schema.country = Yup.string().nullable().default("");
  }
  if (locationType === formTypes.PHONE) {
    schema.phone_number = Yup.string().required("Phone number is required");
  }
  if (locationType === formTypes.ONLINE) {
    schema.link = Yup.string().url("Invalid URL").required("Link is required");
  }

  return Yup.object().shape(schema);
};

export { createLocationSchema, formTypes };

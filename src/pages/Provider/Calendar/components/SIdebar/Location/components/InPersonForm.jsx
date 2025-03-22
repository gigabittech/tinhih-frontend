import React from "react";
import Input from "../../../../../../../components/ui/Input";

function InPersonForm({ formik }) {
  return (
    <div className="flex flex-col gap-3">
      <Input
        label="Physical Address"
        name="address"
        placeholder="E.g. 271 Broadway"
        formik={formik}
      />

      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          label="Suburb/Province"
          name="suburb_province"
          placeholder="E.g. 271 Broadlyn"
          formik={formik}
        />
        <Input
          label="City"
          name="city"
          placeholder="E.g. New York"
          formik={formik}
        />
      </div>

      <div className="flex gap-3 flex-col sm:flex-row">
        <Input label="State" name="state" placeholder="NY" formik={formik} />

        <Input
          label="Zip Code"
          name="zip_code"
          placeholder="10003"
          formik={formik}
        />

        <Input
          label="Country"
          name="country"
          placeholder="United States"
          formik={formik}
        />
      </div>
    </div>
  );
}

export default InPersonForm;

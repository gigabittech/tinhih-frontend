import React from "react";
import ToggleButton from "../../../../../../../components/ui/ToggleButton";
import { cn } from "../../../../../../../lib/utils";

function ServiceToggler({ formik, title, description, name, className }) {
  return (
    <div className="self-start">
      <div className={cn("flex items-center", className)}>
        <div>
          <ToggleButton formik={formik} name={name} />
        </div>
        <label htmlFor={name} className="px-4 cursor-pointer">
          <p className="leading-tight">{title}</p>
          <p className="text-sm text-context-light">{description}</p>
        </label>
      </div>
    </div>
  );
}

export default ServiceToggler;

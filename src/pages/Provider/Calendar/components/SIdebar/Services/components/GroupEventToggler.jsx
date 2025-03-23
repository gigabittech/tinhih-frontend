import React from "react";
import ServiceToggler from "./ServiceTogggler";
import Input from "../../../../../../../components/ui/Input";
import { cn } from "./../../../../../../../lib/utils";
import ToggleButton from "../../../../../../../components/ui/ToggleButton";

function GroupEventToggler({ formik, className }) {
  return (
    <div>
      <div className="self-start">
        <div className={cn("flex", className)}>
          <div className="mt-4">
            <ToggleButton formik={formik} name="group_event" />
          </div>
          <div className="flex flex-col  px-4">
            <label htmlFor="group_event" className="cursor-pointer mb-1.5">
              <p className="leading-tight">Group event</p>
              <p className="text-sm text-context-light">
                Set an attendee limits for the service
              </p>
            </label>
            {formik.values.group_event && (
              <Input
                label="Maximum limit"
                name="max_attendees"
                formik={formik}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupEventToggler;

import React from "react";
import ServiceToggler from "./ServiceTogggler";
import Input from "../../../../../../../components/ui/Input";
import { cn } from "./../../../../../../../lib/utils";
import ToggleButton from "../../../../../../../components/ui/ToggleButton";

function GroupEventToggler({ className, groupEvent, setGroupEvent, maxAttendees, setMaxAttendees }) {
  return (
    <div>
      <div className="self-start">
        <div className={cn("flex", className)}>
          <div className="mt-4">
            <ToggleButton 
              value={groupEvent} 
              onChange={(e) => setGroupEvent(e.target.checked)} 
            />
          </div>
          <div className="flex flex-col  px-4">
            <label htmlFor="group_event" className="cursor-pointer mb-1.5">
              <p className="leading-tight">Group event</p>
              <p className="text-sm text-context-light">
                Set an attendee limit for the service
              </p>
            </label>
            {groupEvent && (
              <Input
                label="Maximum limit"
                value={maxAttendees}
                onChange={(e) => setMaxAttendees(e.target.value)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupEventToggler;

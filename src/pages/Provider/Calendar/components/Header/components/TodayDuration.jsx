import React from "react";
import Button from "../../../../../../components/ui/Button";
import DurationDropdown from "./DurationDropdown";
import { useCalendarStore } from "../../../../../../FormSchema/Provider/calendarStore";

function TodayDuration() {
  const { goToToday } = useCalendarStore();

  return (
    <Button
      variant="outline"
      size="header"
      onClick={goToToday}
      className="overflow-visible sm:overflow-hidden"
    >
      <span>Today</span>
      <span className="block sm:hidden">
        <DurationDropdown className="-left-16 top-7" />
      </span>
    </Button>
  );
}

export default TodayDuration;

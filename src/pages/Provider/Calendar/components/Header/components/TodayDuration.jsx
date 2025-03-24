import React from "react";
import Button from "../../../../../../components/ui/Button";
import DurationDropdown from "./DurationDropdown";

function TodayDuration() {
  return (
    <Button variant="outline" className="overflow-visible">
      <span>Today</span>
      <DurationDropdown className="-left-16 top-7" />
    </Button>
  );
}

export default TodayDuration;

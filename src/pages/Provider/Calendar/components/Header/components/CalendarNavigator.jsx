import React from "react";
import Button from "../../../../../../components/ui/Button";
import { ChevronLeft, ChevronRight, Link2, CalendarDays } from "lucide-react";
function CalendarNavigator() {
  return (
    <div className="flex items-center gap-0.5 md:gap-1">
      <Button variant="ghost" size="icon" className="rounded-full size-7">
        <ChevronLeft className="text-context-light" />
      </Button>
      <Button variant="link" className="rounded-full size-7  md:hidden">
        <CalendarDays />
      </Button>
      <Button variant="ghost" size="icon" className="rounded-full p-1 size-7  ">
        <ChevronRight className="text-context-light" />
      </Button>
    </div>
  );
}

export default CalendarNavigator;

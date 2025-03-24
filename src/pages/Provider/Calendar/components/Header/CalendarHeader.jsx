import React from "react";
import Button from "../../../../../components/ui/Button";
import { Link2 } from "lucide-react";
import DurationDropdown from "./components/DurationDropdown";
import NewDropdown from "./components/NewDropdown";
import SettingDropdown from "./components/SettingDropdown";
import GridListButton from "./components/GridListButton";
import CalendarNavigator from "./components/CalendarNavigator";
import TodayDuration from "./components/TodayDuration";

function CalendarHeader() {
  return (
    <div className="py-1 px-5 lg:pl-12 lg:pr-10 flex justify-between">
      <div className="flex items-center gap-1.5 md:gap-3">
        <TodayDuration />

        <CalendarNavigator />
        <GridListButton className=" hidden md:block" />
        <DurationDropdown isFull={true} />
      </div>

      <div className="flex items-center gap-1.5 md:gap-3">
        <GridListButton className="md:hidden" />
        <Button variant="outline" className="hidden lg:flex">
          <Link2 size={18} />
          <span>Booking</span>
        </Button>
        <NewDropdown />
        <Button
          variant="outline"
          className="hidden md:flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-funnel"
          >
            <path d="M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z" />
          </svg>
        </Button>
        <SettingDropdown />
      </div>
    </div>
  );
}

export default CalendarHeader;

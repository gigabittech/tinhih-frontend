import React from "react";
import CalendarHeader from "./components/Header/CalendarHeader";
import { useCalendarStore } from "../../../FormSchema/Provider/calendarStore";
import ShortCalendar, {
  getMonthSlots,
} from "../../../components/ui/ShortCalendar";
import MonthlyCalendar from "./components/FullCalendar/MonthlyCalendar";  

function CalendarPage() {
  const {
    currentDate,
    setCurrentDate,
    selectedDate,
    setSelectedDate,
    setGoToToday,
  } = useCalendarStore();

  const dateSlots = getMonthSlots(
    selectedDate.getFullYear(),
    selectedDate.getMonth()
  );

  return (
    <div className=" flex flex-col h-screen">
      <CalendarHeader />
      <div className="flex gap-3 h-full md:pl-5 border-t border-outline-medium">
        <section className="hidden md:block md:w-[17rem] pt-3">
          <ShortCalendar
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            setGoToToday={setGoToToday}
          />
        </section>
        <section className="w-full border-l border-outline-medium">
          <MonthlyCalendar dateSlots={dateSlots} selectedDate={selectedDate} />
        </section>
      </div>
    </div>
  );
}

export default CalendarPage;

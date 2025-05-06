import React, { useState } from "react";
import CalendarHeader from "./components/Header/CalendarHeader";
import { useCalendarStore } from "../../../FormSchema/Provider/calendarStore";
import ShortCalendar, {
  getMonthSlots,
} from "../../../components/ui/ShortCalendar";
import MonthlyCalendar from "./components/FullCalendar/MonthlyCalendar";
import Sidebar from "./components/SIdebar/Sidebar";

function CalendarPage() {
  const [openSideModal, setOpenSideModal] = useState(false);
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

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setOpenSideModal(true);
  };

  const handleSideModal = () => {
    setOpenSideModal(false);
    setSelectedDate(new Date());
  };

  return (
    <div className=" flex flex-col h-screen">
      <Sidebar
        isOpen={openSideModal}
        onClose={handleSideModal}
        contentName={"Appointment"}
      />
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
          <MonthlyCalendar
            dateSlots={dateSlots}
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
          />
        </section>
      </div>
    </div>
  );
}

export default CalendarPage;

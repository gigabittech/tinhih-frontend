import React, { useState } from "react";
import CalendarHeader from "./components/Header/CalendarHeader";
import { useCalendarStore } from "../../../FormSchema/Provider/calendarStore";
import ShortCalendar, {
  getMonthSlots,
} from "../../../components/ui/ShortCalendar";
import MonthlyCalendar from "./components/FullCalendar/MonthlyCalendar";
import Sidebar from "./components/SIdebar/Sidebar";
import useCalendarPage from "../../../FormSchema/Provider/calendarPage";
import CreateNewClient from "./components/SIdebar/NewClient/CreateNewClient";
import CreateService from "./components/SIdebar/Services/CreateService";
import CreateLocation from "./components/SIdebar/Location/CreateLocation";

function CalendarPage() {
  const {
    currentDate,
    setCurrentDate,
    selectedDate,
    setSelectedDate,
    setGoToToday,
  } = useCalendarStore();
  const {
    closeCreateClient,
    isClientCreate,
    isServiceCreate,
    closeCreateService,
    isLocationCreate,
    closeCreateLocation,
  } = useCalendarPage();

  const dateSlots = getMonthSlots(
    selectedDate.getFullYear(),
    selectedDate.getMonth()
  );

  return (
    <div className=" flex flex-col h-full">
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
      <Sidebar />

      <CreateNewClient isOpen={isClientCreate} onClose={closeCreateClient} />
      <CreateService isOpen={isServiceCreate} onClose={closeCreateService} />
      <CreateLocation isOpen={isLocationCreate} onClose={closeCreateLocation} />
    </div>
  );
}

export default CalendarPage;

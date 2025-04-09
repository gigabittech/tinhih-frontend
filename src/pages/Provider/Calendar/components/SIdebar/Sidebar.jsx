import React from "react";
import { SideModal } from "../../../../../components/ui/SideModal";
import useCalendarPage from "../../../../../FormSchema/Provider/calendarPage";
import CreateAppointment from "./Appointment/CreateAppointment";

function Sidebar() {
  const { isOpenCalendarSideBar, closeCalendarSideBar } = useCalendarPage();

  return (
    <SideModal isOpen={isOpenCalendarSideBar} onClose={closeCalendarSideBar}>
      <div className="px-7 py-5">
        <CreateAppointment />
      </div>
    </SideModal>
  );
}

export default Sidebar;

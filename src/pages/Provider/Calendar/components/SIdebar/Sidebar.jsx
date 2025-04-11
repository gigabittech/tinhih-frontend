import React from "react";
import { SideModal } from "../../../../../components/ui/SideModal";
import useCalendarPage from "../../../../../FormSchema/Provider/calendarPage";
import CreateAppointment from "./Appointment/CreateAppointment";
import { RxCross1 } from "react-icons/rx";
import { FaRegCalendarCheck } from "react-icons/fa6";

function Sidebar() {
  const { isOpenCalendarSideBar, closeCalendarSideBar } = useCalendarPage();

  return (
    <SideModal isOpen={isOpenCalendarSideBar} onClose={closeCalendarSideBar}>
      <div className="px-7 relative">
        <CreateAppointment onClose={closeCalendarSideBar} />
        {isOpenCalendarSideBar && (
          <div className=" absolute top-5 -left-20">
            <div className="grid gap-5">
              <p
                className="bg-white w-16 h-16 rounded-full flex items-center justify-center"
                onClick={closeCalendarSideBar}
              >
                {" "}
                <RxCross1 size={20} />
              </p>
              <p className="bg-[#ffdb00] w-16 h-16 rounded-full flex items-center justify-center">
                <FaRegCalendarCheck size={20} />
              </p>
            </div>
          </div>
        )}
      </div>
    </SideModal>
  );
}

export default Sidebar;

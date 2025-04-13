import React from "react";
import { SideModal } from "../../../../../components/ui/SideModal";
import useCalendarPage from "../../../../../FormSchema/Provider/calendarPage";
import CreateAppointment from "./Appointment/CreateAppointment";
import { RxCross1 } from "react-icons/rx";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import HeadCalendar from "./HeadCalendar";

function Sidebar() {
  const { isOpenCalendarSideBar, closeCalendarSideBar } = useCalendarPage();

  return (
    <SideModal isOpen={isOpenCalendarSideBar} onClose={closeCalendarSideBar}>
      <div className=" py-4 px-5 border-b border-gray-200 bg-white">
        <div className="flex justify-between items-center gap-3">
          <button className="border border-gray-300 py-2 rounded font-semibold hover:bg-gray-50 transition-colors ">
            <HeadCalendar />
          </button>
          <div>
            <div className="flex items-center gap-1 bg-[#efefef] p-2 rounded-full">
              <button className="bg-[#FFB400] text-white w-7 h-7 text-xs rounded-full font-bold">
                AC
              </button>
              <button>
                <IoIosArrowDown />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
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

import React from "react";
import { SideModal } from "../../../../../components/ui/SideModal";
import CreateAppointment from "./Appointment/CreateAppointment";
import { RxCross1 } from "react-icons/rx";
import { FaRegCalendarCheck } from "react-icons/fa6";
import HeadCalendar from "./HeadCalendar";
import TeamDropdown from "./TeamDropdown";
import { motion } from "framer-motion";

function Sidebar({ isOpen, onClose, contentName }) {
  return (
    <SideModal isOpen={isOpen} onClose={onClose}>
      <div className=" py-4 px-5 border-b border-gray-200 bg-white">
        <div className="flex justify-between items-center gap-3">
          <button className="border border-gray-300 py-2 rounded font-semibold hover:bg-gray-50 transition-colors ">
            <HeadCalendar />
          </button>
          <TeamDropdown />
        </div>
      </div>
      <div>
        {contentName === "Appointment" && (
          <CreateAppointment onClose={onClose} />
        )}
        {isOpen && (
          <div className="absolute top-5 -left-20">
          <div className="grid gap-5">
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-white w-16 h-16 rounded-full flex items-center justify-center cursor-pointer shadow-md"
              onClick={onClose}
            >
              <RxCross1 size={20} />
            </motion.div>
        
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              className="bg-[#ffdb00] w-16 h-16 rounded-full flex items-center justify-center shadow-md"
            >
              <FaRegCalendarCheck size={20} />
            </motion.div>
          </div>
        </div>
        )}
      </div>
    </SideModal>
  );
}

export default Sidebar;

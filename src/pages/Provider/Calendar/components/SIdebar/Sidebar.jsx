import React from "react";
import { motion } from "framer-motion";
import CreateNewClient from "./NewClient/CreateNewClient";
import useCalendarPage from "../../../../../FormSchema/Provider/calendarPage";
import CreateService from "./Services/CreateService";
import CreateLocation from "./Location/CreateLocation";
import { RxCross1 } from "react-icons/rx";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { BsClockFill } from "react-icons/bs";
import { RiTaskFill } from "react-icons/ri";
import { FaDoorOpen } from "react-icons/fa";
import { BiTaskX } from "react-icons/bi";
import { SideModal } from "../../../../../components/ui/SideModal";
import CreateAppointment from "./Appointment/CreateAppointment";
import CreateNewTeamMember from "./teamMember.jsx/CreateNewTeamMember";

const options = [
  { label: "Appointment", icon: <FaRegCalendarCheck /> },
  { label: "Task", icon: <RiTaskFill /> },
  { label: "Reminder", icon: <BsClockFill /> },
  { label: "Meeting", icon: <BiTaskX /> },
  { label: "Out of office", icon: <FaDoorOpen /> },
];

function Sidebar({ isOpen, onClose, contentName, setSiderbarContent }) {
  const {
    closeCreateClient,
    isClientCreate,
    isServiceCreate,
    closeCreateService,
    isLocationCreate,
    closeCreateLocation,
    isTeamMemberCreate,
    closeCreateTeamMember,
  } = useCalendarPage();

  const handleCloseMemu = () => {
    onClose();
    setSiderbarContent("");
  };

  return (
    <div>
      <CreateNewClient isOpen={isClientCreate} onClose={closeCreateClient} />
      <CreateNewTeamMember
        isOpen={isTeamMemberCreate}
        onClose={closeCreateTeamMember}
      />
      <CreateService isOpen={isServiceCreate} onClose={closeCreateService} />
      <CreateLocation isOpen={isLocationCreate} onClose={closeCreateLocation} />
      <SideModal isOpen={isOpen} onClose={onClose}>
        <div className=" relative">
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
                  className="bg-white transition-colors  hover:bg-gray-200 duration-300 w-[55px] h-[55px] rounded-full flex items-center justify-center cursor-pointer shadow-md"
                  onClick={handleCloseMemu}
                >
                  <RxCross1 size={20} />
                </motion.div>
                {options.map((option, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: -20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                    className={`${
                      option.label === contentName
                        ? "bg-[#ffdb00] w-[55px] h-[55px] transition-colors hover:bg-primary-600"
                        : " bg-white w-10 h-10 transition-all duration-300 hover:w-[55px] hover:h-[55px] hover:bg-gray-200"
                    } mx-auto text-xl rounded-full flex items-center justify-center shadow-md cursor-pointer`}
                    onClick={() => setSiderbarContent(option.label)}
                  >
                    <button>{option.icon}</button>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </SideModal>
    </div>
  );
}

export default Sidebar;

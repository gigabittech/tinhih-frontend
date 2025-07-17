import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoLink } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";
import useUserStore from "../../../store/global/userStore";
import Avatar from "../../ui/Avatar";
import { FaPlus } from "react-icons/fa6";
import useToggleWorkspace from "./hooks/toggleWorkspace";
import CreateWorkspaceModal from "./components/CreateWorkspaceModal";
import SignOut from "../../ui/SignOut";
import QuickActions from "./components/QuickActions";
import Booking from "../../../pages/Provider/Calendar/components/Header/components/Booking";

function TopNavbar() {
  const [expand, setExpand] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const { full_name, email, currentWorkspace, workspaces } = useUserStore(
    (state) => state.user
  );
  const { toggleWorkspace } = useToggleWorkspace();

  const handleCreateWorkspaceModal = () => {
    setOpenModal(true);
    setExpand(false);
  };

  const handleLogoutModal = () => {
    setOpenLogoutModal(true);
    setExpand(false);
  };

  return (
    <div className="pb-7 pt-2 px-10">
      <div className="flex justify-end items-center gap-5 relative">
        <QuickActions />
        {/* ---------profile button---------- */}
        <div
          onClick={() => setExpand(!expand)}
          className="flex items-center gap-5 bg-gray-100 p-1 rounded-full cursor-pointer"
        >
          <div className="flex items-center gap-1">
            <Avatar name={currentWorkspace?.businessName} />
            <p className="text-sm font-bold">
              {currentWorkspace?.businessName}
            </p>
          </div>
          <div
            className={`${
              expand ? " rotate-180" : ""
            } transition-all duration-300`}
          >
            <IoMdArrowDropdown />
          </div>
        </div>
        {/* ---------dropdown---------- */}
        {expand && (
          <div className=" absolute bg-white top-10 z-10 rounded shadow-2xl border border-[#a0a0a039] whitespace-nowrap">
            {/* ---------button to close menu---------- */}
            <div
              onClick={() => setExpand(false)}
              className=" -z-10 fixed top-0 left-0 right-0 bottom-0"
            ></div>
            {/* ---------header---------- */}
            <div className="flex gap-3 items-center p-5 border-b border-b-[#ebebeb]">
              <Avatar name={full_name} />
              <div>
                <p className="text-sm font-bold">{full_name}</p>
                <p className="text-xs">{email}</p>
              </div>
              <Booking
                button={
                  <span className="p-2 rounded bg-gray-100 cursor-pointer inline-flex items-center justify-center">
                    <IoLink size={20} />
                  </span>
                }
              />
            </div>
            {/* ---------Workspaces---------- */}
            <div className=" py-5 border-b border-b-[#ebebeb]">
              <p className="text-sm pb-5 font-extrabold text-[#7a7a7a] px-5">
                Workspaces
              </p>
              <div>
                <div className="flex gap-1 items-center px-5 py-1 bg-amber-100">
                  <Avatar name={currentWorkspace.businessName} />
                  <p className="text-sm font-bold">
                    {currentWorkspace?.businessName}
                  </p>
                </div>
                {workspaces.map((workspace) => (
                  <div
                    onClick={() => toggleWorkspace(workspace.id)}
                    key={workspace.id}
                    className="flex gap-1 items-center px-5 py-1 hover:bg-amber-100 cursor-pointer"
                  >
                    <Avatar name={workspace?.businessName} />
                    <p className="text-sm font-bold">
                      {workspace?.businessName}
                    </p>
                  </div>
                ))}
                <div
                  onClick={handleCreateWorkspaceModal}
                  className="px-5 py-2 my-1 hover:bg-gray-100 text-primary-700 flex items-center gap-3 cursor-pointer text-sm font-bold"
                >
                  <FaPlus />
                  New workspace
                </div>
              </div>
            </div>

            <div
              onClick={handleLogoutModal}
              className=" p-5 flex items-center gap-3 cursor-pointer"
            >
              <MdOutlineLogout /> Sign out
            </div>
          </div>
        )}
      </div>
      <CreateWorkspaceModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      />
      <SignOut
        isOpen={openLogoutModal}
        onClose={() => setOpenLogoutModal(false)}
      />
    </div>
  );
}

export default TopNavbar;

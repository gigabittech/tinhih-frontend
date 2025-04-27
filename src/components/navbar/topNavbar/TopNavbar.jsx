import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoLink } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";
import useUserStore from "../../../store/global/userStore";
import Avatar from "../../ui/Avatar";
import { FaPlus } from "react-icons/fa6";
import useToggleWorkspace from "./hooks/toggleWorkspace";
import { Modal, ModalBody, ModalHeader } from "../../ui/Modal";
import CreateWorkspaceModal from "./components/CreateWorkspaceModal";
import { AiFillBell } from "react-icons/ai";

function TopNavbar() {
  const [expand, setExpand] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const hanldeLogOut = useUserStore((state) => state.logoutHandler);
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
    <div className="py-3 px-10">
      <div className="flex justify-end items-center gap-3 relative">
      {/* <AiFillBell size={23}/> */}
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
              <span className=" bg-gray-100 p-2 text-xl rounded">
                <IoLink />
              </span>
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
      <Modal isOpen={openLogoutModal} onClose={() => setOpenLogoutModal(false)}>
        <ModalHeader
          icon={""}
          title={"Are you sure?"}
          onClose={() => setOpenLogoutModal(false)}
        />
        <ModalBody>
          <p className=" text-gray-500 ps-1">Sign out of this device.</p>
          <div className="flex justify-end gap-2 pt-10">
            <button
              onClick={() => setOpenLogoutModal(false)}
              className=" border border-[#a0a0a0] text-primary-800 px-5 py-1 rounded cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={hanldeLogOut}
              className=" border border-primary-700 bg-primary-700 text-white px-5 py-1 rounded cursor-pointer"
            >
              Confirm
            </button>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default TopNavbar;

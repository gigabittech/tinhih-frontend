import React from "react";
import useUserStore from "../../store/global/userStore";
import { Modal, ModalBody, ModalHeader } from "./Modal";

function SignOut({ isOpen, onClose }) {
  const hanldeLogOut = useUserStore((state) => state.logoutHandler);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader icon={""} title={"Are you sure?"} onClose={onClose} />
      <ModalBody>
        <p className=" text-gray-500 ps-1">Sign out of this device.</p>
        <div className="flex justify-end gap-2 pt-10">
          <button
            onClick={onClose}
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
  );
}

export default SignOut;

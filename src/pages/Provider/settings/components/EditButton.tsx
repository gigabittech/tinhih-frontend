import React from "react";
import { IoMdClose } from "react-icons/io";

function EditButton({ isEditMode, onClose, onOpen }) {
  return (
    <div>
      {isEditMode ? (
        <button
          onClick={onClose}
          className="hover:rounded-full hover:bg-gray-100 p-1  cursor-pointer"
        >
          <IoMdClose size={25} />
        </button>
      ) : (
        <button
          onClick={onOpen}
          className="text-primary-600 hover:bg-gray-100 p-1 rounded cursor-pointer"
        >
          Edit
        </button>
      )}
    </div>
  );
}

export default EditButton;

import React from "react";
import { IoMdArrowDropdown } from "react-icons/io";

function SettingsInput({ label, defaultValue, isEditMode }) {
  return (
    <div className="grid ">
      <label className="text-gray-500 text-sm">{label}</label>
      <div className="relative">
        <input
          type="text"
          defaultValue={defaultValue}
          className={`${
            isEditMode
              ? "border rounded border-gray-300 py-1 px-3 focus:border-primary-500"
              : "border border-transparent"
          } w-full outline-none `}
        />
        <div className="absolute top-2 right-3">
          {isEditMode && <IoMdArrowDropdown size={20} />}
        </div>
      </div>
    </div>
  );
}

export default SettingsInput;

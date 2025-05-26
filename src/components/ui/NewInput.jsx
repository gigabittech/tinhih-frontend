import React from "react";
import { RiArrowDropDownFill } from "react-icons/ri";

function NewInput({ label, placeholder, onClick, isOpen }) {
  return (
    <div className="grid">
      <label className="text-[#464646] text-sm">{label}</label>
      <div className=" relative grid">
        <input
          type="text"
          readOnly
          className="border border-[#9b9b9b] rounded px-3 py-1 outline-none cursor-pointer focus:border-primary-500"
          placeholder={placeholder}
          onClick={onClick}
        />

        <div
          className={`${isOpen ? " rotate-180" : " rotate-0"} text-gray-500 transition-all duration-300 absolute right-0 top-0 bottom-0 flex items-center`}
        >
          <RiArrowDropDownFill size={30} />
        </div>
      </div>
    </div>
  );
}

export default NewInput;

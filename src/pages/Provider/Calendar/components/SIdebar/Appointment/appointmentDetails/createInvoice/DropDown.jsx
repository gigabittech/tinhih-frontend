import React from "react";

function DropDown({ isOpen, onClose }) {
  return (
    <div>
      {isOpen && <div onClick={onClose} className=" fixed inset-0"></div>}
      <div
        className={
          isOpen
            ? " absolute right-0 bg-white py-2 rounded shadow text-nowrap grid gap-3 font-semibold"
            : "hidden"
        }
      >
        <p className="px-3">Download</p>
        <p className="px-3">Print</p>
        <p className="px-3">Email</p>
        <p className="px-3">Mark as void</p>
        <p className="border-t border-gray-200 text-red-400 px-3 py-2">Delete</p>
      </div>
    </div>
  );
}

export default DropDown;

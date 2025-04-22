import React from "react";
import { IoMdArrowDropdown } from "react-icons/io";
function TopNavbar() {
  return (
    <div className="py-3 px-10">
      <div className="flex justify-end">
        <div className="flex items-center gap-5 bg-gray-100 p-1 rounded-full">
          <div className="flex items-center gap-1">
            <p className=" w-7 h-7 flex justify-center items-center font-extrabold text-xs rounded-full bg-primary-400">
              UN
            </p>
            <p className="text-sm font-bold">User Name</p>
          </div>
          <IoMdArrowDropdown/>
        </div>
      </div>
    </div>
  );
}

export default TopNavbar;

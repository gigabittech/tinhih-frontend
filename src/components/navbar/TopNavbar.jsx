import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoLink } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";

function TopNavbar() {
  const [expand, setExpand] = useState();
  return (
    <div className="py-3 px-10">
      <div className="flex justify-end relative">
        <div
          onClick={() => setExpand(!expand)}
          className="flex items-center gap-5 bg-gray-100 p-1 rounded-full cursor-pointer"
        >
          <div className="flex items-center gap-1">
            <p className=" w-7 h-7 flex justify-center items-center font-extrabold text-xs rounded-full bg-primary-400">
              UN
            </p>
            <p className="text-sm font-bold">User Name</p>
          </div>
          <div
            className={`${
              expand ? " rotate-180" : ""
            } transition-all duration-300`}
          >
            <IoMdArrowDropdown />
          </div>
        </div>
        {expand && (
          <div className=" absolute bg-white top-10 z-10 rounded shadow-2xl border border-[#a0a0a039] whitespace-nowrap">
            <div onClick={() => setExpand(false)} className=" -z-10 fixed top-0 left-0 right-0 bottom-0"></div>
            <div className="flex gap-3 items-center p-5 border-b border-b-[#ebebeb]">
              <p className=" w-10 h-10 flex justify-center items-center font-extrabold text-xs rounded-full bg-primary-400">
                UN
              </p>
              <div>
                <p className="text-sm font-bold">User Nameeeeeee</p>
                <p className="text-xs">Email-Address@yahoo.com</p>
              </div>
              <span className=" bg-gray-100 p-2 text-xl rounded">
                <IoLink />
              </span>
            </div>

            <div className=" py-5 border-b border-b-[#ebebeb]">
              <p className="text-sm pb-5 font-extrabold text-[#7a7a7a] px-5">
                Workspaces
              </p>
              <div className="flex gap-1 items-center px-5 py-1 bg-amber-100">
                <p className=" w-8 h-8 flex justify-center items-center font-extrabold text-xs rounded-full bg-primary-400">
                  UN
                </p>
                <p className="text-sm font-bold">Workspace Name</p>
              </div>
            </div>

            <div className=" p-5 flex items-center gap-3">
            <MdOutlineLogout /> Sign out
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TopNavbar;

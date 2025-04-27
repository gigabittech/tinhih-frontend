import React from "react";
import { MdInbox } from "react-icons/md";
import { IoSendSharp } from "react-icons/io5";
import { MdDrafts } from "react-icons/md";
import { FiPlus } from "react-icons/fi";

function Inbox() {
  return (
    <div>
      <header className=" border-b border-[#dedede] px-10 pb-5">
        <div className="flex items-center gap-3 text-2xl">
          <span className=" p-3 bg-amber-100 text-[#6e6e6e]">
            {" "}
            <MdInbox />
          </span>
          <p className=" font-bold">Inbox</p>
        </div>
      </header>
      <main className="flex">
        <aside className="border-e border-[#dedede] w-60 h-screen px-5 py-3">
          <ul className=" grid gap-5 font-semibold text-[#acacac]">
            <li className="flex items-center gap-2">
              <MdInbox size={23} />
              All
            </li>
            <li className="flex items-center gap-2  ">
              <IoSendSharp size={23} />
              Sent
            </li>
            <li className="flex items-center gap-2">
              <MdDrafts size={23} />
              Draft
            </li>
            <li className=" text-sm text-[#585858] font-bold ">Inboxes</li>
            <li className=" text-sm text-primary-600 font-bold  flex items-center gap-2 cursor-pointer"><FiPlus />New inbox</li>
          </ul>
        </aside>
        <aside className=" bg-amber-50 w-full"></aside>
      </main>
    </div>
  );
}

export default Inbox;

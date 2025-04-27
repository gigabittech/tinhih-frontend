import React from "react";
import { FaUserGroup } from "react-icons/fa6";

function Clients() {
  return (
    <div>
      <header className=" border-b border-[#dedede] px-10 pb-5">
        <div className="flex items-center gap-3 text-2xl">
          <span className=" p-3 bg-amber-100 text-[#6e6e6e]">
            {" "}
            <FaUserGroup />
          </span>
          <p className=" font-bold">Clients</p>
        </div>
      </header>
      <main className="flex"></main>
    </div>
  );
}

export default Clients;

import {  ShieldEllipsisIcon } from 'lucide-react'
import { CgLoadbarSound } from "react-icons/cg";
import React from 'react'
import { MdBlock, MdOutlinePayment } from 'react-icons/md'
import { AiOutlineAppstoreAdd } from "react-icons/ai";

function OnlineBooking() {
  return (
    <div className="flex gap-5">
      {/* -------------left side-------------------- */}
      <div className=" w-[50%] ">
        {/* --------------Booking & cancellation policies---------------- */}
        <div className="bg-white rounded-lg border mb-6 border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <MdBlock />Booking & cancellation policies
          </h2>
        </div>
        {/* ------------------Analytics integration---------------------- */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <CgLoadbarSound/>Analytics integration
          </h2>
        </div>
      </div>

      {/* --------------------right side-------------------- */}
      <div className=" w-[50%] ">
        {/* ----------------Payment settings--------------------- */}
        <div className="bg-white rounded-lg border mb-6 border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <MdOutlinePayment/> Payment settings
          </h2>
        </div>
        {/* ---------------Customise appearance---------------- */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <AiOutlineAppstoreAdd /> Customise appearance
          </h2>
        </div>
      </div>
    </div>
  )
}

export default OnlineBooking
import { ShieldEllipsisIcon } from "lucide-react";
import { CgLoadbarSound } from "react-icons/cg";
import React from "react";
import { MdBlock, MdOutlinePayment } from "react-icons/md";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import Title from "../components/Title";

function OnlineBooking() {
  return (
    <div className="flex gap-5">
      {/* -------------left side-------------------- */}
      <div className=" w-[50%] ">
        {/* --------------Booking & cancellation policies---------------- */}
        <div className="bg-white rounded-lg border mb-6 border-gray-200 p-6">
          <Title
            icon={<MdBlock />}
            title={" Booking & cancellation policies"}
          />
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2"></h2>
        </div>
        {/* ------------------Analytics integration---------------------- */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <Title icon={<CgLoadbarSound />} title={"Analytics integration"} />
        </div>
      </div>

      {/* --------------------right side-------------------- */}
      <div className=" w-[50%] ">
        {/* ----------------Payment settings--------------------- */}
        <div className="bg-white rounded-lg border mb-6 border-gray-200 p-6">
          <Title icon={<MdOutlinePayment />} title={"Payment settings"} />
        </div>
        {/* ---------------Customise appearance---------------- */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <Title
            icon={<AiOutlineAppstoreAdd />}
            title={" Customise appearance"}
          />
        </div>
      </div>
    </div>
  );
}

export default OnlineBooking;

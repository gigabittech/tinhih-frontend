import { Calendar, Notebook, Paintbrush } from "lucide-react";
import React from "react";
import { FaCalendarCheck } from "react-icons/fa6";

function ServicesAvailability() {
  return (
    <div className="flex gap-5">
      {/* -------------left side-------------------- */}
      <div className=" w-[50%]">
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <Notebook /> Assigned services
          </h2>
        </div>
      </div>

      {/* --------------------right side-------------------- */}
      <div className="w-[50%]">
        {/* ----------------- Date specific hours---------------- */}
        <div className="bg-white rounded-lg p-6 mb-5">
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <Calendar /> Date specific hours
          </h2>

        </div>

        {/* --------------Availability---------------- */}
        <div className="bg-white rounded-lg p-6 mb-5">
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <FaCalendarCheck /> Availability
          </h2>
         
        </div>
      </div>
    </div>
  );
}

export default ServicesAvailability;

import { Calendar, Notebook, Paintbrush } from "lucide-react";
import React from "react";
import { FaCalendarCheck } from "react-icons/fa6";
import Title from "../components/Title";

function ServicesAvailability() {
  return (
    <div className="flex gap-5">
      {/* -------------left side-------------------- */}
      <div className=" w-[50%]">
        <div className="bg-white rounded-lg p-6">
          <Title icon={<Notebook />} title={"Assigned services"} />
        </div>
      </div>

      {/* --------------------right side-------------------- */}
      <div className="w-[50%]">
        {/* ----------------- Date specific hours---------------- */}
        <div className="bg-white rounded-lg p-6 mb-5">
          <Title icon={<Calendar />} title={"Date specific hours"} />
        </div>

        {/* --------------Availability---------------- */}
        <div className="bg-white rounded-lg p-6 mb-5">
          <Title icon={<FaCalendarCheck />} title={"Availability"} />
        </div>
      </div>
    </div>
  );
}

export default ServicesAvailability;

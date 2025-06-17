import { Calendar, DollarSign } from "lucide-react";
import React from "react";
import Title from "../components/Title";

function Reminders() {
  return (
    <div className="flex gap-5">
      {/* -------------left side-------------------- */}
      <div className=" w-[50%] border border-gray-200">
        <div className="bg-white rounded-t-lg p-6 border-b border-gray-200">
          <Title icon={<Calendar />} title={"Customise client fields"} />
          <p className="pt-5">
            Set automated reminders for client appointments to avoid no-shows
            and cancellations
          </p>
        </div>
        <div className="bg-white rounded-b-lg p-6">
          <Title icon={<DollarSign />} title={"  Customise client fields"} />

          <p className="pt-5">
            Set automated reminders for invoice due dates. Reminders only apply
            to invoices sent through Carepatron
          </p>
        </div>
      </div>
    </div>
  );
}

export default Reminders;

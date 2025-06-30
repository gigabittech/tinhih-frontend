import { Calendar1, DollarSignIcon } from "lucide-react";
import React from "react";
import Title from "../components/Title";

export default function BasicReminders() {
  return (
    <div className="flex gap-5 opacity-50">
      {/* -------------left side-------------------- */}
      <div className=" w-[50%] bg-white border rounded-lg border-gray-200 ">
        <div className=" border-b border-gray-200 p-6">
          <Title icon={<Calendar1 />} title={"Appointment reminders"} />
          <p>
            Set automated reminders for client appointments to avoid no-shows
            and cancellations
          </p>
        </div>
        <div className=" p-6">
          <Title icon={<DollarSignIcon />} title={" Invoice reminders"} />
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2"></h2>
          <p>
            Set automated reminders for invoice due dates. Reminders only apply
            to invoices sent through Carepatron
          </p>
        </div>
      </div>
    </div>
  );
}

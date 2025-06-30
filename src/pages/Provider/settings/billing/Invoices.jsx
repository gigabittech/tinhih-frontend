import { DollarSignIcon, NotepadTextDashed } from "lucide-react";
import React from "react";
import Title from "../components/Title";

function Invoices() {
  return (
    <div className="flex gap-5 opacity-50">
      {/* -------------left side-------------------- */}
      <div className=" w-[50%] ">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <Title icon={<NotepadTextDashed />} title={"Invoice templates"} />
        </div>
      </div>

      {/* --------------------right side-------------------- */}
      <div className=" w-[50%] ">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <Title icon={<DollarSignIcon />} title={"Invoice reminders"} />
        </div>
      </div>
    </div>
  );
}

export default Invoices;

import { Calendar1Icon } from "lucide-react";
import { IoIosArrowDown } from "react-icons/io";
import { BiSolidNote } from "react-icons/bi";
import { CgNotes } from "react-icons/cg";
import { PiMedalFill } from "react-icons/pi";

function Templates() {
  return (
    <div className="opacity-50">
      {/* --------------Scheduling---------------- */}
      <div className="bg-white rounded-lg border mb-6 border-gray-200 px-5 py-3">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold flex items-center gap-2">
            <span className="p-2 rounded bg-gray-100">
              <Calendar1Icon />
            </span>
            Scheduling
          </div>
          <div className="flex  items-center gap-5">
            <p className="bg-gray-200 rounded-full px-2">5</p>
            <IoIosArrowDown />
          </div>
        </div>
      </div>
      {/* --------------Client and documentation---------------- */}
      <div className="bg-white rounded-lg border mb-6 border-gray-200 px-5 py-3">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold flex items-center gap-2">
            <span className="p-2 rounded bg-gray-100">
              <BiSolidNote />
            </span>
            Client and documentation
          </div>
          <div className="flex  items-center gap-5">
            <p className="bg-gray-200 rounded-full px-2">5</p>
            <IoIosArrowDown />
          </div>
        </div>
      </div>
      {/* --------------Billing and payment---------------- */}
      <div className="bg-white rounded-lg border mb-6 border-gray-200 px-5 py-3">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold flex items-center gap-2">
            <span className="p-2 rounded bg-gray-100">
              <CgNotes />
            </span>
            Billing and payment
          </div>
          <div className="flex  items-center gap-5">
            <p className="bg-gray-200 rounded-full px-2">5</p>
            <IoIosArrowDown />
          </div>
        </div>
      </div>
      {/* --------------Workspace---------------- */}
      <div className="bg-white rounded-lg border mb-6 border-gray-200 px-5 py-3">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold flex items-center gap-2">
            <span className="p-2 rounded bg-gray-100">
              <PiMedalFill />
            </span>
            Workspace
          </div>
          <div className="flex  items-center gap-5">
            <p className="bg-gray-200 rounded-full px-2">5</p>
            <IoIosArrowDown />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Templates;

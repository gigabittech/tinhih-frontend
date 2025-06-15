import { DollarSignIcon } from "lucide-react";
import { FaGear, FaLocationPin } from "react-icons/fa6";
import { PiMathOperationsFill } from "react-icons/pi";

function BillingDetails() {
  return (
    <div className="flex gap-5">
      {/* -------------left side-------------------- */}
      <div className=" w-[50%] ">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <DollarSignIcon/> Payment settings
          </h2>
        </div>
      </div>

      {/* --------------------right side-------------------- */}
      <div className="w-[50%] border border-gray-200 rounded-lg">
        {/* ----------------- Billing settings---------------- */}
        <div className="bg-white rounded-t-lg p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <FaGear /> Billing settings
          </h2>
        </div>
        {/* ------------------Tax rates------------------------ */}
        <div className="bg-white p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <PiMathOperationsFill />Tax rates
          </h2>
        </div>
        {/* -------------------- */}
        <div className="bg-white rounded-b-lg p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <FaLocationPin /> Billing address
          </h2>
        </div>
      </div>
    </div>
  );
}

export default BillingDetails;

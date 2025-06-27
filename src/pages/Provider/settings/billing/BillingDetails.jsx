import { DollarSignIcon } from "lucide-react";
import { FaGear, FaLocationPin } from "react-icons/fa6";
import { PiMathOperationsFill } from "react-icons/pi";
import Title from "../components/Title";

function BillingDetails() {
  return (
    <div className="flex gap-5">
      {/* -------------left side-------------------- */}
      <div className=" w-[50%] ">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <Title icon={<DollarSignIcon />} title={"Payment settings"} />
        </div>
      </div>

      {/* --------------------right side-------------------- */}
      <div className="w-[50%] border border-gray-200 rounded-lg">
        {/* ----------------- Billing settings---------------- */}
        <div className="bg-white rounded-t-lg p-6 border-b border-gray-200">
          <Title icon={<FaGear />} title={"Billing settings"} />
        </div>
        {/* ------------------Tax rates------------------------ */}
        <div className="bg-white p-6 border-b border-gray-200">
          <Title icon={<PiMathOperationsFill />} title={"Tax rates"} />
        </div>
        {/* -------------------- */}
        <div className="bg-white rounded-b-lg p-6 border-b border-gray-200">
          <Title icon={<FaLocationPin />} title={"  Billing address"} />
        </div>
      </div>
    </div>
  );
}

export default BillingDetails;

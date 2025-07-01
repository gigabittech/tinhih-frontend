import { ShieldEllipsis, ShieldEllipsisIcon } from "lucide-react";
import Title from "../components/Title";

function Payers() {
  return (
    <div className="flex gap-5 opacity-50">
      {/* -------------left side-------------------- */}
      <div className=" w-[50%] ">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <Title icon={<ShieldEllipsis />} title={"Insurance payers"} />
        </div>
      </div>

      {/* --------------------right side-------------------- */}
      <div className=" w-[50%] ">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <Title icon={<ShieldEllipsisIcon />} title={"Billing profiles"} />
        </div>
      </div>
    </div>
  );
}

export default Payers;

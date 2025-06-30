import { BoxIcon } from "lucide-react";
import Title from "../components/Title";

export default function Subscriptions() {
  return (
    <div className="flex gap-5 opacity-50">
      {/* -------------left side-------------------- */}
      <div className=" w-[50%]">
        <div className="bg-white rounded-lg p-6">
          <Title icon={<BoxIcon />} title={"Subscription summary"} />
        </div>
      </div>
    </div>
  );
}

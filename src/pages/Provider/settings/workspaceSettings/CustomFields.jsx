import { LogOut } from "lucide-react";
import Title from "../components/Title";

function CustomFields() {
  return (
    <div className="flex gap-5 opacity-50">
      {/* -------------left side-------------------- */}
      <div className=" w-[50%]">
        <div className="bg-white rounded-lg p-6">
          <Title icon={<LogOut />} title={" Customise client fields"} />
        </div>
      </div>
    </div>
  );
}

export default CustomFields;

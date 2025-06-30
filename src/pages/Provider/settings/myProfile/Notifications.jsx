import { Bell } from "lucide-react";
import Title from "../components/Title";

function Notifications() {
  return (
    <div className="flex gap-5 opacity-50">
      {/* -------------left side-------------------- */}
      <div className=" w-[50%]">
        <div className="bg-white rounded-lg p-6">
          <Title icon={<Bell />} title={"Notification preferences"} />
        </div>
      </div>
    </div>
  );
}

export default Notifications;

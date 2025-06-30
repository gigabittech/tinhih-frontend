import { PinIcon } from "lucide-react";
import React from "react";
import { MdBlock } from "react-icons/md";
import Title from "../components/Title";

function Locations() {
  return (
    <div className="flex gap-5 opacity-50">
      {/* -------------left side-------------------- */}
      <div className=" w-[50%] ">
        <div className="bg-white rounded-lg border mb-6 border-gray-200 p-6">
          <Title icon={<PinIcon />} title={"Locations"} />

          <p>
            Set up physical and virtual locations with specific addresses, room
            names, and types of virtual spaces to make scheduling appointments
            and video calls easier.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Locations;

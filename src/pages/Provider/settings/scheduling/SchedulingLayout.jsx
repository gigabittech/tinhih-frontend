import React from "react";
import SettingsLayout from "../components/SettingsLayout";
import { MdAddToPhotos } from "react-icons/md";

const schedulingTabs = [
  { label: "Locations", path: "/settings/Scheduling/Locations" },
  {
    label: "Services",
    path: "/settings/Scheduling/Services",
  },
  { label: "OnlineBooking", path: "/settings/Scheduling/OnlineBooking" },
];

function SchedulingLayout() {
  return (
    <SettingsLayout
      title="Scheduling"
      icon={<MdAddToPhotos/>}
      tabs={schedulingTabs}
    />
  );
}

export default SchedulingLayout;

import { UserSquareIcon } from "lucide-react";
import SettingsLayout from "../components/SettingsLayout";

const personalTabs = [
  { label: "Details", path: "/settings/Personal/Details" },
  {
    label: "Services and availability",
    path: "/settings/Personal/ServiceAvailability",
  },
  { label: "Connected apps", path: "/settings/Personal/ConnectedApps" },
  { label: "Notifications", path: "/settings/Personal/Notifications" },
];

function MyProfileLayout() {
  return (
    <SettingsLayout
      title="My Profile"
      icon={<UserSquareIcon />}
      tabs={personalTabs}
    />
  );
}

export default MyProfileLayout;

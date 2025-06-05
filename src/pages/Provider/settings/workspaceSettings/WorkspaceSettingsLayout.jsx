import React from "react";
import SettingsLayout from "../components/SettingsLayout";
import { PiMedalLight } from "react-icons/pi";

const workspaceTabs = [
  { label: "Details", path: "/settings/Workspace/Details" },
  {
    label: "Subscriptions",
    path: "/settings/Workspace/Subscriptions",
  },
  { label: "Custom fields", path: "/settings/Workspace/CustomFields" },
  { label: "Reminders", path: "/settings/Workspace/Reminders" },
];

function WorkspaceSettingsLayout() {
  return (
    <SettingsLayout
      title="Current Workspace"
      icon={<PiMedalLight />}
      tabs={workspaceTabs}
    />
  );
}

export default WorkspaceSettingsLayout;

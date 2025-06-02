import { LuWorkflow } from "react-icons/lu";
import SettingsLayout from "../components/SettingsLayout";

const workflowTabs = [
  { label: "Templates", path: "/settings/Workflow/Templates" },
  {
    label: "Basic reminders",
    path: "/settings/Workflow/BasicReminders",
  },
];

function WorkflowLayout() {
  return (
    <SettingsLayout
      title="Workflows Management"
      icon={<LuWorkflow />}
      tabs={workflowTabs}
    />
  );
}

export default WorkflowLayout;

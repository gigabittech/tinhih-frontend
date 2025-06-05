import { MdVerifiedUser } from "react-icons/md";
import SettingsLayout from "../components/SettingsLayout";

const insuranceTabs = [
  { label: "Payers", path: "/settings/Insurance/Payers" },
 
];

function InsuranceLayout() {
  return (
    <SettingsLayout
      title="Insurance"
      icon={<MdVerifiedUser />}
      tabs={insuranceTabs}
    />
  );
}

export default InsuranceLayout;

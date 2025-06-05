import SettingsLayout from "../components/SettingsLayout";
import { PiCurrencyDollarFill } from "react-icons/pi";

const billingTabs = [
  { label: "Billing details", path: "/settings/Billing/Details" },
  {
    label: "Invoice",
    path: "/settings/Billing/Invoicing",
  },
];

function BillingLayout() {
  return (
    <SettingsLayout
      title="Billing"
      icon={<PiCurrencyDollarFill />}
      tabs={billingTabs}
    />
  );
}

export default BillingLayout;

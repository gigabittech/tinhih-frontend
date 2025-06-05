import { Link } from "react-router";
import Overlay from "../../../ui/Overlay";
import {
  FaDollarSign,
  FaUser,
  FaShieldAlt,
  FaCalendarAlt,
  FaProjectDiagram,
  FaTrash,
  FaBuilding,
} from "react-icons/fa";

const settingsOptions = [
  {
    icon: <FaUser />,
    title: "My Profile",
    description: "Your personal details",
    href: "/settings/Personal/Details",
  },
  {
    icon: <FaBuilding />,
    title: "Workspace Settings",
    description: "Subscription and workspace info",
    href: "/settings/Workspace/Details",
  },
  {
    icon: <FaDollarSign />,
    title: "Billing",
    description: "Billing info, invoices, and Stripe",
    href: "/settings/Billing/Details",
  },
  {
    icon: <FaShieldAlt />,
    title: "Insurance",
    description: "Insurance payers and claims",
    badge: "Beta",
    href: "/settings/Insurance/Payers",
  },
  {
    icon: <FaCalendarAlt />,
    title: "Scheduling",
    description: "Services details and bookings",
    href: "/settings/Scheduling/Locations",
  },
  {
    icon: <FaProjectDiagram />,
    title: "Workflows Management",
    description: "Automation & Reminders",
    href: "/settings/Workflow/Templates",
  },
];

function SettingsMenu({ isOpen, onClose }) {
  return (
    <div onClick={onClose} className={`${isOpen ? "text-gray-600" : "hidden"}`}>
      <Overlay className={"left-56"} isOpen={isOpen} onClose={onClose} />
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={
          isOpen ? " fixed left-56 top-0 bottom-0 bg-white py-10" : "hidden"
        }
      >
        <h1 className=" font-bold text-sm px-8  ">Settings</h1>
        <ul className="">
          {settingsOptions.map(({ icon, title, description, badge, href }) => (
            <li key={title} onClick={onClose}>
              <Link
                to={href}
                className="flex items-start gap-4 px-5 py-3 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <div className="text-gray-500 text-xl p-2 bg-gray-100">
                  {icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-gray-900">
                      {title}
                    </span>
                    {badge && (
                      <span className="text-[10px] bg-purple-100 text-purple-700 font-semibold px-2 py-0.5 rounded">
                        {badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">{description}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        {/* Divider */}
        <div className="border-t border-gray-300 my-6" />

        {/* Trash */}
        <Link to={"/trash"} onClick={onClose}>
          <div className="flex items-start gap-4 px-8 py-2 rounded-lg hover:bg-gray-50 cursor-pointer">
            <div className="text-gray-500 text-xl p-2 bg-gray-100">
              <FaTrash />
            </div>
            <div>
              <div className="font-semibold text-sm text-gray-900">Trash</div>
              <p className="text-xs text-gray-500">Restore deleted items</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default SettingsMenu;

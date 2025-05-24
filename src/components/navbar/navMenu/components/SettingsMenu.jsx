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
  },
  {
    icon: <FaBuilding />,
    title: "Workspace Settings",
    description: "Subscription and workspace info",
  },
  {
    icon: <FaDollarSign />,
    title: "Billing",
    description: "Billing info, invoices, and Stripe",
  },
  {
    icon: <FaShieldAlt />,
    title: "Insurance",
    description: "Insurance payers and claims",
    badge: "Beta",
  },
  {
    icon: <FaCalendarAlt />,
    title: "Scheduling",
    description: "Services details and bookings",
  },
  {
    icon: <FaProjectDiagram />,
    title: "Workflows Management",
    description: "Automation & Reminders",
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
        <ul className="space-y-4 px-5">
          {settingsOptions.map(({ icon, title, description, badge }) => (
            <li
              key={title}
              className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-100 cursor-pointer"
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
            </li>
          ))}
        </ul>
        {/* Divider */}
        <div className="border-t my-6" />

        {/* Trash */}
        <div className="flex items-start gap-4 px-8 rounded-lg hover:bg-gray-100 cursor-pointer">
          <div className="text-gray-500 text-xl p-2 bg-gray-100">
            <FaTrash />
          </div>
          <div>
            <div className="font-semibold text-sm text-gray-900">Trash</div>
            <p className="text-xs text-gray-500">Restore deleted items</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsMenu;

import React, { useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router";
import { cn } from "../../lib/utils";
import useMenuStore from "../../store/global/menuStore";
import logoImage from "../../assets/auth/Logo.svg";
import {
  FaCalendarCheck,
  FaInbox,
  FaUsers,
  FaDollarSign,
  FaBriefcase,
  FaAddressBook,
  FaFileAlt,
  FaCog,
  FaUser,
  FaShieldAlt,
  FaCalendarAlt,
  FaProjectDiagram,
  FaTrash,
  FaBuilding,
} from "react-icons/fa";
import Overlay from "../ui/Overlay";

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

const menuItems = [
  { icon: <FaCalendarCheck />, label: "Calendar", path: "/calendar" },
  { icon: <FaInbox />, label: "Inbox", path: "/inbox" },
  { icon: <FaUsers />, label: "Clients", path: "/clients" },
  { icon: <FaDollarSign />, label: "Billing", path: "/billing" },
  { icon: <FaBriefcase />, label: "Your team", path: "/your-team" },
  /*   { icon: <FaAddressBook />, label: 'Contacts', path: '/contacts' }, */
  /*  { icon: <FaFileAlt />, label: 'Templates', path: '/templates' }, */
];

function NavMenu() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const location = useLocation();
  const closeSubMenu = useMenuStore((state) => state.closeSubMenu);

  const isActive = useMemo(
    () => (path) => location.pathname.startsWith(path),
    [location.pathname]
  );

  return (
    <div
      className="relative h-screen text-white py-5 bg-fixed-100"
      onClick={closeSubMenu}
    >
      {/* Logo and Title */}
      <div className="flex items-center space-x-4 px-4 mb-6 overflow-hidden">
        <img src={logoImage} alt="Tinhih-logo" className="w-10 shrink-0" />
        <h2 className="text-xl font-semibold text-fixed-text text-nowrap hidden md:block">
          TiNHiH Portal
        </h2>
      </div>

      {/* Navigation Menu */}
      <nav>
        <ul className="flex py-2 flex-col overflow-x-hidden">
          {menuItems.map((item, index) => (
            <li key={index} onClick={() => setIsSettingsOpen(false)}>
              <NavLink
                to={item.path}
                className={({ isActive: active }) =>
                  cn(
                    "flex items-center gap-4 px-6 py-3 trans",
                    active || isActive(item.path)
                      ? "bg-fixed-200 text-fixed-text"
                      : "text-fixed-text/65 hover:bg-fixed-200 focus-visible:bg-fixed-200"
                  )
                }
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm font-medium text-nowrap">
                  {item.label}
                </span>
              </NavLink>
            </li>
          ))}
          <li
            className={`${
              isSettingsOpen
                ? "bg-fixed-200 text-fixed-text"
                : "text-fixed-text/65 hover:bg-fixed-200 focus-visible:bg-fixed-200"
            } flex items-center gap-4 px-6 py-3 trans cursor-pointer`}
            onClick={() => setIsSettingsOpen(true)}
          >
            <span className="text-lg">
              <FaCog />
            </span>
            <span className="text-sm font-medium text-nowrap">Settings</span>
          </li>
        </ul>
        {isSettingsOpen && (
          <div
            onClick={() => setIsSettingsOpen(false)}
            className="text-gray-600"
          >
            <Overlay
              className={"left-56"}
              isOpen={isSettingsOpen}
              onClose={() => setIsSettingsOpen(false)}
            />
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className={
                isSettingsOpen
                  ? " fixed left-56 top-0 bottom-0 bg-white py-10"
                  : "hidden"
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
                  <div className="font-semibold text-sm text-gray-900">
                    Trash
                  </div>
                  <p className="text-xs text-gray-500">Restore deleted items</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}

export default NavMenu;

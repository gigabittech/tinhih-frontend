import React, { useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router";
import { cn } from "../../../lib/utils";
import useMenuStore from "../../../store/global/menuStore";
import logoImage from "../../../assets/auth/Logo.svg";
import {
  FaCalendarCheck,
  FaInbox,
  FaUsers,
  FaDollarSign,
  FaBriefcase,
  FaAddressBook,
  FaFileAlt,
  FaCog,
} from "react-icons/fa";
import SettingsMenu from "./components/SettingsMenu";

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
        <SettingsMenu
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
        />
      </nav>
    </div>
  );
}

export default NavMenu;

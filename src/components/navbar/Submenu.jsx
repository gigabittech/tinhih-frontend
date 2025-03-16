import React from "react";
import { NavLink } from "react-router";
import useMenuStore from "../../store/menuStore";
import { cn } from "../../lib/utils";
import { ArrowLeftToLine, X } from "lucide-react";
import useIsMobile from "../../hook/useIsMobile";

function Submenu() {
  const { subMenu, label } = useMenuStore((state) => state.subMenu);
  const closeMenu = useMenuStore((state) => state.closeMenu);
  const closeSubMenu = useMenuStore((state) => state.closeSubMenu);
  const isMobile = useIsMobile();

  const closeAll = () => {
    if (isMobile) closeMenu();
    closeSubMenu();
  };

  return (
    <div
      className={cn(
        "bg-base-100 h-screen py-5 overflow-x-hidden shadow-sidebar",
        isMobile ? "" : "pt-11"
      )}
    >
      {/* back & close section start */}
      {isMobile && (
        <div className="px-5 mb-9 flex items-center justify-between">
          <button
            onClick={closeSubMenu}
            className="flex items-center space-x-1 cursor-pointer"
          >
            <span>
              <ArrowLeftToLine size={18} />
            </span>
            <span className="text-sm font-bold">Back</span>
          </button>

          <button
            onClick={closeAll}
            className="cursor-pointer transition-colors duration-150
       hover:bg-action-light h-8 w-8 rounded-full flex items-center justify-center"
          >
            <X size={20} className="text-context-light" />
          </button>
        </div>
      )}
      {/* back & close section end */}

      <div className="px-5 mb-2">
        <h5 className="text-sm font-bold text-context-light">{label}</h5>
      </div>

      {/* submenu */}
      <ul>
        {subMenu?.map(({ icon, label, subLabel, path }, index) => (
          <li key={index} className="mb-1">
            <NavLink
              to={path}
              onClick={closeAll}
              className={({ isActive }) =>
                cn(
                  "py-2.5 px-5 flex space-x-3 focus:outline-none hover:bg-action-light focus-visible:bg-action-light transition-colors duration-150",
                  isActive ? "bg-action-light" : ""
                )
              }
            >
              <div
                className="flex-shrink-0 flex items-center justify-center 
                h-10 w-10 rounded-sm bg-action-light"
              >
                {icon}
              </div>

              <div className="flex flex-col">
                <span className="font-bold leading-5">{label}</span>
                <span className="text-sm text-context-lighter -tracking-wide">
                  {subLabel}
                </span>
              </div>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Submenu;

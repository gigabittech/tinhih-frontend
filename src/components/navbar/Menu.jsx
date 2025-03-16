import React, { useMemo } from "react";
import { NavLink, useLocation } from "react-router";
import menu from "../../data/providerNav";
import { cn } from "../../lib/utils";
import useMenuStore from "../../store/menuStore";

function Menu() {
  const location = useLocation();
  const openSubMenu = useMenuStore((state) => state.openSubMenu);
  const colseSubMenu = useMenuStore((state) => state.closeSubMenu);

  const isActiveSubmenu = useMemo(
    () => (item) => {
      const isSame = item?.subMenu
        ?.map((sub) => sub?.path)
        .includes(location.pathname);
      return isSame;
    },
    [location.pathname]
  );

  return (
    <div className="relative h-screen py-5 bg-fixed-100" onClick={colseSubMenu}>
   

      <nav>
        <ul className="text-red-100 overflow-x-hidden">
          {menu?.map((item, index) => (
            <li key={index}>
              {item?.subMenu ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openSubMenu(item);
                  }}
                  className={cn(
                    "w-full flex items-center space-x-5 px-4 py-2.5 text-nowrap focus:outline-none trans cursor-pointer",
                    isActiveSubmenu(item)
                      ? "bg-fixed-200 text-fixed-text"
                      : "text-fixed-text/65 hover:bg-fixed-200 focus-visible:bg-fixed-200"
                  )}
                >
                  <span>{item?.icon}</span>
                  <span>{item?.label}</span>
                </button>
              ) : (
                <NavLink
                  className={({ isActive }) =>
                    cn(
                      "flex items-center space-x-5 px-4 py-2.5 text-nowrap focus:outline-none trans cursor-pointer",
                      isActive
                        ? "bg-fixed-200 text-fixed-text"
                        : "text-fixed-text/65 hover:bg-fixed-200 focus-visible:bg-fixed-200"
                    )
                  }
                  to={item?.path}
                >
                  <span>{item?.icon}</span>
                  <span>{item?.label}</span>
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Menu;

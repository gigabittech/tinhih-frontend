import React from "react";
import { Outlet } from "react-router";
import useMenuStore from "../store/global/menuStore";
import { cn } from "./../lib/utils";
import useIsMobile from "./../hook/useIsMobile";
import Overlay from "../components/ui/Overlay";
import NavMenu from "../components/navbar/NavMenu";
import Submenu from "../components/navbar/Submenu";
import { ChevronLeft } from "lucide-react";

function Layout() {
  const isOpenMenu = useMenuStore((state) => state.isMenuOpen);
  const isOpenSubMenu = useMenuStore((state) => state.isSubMenuOpen);
  const closeMenu = useMenuStore((state) => state.closeMenu);
  const closeSubMenu = useMenuStore((state) => state.closeSubMenu);
  const toggleMenu = useMenuStore((state) => state.toggleMenu);
  const isMobile = useIsMobile();

  const closeAll = () => {
    if (isMobile) closeMenu();
    closeSubMenu();
  };

  return (
    <div className="flex">
      {(isMobile || isOpenSubMenu) && (
        <Overlay
          isOpen={isOpenMenu || isOpenSubMenu}
          onClick={closeAll}
          className="z-10"
        />
      )}

      {/* submenu sidebar */}
      <aside
        className={cn(
          "fixed h-screen w-[300px] trans",
          isMobile ? "z-50" : "z-20",
          isMobile && (isOpenSubMenu ? "translate-x-0" : "-translate-x-full"),
          !isMobile && (isOpenMenu ? "left-56" : "left-14"),
          isOpenSubMenu ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <Submenu />
      </aside>

      {/* menu sidebar */}
      <aside
        className={cn(
          "fixed h-screen left-0 top-0 w-12 text-primary bg-navbar trans",
          isMobile ? "w-56 z-20" : "z-30",
          !isMobile && (isOpenMenu ? "w-56" : "w-14"),
          isMobile && (isOpenMenu ? "translate-x-0" : "-translate-x-full")
        )}
      >
        <NavMenu />
      </aside>
      <div
        className={cn(
          "flex-1 trans",
          !isMobile && (isOpenMenu ? "ml-56" : "ml-14")
        )}
      >
        {!isMobile && (
          <button
            onClick={toggleMenu}
            className={cn("absolute z-10 cursor-pointer trans ")}
            aria-label="Toggle menu"
          >
            <svg
              className="fill-fixed-100"
              width="24"
              height="77"
              xmlns="http://www.w3.org/2000/svg"
              data-sentry-element="svg"
              data-sentry-component="NavigationShrinkerIcon"
              data-sentry-source-file="NavigationShrinkerIcon.tsx"
            >
              <g
                data-sentry-element="g"
                data-sentry-source-file="NavigationShrinkerIcon.tsx"
              >
                <path
                  d="m0,-0.23275l-0.15493,-0.15655l1.85366,2.99871c2.14811,3.37007 4.58454,5.16264 9.98812,7.8184c0.28591,0.14057 0.56778,0.27872 0.84622,0.4152l0.09645,0.04726c3.26776,1.60158 6.11938,2.99929 8.137,4.69906c1.88087,1.58457 3.00264,3.39547 3.27292,5.84035l0.06395,0l0,32.89482c0,2.99912 -1.10474,5.10953 -3.19064,6.91874c-2.02645,1.75763 -4.93521,3.18326 -8.28012,4.82262l-0.10038,0.04918c-0.27817,0.13631 -0.55976,0.27439 -0.84539,0.4148c-5.40358,2.65574 -7.33502,3.49593 -10.16606,8.04007l-1.38304,2.37589l-0.13775,-0.15655l0,-77.02201z"
                  data-sentry-element="path"
                  data-sentry-source-file="NavigationShrinkerIcon.tsx"
                ></path>
              </g>
            </svg>
            <ChevronLeft
              className={cn(
                "absolute top-7 text-fixed-text trans",
                isOpenMenu ? "rotate-0" : "-rotate-180"
              )}
            />
          </button>
        )}
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;

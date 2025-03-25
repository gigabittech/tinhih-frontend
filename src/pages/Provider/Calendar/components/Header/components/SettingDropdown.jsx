import React from "react";
import { Settings, NotepadText, Plug, Link2, Download } from "lucide-react";

import Dropdown from "../../../../../../components/ui/Dropdown";
import Button from "../../../../../../components/ui/Button";

function SettingDropdown() {
  const options = [
    {
      icon: <Settings size={18} />,
      label: "Settings",
    },
    {
      icon: <NotepadText size={18} />,
      label: "Set availability",
    },
    {
      icon: <Plug size={18} />,
      label: "Connected apps",
    },
  ];

  return (
    <Dropdown
      className="w-[11rem] right-0"
      trigger={() => (
        <Button variant="ghost" size="header" className="has-[>svg]:px-2">
          <Settings className="text-context-medium" />
        </Button>
      )}
      menuRenderer={(closeMenu, _, onSelect) => (
        <ui className="list-none block py-1 ">
          {/* in mobile */}
          <li>
            <Button
              onClick={() => {
                closeMenu();
              }}
              variant="ghost"
              size="none"
              className="md:hidden px-4 py-1.5 w-full font-medium rounded-none justify-start
              gap-x-5 bg-transparent gap-2"
            >
              <span className="w-5 shrink-0 text-context-light">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-funnel"
                >
                  <path d="M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z" />
                </svg>
              </span>
              <span>Filter</span>
            </Button>
          </li>

          <li className="border-t md:hidden pb-1 mt-1 border-outline-medium"></li>

          {options?.map((item, index) => (
            <li key={index}>
              <Button
                onClick={() => {
                  closeMenu();
                }}
                variant="ghost"
                size="none"
                className="px-4 py-1.5 w-full font-medium rounded-none justify-start
              gap-x-5 bg-transparent gap-2"
              >
                <span className="w-5 shrink-0 text-context-light">
                  {item?.icon}
                </span>
                <span> {item?.label}</span>
              </Button>
            </li>
          ))}

          {/* in mobile  */}
          <li>
            <Button
              onClick={() => {
                closeMenu();
              }}
              variant="ghost"
              size="none"
              className="lg:hidden px-4 py-1.5 w-full font-medium rounded-none justify-start
              gap-x-5 bg-transparent gap-2"
            >
              <span className="w-5 shrink-0 text-context-light">
                <Link2 size={18} />
              </span>
              <span>Booking</span>
            </Button>
          </li>

          <li className="border-t mt-1 border-outline-medium"></li>

          <li className=" pt-1">
            <Button
              onClick={() => {
                closeMenu();
              }}
              variant="ghost"
              size="none"
              className="px-4 py-1.5 w-full font-medium rounded-none justify-start
              gap-x-5 bg-transparent gap-2"
            >
              <span className="w-5 shrink-0 text-context-light">
                <Download size={18} />
              </span>
              <span>Export</span>
            </Button>
          </li>
        </ui>
      )}
    />
  );
}

export default SettingDropdown;

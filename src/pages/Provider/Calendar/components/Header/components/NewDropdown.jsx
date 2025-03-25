import React from "react";
import Dropdown from "../../../../../../components/ui/Dropdown";
import Button from "../../../../../../components/ui/Button";
import { Plus } from "lucide-react";
import useCalendarPage from "../../../../../../FormSchema/Provider/calendarPage";

function NewDropdown() {
  const { openCalendarSideBar, closeCalendarSideBar } = useCalendarPage();

  const options = [
    { label: "Appointment", onClick: openCalendarSideBar },
    { label: "Task" },
    { label: "Reminder" },
    { label: "Meeting" },
    { label: "Out of office" },
  ];

  return (
    <div className="hidden md:block">
      <Dropdown
        className="w-[7.5rem] right-0"
        trigger={() => (
          <Button size="header" className="font-bold gap-1">
            <Plus size={18} className="relative -top-px" />
            <span>New</span>
          </Button>
        )}
        menuRenderer={(closeMenu, _, onSelect) => (
          <ui className="list-none py-1 block">
            {options?.map((item, index) => (
              <li key={index}>
                <Button
                  onClick={() => {
                    closeMenu();
                    item?.onClick();
                  }}
                  variant="ghost"
                  size="none"
                  className="px-4 py-1.5 w-full font-medium rounded-none 
                justify-between gap-x-5 bg-transparent"
                >
                  {item?.label}
                </Button>
              </li>
            ))}
          </ui>
        )}
      />
    </div>
  );
}

export default NewDropdown;

import React, { useState } from "react";
import Dropdown from "../../../../../../components/ui/Dropdown";
import Button from "../../../../../../components/ui/Button";
import { ChevronDown } from "lucide-react";
import { cn } from "../../../../../../lib/utils";

function DurationDropdown({ isFull = false, className }) {
  const options = [
    { label: "Day", value: "1" },
    { label: "3 Days", value: "3" },
    { label: "Week", value: "7" },
    { label: "Month", value: "30" },
  ];

  const [selected, setSelected] = useState(options[options?.length - 1]);
  const handleSelect = (item) => {
    setSelected(item);
  };

  return (
    <div className={cn(isFull ? "hidden sm:block" : "")}>
      <Dropdown
        className={cn("w-[6.8rem]", className)}
        onSelect={handleSelect}
        trigger={(isOpen) => {
          return isFull ? (
            <Button size="header" variant="outline">
              <span>{selected?.label}</span>
              <ChevronDown
                size={18}
                className={cn(
                  "duration-200",
                  isOpen ? "-rotate-180" : "rotate-0"
                )}
              />
            </Button>
          ) : (
            <span className="rounded-full  p-0.5 bg-action-lighter hover:bg-action-light block">
              <ChevronDown
                size={18}
                className={cn(
                  "duration-200",
                  isOpen ? "-rotate-180" : "rotate-0"
                )}
              />
            </span>
          );
        }}
        menuRenderer={(closeMenu, _, onSelect) => (
          <ul className="py-1">
            {options?.map((item, index) => (
              <li key={index}>
                <Button
                  onClick={() => {
                    onSelect(item);
                    closeMenu();
                  }}
                  variant="ghost"
                  size="none"
                  className="px-4 py-1.5 w-full font-medium rounded-none 
                justify-between gap-x-5 bg-transparent text-context-dark"
                >
                  <span>{item?.label}</span>
                  <span className="text-context-lighter w-4">
                    {item?.label[0]}
                  </span>
                </Button>
              </li>
            ))}
          </ul>
        )}
      />
    </div>
  );
}

export default DurationDropdown;

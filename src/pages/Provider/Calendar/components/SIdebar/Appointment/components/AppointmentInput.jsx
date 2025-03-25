import React, { useState } from "react";
import Dropdown from "../../../../../../../components/ui/Dropdown";
import Input from "./../../../../../../../components/ui/Input";
import { ChevronDown } from "lucide-react";
import { cn } from "../../../../../../../lib/utils";
import Button from "../../../../../../../components/ui/Button";

function AppointmentInput() {
  const clients = [
    {
      name: "Alice Johnson",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      name: "Bob Smith",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      name: "Charlie Brown",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      name: "Diana Prince",
      avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      name: "Ethan Hunt",
      avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      name: "Fiona Gallagher",
      avatar: "https://randomuser.me/api/portraits/women/6.jpg",
    },
    {
      name: "George Miller",
      avatar: "https://randomuser.me/api/portraits/men/7.jpg",
    },
  ];

  const [searchItem, setSearchItem] = useState("");

  return (
    <Dropdown
      className="max-h-[10rem]"
      inputTrigger={(isOpen) => (
        <Input
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          iconPosition="right"
          icon={
            <ChevronDown
              className={cn(
                "size-5 text-context-lighter duration-200 transition-all",
                isOpen ? "-rotate-180" : "rotate-0"
              )}
            />
          }
        />
      )}
      menuRenderer={() => (
        <ul className="py-2">
          {clients?.map((item, index) => (
            <li key={index}>
              <Button variant="option" type="button">
                {item?.name}
              </Button>
            </li>
          ))}
        </ul>
      )}
    />
  );
}

export default AppointmentInput;

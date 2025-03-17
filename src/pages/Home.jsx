import React, { useState } from "react";
import Button from "../components/ui/Button";
import { X } from "lucide-react";
import Dropdown from "../components/ui/Dropdown";
import Drawer from "../components/ui/Drawer";

function Home() {
  const options = [
    { label: "Day", value: "1" },
    { label: "3 Days", value: "3" },
    { label: "Week", value: "7" },
    { label: "Year", value: "365" },
  ];

  const [selceted, setSelected] = useState(options[3]);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (item) => {
    setSelected(item);
  };

  return (
    <div className="space-x-5 mt-12 flex items-center">
      Rahul Roy Nipon
      <Button size="lg">Home</Button>
      <Button variant="outline" size="lg">
        Home
      </Button>
      <Button variant="ghost">
        <X />
      </Button>
      <Button variant="link">Home</Button>
      <Button variant="ghost">fasd</Button>
      <Dropdown
        trigger={<Button>New</Button>}
        menuRenderer={(closeMenu) => (
          <ul className="py-1">
            {options?.map((item, index) => (
              <li key={index}>
                <Button
                  onClick={() => {
                    closeMenu();
                  }}
                  variant="ghost"
                  size="none"
                  className="rounded-none w-full bg-transparent px-5 py-1.5 justify-start"
                >
                  {item?.label}
                </Button>
              </li>
            ))}
          </ul>
        )}
      />
      <Dropdown
        trigger={<Button variant="outline">{selceted?.label}</Button>}
        onSelect={handleSelect}
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
                  className="px-5 py-1.5 rounded-none w-full justify-start bg-transparent"
                >
                  {item?.label}
                </Button>
              </li>
            ))}
          </ul>
        )}
      />
      <Button onClick={() => setIsOpen(true)}>Open</Button>
    </div>
  );
}

export default Home;

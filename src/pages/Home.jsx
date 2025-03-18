import React, { useState } from "react";
import Button from "../components/ui/Button";
import { X } from "lucide-react";
import Dropdown from "../components/ui/Dropdown";
import Input from "../components/ui/Input";
import useMenuStore from "./../store/menuStore";
import Spinner from "../components/ui/spinner";
import AppLoader from "../components/global/AppLoader";

function Home() {
  const options = [
    { label: "Day", value: "1" },
    { label: "3 Days", value: "3" },
    { label: "Week", value: "7" },
    { label: "Month", value: "30" },
    { label: "Year", value: "365" },
  ];

  const [selceted, setSelected] = useState(options[3]);
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = useMenuStore((state) => state.openMenu);

  const handleSelect = (item) => {
    setSelected(item);
  };

  return (
    <div className="space-x-5 space-y-5  mt-12 mx-12">
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
                  className="px-5 py-1.5 font-bold rounded-none w-full justify-between gap-x-5 bg-transparent"
                >
                  <span>{item?.label}</span>
                  <span>{item?.label[0]}</span>
                </Button>
              </li>
            ))}
          </ul>
        )}
      />
      <Button onClick={openMenu}>Open</Button>
      <Spinner />
      <div className="w-32">
        <Input label="Name" type="text" className="focus:ring-transparent" />
      </div>
    </div>
  );
}

export default Home;

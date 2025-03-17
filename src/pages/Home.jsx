import React from "react";
import Button from "../components/ui/Button";
import { X } from "lucide-react";
import { Dropdown } from "../components/ui/Dropdown";

function Home() {
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
      <Dropdown
        trigger={<Button>New</Button>}
        menu={(closeMenu) => (
          <ul className="py-3">
            <li
              onClick={closeMenu}
              className="text-nowrap px-3 py-1 hover:bg-action-light trans cursor-pointer"
            >
              Rahul Roy
            </li>
            <li
              onClick={closeMenu}
              className="text-nowrap px-3 py-1 hover:bg-action-light trans cursor-pointer"
            >
              Rahul Nipon
            </li>
            <li
              onClick={closeMenu}
              className="text-nowrap px-3 py-1 hover:bg-action-light trans cursor-pointer"
            >
              Rahul
            </li>
          </ul>
        )}
      />
      <Dropdown trigger={<Button variant="outline">New</Button>} />
    </div>
  );
}

export default Home;

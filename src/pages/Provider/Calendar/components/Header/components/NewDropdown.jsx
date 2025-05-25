import React, { useEffect, useRef, useState } from "react";
import Button from "../../../../../../components/ui/Button";
import { Plus } from "lucide-react";
import Sidebar from "../../SIdebar/Sidebar";

function NewDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const [sidebarContent, setSiderbarContent] = useState("");
  const dropdownRef = useRef(null);

  const options = [
    { label: "Appointment" },
    { label: "Task" },
    { label: "Reminder" },
    { label: "Meeting" },
    { label: "Out of office" },
  ];

  const handleSidebar = (contentName) => {
    setIsOpen(false);
    setIsOpenSidebar(true);
    setSiderbarContent(contentName);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div ref={dropdownRef} className="relative hidden md:block">
      <Button
        size="header"
        className="font-bold gap-1"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Plus size={18} className="relative -top-px" />
        <span>New</span>
      </Button>

      <div
        className={`absolute top-6 z-[203] right-0 mt-2 bg-white shadow-xl rounded  transform transition-all duration-200 ease-out origin-top-right py-2 ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }`}
      >
        <div>
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSidebar(option?.label)}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      <Sidebar
        isOpen={isOpenSidebar}
        onClose={() => setIsOpenSidebar(false)}
        contentName={sidebarContent}
        setSiderbarContent={setSiderbarContent}
      />
    </div>
  );
}

export default NewDropdown;

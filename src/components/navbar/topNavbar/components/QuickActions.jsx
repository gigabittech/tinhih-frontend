import { useState, useRef, useEffect } from "react";
import {
  CalendarCheck,
  LayoutTemplate,
  Plus,
  StickyNote,
  Mic,
  User,
  FileText,
  Video,
  CheckSquare,
} from "lucide-react";
import CreateInvoice from "../../../../pages/Provider/billing/components/CreateInvoice";
import Note from "./Note";
import CreateNewClient from "../../../../pages/Provider/Calendar/components/SIdebar/ModalsToCreate/NewClient/CreateNewClient";

const options = [
  { name: "Appointment", icon: <CalendarCheck size={20} /> },
  { name: "Note", icon: <StickyNote size={20} /> },
  { name: "Transcribe", icon: <Mic size={20} /> },
  { name: "Client", icon: <User size={20} /> },
  { name: "Invoice", icon: <FileText size={20} /> },
  { name: "Video call", icon: <Video size={20} /> },
  { name: "Task", icon: <CheckSquare size={20} /> },
  { name: "Template", icon: <LayoutTemplate size={20} /> },
];

function QuickActions() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCreateClientOpen, setIsCreateClientOpen] = useState(false);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const dropdownRef = useRef(null);

  const handleOption = (name) => {
    setIsOpen(false);
    setSelectedOption(name);
    if (name === "Client") {
      setIsCreateClientOpen(true);
    }
    if (name === "Invoice") {
      setIsInvoiceOpen(true);
    }
    if (name === "Note") {
      setIsNoteOpen(true);
    }
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
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary-500 hover:bg-primary-600 p-1 rounded text-white cursor-pointer transition-colors duration-200 flex items-center justify-center"
        aria-label="Quick actions"
        aria-expanded={isOpen}
      >
        <Plus size={20} />
      </button>

      {isOpen && (
        <div
          className="origin-top-left absolute right-0 mt-2 rounded shadow-2xl border border-gray-50 bg-white z-[60]"
          role="menu"
        >
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option}
                className={` w-full text-left px-4 py-2 font-semibold  transition-colors duration-150 flex items-center gap-3`}
                onClick={() => handleOption(option.name)}
              >
                <span className=" bg-gray-100 p-1 rounded">{option.icon}</span>
                {option.name}
              </button>
            ))}
          </div>
        </div>
      )}
      {selectedOption === "Client" && (
        <CreateNewClient
          isOpen={isCreateClientOpen}
          onClose={() => setIsCreateClientOpen(false)}
        />
      )}
      {selectedOption === "Invoice" && (
        <CreateInvoice
          isOpen={isInvoiceOpen}
          onClose={() => setIsInvoiceOpen(false)}
        />
      )}
       <Note isOpen={isNoteOpen} onClose={() => setIsNoteOpen(false)} />
    </div>
  );
}

export default QuickActions;

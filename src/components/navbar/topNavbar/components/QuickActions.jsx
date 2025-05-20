import { Plus } from "lucide-react";
import { useState, useRef, useEffect } from "react";

function QuickActions() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Appointment");
  const dropdownRef = useRef(null);

  const options = [
    "Appointment",
    "Note",
    "Transcribe",
    "Client",
    "Invoice",
    "Video call",
    "Task",
    "Template",
  ];

  // Close dropdown when clicking outside
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
          className="origin-top-left absolute right-0 mt-2 rounded shadow-2xl border border-gray-50 bg-white z-10"
          role="menu"
        >
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option}
                className={`block w-full text-left px-4 py-2 font-semibold ${
                  selectedOption === option
                    ? "bg-primary-50 text-primary-600"
                    : "text-gray-700 hover:bg-gray-100"
                } transition-colors duration-150`}
                onClick={() => {
                  setSelectedOption(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default QuickActions;
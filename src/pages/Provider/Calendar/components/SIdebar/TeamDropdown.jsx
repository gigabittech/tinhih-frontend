import { useState, useRef, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { ImCheckmark } from "react-icons/im";

const TeamDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState([
    { id: 1, name: "Wendy Smith", initials: "WS" },
  ]);

  const dropdownRef = useRef(null);

  const teamMembers = [
    { id: 1, name: "Wendy Smith", initials: "WS" },
    { id: 3, name: "Noah Jenkins", initials: "NJ" },
  ];

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const isSelected = (id) => selectedMembers.some((m) => m.id === id);

  const handleToggleMember = (member) => {
    const alreadySelected = isSelected(member.id);
    const updated = alreadySelected
      ? selectedMembers.filter((m) => m.id !== member.id)
      : [...selectedMembers, member];

    setSelectedMembers(updated);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unselectedMembers = teamMembers.filter(
    (member) => !selectedMembers.find((m) => m.id === member.id)
  );

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <div
        onClick={toggleDropdown}
        className="flex items-center gap-1 bg-[#efefef] px-3 py-2 rounded-full cursor-pointer"
      >
        <div className="flex -space-x-3">
          {selectedMembers.length > 0 ? (
            selectedMembers.map((member, index) => (
              <div
                key={member.id}
                className="w-7 h-7 rounded-full border-2 border-white bg-primary-500 text-xs font-bold flex items-center justify-center text-white"
                style={{ zIndex: selectedMembers.length - index }}
              >
                {member.initials}
              </div>
            ))
          ) : (
            <div className="w-7 h-7 rounded-full bg-gray-300 text-xs font-bold flex items-center justify-center">
              ?
            </div>
          )}
        </div>

        <IoIosArrowDown
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </div>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-60 rounded-md shadow-lg border border-gray-200 bg-white z-10">
          <div className="py-2">
            {selectedMembers.map((member) => (
              <button
                key={member.id}
                onClick={() => handleToggleMember(member)}
                className="flex items-center justify-between w-full text-left px-4 py-2 text-sm font-medium bg-[#eedaa1] hover:bg-[#ecd38e]"
              >
                <div className="flex items-center gap-3">
                  <span className="bg-primary-500 text-black w-6 h-6 text-xs rounded-full font-bold flex items-center justify-center">
                    {member.initials}
                  </span>
                  {member.name}
                </div>
                <span className="w-3 h-3 flex items-center justify-center rounded-full bg-gray-400">
                  <ImCheckmark size={10} color="#ffffff" />
                </span>
              </button>
            ))}
            {selectedMembers.length !== teamMembers.length && (
              <div className="px-4 py-2 text-xs text-gray-500">
                All team members
              </div>
            )}
            {unselectedMembers.map((member) => (
              <button
                key={member.id}
                onClick={() => handleToggleMember(member)}
                className="flex items-center justify-between w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <div className="flex items-center gap-3">
                  <span className="bg-primary-500 text-black w-6 h-6 text-xs rounded-full font-bold flex items-center justify-center">
                    {member.initials}
                  </span>
                  {member.name}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamDropdown;

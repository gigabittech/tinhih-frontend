import { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

const TeamDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState({
    id: 2,
    name: 'Aniga Chowdhury',
    initials: 'AC'
  });

  const toggleDropdown = () => setIsOpen(!isOpen);

  const teamMembers = [
    { id: 1, name: 'Wendy Smith', initials: 'WS' },
    { id: 2, name: 'Smith Wendy', initials: 'SW' },
  ];

  return (
    <div className="relative inline-block text-left">
      {/* Button with initials and dropdown arrow */}
      <div className="flex items-center gap-1 bg-[#efefef] p-2 rounded-full">
        <button 
          className="bg-[#FFB400] text-white w-7 h-7 text-xs rounded-full font-bold"
          onClick={toggleDropdown}
        >
          {selectedMember.initials}
        </button>
        <button onClick={toggleDropdown}>
          <IoIosArrowDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Dropdown panel */}
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg border border-gray-200 bg-white z-10">
          <div className="py-1">
            <div className="px-4 py-2 text-xs text-gray-500">All team members</div>
            
            {teamMembers.map((member) => (
              <button
                key={member.id}
                onClick={() => {
                  setSelectedMember(member);
                  setIsOpen(false);
                }}
                className={`flex items-center w-full text-left px-4 py-2 text-sm ${
                  selectedMember.id === member.id 
                    ? 'bg-gray-100 text-gray-900' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="bg-[#FFB400] text-white w-6 h-6 text-xs rounded-full font-bold flex items-center justify-center mr-3">
                  {member.initials}
                </span>
                {member.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamDropdown;
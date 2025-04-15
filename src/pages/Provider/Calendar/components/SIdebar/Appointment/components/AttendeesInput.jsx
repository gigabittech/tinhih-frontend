import React, { useEffect, useRef, useState } from "react";
import useCalendarPage from "../../../../../../../FormSchema/Provider/calendarPage";
import { FaPlus } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";

const clients = [
  {
    id: 1,
    name: "Alice Johnson",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: 2,
    name: "Bob Smith",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
  },
];

function AttendeesInput() {
  const [openClients, setOpenClients] = useState(false);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [selectedClients, setSelectedClients] = useState([]);
  const dropdownRef = useRef(null);
  const { openCreateClient } = useCalendarPage();

  const handleClientSelect = (client) => {
    const alreadySelected = selectedClients.some((c) => c.id === client.id);
    if (alreadySelected) {
      setSelectedClients(selectedClients.filter((c) => c.id !== client.id));
    } else {
      setSelectedClients([...selectedClients, client]);
    }
    setOpenClients(false);
  };

  const handleRemoveClient = (id) => {
    setSelectedClients(selectedClients.filter((client) => client.id !== id));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenClients(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="grid">
      <label className="text-[#464646] text-sm">Attendees</label>
      <input
        onClick={() => setOpenClients(true)}
        type="text"
        readOnly
        className="border border-[#9b9b9b] rounded px-3 py-1 outline-none cursor-pointer"
        placeholder="Choose clients and their relationships"
      />
      <div className=" relative">
        {openClients && (
          <div className="absolute bg-white w-full shadow-2xl border border-gray-100 z-10 py-1 grid grid-cols-1 rounded">
            <p className="px-5 font-bold my-3">
              All clients and their relationships
            </p>
            {clients.map((client) => {
              const isSelected = selectedClients.some(
                (c) => c.id === client.id
              );
              return (
                <div
                  onClick={() => handleClientSelect(client)}
                  key={client.id}
                  className={`px-5 py-2 flex items-center gap-5 cursor-pointer hover:bg-gray-100 ${
                    isSelected ? "bg-blue-100" : ""
                  }`}
                >
                  <img
                    src={client.avatar}
                    alt={client.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <p className="font-medium">{client.name}</p>
                </div>
              );
            })}
            <div className="px-5 py-3 hover:bg-gray-100 border-t border-gray-300">
              <button
                onClick={openCreateClient}
                className="text-sm flex items-center gap-3 text-primary-800 font-bold"
              >
                <FaPlus />
                New Client
              </button>
            </div>
          </div>
        )}
      </div>
      {selectedClients?.length > 0 && (
        <div className="grid grid-cols-2 gap-2 py-2">
          {selectedClients.map((client) => (
            <div
              onMouseEnter={() => setShowDeleteButton(true)}
              onMouseLeave={() => setShowDeleteButton(false)}
              key={client.id}
              className="flex justify-between items-center gap-2 hover:bg-gray-200 p-5"
            >
              <div className="flex items-center gap-5">
                <p className="flex justify-center items-center w-8 h-8 rounded-full bg-primary-500">
                  DP
                </p>
                <span>{client.name}</span>
              </div>
              {showDeleteButton && (
                <button
                  onClick={() => handleRemoveClient(client.id)}
                  className="text-gray-600 w-6 h-6 hover:w-6 hover:h-6 hover:bg-gray-300 flex items-center justify-center rounded-full"
                >
                  <RxCross1 size={12} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AttendeesInput;

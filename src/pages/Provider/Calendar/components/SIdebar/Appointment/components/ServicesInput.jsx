import React, { useEffect, useRef, useState } from "react";
import useCalendarPage from "../../../../../../../FormSchema/Provider/calendarPage";
import { FaPlus } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { LuDot } from "react-icons/lu";

const services = [
  {
    id: 1,
    name: "Standard Appointment",
    duration: "45 mins",
    price: 100,
    currency: "BDT",
  },
  {
    id: 2,
    name: "Consultation Call",
    duration: "30 mins",
    price: 80,
    currency: "BDT",
  },
  {
    id: 3,
    name: "Therapy Session",
    duration: "60 mins",
    price: 150,
    currency: "BDT",
  },
  {
    id: 4,
    name: "Follow-up Meeting",
    duration: "20 mins",
    price: 50,
    currency: "BDT",
  },
];

function ServicesInput() {
  const [openServices, setOpenServices] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const dropdownRef = useRef(null);
  const { openCreateClient } = useCalendarPage();

  const handleServiceselect = (service) => {
    const alreadySelected = selectedServices.some((c) => c.id === service.id);
    if (alreadySelected) {
      setSelectedServices(selectedServices.filter((c) => c.id !== service.id));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
    setOpenServices(false);
  };

  const handleRemoveService = (id) => {
    setSelectedServices(
      selectedServices.filter((service) => service.id !== id)
    );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenServices(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="grid">
      <label className="text-[#464646] text-sm">Services</label>
      <input
        onClick={() => setOpenServices(true)}
        type="text"
        readOnly
        className="border border-[#9b9b9b] rounded px-3 py-1 outline-none cursor-pointer"
        placeholder="Choose Services"
      />
      <div className=" relative">
        {openServices && (
          <div className="absolute bg-white w-full shadow-2xl border border-gray-100 z-10 py-1 grid grid-cols-1 rounded">
            {services.map((service) => {
              const isSelected = selectedServices.some(
                (c) => c.id === service.id
              );
              return (
                <div
                  onClick={() => handleServiceselect(service)}
                  key={service.id}
                  className={`px-5 py-2 grid items-center gap-1 cursor-pointer hover:bg-gray-100 ${
                    isSelected ? "bg-blue-100" : ""
                  }`}
                >
                  <p className="font-bold">{service.name}</p>
                  <div className="flex text-sm items-center text-gray-500">
                    <p>{service.duration}</p>
                    <LuDot />
                    <p>{service.currency+" "+service.price}</p>
                  </div>
                </div>
              );
            })}
            <div className="px-5 py-3 hover:bg-gray-100 border-t border-gray-300">
              <button
                onClick={openCreateClient}
                className="text-sm flex items-center gap-3 text-primary-800 font-bold"
              >
                <FaPlus />
                New Service
              </button>
            </div>
          </div>
        )}
      </div>
      {selectedServices?.length > 0 && (
        <div className="grid grid-cols-1 gap-2 py-2">
          {selectedServices.map((service) => (
            <div
              key={service.id}
              className="flex justify-between items-center gap-2 px-5 py-3 border border-gray-300 rounded border-s-4 border-s-[#3078ca]"
            >
              <div className="grid items-center gap-1">
                <p className=" font-bold">{service.name}</p>
                <p className="text-sm text-gray-500">{service.duration}</p>
              </div>
              <div className="flex items-center gap-5">
                <p className="text-sm">
                  {service.currency + " " + service.price}{" "}
                </p>
                <button
                  onClick={() => handleRemoveService(service.id)}
                  className="text-gray-600 w-6 h-6 hover:w-6 hover:h-6 hover:bg-gray-300 flex items-center justify-center rounded-full"
                >
                  <RxCross1 size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ServicesInput;

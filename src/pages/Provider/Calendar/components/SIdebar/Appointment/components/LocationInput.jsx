import React, { useEffect, useRef } from "react";
import { RxCross1 } from "react-icons/rx";
import CreateButton from "./CreateButton";
import NewInput from "../../../../../../../components/ui/NewInput";

const locations = [
  {
    id: 1,
    name: "TiNHiH Portal",
    duration: "45 mins",
  },
  {
    id: 2,
    name: "Zoom",
    duration: "30 mins",
  },
];

function LocationInput({
  openLocation,
  setOpenLocation,
  selectedLocation,
  handleLocationSelect,
  handleRemoveLocation,
  openCreateLocation,
}) {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenLocation(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOpenLocation]);

  return (
    <div ref={dropdownRef} className="grid">
      <NewInput
        label={"Location"}
        placeholder={"Enter or choose Location"}
        onClick={() => setOpenLocation(true)}
        isOpen={openLocation}
      />
      <div className="relative">
        {openLocation && (
          <div className="absolute bg-white w-full shadow-2xl border border-gray-100 z-10 py-1 grid grid-cols-1 rounded">
            {locations.map((service) => {
              const isSelected = selectedLocation?.id === service.id; // Only one location is selected
              return (
                <div
                  onClick={() => handleLocationSelect(service)}
                  key={service.id}
                  className={`px-5 py-2 grid items-center gap-1 cursor-pointer hover:bg-gray-100 ${
                    isSelected ? "bg-blue-100" : ""
                  }`}
                >
                  <p className="font-bold">{service.name}</p>
                  <p>{service.duration}</p>
                </div>
              );
            })}
            <CreateButton onClick={openCreateLocation} create={"New Service"} />
          </div>
        )}
      </div>
      {selectedLocation && ( // Check if a location is selected
        <div className="grid grid-cols-1 gap-2 py-2">
          <div className="flex justify-between items-center gap-2 px-5 py-3 border border-gray-300 rounded ">
            <div className="grid items-center gap-1">
              <p className="font-bold">{selectedLocation.name}</p>
              <p className="text-sm text-gray-500">
                {selectedLocation.duration}
              </p>
            </div>

            <button
              onClick={() => handleRemoveLocation()}
              className="text-gray-600 w-6 h-6 hover:w-6 hover:h-6 hover:bg-gray-300 flex items-center justify-center rounded-full"
            >
              <RxCross1 size={12} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LocationInput;

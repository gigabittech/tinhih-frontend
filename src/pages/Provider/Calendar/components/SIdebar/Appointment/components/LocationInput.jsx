import React, { useEffect, useRef } from "react";
import { RxCross1 } from "react-icons/rx";
import CreateButton from "./CreateButton";
import NewInput from "../../../../../../../components/ui/NewInput";
import useLocationStore from "../../../../../../../store/provider/locationStore";

function LocationInput({
  openLocation,
  setOpenLocation,
  selectedLocation,
  handleLocationSelect,
  handleRemoveLocation,
  openCreateLocation,
}) {
  const { locations, fetchLocations } = useLocationStore();
  const dropdownRef = useRef(null);

  console.log(locations);

  useEffect(() => {
    fetchLocations();
  }, [fetchLocations]);

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
            {locations.map((location) => {
              const isSelected = selectedLocation?.id === location.id; // Only one location is selected
              return (
                <div
                  onClick={() => handleLocationSelect(location)}
                  key={location.id}
                  className={`px-5 py-2 grid items-center gap-1 cursor-pointer hover:bg-gray-100 ${
                    isSelected ? "bg-blue-100" : ""
                  }`}
                >
                  <p className="font-bold">{location.display_name}</p>
                  {location?.type?.id === 1 && (
                    <p className="text-xs">
                      {`${location?.address}, ${location?.city}, ${location?.state}, ${location?.country}`}
                    </p>
                  )}
                  {location.type.id === 2 && (
                    <p className=" text-xs">{location.phone}</p>
                  )}
                  {location.type.id > 2 && (
                    <p className=" text-xs">{location.link}</p>
                  )}
                </div>
              );
            })}
            <CreateButton
              onClick={openCreateLocation}
              create={"New Location"}
            />
          </div>
        )}
      </div>
      {selectedLocation && ( // Check if a location is selected
        <div className="grid grid-cols-1 gap-2 py-2">
          <div className="flex justify-between items-center gap-2 px-5 py-3 border border-gray-300 rounded ">
            <div className="grid items-center gap-1">
              <p className="font-bold">{selectedLocation.display_name}</p>
              {selectedLocation.type.id === 1 && (
                <p className="text-xs">
                  {`${selectedLocation?.address}, ${selectedLocation?.city}, ${selectedLocation?.state}, ${selectedLocation?.country}`}
                </p>
              )}
              {selectedLocation.type.id === 2 && (
                <p className=" text-xs">{selectedLocation?.phone}</p>
              )}
              {selectedLocation.type.id > 2 && (
                <p className=" text-xs">{selectedLocation?.link}</p>
              )}
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

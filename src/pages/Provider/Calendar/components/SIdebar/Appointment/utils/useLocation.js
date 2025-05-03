import React, { useState } from "react";

export default function useLocation() {
  const [openLocation, setOpenLocation] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleLocationSelect = (service) => {
    // If the same location is clicked again, unselect it
    if (selectedLocation?.id === service.id) {
      setSelectedLocation(null); // Unselect the location
    } else {
      setSelectedLocation(service); // Otherwise, select the new location
    }
    setOpenLocation(false);
  };

  const handleRemoveLocation = () => {
    setSelectedLocation(null);
  };

  return {
    openLocation,
    setOpenLocation,
    selectedLocation,
    handleLocationSelect,
    handleRemoveLocation,
    setSelectedLocation
  };
}

import React, { useState } from "react";

export default function useServices() {
  const [openServices, setOpenServices] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);

  const handleServicesSelect = (service) => {
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
  return {
    openServices,
    setOpenServices,
    selectedServices,
    handleServicesSelect,
    handleRemoveService,
    setSelectedServices
  };
}

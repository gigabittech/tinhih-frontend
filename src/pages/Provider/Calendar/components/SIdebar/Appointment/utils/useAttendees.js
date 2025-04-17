import React, { useState } from "react";

export default function useAttendees() {
  const [openClients, setOpenClients] = useState(false);
  const [selectedClients, setSelectedClients] = useState([]);

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


  return {
    openClients,
    setOpenClients,
    handleRemoveClient,
    handleClientSelect,
    selectedClients
  };
}

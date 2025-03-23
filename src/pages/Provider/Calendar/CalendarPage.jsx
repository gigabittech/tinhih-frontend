import React, { useState } from "react";
import Button from "../../../components/ui/Button";
import CreateLocation from "./components/SIdebar/Location/CreateLocation";
import CreateService from "./components/SIdebar/Services/CreateService";

function CalendarPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenService, setIsOpenService] = useState(false);

  return (
    <div className="flex gap-3 items-center justify-center h-svh">
      <Button onClick={() => setIsOpen(true)}>Create Locations</Button>
      <Button onClick={() => setIsOpenService(true)}>Create Services</Button>
      <CreateLocation isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <CreateService
        isOpen={isOpenService}
        onClose={() => setIsOpenService(false)}
      />
    </div>
  );
}

export default CalendarPage;

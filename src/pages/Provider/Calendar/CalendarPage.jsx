import React, { useState } from "react";
import Button from "../../../components/ui/Button";
import CreateLocation from "./components/SIdebar/Location/CreateLocation";

function CalendarPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center justify-center h-svh">
      <Button onClick={() => setIsOpen(true)}>Create Locations</Button>
      <CreateLocation isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}

export default CalendarPage;

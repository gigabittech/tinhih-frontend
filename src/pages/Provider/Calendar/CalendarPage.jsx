import React, { useState } from "react";
import CalendarHeader from "./components/Header/CalendarHeader";
import Button from "../../../components/ui/Button";
import CreateNewClient from "./components/SIdebar/NewClient/CreateNewClient";
import Sidebar from "./components/SIdebar/Sidebar";

function CalendarPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col">
      <CalendarHeader />

      <Button onClick={() => setIsOpen(true)}>Add Client</Button>
      <CreateNewClient isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <Sidebar />
    </div>
  );
}

export default CalendarPage;

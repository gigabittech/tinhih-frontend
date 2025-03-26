import React, { useState } from "react";
import AppointmentInput from "./components/AppointmentInput";
import Button from "../../../../../../components/ui/Button";
import { Plus } from "lucide-react";
import CreateNewClient from "./../NewClient/CreateNewClient";
import useCalendarPage from "../../../../../../FormSchema/Provider/calendarPage";

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
  {
    id: 3,
    name: "Charlie Brown",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: 4,
    name: "Diana Prince",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
  },
];

function CreateAppointment() {
  const { openCreateClient, openCreateService, openCreateLocation } =
    useCalendarPage();
  const [selectedClients, setSelectedClients] = useState([]);

  return (
    <div className="flex flex-col gap-3">
      <AppointmentInput
        label="Attendees"
        options={clients}
        selectedValues={selectedClients}
        onChange={setSelectedClients}
        labelKey="name"
        valueKey="id"
        NewButtonComponent={() => (
          <Button
            onClick={openCreateClient}
            variant="ghost"
            className="w-full justify-start font-bold text-primary-800 rounded-none"
          >
            <Plus />
            <span>New Client</span>
          </Button>
        )}
      />

      <AppointmentInput
        label="Services"
        options={clients}
        selectedValues={selectedClients}
        onChange={setSelectedClients}
        labelKey="name"
        valueKey="id"
        NewButtonComponent={() => (
          <Button
            onClick={openCreateService}
            variant="ghost"
            className="w-full justify-start font-bold text-primary-800 rounded-none"
          >
            <Plus />
            <span>New Services</span>
          </Button>
        )}
      />

      <AppointmentInput
        label="Locaiton"
        options={clients}
        selectedValues={selectedClients}
        onChange={setSelectedClients}
        labelKey="name"
        valueKey="id"
        NewButtonComponent={() => (
          <Button
            onClick={openCreateLocation}
            variant="ghost"
            className="w-full justify-start font-bold text-primary-800 rounded-none"
          >
            <Plus />
            <span>New Location</span>
          </Button>
        )}
      />
    </div>
  );
}

export default CreateAppointment;

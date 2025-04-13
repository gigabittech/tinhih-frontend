import React, { useState, useRef } from "react";
import AppointmentInput from "./components/AppointmentInput";
import Button from "../../../../../../components/ui/Button";
import { Plus, X } from "lucide-react";
import useCalendarPage from "../../../../../../FormSchema/Provider/calendarPage";

// Sample data
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
];

const services = [
  { id: 1, name: "Haircut" },
  { id: 2, name: "Coloring" },
];

const teamMembers = [
  { id: 1, name: "Sarah Miller", role: "Stylist" },
  { id: 2, name: "Mike Chen", role: "Barber" },
];

const locations = [
  { id: 1, name: "Main Salon" },
  { id: 2, name: "Downtown Studio" },
];

function SelectedItems({ items, options, labelKey, onRemove }) {
  return (
    <div className="grid grid-cols-2 gap-2 mt-2">
      {items.map((id) => {
        const item = options.find((opt) => opt.id === id);
        return (
          <div
            key={id}
            className="flex items-center justify-between bg-gray-100 px-4 py-2 text-sm"
          >
            <span>{item?.[labelKey]}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(id);
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}

function CreateAppointment({ onClose }) {
  const { openCreateClient, openCreateService, openCreateLocation } =
    useCalendarPage();
  const [selectedClients, setSelectedClients] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedTeamMember, setSelectedTeamMember] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);

  const clientDropdownRef = useRef(null);
  const serviceDropdownRef = useRef(null);
  const teamDropdownRef = useRef(null);
  const locationDropdownRef = useRef(null);

  const handleClientSelect = (ids) => {
    setSelectedClients(ids);
    clientDropdownRef.current?.close();
  };

  const handleServiceSelect = (ids) => {
    setSelectedServices(ids);
    serviceDropdownRef.current?.close();
  };

  const handleTeamMemberSelect = (ids) => {
    setSelectedTeamMember(ids);
    teamDropdownRef.current?.close();
  };

  const handleLocationSelect = (ids) => {
    setSelectedLocation(ids);
    locationDropdownRef.current?.close();
  };

  const handleRemoveClient = (id) => {
    setSelectedClients(selectedClients.filter((clientId) => clientId !== id));
  };

  const handleRemoveService = (id) => {
    setSelectedServices(
      selectedServices.filter((serviceId) => serviceId !== id)
    );
  };

  const handleRemoveTeamMember = (id) => {
    setSelectedTeamMember(
      selectedTeamMember.filter((memberId) => memberId !== id)
    );
  };

  const handleRemoveLocation = (id) => {
    setSelectedLocation(
      selectedLocation.filter((locationId) => locationId !== id)
    );
  };

  return (
    <div className="grid grid-cols-1">
      <div className="px-7 py-5 grid grid-cols-1 gap-4">
        <h2 className="font-bold text-lg">Appointment details</h2>

        {/* Clients */}
        <div>
          <AppointmentInput
            ref={clientDropdownRef}
            label="Attendees"
            options={clients}
            selectedValues={selectedClients}
            onChange={handleClientSelect}
            labelKey="name"
            valueKey="id"
            NewButtonComponent={() => (
              <Button
                onClick={openCreateClient}
                variant="ghost"
                className="w-full justify-start font-bold text-primary-800 rounded-none"
              >
                <Plus size={16} />
                <span>New Client</span>
              </Button>
            )}
          />
          {selectedClients.length > 0 && (
            <SelectedItems
              items={selectedClients}
              options={clients}
              labelKey="name"
              onRemove={handleRemoveClient}
            />
          )}
        </div>

        {/* Services */}
        <div>
          <AppointmentInput
            ref={serviceDropdownRef}
            label="Services"
            options={services}
            selectedValues={selectedServices}
            onChange={handleServiceSelect}
            labelKey="name"
            valueKey="id"
            NewButtonComponent={() => (
              <Button
                onClick={openCreateService}
                variant="ghost"
                className="w-full justify-start font-bold text-primary-800 rounded-none"
              >
                <Plus size={16} />
                <span>New Service</span>
              </Button>
            )}
          />
          {selectedServices.length > 0 && (
            <SelectedItems
              items={selectedServices}
              options={services}
              labelKey="name"
              onRemove={handleRemoveService}
            />
          )}
        </div>

        {/* Team Member */}
        <div>
          <AppointmentInput
            ref={teamDropdownRef}
            label="Team member"
            options={teamMembers}
            selectedValues={selectedTeamMember}
            onChange={handleTeamMemberSelect}
            labelKey="name"
            valueKey="id"
            NewButtonComponent={() => (
              <Button
                onClick={openCreateService}
                variant="ghost"
                className="w-full justify-start font-bold text-primary-800 rounded-none"
              >
                <Plus size={16} />
                <span>Add Team Member</span>
              </Button>
            )}
          />
          {selectedTeamMember.length > 0 && (
            <SelectedItems
              items={selectedTeamMember}
              options={teamMembers}
              labelKey="name"
              onRemove={handleRemoveTeamMember}
            />
          )}
        </div>

        {/* Location */}
        <div>
          <AppointmentInput
            ref={locationDropdownRef}
            label="Location"
            options={locations}
            selectedValues={selectedLocation}
            onChange={handleLocationSelect}
            labelKey="name"
            valueKey="id"
            NewButtonComponent={() => (
              <Button
                onClick={openCreateLocation}
                variant="ghost"
                className="w-full justify-start font-bold text-primary-800 rounded-none"
              >
                <Plus size={16} />
                <span>New Location</span>
              </Button>
            )}
          />
          {selectedLocation.length > 0 && (
            <SelectedItems
              items={selectedLocation}
              options={locations}
              labelKey="name"
              onRemove={handleRemoveLocation}
            />
          )}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 bg-white">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onClose}
            className="border border-gray-300 py-2 rounded font-semibold hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            className="bg-primary-600 text-white py-2 rounded font-semibold hover:bg-primary-700 transition-colors"
            disabled={!selectedClients.length || !selectedServices.length}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateAppointment;

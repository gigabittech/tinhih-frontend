import React, { useState, useRef } from "react";
import AppointmentInput from "./components/AppointmentInput";
import Button from "../../../../../../components/ui/Button";
import { Plus, X } from "lucide-react";
import useCalendarPage from "../../../../../../FormSchema/Provider/calendarPage";
import TeamDropdown from "../TeamDropdown";
import HeadCalendar from "../HeadCalendar";
import AttendeesInput from "./components/AttendeesInput";
import ServicesInput from "./components/ServicesInput";

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
  const { openCreateService, openCreateLocation } = useCalendarPage();
  const [selectedTeamMember, setSelectedTeamMember] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);

  const teamDropdownRef = useRef(null);
  const locationDropdownRef = useRef(null);


  const handleTeamMemberSelect = (ids) => {
    setSelectedTeamMember(ids);
    teamDropdownRef.current?.close();
  };

  const handleLocationSelect = (ids) => {
    setSelectedLocation(ids);
    locationDropdownRef.current?.close();
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
    <div className="relative h-screen flex flex-col">
      <div className="py-4 px-5 border-b border-gray-200 bg-white">
        <div className="flex justify-between items-center gap-3">
          <button className="border border-gray-300 py-2 rounded font-semibold hover:bg-gray-50 transition-colors ">
            <HeadCalendar />
          </button>
          <TeamDropdown />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto pb-20">
        <div className="px-7 py-5 grid grid-cols-1 gap-4">
          <h2 className="font-bold text-lg">Appointment details</h2>
          {/* Clients */}

          <AttendeesInput />

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

          {/* Services */}
          <ServicesInput />

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
      </div>
      <div className="fixed bottom-0 right-0 left-0 p-6 border-t mt-20 border-gray-200 bg-white">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onClose}
            className="border border-gray-300 py-2 rounded font-semibold hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button className="bg-primary-600 text-white py-2 rounded font-semibold hover:bg-primary-700 transition-colors">
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateAppointment;

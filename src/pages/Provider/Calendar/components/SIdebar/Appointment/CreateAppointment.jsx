import React from "react";
import useCalendarPage from "../../../../../../FormSchema/Provider/calendarPage";
import TeamDropdown from "../TeamDropdown";
import HeadCalendar from "../HeadCalendar";
import AttendeesInput from "./components/AttendeesInput";
import ServicesInput from "./components/ServicesInput";
import useAttendees from "./utils/useAttendees";
import useServices from "./utils/useServices";
import TeamMembersInput from "./components/TeamMembersInput";
import useTeamMembers from "./utils/useTeamMembers";
import useLocation from "./utils/useLocation";
import LocationInput from "./components/LocationInput";


function CreateAppointment({ onClose }) {
  const {
    openClients,
    handleRemoveClient,
    handleClientSelect,
    setOpenClients,
    selectedClients,
  } = useAttendees();

  const {
    openServices,
    setOpenServices,
    selectedServices,
    handleServicesSelect,
    handleRemoveService,
  } = useServices();

  const {
    openLocation,
    setOpenLocation,
    selectedLocation,
    handleLocationSelect,
    handleRemoveLocation,
  } = useLocation();

  const {
    openTeamMembers,
    setOpenTeamMembers,
    selectedTeamMembers,
    handleTeamMemberSelect,
    handleRemoveTeamMember,
  } = useTeamMembers();

  const {
    openCreateClient,
    openCreateService,
    openCreateLocation,
    openCreateTeamMember,
  } = useCalendarPage();

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

          <AttendeesInput
            selectedClients={selectedClients}
            openClients={openClients}
            setOpenClients={setOpenClients}
            handleClientSelect={handleClientSelect}
            handleRemoveClient={handleRemoveClient}
            openCreateClient={openCreateClient}
          />

          {/* Team Member */}
          <TeamMembersInput
            selectedTeamMembers={selectedTeamMembers}
            openTeamMembers={openTeamMembers}
            setOpenTeamMembers={setOpenTeamMembers}
            handleTeamMemberSelect={handleTeamMemberSelect}
            handleRemoveTeamMember={handleRemoveTeamMember}
            openCreateTeamMember={openCreateTeamMember}
          />

          {/* Services */}
          <ServicesInput
            selectedServices={selectedServices}
            openServices={openServices}
            setOpenServices={setOpenServices}
            handleServicesSelect={handleServicesSelect}
            handleRemoveService={handleRemoveService}
            openCreateService={openCreateService}
          />

          {/* Location */}
          <LocationInput
            selectedLocation={selectedLocation}
            openLocation={openLocation}
            setOpenLocation={setOpenLocation}
            handleLocationSelect={handleLocationSelect}
            handleRemoveLocation={handleRemoveLocation}
            openCreateLocation={openCreateLocation}
          />
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

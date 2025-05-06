import React, { useState } from "react";
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
import { TiPlus } from "react-icons/ti";
import axiosInstance from "../../../../../../lib/axiosInstanceWithToken";
import { Notify } from "../../../../../../components/ui/Toaster";
import useUserStore from "../../../../../../store/global/userStore";
import formatTo24Hour from "../../../../../../hook/timeFormatTo24Hour";
import useAppointmentStore from "../../../../../../store/provider/appointmentsStore";
import { useCalendarStore } from "../../../../../../FormSchema/Provider/calendarStore";

function CreateAppointment({ onClose }) {
  const [description, setDescription] = useState("");
  const [descriptionLength, setDescriptionLength] = useState(0);
  const [openDescription, setOpenDescription] = useState(false);
  const selectedDate = useCalendarStore((state) => state.selectedDate);
  const setSelectedDate = useCalendarStore((state) => state.setSelectedDate);
  const {
    openClients,
    handleRemoveClient,
    handleClientSelect,
    setOpenClients,
    selectedClients,
    setSelectedClients,
  } = useAttendees();

  const {
    openServices,
    setOpenServices,
    selectedServices,
    handleServicesSelect,
    handleRemoveService,
    setSelectedServices,
  } = useServices();

  const {
    openLocation,
    setOpenLocation,
    selectedLocation,
    handleLocationSelect,
    handleRemoveLocation,
    setSelectedLocation,
  } = useLocation();

  const {
    teamMembers,
    openTeamMembers,
    setOpenTeamMembers,
    selectedTeamMembers,
    setSelectedTeamMembers,
    handleTeamMemberSelect,
    handleRemoveTeamMember,
  } = useTeamMembers();

  const {
    openCreateClient,
    openCreateService,
    openCreateLocation,
    openCreateTeamMember,
  } = useCalendarPage();

  const { user } = useUserStore();
  const { fetchAppointments } = useAppointmentStore();

  const [startTime, setStartTime] = useState("09:30 PM");
  const [endTime, setEndTime] = useState("10:30 PM");
  const [repeatOption, setRepeatOption] = useState("Doesn't repeat");

  const isFormValid = () => {
    return (
      selectedDate &&
      startTime &&
      endTime &&
      selectedClients.length > 0 &&
      selectedServices.length > 0 &&
      selectedLocation &&
      selectedTeamMembers.length > 0
    );
  };

  const resetForm = () => {
    setDescription("");
    setDescriptionLength(0);
    setOpenDescription(false);

    setSelectedClients([]);
    setOpenClients(false);

    setSelectedServices([]);
    setOpenServices(false);

    setSelectedLocation(null);
    setOpenLocation(false);

    setSelectedTeamMembers([
      {
        id: user?.id,
        first_name: user?.first_name,
        last_name: user?.last_name,
      },
    ]);
    setOpenTeamMembers(false);

    setSelectedDate(new Date());
    setStartTime("09:30 PM");
    setEndTime("10:30 PM");
    setRepeatOption("Doesn't repeat");
  };

  const handleDescription = (e) => {
    const value = e.target.value;
    setDescription(value);
    setDescriptionLength(value.length);
  };

  const handleCreateAppointment = async () => {
    const payload = {
      workspace_id: user.currentWorkspace.id,
      date: selectedDate?.toISOString()?.split("T")[0],
      time: formatTo24Hour(startTime),
      attendees: selectedClients.map((c) => c.id),
      services: selectedServices.map((s) => s.id),
      locations: [selectedLocation?.id],
      description: description,
    };

    try {
      const response = await axiosInstance.post("/appointments", payload);
      console.log("Appointment created:", response.data);
      if (response.status === 201) {
        Notify("Appointment created");
        resetForm();
        onClose();
        fetchAppointments();
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
    }
  };

  return (
    <div className="relative h-screen flex flex-col">
      <div className="py-4 px-5 border-b border-gray-200 bg-white">
        <div className="flex justify-between items-center gap-3">
          <button className="border border-gray-300 py-2 rounded font-semibold hover:bg-gray-50 transition-colors ">
            <HeadCalendar
              startTime={startTime}
              setStartTime={setStartTime}
              endTime={endTime}
              setEndTime={setEndTime}
              repeatOption={repeatOption}
              setRepeatOption={setRepeatOption}
            />
          </button>
          <TeamDropdown
            teamMembers={teamMembers}
            selectedMembers={selectedTeamMembers}
            setSelectedMembers={setSelectedTeamMembers}
          />
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
            teamMembers={teamMembers}
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
          {!openDescription ? (
            <div
              onClick={() => setOpenDescription(true)}
              className=" font-semibold cursor-pointer hover:bg-gray-100 p-1 flex items-center gap-1"
            >
              <TiPlus />
              Add description
            </div>
          ) : (
            <div>
              <label className=" text-sm">Description</label>
              <textarea
                onChange={handleDescription}
                name="description"
                rows={5}
                cols={5}
                maxLength={1000}
                className=" w-full border outline-none  rounded border-gray-400 px-2 py-1"
              ></textarea>
              <label className=" text-sm">{descriptionLength}/1000</label>
            </div>
          )}
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
          <button
            onClick={handleCreateAppointment}
            disabled={!isFormValid()}
            className={`py-2 rounded font-semibold transition-colors ${
              isFormValid()
                ? "bg-primary-600 text-white hover:bg-primary-700"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateAppointment;

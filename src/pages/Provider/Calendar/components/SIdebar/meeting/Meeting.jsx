import React, { useState } from "react";
import HeadCalendar from "../HeadCalendar";
import TeamDropdown from "../TeamDropdown";
import useTeamMembers from "../Appointment/utils/useTeamMembers";
import TeamMembersInput from "../Appointment/components/TeamMembersInput";
import useCalendarPage from "../../../../../../FormSchema/Provider/calendarPage";
import useLocation from "../Appointment/utils/useLocation";
import LocationInput from "../Appointment/components/LocationInput";

function Meeting({ onClose }) {
  const [description, setDescription] = useState("");
  const [descriptionLength, setDescriptionLength] = useState(0);
  const {
    teamMembers,
    openTeamMembers,
    selectedTeamMembers,
    setOpenTeamMembers,
    setSelectedTeamMembers,
    handleTeamMemberSelect,
    handleRemoveTeamMember,
  } = useTeamMembers();

  const {
    openLocation,
    setOpenLocation,
    selectedLocation,
    handleLocationSelect,
    handleRemoveLocation,
    setSelectedLocation,
  } = useLocation();

  const { openCreateLocation, openCreateTeamMember } = useCalendarPage();

  const handleDescription = (e) => {
    const value = e.target.value;
    setDescription(value);
    setDescriptionLength(value.length);
  };

  const [startTime, setStartTime] = useState("09:30 PM");
  const [endTime, setEndTime] = useState("10:30 PM");
  const [repeatOption, setRepeatOption] = useState("Doesn't repeat");
  return (
    <div className="relative h-screen flex flex-col">
      <header className="py-4 px-5 border-b border-gray-200 bg-white">
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
      </header>
      <div className="flex-1 overflow-y-auto pb-20">
        <div className="px-7 py-5 grid grid-cols-1 gap-4">
          <h2 className="font-bold text-lg">Meeting details</h2>
          <div>
            <label htmlFor="">Event name</label>
            <input
              type="text"
              defaultValue={"Meeting"}
              className="border border-gray-400 w-full rounded px-3 py-1 outline-none focus:border-primary-500"
            />
          </div>
          {/* Team Member */}
          <TeamMembersInput
            teamMembers={teamMembers}
            selectedTeamMembers={selectedTeamMembers}
            setSelectedTeamMembers={setSelectedTeamMembers}
            openTeamMembers={openTeamMembers}
            setOpenTeamMembers={setOpenTeamMembers}
            handleTeamMemberSelect={handleTeamMemberSelect}
            handleRemoveTeamMember={handleRemoveTeamMember}
            openCreateTeamMember={openCreateTeamMember}
          />
          <div>
            <label className=" text-sm">Description</label>
            <textarea
              onChange={handleDescription}
              name="description"
              rows={5}
              cols={5}
              maxLength={1000}
              className=" w-full border outline-none  rounded border-gray-400 px-2 py-1 focus:border-primary-500"
            ></textarea>
            <label className=" text-sm">{descriptionLength}/1000</label>
          </div>
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
          <button
            /*  onClick={handleCreateAppointment}
            disabled={!isFormValid()} */
            className={`py-2 rounded font-semibold transition-colors ${
              /*  isFormValid()
                ? "bg-primary-600 text-white hover:bg-primary-700" */
              /* : */ "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default Meeting;

import React, { useEffect, useRef, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import CreateButton from "./CreateButton";
import NewInput from "../../../../../../../components/ui/NewInput";
import useUserStore from "../../../../../../../store/global/userStore";
import useTeamMemberStore from "../../../../../../../store/provider/teamMemberStore";
import Avatar from "../../../../../../../components/ui/Avatar";

function TeamMembersInput({
  openTeamMembers,
  setOpenTeamMembers,
  selectedTeamMembers,
  handleTeamMemberSelect,
  handleRemoveTeamMember,
  openCreateTeamMember,
}) {
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const dropdownRef = useRef(null);
  const { user } = useUserStore();
  const { members, fetchMembers, loading } = useTeamMemberStore();

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const teamMembers = [
    { id: user?.id, first_name: user?.first_name, last_name: user?.last_name },
    ...(members || []),
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenTeamMembers(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOpenTeamMembers]);

  if (loading) return <p></p>;

  return (
    <div ref={dropdownRef} className="grid">
      <NewInput
        label={"Team member"}
        placeholder={"Choose team members"}
        onClick={() => setOpenTeamMembers(true)}
        isOpen={openTeamMembers}
      />
      <div className=" relative">
        {openTeamMembers && (
          <div className="absolute bg-white w-full shadow-2xl border border-gray-100 z-10 py-1 grid grid-cols-1 rounded">
            <p className="px-5 font-bold my-3">All team members</p>
            {teamMembers.map((teamMembers) => {
              const isSelected = selectedTeamMembers.some(
                (c) => c.id === teamMembers.id
              );
              return (
                <div
                  onClick={() => handleTeamMemberSelect(teamMembers)}
                  key={teamMembers.id}
                  className={`px-5 py-2 flex items-center gap-5 cursor-pointer hover:bg-gray-100 ${
                    isSelected ? "bg-blue-100" : ""
                  }`}
                >
                  {/*  <img
                    src={teamMembers.avatar}
                    alt={teamMembers.first_name + " " + teamMembers.last_name}
                    className="w-8 h-8 rounded-full object-cover"
                  /> */}
                  <Avatar
                    name={
                      teamMembers?.first_name + " " + teamMembers?.last_name
                    }
                  />
                  <p className="font-medium">
                    {teamMembers?.first_name + " " + teamMembers?.last_name}
                  </p>
                </div>
              );
            })}
            <CreateButton
              onClick={openCreateTeamMember}
              create={"New team member"}
            />
          </div>
        )}
      </div>
      {selectedTeamMembers?.length > 0 && (
        <div className="grid grid-cols-2 gap-2 py-2">
          {selectedTeamMembers.map((teamMembers) => (
            <div
              onMouseEnter={() => setShowDeleteButton(true)}
              onMouseLeave={() => setShowDeleteButton(false)}
              key={teamMembers.id}
              className="flex justify-between items-center gap-2 hover:bg-gray-200 px-3 py-2"
            >
              <div className="flex items-center gap-5">
                <Avatar
                  name={teamMembers?.first_name + " " + teamMembers?.last_name}
                />
                <span>
                  {teamMembers?.first_name + " " + teamMembers?.last_name}
                </span>
              </div>
              {showDeleteButton && (
                <button
                  onClick={() => handleRemoveTeamMember(teamMembers.id)}
                  className="text-gray-600 w-6 h-6 hover:w-6 hover:h-6 hover:bg-gray-300 flex items-center justify-center rounded-full"
                >
                  <RxCross1 size={12} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TeamMembersInput;

import React, { useEffect, useRef, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import CreateButton from "./CreateButton";
import NewInput from "../../../../../../../components/ui/NewInput";
import Avatar from "../../../../../../../components/ui/Avatar";

function TeamMembersInput({
  teamMembers,
  openTeamMembers,
  setOpenTeamMembers,
  selectedTeamMembers,
  setSelectedTeamMembers,
  handleTeamMemberSelect,
  handleRemoveTeamMember,
  openCreateTeamMember,
}) {
  const [showDeleteButton, setShowDeleteButton] = useState(0);
  const dropdownRef = useRef(null);

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
            <div
              onClick={() => handleTeamMemberSelect("all")}
              className={`px-5 py-2 flex items-center gap-5 cursor-pointer hover:bg-gray-100 ${
                selectedTeamMembers.length === teamMembers.length
                  ? "bg-blue-100"
                  : ""
              }`}
            >
              <Avatar name="All" />
              <p className="font-medium">All team members</p>
            </div>
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
          {selectedTeamMembers.length === teamMembers.length ? (
            <div
              onMouseEnter={() => setShowDeleteButton("all")}
              onMouseLeave={() => setShowDeleteButton(0)}
              className="flex justify-between items-center gap-2 hover:bg-gray-200 px-3 py-2"
            >
              <div className="flex items-center gap-5">
                <Avatar name="All" />
                <span>All team members</span>
              </div>
              {showDeleteButton === "all" && (
                <button
                  onClick={() => setSelectedTeamMembers([])}
                  className="text-gray-600 w-6 h-6 hover:w-6 hover:h-6 hover:bg-gray-300 flex items-center justify-center rounded-full"
                >
                  <RxCross1 size={12} />
                </button>
              )}
            </div>
          ) : (
            selectedTeamMembers.map((teamMember) => (
              <div
                onMouseEnter={() => setShowDeleteButton(teamMember.id)}
                onMouseLeave={() => setShowDeleteButton(0)}
                key={teamMember.id}
                className="flex justify-between items-center gap-2 hover:bg-gray-200 px-3 py-2"
              >
                <div className="flex items-center gap-5">
                  <Avatar
                    name={teamMember?.first_name + " " + teamMember?.last_name}
                  />
                  <span>
                    {(
                      teamMember?.first_name +
                      " " +
                      teamMember?.last_name
                    ).slice(0, 15)}
                    {(teamMember?.first_name + " " + teamMember?.last_name)
                      .length > 15 && "...."}
                  </span>
                </div>
                {showDeleteButton === teamMember.id && (
                  <button
                    onClick={() => handleRemoveTeamMember(teamMember.id)}
                    className="text-gray-600 w-6 h-6 hover:w-6 hover:h-6 hover:bg-gray-300 flex items-center justify-center rounded-full"
                  >
                    <RxCross1 size={12} />
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default TeamMembersInput;

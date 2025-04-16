import React, { useState } from "react";

export default function useTeamMembers() {
  const [openTeamMembers, setOpenTeamMembers] = useState(false);
  const [selectedTeamMembers, setSelectedTeamMembers] = useState([]);

  const handleTeamMemberSelect = (teamMember) => {
    const alreadySelected = selectedTeamMembers.some((c) => c.id === teamMember.id);
    if (alreadySelected) {
      setSelectedTeamMembers(selectedTeamMembers.filter((c) => c.id !== teamMember.id));
    } else {
      setSelectedTeamMembers([...selectedTeamMembers, teamMember]);
    }
    setOpenTeamMembers(false);
  };

  const handleRemoveTeamMember = (id) => {
    setSelectedTeamMembers(
      selectedTeamMembers.filter((teamMember) => teamMember.id !== id)
    );
  };
  return {
    openTeamMembers,
    setOpenTeamMembers,
    selectedTeamMembers,
    handleTeamMemberSelect,
    handleRemoveTeamMember,
  };
}

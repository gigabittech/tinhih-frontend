import React, { useState } from "react";
import useUserStore from "../../../../../../../store/global/userStore";

export default function useTeamMembers() {
  const [openTeamMembers, setOpenTeamMembers] = useState(false);
  const { user } = useUserStore();
  const [selectedTeamMembers, setSelectedTeamMembers] = useState([
    { id: user?.id, name: user?.full_name },
  ]);

  const handleTeamMemberSelect = (teamMember) => {
    const alreadySelected = selectedTeamMembers.some(
      (c) => c.id === teamMember.id
    );
    if (alreadySelected) {
      setSelectedTeamMembers(
        selectedTeamMembers.filter((c) => c.id !== teamMember.id)
      );
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

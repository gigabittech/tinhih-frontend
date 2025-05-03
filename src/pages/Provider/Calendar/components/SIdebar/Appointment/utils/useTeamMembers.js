import React, { useEffect, useState } from "react";
import useUserStore from "../../../../../../../store/global/userStore";
import useTeamMemberStore from "../../../../../../../store/provider/teamMemberStore";

export default function useTeamMembers() {
  const [openTeamMembers, setOpenTeamMembers] = useState(false);
  const { user } = useUserStore();
  const [selectedTeamMembers, setSelectedTeamMembers] = useState([
    { id: user?.id, first_name: user?.first_name, last_name: user?.last_name },
  ]);

  const { members, fetchMembers } = useTeamMemberStore();

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const teamMembers = [
    { id: user?.id, first_name: user?.first_name, last_name: user?.last_name },
    ...(members || []),
  ];

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
    teamMembers,
    openTeamMembers,
    setOpenTeamMembers,
    selectedTeamMembers,
    setSelectedTeamMembers,
    handleTeamMemberSelect,
    handleRemoveTeamMember,
  };
}

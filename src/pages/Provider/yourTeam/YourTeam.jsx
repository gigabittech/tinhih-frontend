import { useEffect, useState } from "react";
import { PiBagSimpleFill } from "react-icons/pi";
import CreateButton from "../Calendar/components/SIdebar/Appointment/components/CreateButton";
import CreateNewTeamMember from "../Calendar/components/SIdebar/teamMember.jsx/CreateNewTeamMember";
import useTeamMemberStore from "../../../store/provider/teamMemberStore";

function YourTeam() {
  const { members, loading, fetchMembers } = useTeamMemberStore();

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div>
      <header className=" border-b border-[#dedede] px-10 pb-5">
        <div className="flex justify-between items-center gap-3 text-2xl">
          <div className="flex items-center gap-3">
            <span className=" p-2 bg-amber-100 text-[#6e6e6e]">
              {" "}
              <PiBagSimpleFill />
            </span>
            <p className=" font-bold">Your team</p>
          </div>
          <CreateButton onClick={openModal} create={"New team member"} />
        </div>
      </header>
      <div>
        {/* Header */}
        <div className="flex items-center gap-10 py-5 px-10">
          <h2 className="text-lg font-semibold whitespace-nowrap">
            {members.length} Team members
          </h2>
          <input
            type="text"
            placeholder="Search team member"
            className="w-96 border rounded px-3 py-2"
          />
        </div>

        {/* Table */}
        <div className="overflow-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className=" ps-10 py-5">
                  <input type="checkbox" />
                </th>
                <th className="p-2">Name</th>
                <th className="p-2">Phone number</th>
                <th className="p-2">Email</th>
                <th className="p-2">Job title</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td className="px-10 py-5" colSpan={7}>
                    Loading...
                  </td>
                </tr>
              ) : members.length === 0 ? (
                <tr>
                  <td className="px-10 py-5" colSpan={7}>
                    No team members found.
                  </td>
                </tr>
              ) : (
                members.map((client, index) => (
                  <tr key={index} className="border-t">
                    <td className="ps-10">
                      <input type="checkbox" />
                    </td>
                    <td className="p-2 text-purple-600">
                      {client.first_name + " " + client.last_name}
                    </td>
                    <td className="p-2">{client.phone_number}</td>
                    <td className="p-2">{client.email}</td>
                    <td className="p-2">{client.job_title}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {showModal && (
          <CreateNewTeamMember isOpen={showModal} onClose={handleClose} />
        )}
      </div>
    </div>
  );
}

export default YourTeam;

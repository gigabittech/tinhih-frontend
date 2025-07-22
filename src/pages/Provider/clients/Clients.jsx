import React, { useEffect, useState } from "react";
import { FaUserGroup } from "react-icons/fa6";
import useClientStore from "../../../store/provider/clientStore";
import { Plus } from "lucide-react";
import CreateNewClient from "./CreateNewClient";

function Clients() {
  const { clients, fetchClients, loading } = useClientStore();
  const [showCreateClientComponentForm, setShowCreateClientComponentForm] =
    useState(false);

  const [search, SetSearch] = useState("");

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const showCreateClientComponent = () => {
    setShowCreateClientComponentForm(true);
    // console.log("clieked...");
  };

  const handleClose = () => {
    setShowCreateClientComponentForm(false);
  };
  // useEffect(() => {
  //   const filtered = clients.filter((client) =>
  //     `${client.name} ${client.id} ${client.phone}`
  //       .toLowerCase()
  //       .includes(search.toLowerCase())
  //   );
  //   setClients(filtered);
  // }, [search, clients]);

  return (
    <div>
      <header className="border-b border-[#dedede] px-10 pb-5">
        <div className="flex justify-between items-center gap-3">
          <div class="flex items-center gap-3 text-2xl">
            <span className="p-2 bg-amber-100 text-[#6e6e6e]">
              <FaUserGroup />
            </span>
            <p className="font-bold">Clients</p>
          </div>
          <button
            onClick={showCreateClientComponent}
            className=" bg-primary-700 font-semibold text-white px-3 py-1 rounded hover:bg-primary-800 flex items-center gap-2"
          >
            <Plus size={18} /> New Client
          </button>
        </div>
      </header>

      <div>
        {/* Header */}
        <div className="flex items-center gap-10 py-5 px-10">
          <h2 className="text-lg font-semibold whitespace-nowrap">
            {clients.length} Clients
          </h2>
          <input
            type="text"
            placeholder="Search by client name, client ID or phone number"
            className="w-96 border rounded px-3 py-2"
            value={search}
            onChange={(e) => SetSearch(e.target.value)}
          />
          <div className="flex space-x-2">
            <button className="text-sm border rounded-full px-3 py-1 hover:bg-gray-100">
              Tags
            </button>
            <button className="text-sm border rounded-full px-3 py-1 hover:bg-gray-100">
              Team
            </button>
            <button className="text-sm border rounded-full px-3 py-1 hover:bg-gray-100">
              Status
            </button>
            <button className="text-sm text-purple-600 hover:underline">
              Reset
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="ps-10 py-5">
                  <input type="checkbox" />
                </th>
                <th className="p-2">Client name</th>
                <th className="p-2">Phone number</th>
                <th className="p-2">Email</th>
                <th className="p-2">Tags</th>
                <th className="p-2">Status</th>
                <th className="p-2">Assigned Team</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td className="px-10 py-5" colSpan={7}>
                    Loading...
                  </td>
                </tr>
              ) : clients.length === 0 ? (
                <tr>
                  <td className="px-10 py-5" colSpan={7}>
                    No clients found.
                  </td>
                </tr>
              ) : (
                clients.map((client, index) => (
                  <tr key={index} className="border-t border-[#d7d7d7] hover:bg-[#f2f2f2]">
                    <td className="ps-10 py-3">
                      <input type="checkbox" />
                    </td>
                    <td className="p-2 text-primary-800 font-bold">
                      {client.first_name + " " + client.last_name}
                      {client.label && (
                        <span className="ml-2 text-xs bg-gray-200 px-2 py-0.5 rounded">
                          {client.label}
                        </span>
                      )}
                    </td>
                    <td className="p-2">{client.phone}</td>
                    <td className="p-2">{client.email}</td>
                    <td className="p-2 flex flex-wrap gap-1">
                      {client.tags?.map((tag, i) => (
                        <span
                          key={i}
                          className="text-xs bg-blue-100 px-2 py-0.5 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </td>
                    <td className="p-2">
                      <span
                        className={`text-xs px-2 py-0.5 rounded ${
                          client.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {client.status}
                      </span>
                    </td>
                    <td className="p-2 flex items-center space-x-1">
                      {client.team?.map((member, i) =>
                        i < 2 ? (
                          <span
                            key={i}
                            className="text-xs bg-gray-200 px-2 py-0.5 rounded-full"
                          >
                            {member.initials}
                          </span>
                        ) : null
                      )}
                      {client.team?.length > 2 && (
                        <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full">
                          +{client.team.length - 2}
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {showCreateClientComponentForm && (
          <CreateNewClient isOpen={true} onClose={handleClose} />
        )}
      </div>
    </div>
  );
}

export default Clients;

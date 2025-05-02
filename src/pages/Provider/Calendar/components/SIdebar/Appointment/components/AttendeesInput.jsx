import React, { useEffect, useRef, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import CreateButton from "./CreateButton";
import NewInput from "../../../../../../../components/ui/NewInput";
import Avatar from "../../../../../../../components/ui/Avatar";
import useClientStore from "../../../../../../../store/provider/clientStore";

function AttendeesInput({
  openClients,
  handleRemoveClient,
  handleClientSelect,
  setOpenClients,
  selectedClients,
  openCreateClient,
}) {
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const dropdownRef = useRef(null);
  const { clients, fetchClients, loading } = useClientStore();

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenClients(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOpenClients]);

  if (loading) return <p>Loading...</p>;

  return (
    <div ref={dropdownRef} className="grid">
      <NewInput
        label={"Attendees"}
        placeholder={"Choose clients and their relationships"}
        onClick={() => setOpenClients(true)}
        isOpen={openClients}
      />
      <div className=" relative">
        {openClients && (
          <div className="absolute bg-white w-full shadow-2xl border border-gray-100 z-10 py-1 grid grid-cols-1 rounded">
            <p className="px-5 font-bold my-3">
              All clients and their relationships
            </p>
            {clients?.map((client) => {
              const isSelected = selectedClients.some(
                (c) => c.id === client.id
              );
              return (
                <div
                  onClick={() => handleClientSelect(client)}
                  key={client.id}
                  className={`px-5 py-2 flex items-center gap-5 cursor-pointer hover:bg-gray-100 ${
                    isSelected ? "bg-blue-100" : ""
                  }`}
                >
                  <Avatar name={client?.first_name + " " + client?.last_name} />
                  <p className="font-semibold">
                    {client?.first_name + " " + client?.last_name}
                  </p>
                  <p className="text-sm bg-amber-100 px-1 rounded">
                    {client?.status}
                  </p>
                </div>
              );
            })}
            <CreateButton onClick={openCreateClient} create={"New Client"} />
          </div>
        )}
      </div>
      {selectedClients?.length > 0 && (
        <div className="grid grid-cols-2 gap-2 py-2">
          {selectedClients.map((client) => (
            <div
              onMouseEnter={() => setShowDeleteButton(true)}
              onMouseLeave={() => setShowDeleteButton(false)}
              key={client.id}
              className="flex justify-between items-center gap-2 hover:bg-gray-200 px-3 py-5"
            >
              <div className="flex items-center gap-3">
                <Avatar name={client?.first_name + " " + client?.last_name} />
                <div className="grid">
                  <span className=" font-semibold">
                    {client?.first_name + " " + client?.last_name}
                  </span>
                  <span className=" text-sm">{client?.status}</span>
                </div>
              </div>
              {showDeleteButton && (
                <button
                  onClick={() => handleRemoveClient(client.id)}
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

export default AttendeesInput;

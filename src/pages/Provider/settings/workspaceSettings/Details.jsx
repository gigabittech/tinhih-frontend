import React, { useState } from "react";
import EditButton from "../components/EditButton";
import { Palette, Plus } from "lucide-react";
import SettingsInput from "../components/SettingsInput";
import { PiMedalLight } from "react-icons/pi";
import { MdDangerous } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import Title from "../components/Title";

function Details() {
  const [edit, setEdit] = useState(false);
  const [editBranding, setEditBranding] = useState(false);

  return (
    <div className="flex gap-5">
      {/* --------------------left side-------------------- */}
      <div className="w-[50%]">
        {/* ----------------- Business information---------------- */}
        <div className="bg-white rounded-lg p-6 mb-5">
          <div className="flex justify-between items-center">
            <Title icon={<PiMedalLight />} title={" Business information"} />
            <EditButton
              isEditMode={edit}
              onClose={() => setEdit(false)}
              onOpen={() => setEdit(true)}
            />
          </div>

          <div className="grid gap-5 pt-5">
            <div className="grid grid-cols-2 gap-5">
              <SettingsInput
                defaultValue={"Sunday"}
                label={"First name"}
                isEditMode={edit}
              />
              <SettingsInput
                defaultValue={"Sunday"}
                label={"Last name"}
                isEditMode={edit}
              />
            </div>
            {edit && (
              <div className="flex justify-end gap-3 pt-5">
                <button
                  type="button"
                  onClick={() => setEdit(false)}
                  className="px-3 py-1 rounded border border-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-3 py-1 rounded border border-primary-500 bg-primary-500 text-white font-bold"
                >
                  Save
                </button>
              </div>
            )}
          </div>
        </div>

        {/* --------------Workspace branding---------------- */}
        <div className="bg-white rounded-lg p-6 mb-5">
          <div className="flex justify-between items-center">
            <Title icon={<Palette />} title={"Workspace branding"} />
            <EditButton
              isEditMode={editBranding}
              onClose={() => setEditBranding(false)}
              onOpen={() => setEditBranding(true)}
            />
          </div>

          <div className="grid gap-5 pt-5">
            <div className="grid grid-cols-2 gap-5">
              <SettingsInput
                defaultValue={"Sunday"}
                label={"First name"}
                isEditMode={editBranding}
              />
              <SettingsInput
                defaultValue={"Sunday"}
                label={"Last name"}
                isEditMode={editBranding}
              />
            </div>
            {editBranding && (
              <div className="flex justify-end gap-3 pt-5">
                <button
                  type="button"
                  onClick={() => setEditBranding(false)}
                  className="px-3 py-1 rounded border border-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-3 py-1 rounded border border-primary-500 bg-primary-500 text-white font-bold"
                >
                  Save
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ---------------Danger zone ----------------------- */}
        <div className="bg-white rounded-lg p-6">
          <Title icon={<MdDangerous />} title={"Danger zone"} />

          <div className="grid gap-5 pt-5">
            <p>
              Secure your account by enabling Multi-Factor Authentication (MFA)
              for an extra layer of protection. Verify your identity through a
              secondary method to prevent unauthorized access.
            </p>
            <div className="grid grid-cols-2 gap-5"></div>
          </div>
        </div>
      </div>

      {/* -------------right side-------------------- */}
      <div className=" w-[50%]">
        <div className="bg-white rounded-lg p-6">
          <div className="flex justify-between items-center">
            <Title icon={<FaLocationDot /> } title={"Locations"} />
          </div>
          <p className="py-5">
            Set up physical and virtual locations with specific addresses, room
            names, and types of virtual spaces to make scheduling appointments
            and video calls easier.
          </p>
          <div className="grid grid-cols-1 gap-5">
            <div className="flex gap-3">
              <div className=" w-10 h-10 flex items-center justify-center bg-gray-100 rounded">
                <FaLocationDot size={20} />
              </div>
              <div>
                <p className=" font-bold">Name</p>
                <p className="text-sm">location</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className=" w-10 h-10 flex items-center justify-center bg-gray-100 rounded">
                <FaLocationDot size={20} />
              </div>
              <div>
                <p className=" font-bold">Name</p>
                <p className="text-sm">location</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-primary-700">
              <Plus size={15} />
              New location
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;

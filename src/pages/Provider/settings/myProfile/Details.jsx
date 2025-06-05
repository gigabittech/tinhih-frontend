import { Globe, Lock, Paintbrush, User2 } from "lucide-react";
import React, { useState } from "react";
import EditButton from "../components/EditButton";
import SettingsInput from "../components/SettingsInput";

function Details() {
  const [editPersonalDetails, setEditPersonalDetails] = useState(false);
  const [editTimezone, setEditTimezone] = useState(false);
  const [editTheme, setEditTheme] = useState(false);
  return (
    <div className="flex gap-5">
      {/* -------------left side-------------------- */}
      <div className=" w-[50%]">
        <div className="bg-white rounded-lg p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <User2 /> Calendar details
            </h2>
            <EditButton
              isEditMode={editPersonalDetails}
              onClose={() => setEditPersonalDetails(false)}
              onOpen={() => setEditPersonalDetails(true)}
            />
          </div>
          <div className="flex items-center justify-center py-10 mx-auto w-full">
            <div className="flex items-center justify-center rounded-full text-white font-bold w-40 h-40 bg-primary-500 text-6xl">
              DP
            </div>
          </div>
          <div className="grid gap-5">
            <div className="grid grid-cols-2 gap-5">
              <SettingsInput
                defaultValue={"Sunday"}
                label={"First name"}
                isEditMode={editPersonalDetails}
              />
              <SettingsInput
                defaultValue={"Sunday"}
                label={"Last name"}
                isEditMode={editPersonalDetails}
              />
            </div>
            <div className="grid grid-cols-2 gap-5">
              <SettingsInput
                defaultValue={"Sunday"}
                label={"Email"}
                isEditMode={editPersonalDetails}
              />
              <SettingsInput
                defaultValue={"Sunday"}
                label={"Phone number"}
                isEditMode={editPersonalDetails}
              />
            </div>
            {editPersonalDetails && (
              <div className="flex justify-end gap-3 pt-5">
                <button
                  type="button"
                  onClick={() => setEditPersonalDetails(false)}
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
      </div>

      {/* --------------------right side-------------------- */}
      <div className="w-[50%]">
        {/* ----------------- timezone and laguage---------------- */}
        <div className="bg-white rounded-lg p-6 mb-5">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <Globe /> Language and timezone
            </h2>
            <EditButton
              isEditMode={editTimezone}
              onClose={() => setEditTimezone(false)}
              onOpen={() => setEditTimezone(true)}
            />
          </div>

          <div className="grid gap-5">
            <p>Manage settings for your language and timezone</p>
            <div className="grid grid-cols-2 gap-5">
              <SettingsInput
                defaultValue={"Sunday"}
                label={"First name"}
                isEditMode={editTimezone}
              />
              <SettingsInput
                defaultValue={"Sunday"}
                label={"Last name"}
                isEditMode={editTimezone}
              />
            </div>
            {editTimezone && (
              <div className="flex justify-end gap-3 pt-5">
                <button
                  type="button"
                  onClick={() => setEditTimezone(false)}
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

        {/* --------------theme---------------- */}
        <div className="bg-white rounded-lg p-6 mb-5">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <Paintbrush /> Theme
            </h2>
            <EditButton
              isEditMode={editTheme}
              onClose={() => setEditTheme(false)}
              onOpen={() => setEditTheme(true)}
            />
          </div>

          <div className="grid gap-5">
            <p>Choose between light and dark mode, and customize your theme preferences</p>
            <div className="grid grid-cols-2 gap-5">
              <SettingsInput
                defaultValue={"Sunday"}
                label={"First name"}
                isEditMode={editTheme}
              />
              <SettingsInput
                defaultValue={"Sunday"}
                label={"Last name"}
                isEditMode={editTheme}
              />
            </div>
            {editTheme && (
              <div className="flex justify-end gap-3 pt-5">
                <button
                  type="button"
                  onClick={() => setEditTheme(false)}
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

        <div className="bg-white rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <Lock /> Multi-Factor Authentication (MFA)
          </h2>

          <div className="grid gap-5">
            <p>
              Secure your account by enabling Multi-Factor Authentication (MFA)
              for an extra layer of protection. Verify your identity through a
              secondary method to prevent unauthorized access.
            </p>
            <div className="grid grid-cols-2 gap-5"></div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
  
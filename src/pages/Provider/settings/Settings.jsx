import { Calendar, Globe } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import SettingsInput from "./components/SettingsInput";
import EditButton from "./components/EditButton";
import { SiReactrouter } from "react-icons/si";

function Settings() {
  const [editCalendar, setEditCalendar] = useState(false);
  const [editTimezone, setEditTimezone] = useState(false);

  return (
    <div>
      <header className="border-b border-gray-300 px-10 pb-10">
        <div className="text-sm text-primary-700">
          <Link to={"/calendar"}>Calendar </Link>&gt;{" "}
          <span>Calendar settings</span>
        </div>
        <h1 className="text-2xl font-bold flex items-center gap-3 pt-3">
          <span className="p-2 rounded bg-gray-100">
            <Calendar />
          </span>
          Calendar settings
        </h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 px-10 gap-5 pt-10 bg-gray-100 h-screen">
        {/* Left Side - Calendar Details */}
        <div>
          <div className="bg-white shadow rounded-t-lg p-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <Calendar /> Calendar details
              </h2>
              <EditButton
                isEditMode={editCalendar}
                onClose={() => setEditCalendar(false)}
                onOpen={() => setEditCalendar(true)}
              />
            </div>
            <p className="py-5">
              Manage your calendar and appointment display settings.
            </p>
            <form className=" grid gap-5">
              <div className="grid grid-cols-2 gap-5">
                <SettingsInput
                  defaultValue={"Sunday"}
                  label={"Start weekend on"}
                  isEditMode={editCalendar}
                />
                <SettingsInput
                  defaultValue={"Sunday"}
                  label={"Show weekends"}
                  isEditMode={editCalendar}
                />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <SettingsInput
                  defaultValue={"Sunday"}
                  label={"Time slot size"}
                  isEditMode={editCalendar}
                />
                <SettingsInput
                  defaultValue={"Sunday"}
                  label={"Time increment"}
                  isEditMode={editCalendar}
                />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <SettingsInput
                  label={"Show icons"}
                  defaultValue={"Sunday"}
                  isEditMode={editCalendar}
                />
                <SettingsInput
                  label={"Client name format"}
                  defaultValue={"Sunday"}
                  isEditMode={editCalendar}
                />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <SettingsInput
                  label={"Time format"}
                  defaultValue={"Sunday"}
                  isEditMode={editCalendar}
                />
              </div>
              {editCalendar && (
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditCalendar(false)}
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
            </form>
          </div>

          <div className="bg-white shadow rounded-b-lg p-6 relative border-t border-gray-300 ">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <Globe /> Timezone display
              </h2>
              <EditButton
                isEditMode={editTimezone}
                onClose={() => setEditTimezone(false)}
                onOpen={() => setEditTimezone(true)}
              />
            </div>

            <form className=" grid gap-5">
              <div className="grid grid-cols-2 gap-5">
                <SettingsInput
                  label={"Primary timezone"}
                  defaultValue={"Asia/Dhaka"}
                  isEditMode={editTimezone}
                />
                <SettingsInput
                  label={"Label"}
                  defaultValue={"GMT+6"}
                  isEditMode={editTimezone}
                />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <SettingsInput
                  label={"Label"}
                  defaultValue={"-"}
                  isEditMode={editTimezone}
                />
                <SettingsInput
                  label={"Label"}
                  defaultValue={"-"}
                  isEditMode={editTimezone}
                />
              </div>

              {editTimezone && (
                <div className="flex justify-end gap-3">
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
            </form>
          </div>
        </div>

        {/* Right Side - App Sync */}
        <div>
          <div className="bg-white shadow rounded-lg p-6 ">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <SiReactrouter /> Connected app sync
              </h2>
              <button className="text-primary-600 cursor-pointer">
                Go to apps
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Manage connected apps to create events in 3rd-party calendars
              directly from Carepatron.
            </p>
            <button className="text-primary-600">
              + New connected app
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;

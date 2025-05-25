import { Calendar } from "lucide-react";
import { Link } from "react-router";

function Settings() {
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-10 pt-10 bg-gray-100 h-screen">
        {/* Left Side - Calendar Details */}
        <div className="space-y-4">
          <div className="bg-white shadow rounded-lg p-6 relative">
            <h2 className="text-lg font-semibold mb-2">Calendar details</h2>
            <butoon className="text-primary-600 absolute top-6 right-6 cursor-pointer">
              Edit
            </butoon>
            {/* Fields here */}
          </div>

          <div className="bg-white shadow rounded-lg p-6 relative">
            <h2 className="text-lg font-semibold mb-2">Timezone display</h2>
            <button className="text-primary-600 absolute top-6 right-6 cursor-pointer">
              Edit
            </button>
            {/* Fields here */}
          </div>
        </div>

        {/* Right Side - App Sync */}
        <div>
          <div className="bg-white shadow rounded-lg p-6 relative">
            <h2 className="text-lg font-semibold mb-2">Connected app sync</h2>
            <button className="text-primary-600 absolute top-6 right-6 cursor-pointer">
              Go to apps
            </button>
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

import { BluetoothConnectedIcon } from "lucide-react";

function ConnectedApps() {
  return (
    <div>
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <BluetoothConnectedIcon />
          Connected apps
        </h2>
      </div>
    </div>
  );
}

export default ConnectedApps;

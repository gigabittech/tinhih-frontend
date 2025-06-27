import { BluetoothConnectedIcon } from "lucide-react";
import Title from "../components/Title";

function ConnectedApps() {
  return (
    <div>
      <div className="bg-white rounded-lg p-6">
        <Title icon={<BluetoothConnectedIcon />} title={"Connected apps"} />
      </div>
    </div>
  );
}

export default ConnectedApps;

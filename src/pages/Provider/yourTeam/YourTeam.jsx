import { PiBagSimpleFill } from "react-icons/pi";

function YourTeam() {
  return (
    <div>
      <header className=" border-b border-[#dedede] px-10 pb-5">
        <div className="flex items-center gap-3 text-2xl">
          <span className=" p-2 bg-amber-100 text-[#6e6e6e]">
            {" "}
            <PiBagSimpleFill />
          </span>
          <p className=" font-bold">Your team</p>
        </div>
      </header>
      <div>
        {/* Header */}
        <div className="flex items-center gap-10 py-5 px-10">
          <h2 className="text-lg font-semibold whitespace-nowrap">4 Team members</h2>
          <input
            type="text"
            placeholder="Search by client name, client ID or phone number"
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
              <tr className="border-t">
                <td className=" ps-10">
                  <input type="checkbox" />
                </td>
                <td className="p-2 text-purple-600">
                  Bobby Doe{" "}
                  <span className="ml-2 text-xs bg-gray-200 px-2 py-0.5 rounded">
                    Demo
                  </span>
                </td>
                <td className="p-2">+1 (800) 555-0100</td>
                <td className="p-2">bobby@example.com</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default YourTeam;

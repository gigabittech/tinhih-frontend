import React from "react";
import { FaUserGroup } from "react-icons/fa6";

function Clients() {
  return (
    <div>
      <header className=" border-b border-[#dedede] px-10 pb-5">
        <div className="flex items-center gap-3 text-2xl">
          <span className=" p-2 bg-amber-100 text-[#6e6e6e]">
            {" "}
            <FaUserGroup />
          </span>
          <p className=" font-bold">Clients</p>
        </div>
      </header>
      <div>
        {/* Header */}
        <div className="flex items-center gap-10 py-5 px-10">
          <h2 className="text-lg font-semibold whitespace-nowrap">4 Clients</h2>
          <input
            type="text"
            placeholder="Search by client name, client ID or phone number"
            className="w-96 border rounded px-3 py-2"
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
                <th className=" ps-10 py-5">
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
              <tr className="border-t">
                <td  className=" ps-10">
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
                <td className="p-2 flex flex-wrap gap-1">
                  <span className="text-xs bg-pink-200 px-2 py-0.5 rounded">
                    Couple
                  </span>
                  <span className="text-xs bg-green-200 px-2 py-0.5 rounded">
                    Telehealth
                  </span>
                  <span className="text-xs bg-cyan-200 px-2 py-0.5 rounded">
                    Intake
                  </span>
                  <span className="text-xs bg-yellow-100 px-2 py-0.5 rounded">
                    Referral
                  </span>
                </td>
                <td className="p-2">
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                    Active
                  </span>
                </td>
                <td className="p-2 flex items-center space-x-1">
                  <img
                    src="https://via.placeholder.com/24"
                    className="rounded-full w-6 h-6"
                  />
                  <span className="text-xs bg-pink-200 px-2 py-0.5 rounded-full">
                    AB
                  </span>
                  <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full">
                    +4
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Clients;

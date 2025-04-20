import React, { useState } from "react";
import useWorkspace from "../../hook/useWorkspace";
import { BiSolidUser } from "react-icons/bi";

export default function Onboarding() {
  const { workspaces } = useWorkspace();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    profession: "",
    location: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  console.log(workspaces);

  return (
    <div className="flex items-center justify-center h-screen bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="fixed top-[10%] w-[40%] bg-white rounded-xl shadow-lg px-6 py-10 md:px-10">
        {/* header */}
        <div className=" flex justify-between">
          <div className="flex items-center mb-6">
            <img src="/Logo.svg" alt="Logo" className="h-8 mr-2" />
            <span className="text-lg font-bold text-gray-800">
              TiNHiH Portal
            </span>
          </div>
          <div>
            <button
              className="text-sm px-3 py-1 bg-gray-100 font-semibold flex items-center gap-2"
              onClick={() => alert("Client mode!")}
            >
              <BiSolidUser />
              Are you a client?
            </button>
          </div>
        </div>

        <div className="px-10">
          <h1 className="text-5xl font-bold text-center text-gray-800 mb-8">
            Which best <span className="text-purple-600">describes you?</span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              name="firstName"
              placeholder="First name *"
              value={form.firstName}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last name *"
              value={form.lastName}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2"
            />
          </div>

          <input
            type="text"
            name="profession"
            placeholder="Start typing your profession or choose from the list *"
            value={form.profession}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-4 py-2 w-full mb-4"
          />

          <div className="text-sm text-gray-500 mb-6">
            Looks like your practice is in{" "}
            <select
              name="location"
              value={form.location}
              onChange={handleChange}
              className="ml-2 border-b border-gray-400 focus:outline-none focus:border-purple-500"
            >
              <option value="">Select</option>
              <option value="Bangladesh">Bangladesh</option>
              <option value="USA">USA</option>
              <option value="Australia">Australia</option>
            </select>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-1 w-full bg-gray-200 rounded-full mb-6">
          <div className="h-full w-1/4 bg-purple-600 rounded-full transition-all duration-300"></div>
        </div>
        <div className="flex justify-end">
          <button className=" px-5 py-2 bg-primary-500 rounded font-semibold">Next</button>
        </div>
      </div>
    </div>
  );
}

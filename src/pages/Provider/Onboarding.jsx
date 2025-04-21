import React, { useState } from "react";
import useWorkspace from "../../hook/useWorkspace";
import { BiSolidUser } from "react-icons/bi";

export default function Onboarding() {
  const { workspaces } = useWorkspace();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    profession: "",
    location: "",
    teamSize: "",
    businessName: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    if (step < 2) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    console.log("Form submitted:", form);
  };

  console.log(form);
  

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="px-10">
            <h1 className="text-5xl font-bold text-center text-gray-800 mb-8">
              Which best{" "}
              <span className="text-primary-600">describes you?</span>
            </h1>
            <div className="p-10">
              {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="">First name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="">Last name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                    required
                  />
                </div>
              </div> */}
              <div>
                <label htmlFor="">Profession *</label>
                <input
                  type="text"
                  name="profession"
                  placeholder="Start typing your profession or choose from the list"
                  value={form.profession}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-4 py-2 w-full mb-4"
                  required
                />
              </div>

              <div className="text-sm text-gray-500 mb-6 flex justify-center pt-5">
                Looks like your practice is in{" "}
                <select
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  className="ml-2 border-b border-gray-400 focus:outline-none focus:border-purple-500"
                  required
                >
                  <option value="">Select</option>
                  <option value="Bangladesh">Bangladesh</option>
                  <option value="USA">USA</option>
                  <option value="Australia">Australia</option>
                </select>
              </div>
            </div>
          </div>
        );
      /* case 2:
        return (
          <div className="px-10">
            <h1 className="text-5xl font-bold text-center text-gray-800 mb-8">
              What's your <span className="text-primary-600">team size?</span>
            </h1>
            <div className="p-10 flex justify-center">
              <div className="grid grid-cols-3 gap-4 w-full max-w-md">
                <button
                  type="button"
                  className={`py-4 px-6 rounded-lg border-2 ${
                    form.teamSize === "Just me"
                      ? "border-primary-500 bg-primary-100"
                      : "border-gray-300"
                  }`}
                  onClick={() => setForm({ ...form, teamSize: "Just me" })}
                >
                  Just me
                </button>
                <button
                  type="button"
                  className={`py-4 px-6 rounded-lg border-2 ${
                    form.teamSize === "2 - 10"
                      ? "border-primary-500 bg-primary-100"
                      : "border-gray-300"
                  }`}
                  onClick={() => setForm({ ...form, teamSize: "2 - 10" })}
                >
                  2 - 10
                </button>
                <button
                  type="button"
                  className={`py-4 px-6 rounded-lg border-2 ${
                    form.teamSize === "10+"
                      ? "border-primary-500 bg-primary-100"
                      : "border-gray-300"
                  }`}
                  onClick={() => setForm({ ...form, teamSize: "10+" })}
                >
                  10+
                </button>
              </div>
            </div>
            <div className="text-sm text-gray-500 text-center mb-6">
              This will help us set up your workspace correctly.
            </div>
          </div>
        ); */
      case 2:
        return (
          <div className="px-10">
            <h1 className="text-5xl font-bold text-center text-gray-800 mb-8">
              What's your{" "}
              <span className="text-primary-600">business name?</span>
            </h1>
            <div className="p-10">
              <div className="mb-4">
                <label
                  htmlFor="businessName"
                  className="block mb-2 font-medium"
                >
                  Business name *
                </label>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  value={form.businessName}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-4 py-3 w-full"
                  required
                />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#e2deb2] bg-opacity-50 backdrop-blur-sm">
      <div className="fixed top-[10%] w-[40%] bg-white rounded-xl shadow-lg px-6 py-10 md:px-10">
        {/* header */}
        <div className="flex justify-between">
          <div className="flex items-center mb-6">
            <img src="/Logo.svg" alt="Logo" className="h-8 mr-2" />
            <span className="text-lg font-bold text-gray-800">
              TiNHiH Portal
            </span>
          </div>
          <div>
            {
              step===1 &&
              <button
              className="text-sm px-3 py-1 bg-gray-100 font-semibold flex items-center gap-2"
              onClick={() => alert("Client mode!")}
            >
              <BiSolidUser />
              Are you a client?
            </button>
            }
          </div>
        </div>

        {renderStep()}

        {/* Progress Bar */}
        <div className="h-1 w-full bg-gray-200 rounded-full mb-6">
          <div
            className="h-full bg-purple-600 rounded-full transition-all duration-300"
            style={{ width: `${(step / 2) * 100}%` }}
          ></div>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between">
          <button
            className={` ${
              step === 1 ? " opacity-0" : ""
            } px-5 py-2 text-gray-600 font-semibold`}
            onClick={prevStep}
            disabled={step === 1}
          >
            Back
          </button>

          {step < 3 ? (
            <button
              className="px-5 py-2 bg-primary-500 rounded font-semibold text-white"
              onClick={nextStep}
              disabled={
                (step === 1 &&
                  (!form.firstName ||
                    !form.lastName ||
                    !form.profession ||
                    !form.location)) ||
                (step === 2 && !form.teamSize)
              }
            >
              Next
            </button>
          ) : (
            <button
              className="px-5 py-2 bg-primary-500 rounded font-semibold text-white"
              onClick={handleSubmit}
              disabled={!form.businessName}
            >
              Complete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

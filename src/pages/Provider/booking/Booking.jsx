import React, { useState } from "react";
import Avatar from "../../../components/ui/Avatar";
import useUserStore from "../../../store/global/userStore";
import { MdArrowDropDown } from "react-icons/md";
import SignOut from "../../../components/ui/SignOut";

const steps = [
  "Service",
  "Location",
  "Staff",
  "Date and time",
  "Contact details",
];

const Stepper = ({ currentStep }) => (
  <div className="flex items-center justify-between mb-10">
    {steps.map((step, index) => (
      <div key={index} className="flex items-center space-x-2">
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold ${
            currentStep === index
              ? "bg-indigo-700 text-white"
              : "bg-gray-400 text-white"
          }`}
        >
          {index + 1}
        </div>
        <span
          className={`text-sm ${
            currentStep === index
              ? "text-indigo-900 font-medium"
              : "text-gray-500"
          }`}
        >
          {step}
        </span>
        {index < steps.length - 1 && (
          <div className="w-10 border-t border-gray-300 mx-2"></div>
        )}
      </div>
    ))}
  </div>
);

const StepContent = ({ step }) => {
  switch (step) {
    case 0:
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-xl">
          <Card icon="👤" title="Returning client" />
          <Card icon="➕" title="New client" />
        </div>
      );
    case 1:
      return <div>📍 Choose a location</div>;
    case 2:
      return <div>👨‍⚕️ Select staff</div>;
    case 3:
      return <div>📅 Pick a date and time</div>;
    case 4:
      return <div>📧 Enter contact details</div>;
    default:
      return null;
  }
};

const Card = ({ icon, title }) => (
  <div className="border rounded-lg p-6 hover:shadow-lg cursor-pointer flex items-center justify-between">
    <div className="flex items-center gap-4">
      <div className="text-purple-600 bg-purple-100 p-3 rounded-lg text-xl">
        {icon}
      </div>
      <span className="text-lg font-medium">{title}</span>
    </div>
    <div className="text-gray-500 text-xl">{">"}</div>
  </div>
);

const Booking = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [openMenu, setOpenMenu] = useState(false);
  const [openSignOutMenu, setOpenSignOutMenu] = useState(false);
  const { user } = useUserStore();

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleSignOut = () => {
    setOpenMenu(false);
    setOpenSignOutMenu(true);
  };

  return (
    <div className="min-h-screen bg-white p-8 relative z-0">
      <h2 className="text-xl font-semibold mb-6 text-indigo-900">
        Online booking appointment
      </h2>

      <Stepper currentStep={currentStep} />

      <StepContent step={currentStep} />

      {/* Navigation Buttons */}
      <div className="mt-10 flex justify-between max-w-xl">
        <button
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
          onClick={handleBack}
          disabled={currentStep === 0}
        >
          Back
        </button>
        <button
          className="px-4 py-2 bg-indigo-700 text-white rounded disabled:opacity-50"
          onClick={handleNext}
          disabled={currentStep === steps.length - 1}
        >
          {currentStep === steps.length - 1 ? "Finish" : "Next"}
        </button>
      </div>

      {/* User Info */}
      <div className="absolute top-5 right-5 items-center space-x-4">
        <div className="relative">
          <div
            onClick={() => setOpenMenu(!openMenu)}
            className="rounded-full border border-gray-300 p-1 flex items-center gap-2 cursor-pointer"
          >
            <Avatar name={user.first_name + " " + user.last_name} />
            <span
              className={
                openMenu
                  ? "transition-all duration-300 rotate-180"
                  : "transition-all duration-300"
              }
            >
              <MdArrowDropDown size={20} />
            </span>
          </div>

          {/* Dropdown Menu */}
          <div
            className={`absolute right-0 mt-1 min-w-56 bg-white border border-gray-300 rounded shadow 
                p-5 transition-all duration-300 origin-top grid grid-cols-1 gap-3 ${
                  openMenu
                    ? "opacity-100 scale-100 pointer-events-auto"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
          >
            <div className="font-semibold">Aniqa Chowdhury</div>
            <button className=" text-start cursor-pointer">
              Go to your portal
            </button>
            <button onClick={handleSignOut} className=" text-start cursor-pointer">Sign out</button>
          </div>
          <SignOut
            isOpen={openSignOutMenu}
            onClose={() => setOpenSignOutMenu(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default Booking;

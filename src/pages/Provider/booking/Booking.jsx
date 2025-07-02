import React, { useState } from "react";
import Avatar from "../../../components/ui/Avatar";
import useUserStore from "../../../store/global/userStore";
import { MdArrowDropDown } from "react-icons/md";
import SignOut from "../../../components/ui/SignOut";
import Stepper from "./components/Stepper";
import StepContent from "./components/StepContent";
import useBookingStore from "../../../store/provider/bookingStore";
import { Notify } from "../../../components/ui/Toaster";
import axiosInstance from "../../../lib/axiosInstanceWithToken";
import { useLocation } from "react-router";

const steps = [
  "Staff",
  "Service",
  "Location",
  "Date and time",
  "Contact details",
];

const Booking = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [openMenu, setOpenMenu] = useState(false);
  const [openSignOutMenu, setOpenSignOutMenu] = useState(false);
  const { user } = useUserStore();
  const {
    selectedService,
    selectedLocation,
    selectedDate,
    selectedTimeSlot,
    resetBooking,
  } = useBookingStore();

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const userId = queryParams.get("uid");
  const workspaceId = queryParams.get("workspace_id");

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

  const handleConfirmAppointment = async () => {
    const first_name = document.querySelector(
      "input[name='first_name']"
    )?.value;
    const last_name = document.querySelector("input[name='last_name']")?.value;
    const email = document.querySelector("input[name='email']")?.value;
    const phone = document.querySelector("input[name='phone']")?.value;
    const messageInput =
      document.querySelector("textarea[name='message']")?.value || "";

    const payload = {
      workspace_id: workspaceId,
      date: selectedDate?.toISOString()?.split("T")[0],
      time: selectedTimeSlot?.split("-")[1]?.trim(),
      attendees: userId,
      services: [selectedService?.id],
      locations: [selectedLocation?.id],
      first_name: first_name,
      last_name: last_name,
      email: email,
      phone: phone,
      description: messageInput || "",
    };

    try {
      const response = await axiosInstance.post("/booking/confirm", payload);
      if (response.status === 201) {
        Notify("Appointment booked successfully!");
        resetBooking();
        setCurrentStep(0);
      }
    } catch (error) {
      alert("Booking failed. Please try again.");
      console.error("Error creating appointment:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white p-8 relative z-0">
      <div className=" container mx-auto">
        <h2 className="text-xl font-semibold mb-6 text-primary-800">
          Online booking appointment
        </h2>

        <Stepper currentStep={currentStep} />

        <StepContent
          step={currentStep}
          setCurrentStep={setCurrentStep}
          workspaceId={workspaceId}
          userId={userId}
        />
      </div>

      {/* Navigation Buttons */}
      <div className="p-10 flex items-center justify-between absolute left-0 right-0 bottom-0 border-t border-gray-200">
        <button
          className={`${
            currentStep < 2
              ? " text-transparent"
              : "px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50 cursor-pointer"
          } `}
          onClick={handleBack}
          disabled={currentStep < 2}
        >
          Back
        </button>
        <p className=" text-xs text-gray-400">Powered by TiNHiH</p>
        <button
          className={`${
            currentStep < 3
              ? "text-transparent"
              : "text-white px-4 py-2 bg-primary-700 rounded disabled:opacity-50 cursor-pointer"
          }`}
          onClick={
            currentStep === steps.length - 1
              ? handleConfirmAppointment
              : handleNext
          }
          disabled={
            currentStep < 3 ||
            (currentStep === 3 && (!selectedDate || !selectedTimeSlot))
          }
        >
          {currentStep === steps.length - 1
            ? "Confirm appointment"
            : "Continue"}
        </button>
      </div>

      {/* User Info */}
      <div className="absolute top-5 right-5 items-center space-x-4">
        <div className="relative">
          <div
            onClick={() => setOpenMenu(!openMenu)}
            className="rounded-full border border-gray-300 p-1 flex items-center gap-2 cursor-pointer"
          >
            <Avatar name={user?.first_name + " " + user?.last_name} />
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
            <div className="font-semibold">{`${
              user?.first_name + " " + user?.last_name
            }`}</div>
            <button
              title="Coming soon.."
              className=" text-start cursor-pointer"
            >
              Go to your portal
            </button>
            <button
              onClick={handleSignOut}
              className=" text-start cursor-pointer"
            >
              Sign out
            </button>
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

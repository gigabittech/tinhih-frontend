import React from "react";

const steps = [
  "Staff",
  "Service",
  "Location",
  "Date and time",
  "Contact details",
];

const Stepper = ({ currentStep }) => (
  <div className="flex items-center mb-10">
    {steps.map((step, index) => (
      <React.Fragment key={index}>
        {/* Step Circle + Label */}
        <div className="flex gap-3 items-center">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold ${
              currentStep === index
                ? "bg-primary-700 text-white"
                : "bg-gray-400 text-white"
            }`}
          >
            {index + 1}
          </div>
          <span
            className={`text-sm mt-1 ${
              currentStep === index
                ? "text-primary-800 font-medium"
                : "text-gray-500"
            }`}
          >
            {step}
          </span>
        </div>

        {/* Connector Line */}
        {index < steps.length - 1 && (
          <div className="flex-1 h-0.5 bg-gray-300 mx-2"></div>
        )}
      </React.Fragment>
    ))}
  </div>
);

export default Stepper;

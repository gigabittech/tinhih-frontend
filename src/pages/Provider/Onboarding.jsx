import React from "react";
import { useForm } from "react-hook-form";
import { BiSolidUser } from "react-icons/bi";
import axios from "axios";
import countryNames from "../../data/countyNames";
import professions from "../../data/professtions";
import { Notify } from "../../components/ui/Toaster";

export default function Onboarding() {
  const [step, setStep] = React.useState(1);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm({
    defaultValues: {
      profession: "",
      countryCode: "",
      businessName: "",
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const token = localStorage.getItem("auth-token");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_SERVER_URL}/workspaces`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = response.data;
      Notify(result.message);
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = async () => {
    if (step === 1) {
      const isValid = await trigger(["profession", "countryCode"]);
      if (isValid) setStep(2);
    } else if (step === 2) {
      const isValid = await trigger(["businessName"]);
      if (isValid) {
        handleSubmit(onSubmit)();
      }
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

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
              <div>
                <label htmlFor="profession">Profession *</label>
                <select
                  id="profession"
                  {...register("profession", {
                    required: "Please select your profession",
                  })}
                  className={`border ${
                    errors.profession ? "border-red-500" : "border-gray-300"
                  } rounded-md px-4 py-2 w-full mb-1 focus:outline-none focus:border-primary-500`}
                >
                  <option value="">
                    Start typing your profession or choose from the list
                  </option>
                  {professions.map((profession, index) => (
                    <option key={index} value={profession}>
                      {profession}
                    </option>
                  ))}
                </select>
                {errors.profession && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.profession.message}
                  </p>
                )}
              </div>

              <div className="text-sm text-gray-500 mb-6 flex justify-center pt-5">
                Looks like your practice is in{" "}
                <div className="ml-2">
                  <select
                    {...register("countryCode", {
                      required: "Please select your location",
                    })}
                    className={`border-b ${
                      errors.countryCode ? "border-red-500" : "border-gray-400"
                    } focus:outline-none focus:border-primary-500`}
                  >
                    <option value="">Select</option>
                    {countryNames.map((countryName, index) => (
                      <option key={index} value={countryName}>
                        {countryName}
                      </option>
                    ))}
                  </select>
                  {errors.countryCode && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.countryCode.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="px-10">
            <h1 className="text-5xl whitespace-nowrap font-bold text-center text-gray-800 mb-8">
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
                  id="businessName"
                  type="text"
                  {...register("businessName", {
                    required: "Please enter your business name",
                    minLength: {
                      value: 2,
                      message: "Business name must be at least 2 characters",
                    },
                  })}
                  className={`border ${
                    errors.businessName ? "border-red-500" : "border-gray-300"
                  } rounded-md px-4 py-3 w-full`}
                />
                {errors.businessName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.businessName.message}
                  </p>
                )}
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
        <div className="flex justify-between">
          <div className="flex items-center mb-6">
            <img src="/Logo.svg" alt="Logo" className="h-8 mr-2" />
            <span className="text-lg font-bold text-gray-800">
              TiNHiH Portal
            </span>
          </div>
          <div>
            {step === 1 && (
              <button
                className="text-sm px-3 py-1 bg-gray-100 font-semibold flex items-center gap-2"
                onClick={() => alert("Client mode!")}
              >
                <BiSolidUser />
                Are you a client?
              </button>
            )}
          </div>
        </div>

        {renderStep()}

        <div className="h-1 w-full bg-gray-200 rounded-full mb-6">
          <div
            className="h-full bg-purple-600 rounded-full transition-all duration-300"
            style={{ width: `${(step / 2) * 100}%` }}
          ></div>
        </div>

        <div className="flex justify-between">
          <button
            className={`${
              step === 1 ? "opacity-0" : ""
            } px-5 py-2 text-gray-600 font-semibold cursor-pointer`}
            onClick={prevStep}
            disabled={step === 1 || isSubmitting}
          >
            Back
          </button>

          <button
            className="px-5 py-2 bg-primary-500 rounded cursor-pointer font-semibold text-white disabled:opacity-50"
            onClick={nextStep}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                {step < 2 ? "Processing..." : "Submitting..."}
              </span>
            ) : step < 2 ? (
              "Next"
            ) : (
              "Complete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

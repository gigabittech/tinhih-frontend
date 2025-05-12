import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BiSolidUser } from "react-icons/bi";
import axios from "axios";
import countryNames from "../../../data/countyNames";
import professions from "../../../data/professtions";
import { Notify } from "../../../components/ui/Toaster";

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      profession: "",
      countryCode: "",
      teamSize: "",
      businessName: "",
    },
  });

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      full_name: `${data.first_name} ${data.last_name}`.trim(),
      preferred_name: data.first_name,
      teamSize:
        data.teamSize === "Just me"
          ? "justMe"
          : data.teamSize === "2 - 10"
          ? "inTen"
          : "moreThanTen",
    };

    setIsSubmitting(true);
    const token = localStorage.getItem("auth-token");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_SERVER_URL}/onboarding`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        const result = response.data;
        window.location.href = "/calendar";
        Notify(result.message);
      }
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = async () => {
    if (step === 1) {
      const isValid = await trigger(["first_name", "profession", "countryCode"])
      if (isValid) setStep(2);
    } else if (step === 2) {
      const isValid = await trigger(["teamSize"]);
      if (isValid) setStep(3);
    } else if (step === 3) {
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
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block mb-2 font-medium">First name *</label>
                  <input
                    type="text"
                    {...register("first_name", {
                      required: "Please enter your first name",
                    })}
                    className={`border ${
                      errors.first_name ? "border-red-500" : "border-gray-300"
                    } rounded-md px-4 py-2 w-full`}
                  />
                  {errors.first_name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.first_name.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block mb-2 font-medium">Last name</label>
                  <input
                    type="text"
                    {...register("last_name")}
                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block mb-2 font-medium">Profession *</label>
                <select
                  {...register("profession", {
                    required: "Please select your profession",
                  })}
                  className={`border ${
                    errors.profession ? "border-red-500" : "border-gray-300"
                  } rounded-md px-4 py-2 w-full`}
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

              <div className="text-sm text-gray-500 flex justify-center">
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
            <h1 className="text-5xl font-bold text-center text-gray-800 mb-8">
              What's your <span className="text-primary-600">team size?</span>
            </h1>
            <div className="p-10">
              <p className="text-center mb-8 text-gray-600">
                This will help us set up your workspace correctly.
              </p>
              <div className="flex justify-center gap-4">
                {["Just me", "2 - 10", "10+"].map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={`px-6 py-3 rounded-md border ${
                      watch("teamSize") === size
                        ? "border-primary-500 bg-primary-100"
                        : "border-gray-300"
                    }`}
                    onClick={() => {
                      setValue("teamSize", size);
                      trigger("teamSize");
                    }}
                  >
                    {size}
                  </button>
                ))}
                <input
                  type="hidden"
                  {...register("teamSize", {
                    required: "Please select your team size",
                  })}
                />
                {errors.teamSize && (
                  <p className="text-red-500 text-sm mt-1 text-center">
                    {errors.teamSize.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="px-10">
            <h1 className="text-5xl whitespace-nowrap font-bold text-center text-gray-800 mb-8">
              What's your{" "}
              <span className="text-primary-600">business name?</span>
            </h1>
            <div className="p-10">
              <div className="mb-4">
                <label className="block mb-2 font-medium">
                  Business name *
                </label>
                <input
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
      <div className="fixed top-[10%] bg-white rounded-xl shadow-lg px-6 py-10 md:px-10">
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
            className="h-full bg-primary-600 rounded-full transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
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

          {step === 2 ? (
            <div className="flex gap-4">
              <button
                className="px-5 py-2 text-gray-600 font-semibold cursor-pointer"
                onClick={() => setStep(3)}
                disabled={isSubmitting}
              >
                Skip
              </button>
              <button
                className="px-5 py-2 bg-primary-500 rounded cursor-pointer font-semibold text-white disabled:opacity-50"
                onClick={nextStep}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Next"}
              </button>
            </div>
          ) : (
            <button
              className="px-5 py-2 bg-primary-500 rounded cursor-pointer font-semibold text-white disabled:opacity-50"
              onClick={nextStep}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  {step < 3 ? "Processing..." : "Submitting..."}
                </span>
              ) : step < 3 ? (
                "Next"
              ) : (
                "Complete"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

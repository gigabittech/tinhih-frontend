import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "../../../../../../components/ui/Modal";
import Button from "../../../../../../components/ui/Button";
import { UserRoundPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import axiosInstance from "../../../../../../lib/axiosInstanceWithToken";
import { Notify } from "../../../../../../components/ui/Toaster";
import StatusDropdown from "./StatusDropdown";
import useClientStore from "../../../../../../store/provider/clientStore";
import countries_data from "../../../../../../data/countryData";

function CreateNewClient({ isOpen, onClose }) {
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const [apiErrors, setApiErrors] = useState("");
  const { fetchClients } = useClientStore();
  const [isDropdownOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries_data[0]);

  const phone = watch("phone");

  useEffect(() => {
    setValue("countryCode", selectedCountry.code);
    setValue("fullPhoneNumber", `${selectedCountry.code}${phone || ""}`);
  }, [selectedCountry, phone, setValue]);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (country) => {
    setSelectedCountry(country);
    setIsOpen(false);
  };

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post("/clients", data);

      if (response.status === 200) {
        Notify("Created!");
        reset();
        onClose();
        fetchClients();
      } else {
        throw new Error("Failed to create client");
      }
    } catch (error) {
      console.error("Error creating client:", error.message);
      setApiErrors(error?.response?.data?.errors);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader
          icon={<UserRoundPlus className="text-context-light size-6" />}
          title="New client"
          onClose={onClose}
        />
        <ModalBody className="my-3 flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm">First Name*</label>
              <input
                type="text"
                {...register("first_name", {
                  required: "First name is required",
                })}
                className="border border-[#a0a0a0] w-full rounded px-2 py-1 outline-none focus:border-amber-200"
              />
              {errors.first_name && (
                <p className="text-red-500 text-sm">
                  {errors.first_name.message}
                </p>
              )}
            </div>
            <div>
              <label className="text-sm">Last Name*</label>
              <input
                type="text"
                {...register("last_name", {
                  required: "Last name is required",
                })}
                className="border border-[#a0a0a0] w-full rounded px-2 py-1 outline-none focus:border-amber-200"
              />
              {errors.last_name && (
                <p className="text-red-500 text-sm">
                  {errors.last_name.message}
                </p>
              )}
            </div>
            <StatusDropdown
              register={register}
              setValue={setValue}
              errors={errors}
            />

            <div className="w-full">
              <label className="text-sm mb-1 block">Phone Number*</label>

              <div className="flex border border-[#a0a0a0] rounded px-2 py-1 items-center focus-within:border-amber-300 relative">
                {/* Custom Dropdown */}
                <div className="relative w-28">
                  <div
                    onClick={toggleDropdown}
                    className="cursor-pointer text-sm flex justify-between items-center"
                  >
                    {selectedCountry.abbreviation} {selectedCountry.code}
                    <svg
                      className="ml-1 h-4 w-4 inline-block"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M5.516 7.548L10 12.032l4.484-4.484L16 9.064l-6 6-6-6z" />
                    </svg>
                  </div>

                  {isDropdownOpen && (
                    <div className="absolute z-10 mt-2 w-60 bg-white border border-gray-300 rounded shadow max-h-48 overflow-auto text-sm">
                      {countries_data.map((country, idx) => (
                        <div
                          key={idx}
                          className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleSelect(country)}
                        >
                          {country.abbreviation} {country.name} {country.code}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Phone Input */}
                <input
                  type="number"
                  {...register("phone", {
                    required: "Phone number is required",
                    minLength: {
                      value: 7,
                      message: "Invalid phone number length",
                    },
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Phone number must contain only digits",
                    },
                  })}
                  className="ml-2 flex-1 outline-none text-sm"
                  placeholder="XXX XXXX XXX"
                />
              </div>

              {/* Hidden Inputs */}
              <input type="hidden" {...register("countryCode")} />
              <input type="hidden" {...register("fullPhoneNumber")} />

              {/* Errors */}
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm">Email*</label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                className="border border-[#a0a0a0] w-full rounded px-2 py-1 outline-none focus:border-amber-200"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
              {apiErrors.email && (
                <p className="text-red-500 text-sm">{apiErrors.email}</p>
              )}
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="justify-end">
          <div className="w-full sm:w-auto flex flex-col-reverse sm:flex-row items-center gap-3">
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => {
                reset();
                onClose();
              }}
            >
              Cancel
            </Button>
            <Button type="submit" className="w-full sm:w-auto">
              Create
            </Button>
          </div>
        </ModalFooter>
      </form>
    </Modal>
  );
}

export default CreateNewClient;

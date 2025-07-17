import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "../../../../../../../components/ui/Modal";
import { IoLocation } from "react-icons/io5";
import Button from "../../../../../../../components/ui/Button";
import axiosInstance from "../../../../../../../lib/axiosInstanceWithToken";
import useUserStore from "../../../../../../../store/global/userStore";
import { Notify } from "../../../../../../../components/ui/Toaster";
import useLocationStore from "../../../../../../../store/provider/locationStore";
import { PhoneNumberInput } from "../../../../../../../components/ui/PhoneNumberInput";

const CreateLocation = ({ isOpen, onClose }) => {
  const [locationTypes, setLocationTypes] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(true);
  const [selectedLocationType, setSelectedLocationType] = useState({
    id: 0,
    name: "",
  });
  const { user } = useUserStore();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const dropdownRef = useRef();
  const { fetchLocations } = useLocationStore();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    };

    if (openDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdown]);

  const handleSelect = (type) => {
    setSelectedLocationType({ id: type.id, name: type.name });
    setValue("location_type", type.id); // Update location type value
    setOpenDropdown(false);
  };

  const fetchLocationTypes = async () => {
    try {
      const response = await axiosInstance.get("/location_types");
      if (response.status === 200) {
        setLocationTypes(response.data.types);
      }
    } catch (error) {
      console.error("Failed to fetch location types:", error);
    }
  };

  useEffect(() => {
    fetchLocationTypes();
  }, []);

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      type_id: selectedLocationType.id,
      user_id: user.id,
    };
    try {
      const response = await axiosInstance.post("/locations", payload);
      if (response.status === 201) {
        onClose();
        reset();
        Notify("created");
        fetchLocations();
      }
    } catch (error) {
      console.error("Error creating location:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader
        title="New Location"
        icon={
          <svg
            className="fill-context-dark/60 size-6"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20 1V4H23V6H20V9H18V6H15V4H18V1H20ZM12 13C13.1 13 14 12.1 14 11C14 9.9 13.1 9 12 9C10.9 9 10 9.9 10 11C10 12.1 10.9 13 12 13ZM14 3.25V7H17V10H19.92C19.97 10.39 20 10.79 20 11.2C20 14.52 17.33 18.45 12 23C6.67 18.45 4 14.52 4 11.2C4 6.22 7.8 3 12 3C12.68 3 13.35 3.08 14 3.25Z" />
          </svg>
        }
        onClose={onClose}
      />
      <ModalBody className="flex flex-col gap-3 my-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative" ref={dropdownRef}>
              <p className="block text-sm font-medium text-gray-700 mb-1">
                Location type
              </p>
              <div
                onClick={() => setOpenDropdown(!openDropdown)}
                className=" w-full border rounded-md px-3 py-2 text-sm focus:border-primary-500 min-h-[38px] cursor-pointer"
              >
                <span>
                  {selectedLocationType.name ||
                    "Add physical or virtual locations"}
                </span>
              </div>

              {openDropdown && (
                <div
                  className="absolute border border-[#eaeaea] shadow-2xl bg-white w-full rounded py-2 z-10"
                  onClick={(e) => e.stopPropagation()}
                >
                  {locationTypes.map((type) => (
                    <div
                      key={type.id}
                      onClick={() => handleSelect(type)}
                      className="flex items-center gap-3 px-5 py-2 hover:bg-[#f0f0f0] cursor-pointer "
                    >
                      <IoLocation size={25} />
                      <div className="grid grid-cols-1">
                        <p className="font-bold">{type.name}</p>
                        <p className="font-medium text-xs">
                          {type.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Display name *
              </label>
              <input
                {...register("display_name", { required: true })}
                type="text"
                className=" outline-none focus:border-primary-500 w-full border rounded-md px-3 py-2 text-sm"
              />
              {errors.display_name && (
                <p className="text-red-500 text-xs">Display name is required</p>
              )}
            </div>
          </div>

          {/* Conditional Inputs */}
          {selectedLocationType.id === 1 && (
            <div className="flex flex-col gap-3 my-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Physical address
                </label>
                <input
                  {...register("address")}
                  type="text"
                  placeholder="E.g. 721 Broadway"
                  className=" outline-none focus:border-primary-500 w-full border rounded-md px-3 py-2 text-sm text-gray-500 placeholder-gray-400"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Suburb/Province
                  </label>
                  <input
                    {...register("suburb")}
                    type="text"
                    placeholder="E.g. Brooklyn"
                    className=" outline-none focus:border-primary-500 w-full border rounded-md px-3 py-2 text-sm text-gray-500 placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    {...register("city")}
                    type="text"
                    placeholder="E.g. New York"
                    className=" outline-none focus:border-primary-500 w-full border rounded-md px-3 py-2 text-sm text-gray-500 placeholder-gray-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    {...register("state")}
                    type="text"
                    placeholder="NY"
                    className=" outline-none focus:border-primary-500 w-full border rounded-md px-3 py-2 text-sm text-gray-500 placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Zip code
                  </label>
                  <input
                    {...register("zip_code")}
                    type="text"
                    placeholder="10003"
                    className=" outline-none focus:border-primary-500 w-full border rounded-md px-3 py-2 text-sm text-gray-500 placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <select
                    {...register("country")}
                    className=" outline-none focus:border-primary-500 w-full border rounded-md px-3 py-2 text-sm text-gray-500"
                  >
                    <option>United States</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* phone call */}
          {selectedLocationType.id === 2 && (
            <div className="my-3">
              <PhoneNumberInput
                register={register}
                setValue={setValue}
                watch={watch}
                errors={errors}
                defaultCountry="+1"
                label="Phone number"
                placeholder=""
              />
            </div>
          )}

          {/* Other Inputs */}
          {selectedLocationType.id > 2 && (
            <div className="flex flex-col my-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Link
              </label>
              <input
                {...register("link", { required: true })}
                type="url"
                className=" outline-none focus:border-primary-500 w-full border rounded-md px-3 py-2 text-sm text-gray-500 placeholder-gray-400"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs">Link is required</p>
              )}
            </div>
          )}

          <ModalFooter className="justify-end border-none">
            <div className="w-full sm:w-auto flex flex-col-reverse sm:flex-row items-center gap-3">
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-auto"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button type="submit" className="w-full sm:w-auto">
                Create
              </Button>
            </div>
          </ModalFooter>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default CreateLocation;

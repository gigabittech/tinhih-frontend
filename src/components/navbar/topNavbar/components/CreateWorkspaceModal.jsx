import React from "react";
import { useForm } from "react-hook-form";
import { Modal, ModalBody, ModalHeader } from "../../../ui/Modal";
import { PiCirclesThreeFill } from "react-icons/pi";
import countryNames from "../../../../data/countyNames";
import professions from "../../../../data/professtions";
import axiosInstance from "../../../../lib/axiosInstanceWithToken";

function CreateWorkspaceModal({ isOpen, onClose }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post("/workspaces", data);
      console.log("Workspace created:", response.data);

      reset();
      onClose();
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader
        icon={<PiCirclesThreeFill size={25} color="#a0a0a0" />}
        title={"New workspace"}
        onClose={onClose}
      />
      <ModalBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-5">
            <div className="grid grid-cols-2 gap-5">
              <div className="grid relative">
                <label className="text-sm">Workspace name</label>
                <input
                  type="text"
                  placeholder="Displayed to client"
                  {...register("businessName", {
                    required: "Workspace name is required",
                  })}
                  className="rounded px-3 py-1 border-gray-400 outline-none focus:border-primary-400 border w-full"
                />
                {errors.businessName && (
                  <span className="text-red-500 text-xs absolute -bottom-5">
                    {errors.businessName.message}
                  </span>
                )}
              </div>

              <div className="grid relative">
                <label className="text-sm">Country</label>
                <select
                  {...register("countryCode", { required: "Country is required" })}
                  className="rounded px-3 py-1 border-gray-400 outline-none focus:border-primary-400 border w-full"
                >
                  <option value=""></option>
                  {countryNames?.map((country, index) => (
                    <option key={index} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                {errors.countryCode && (
                  <span className="text-red-500 text-xs absolute -bottom-5">
                    {errors.countryCode.message}
                  </span>
                )}
              </div>
            </div>

            <div className=" relative grid">
              <label className="text-sm">Profession</label>
              <select
                {...register("profession", {
                  required: "Profession is required",
                })}
                className="rounded px-3 py-1 border-gray-400 outline-none focus:border-primary-400 border w-full"
              >
                <option value=""></option>
                {professions?.map((profession, index) => (
                  <option key={index} value={profession}>
                    {profession}
                  </option>
                ))}
              </select>
              {errors.profession && (
                <span className="text-red-500 text-xs absolute -bottom-5">
                  {errors.profession.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-10">
            <button
              type="button"
              onClick={() => {
                reset();
                onClose();
              }}
              className="border border-[#a0a0a0] text-primary-800 px-5 py-1 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="border border-primary-700 bg-primary-700 text-white px-5 py-1 rounded"
            >
              {isSubmitting ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
}

export default CreateWorkspaceModal;

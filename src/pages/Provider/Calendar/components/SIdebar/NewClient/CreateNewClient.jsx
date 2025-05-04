import React from "react";
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

function CreateNewClient({ isOpen, onClose }) {
  const { fetchClients } = useClientStore();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

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
      Notify(error?.response?.data?.message );
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
            <div>
              <label className="text-sm">Phone Number*</label>
              <input
                type="number"
                {...register("phone", { required: "Phone number is required" })}
                className="border border-[#a0a0a0] w-full rounded px-2 py-1 outline-none focus:border-amber-200"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
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

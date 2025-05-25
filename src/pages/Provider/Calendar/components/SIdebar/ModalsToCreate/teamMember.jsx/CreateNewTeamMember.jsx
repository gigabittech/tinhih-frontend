import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "../../../../../../../components/ui/Modal";
import Button from "../../../../../../../components/ui/Button";
import { UserRoundPlus } from "lucide-react";
import { BiSolidInfoCircle } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { Notify } from "../../../../../../../components/ui/Toaster";
import axiosInstance from "../../../../../../../lib/axiosInstanceWithToken";
import useTeamMemberStore from "../../../../../../../store/provider/teamMemberStore";
import useUserStore from "../../../../../../../store/global/userStore";
import useServiceStore from "../../../../../../../store/provider/serviceStore";
import MultiSelectDropdown from "../../../../../../../components/ui/MultiSelectDropdown";
import { PhoneNumberInput } from "../../../../../../../components/ui/PhoneNumberInput";

function CreateNewTeamMember({ isOpen, onClose }) {
  const [selectedServices, setSelectedServices] = useState([]);
  const [apiErrors, setApiErrors] = useState("");
  const { fetchMembers } = useTeamMemberStore();
  const { user } = useUserStore();
  const { services, fetchServices } = useServiceStore();

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { isSubmitting, errors },
  } = useForm();

  const onSubmit = async (data) => {
    data.phone_number = data.fullPhoneNumber;
    const payload = { workspace_id: user?.currentWorkspace?.id, ...data };
    try {
      const response = await axiosInstance.post("/members", payload);

      if (response.status === 201) {
        Notify("Created!");
        reset();
        onClose();
        fetchMembers();
      } else {
        throw new Error("Failed to create member");
      }
    } catch (error) {
      console.error("Error creating member:", error.message);
      setApiErrors(error?.response?.data?.errors)
    }
  };
  

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader
        icon={<UserRoundPlus className="text-context-light size-6" />}
        title="New team member"
        onClose={onClose}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalBody className="my-3 flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm">First Name*</label>
              <input
                type="text"
                {...register("first_name", { required: true })}
                className="border border-[#a0a0a0] w-full rounded px-2 py-1 outline-none focus:border-primary-500"
              />
              {errors.first_name && (
                <p className="text-red-500 text-xs">Required</p>
              )}
            </div>
            <div>
              <label className="text-sm">Last Name*</label>
              <input
                type="text"
                {...register("last_name", { required: true })}
                className="border border-[#a0a0a0] w-full rounded px-2 py-1 outline-none focus:border-primary-500"
              />
              {errors.last_name && (
                <p className="text-red-500 text-xs">Required</p>
              )}
            </div>
            <div>
              <label className="text-sm">Email*</label>
              <input
                type="email"
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
                className="border border-[#a0a0a0] w-full rounded px-2 py-1 outline-none focus:border-primary-500"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500 text-xs">Email is required</p>
              )}
              {errors.email?.type === "pattern" && (
                <p className="text-red-500 text-xs">Invalid email format</p>
              )}
              {apiErrors.email && (
                <p className="text-red-500 text-xs">{apiErrors.email}</p>
              )}
            </div>
            <PhoneNumberInput
              register={register}
              setValue={setValue}
              watch={watch}
              errors={errors}
              defaultCountry="+880"
              label="Phone number"
              placeholder=""
            />
            <div>
              <label className="text-sm">Job title</label>
              <input
                type="text"
                {...register("job_title")}
                className="border border-[#a0a0a0] w-full rounded px-2 py-1 outline-none focus:border-primary-500"
              />
            </div>
            <div>
              <label className="text-sm">
                National provider identifier (NPI)
              </label>
              <input
                type="text"
                {...register("npi")}
                className="border border-[#a0a0a0] w-full rounded px-2 py-1 outline-none focus:border-primary-500"
              />
            </div>
            <div>
              <label className="text-sm">Taxonomy code</label>
              <input
                type="text"
                {...register("taxonomy")}
                className="border border-[#a0a0a0] w-full rounded px-2 py-1 outline-none focus:border-primary-500"
              />
            </div>
          </div>
          <div>
            <p className="text-sm">Assign services</p>
            <MultiSelectDropdown
              selected={selectedServices}
              setSelected={(val) => {
                setSelectedServices(val);
                setValue("services", val);
              }}
              options={services.map((service) => ({
                id: service.id,
                name: `${service.service_name}`,
              }))}
              labelKey="name"
              valueKey="id"
              label="Services"
            />
          </div>
          <p className="bg-amber-100 px-5 py-3 flex items-center gap-2 text-sm">
            <BiSolidInfoCircle />
            Adding new team members will increase your monthly subscription.
          </p>
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
            <Button
              type="submit"
              className="w-full sm:w-auto"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create"}
            </Button>
          </div>
        </ModalFooter>
      </form>
    </Modal>
  );
}

export default CreateNewTeamMember;

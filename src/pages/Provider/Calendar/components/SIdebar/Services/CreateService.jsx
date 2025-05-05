import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "../../../../../../components/ui/Modal";
import Button from "../../../../../../components/ui/Button";
import { Plus, BookText } from "lucide-react";
import useUserStore from "./../../../../../../store/global/userStore";
import ServiceTogggler from "./components/ServiceTogggler";
import GroupEventToggler from "./components/GroupEventToggler";
import axiosInstance from "../../../../../../lib/axiosInstanceWithToken";
import { Notify } from "../../../../../../components/ui/Toaster";
import useServiceStore from "../../../../../../store/provider/serviceStore";
import useTeamMemberStore from "../../../../../../store/provider/teamMemberStore";
import MultiSelectDropdown from "../../../../../../components/ui/MultiSelectDropdown";
import useLocationStore from "../../../../../../store/provider/locationStore";

function CreateService({ isOpen, onClose }) {
  const { members, fetchMembers } = useTeamMemberStore();
  const [selectedMembers, setSelectedMembers] = useState([]);

  const [selectedLocations, setSelectedLocations] = useState([]);

  const [apiErrors, setApiErrors] = useState([]);

  const user = useUserStore((state) => state.user);
  const { locations, fetchLocations } = useLocationStore();
  const { fetchServices } = useServiceStore();

  useEffect(() => {
    fetchLocations();
  }, [fetchLocations]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      user_id: user?.id,
      service_name: "",
      display_name: "",
      code: "",
      duration: 0,
      price: 0,
      description: "",
      group_event: false,
      max_attendees: "",
      taxable: true,
      bookable_online: true,
      allow_new_clients: true,
      team_members: selectedMembers,
      locations: selectedLocations,
    },
  });

  useEffect(() => {
    setValue("team_members", selectedMembers);
  }, [selectedMembers, setValue]);

  useEffect(() => {
    setValue("locations", selectedLocations);
  }, [selectedLocations, setValue]);

  const isBookableOnline = watch("bookable_online");
  const isGroupEvent = watch("group_event");

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post("/services", data);

      if (response.status === 201) {
        Notify("Created!");
        reset();
        onClose();
        fetchServices();
        setApiErrors([]);
      } else {
        throw new Error("Failed to create client");
      }
    } catch (error) {
      console.error("Error creating client:", error.message);
      setApiErrors(error.response.data.errors);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader title="New service" onClose={onClose} />
        <ModalBody className="flex flex-col gap-5 mt-5 sm:max-h-[65vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm">Service name*</label>
              <input
                {...register("service_name", { required: true })}
                className="border border-[#a0a0a0] rounded px-3 py-1 w-full"
              />
              {errors.service_name && (
                <p className="text-red-500 text-sm">Required</p>
              )}
            </div>
            <div>
              <label className="text-sm">Display name</label>
              <input
                {...register("display_name")}
                className="border border-[#a0a0a0] rounded px-3 py-1 w-full"
              />
            </div>
            <div>
              <label className="text-sm">Code*</label>
              <input
                {...register("code", { required: true })}
                className="border border-[#a0a0a0] rounded px-3 py-1 w-full"
              />
              {errors.code && <p className="text-red-500 text-sm">Required</p>}
              {apiErrors.code && (
                <p className="text-red-500 text-sm">{apiErrors.code}</p>
              )}
            </div>
            <div>
              <label className="text-sm">Duration</label>
              <input
                type="number"
                {...register("duration", { valueAsNumber: true })}
                className="border border-[#a0a0a0] rounded px-3 py-1 w-full"
              />
              {apiErrors.duration && (
                <p className="text-red-500 text-sm">{apiErrors.duration}</p>
              )}
            </div>
            <div>
              <label className="text-sm">Price</label>
              <input
                type="number"
                {...register("price", { valueAsNumber: true })}
                className="border border-[#a0a0a0] rounded px-3 py-1 w-full"
              />
            </div>
          </div>

          <div>
            <label className="text-sm">Description</label>
            <textarea
              {...register("description")}
              className="border border-[#a0a0a0] rounded px-3 py-1 w-full"
              placeholder="Write your description here..."
            />
          </div>

          <div>
            <p className="text-sm font-medium mb-1">Assign team member</p>
            <MultiSelectDropdown
              selected={selectedMembers}
              setSelected={(val) => {
                setSelectedMembers(val);
                setValue("team_members", val);
              }}
              options={members.map((m) => ({
                id: m.id,
                name: `${m.first_name} ${m.last_name}`,
              }))}
              labelKey="name"
              valueKey="id"
              label="Team members"
            />
            {apiErrors.team_members && (
              <p className="text-red-500 text-sm">{apiErrors.team_members}</p>
            )}
          </div>

          <GroupEventToggler
            groupEvent={isGroupEvent}
            setGroupEvent={(val) => setValue("group_event", val)}
            maxAttendees={watch("max_attendees")}
            setMaxAttendees={(val) => setValue("max_attendees", val)}
          />

          <ServiceTogggler
            title="Taxable"
            description="Includes sales tax"
            name="taxable"
            value={watch("taxable")}
            onChange={(val) => setValue("taxable", val)}
          />

          <div className="flex flex-col gap-5 border-y border-outline-medium my-2 py-5">
            <div className="flex items-center gap-2 text-context-dark">
              <BookText size={22} />
              <p className="text-base font-bold">Online bookings</p>
            </div>

            <ServiceTogggler
              title="Bookable online"
              description="Clients can book online"
              name="bookable_online"
              value={isBookableOnline}
              onChange={(val) => setValue("bookable_online", val)}
            />

            {isBookableOnline && (
              <ServiceTogggler
                title="Allow for new clients"
                description="New clients can book"
                name="allow_new_clients"
                value={watch("allow_new_clients")}
                onChange={(val) => setValue("allow_new_clients", val)}
              />
            )}
          </div>

          <div>
            <p className="font-bold">Location of service</p>
            <MultiSelectDropdown
              selected={selectedLocations}
              setSelected={(val) => {
                setSelectedLocations(val);
                setValue("locations", val);
              }}
              options={locations.map((location) => ({
                id: location.id,
                name: `${location.display_name}`,
              }))}
              labelKey="name"
              valueKey="id"
              label="Locations"
            />
            {apiErrors.locations && (
              <p className="text-red-500 text-sm">{apiErrors.locations}</p>
            )}
          </div>
        </ModalBody>
        <ModalFooter className="justify-end">
          <div className="w-full sm:w-auto flex flex-col-reverse sm:flex-row items-center gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </ModalFooter>
      </form>
    </Modal>
  );
}

export default CreateService;

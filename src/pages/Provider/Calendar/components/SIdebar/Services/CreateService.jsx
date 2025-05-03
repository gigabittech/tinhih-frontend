import React, { useEffect, useRef, useState } from "react";
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

function CreateService({ isOpen, onClose }) {
  const { members, fetchMembers } = useTeamMemberStore();
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const user = useUserStore((state) => state.user);
  const { fetchServices } = useServiceStore();

  console.log(selectedMembers);

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
      locations: [],
    },
  });


  useEffect(() => {
    if (members.length > 0) {
      const initialSelected = members.map((m) => m.id);
      setSelectedMembers(initialSelected);
      setValue("team_members", initialSelected);
    }
  }, [members, setValue]);


  const handleMemberToggle = (id) => {
    let updated;
    if (selectedMembers.includes(id)) {
      updated = selectedMembers.filter((mid) => mid !== id);
    } else {
      updated = [...selectedMembers, id];
    }
    setSelectedMembers(updated);
    setValue("team_members", updated);
  };

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
      } else {
        throw new Error("Failed to create client");
      }
    } catch (error) {
      console.error("Error creating client:", error.message);
      Notify(error?.response?.data?.message);
    }
  };

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
            </div>
            <div>
              <label className="text-sm">Duration</label>
              <input
                type="number"
                {...register("duration", { valueAsNumber: true })}
                className="border border-[#a0a0a0] rounded px-3 py-1 w-full"
              />
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
            <div className="border border-[#a0a0a0] rounded px-3 py-2 w-full bg-white relative">
              <div
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="cursor-pointer flex flex-wrap gap-1 text-sm min-h-6"
              >
                {selectedMembers?.length === members?.length ? (
                  <p className="bg-[#e4e4e4] rounded-full px-2">All team members</p>
                ) : (
                  selectedMembers?.map((id) => {
                    const member = members.find((m) => m.id === id);
                    return (
                      <span key={id} className="bg-[#e4e4e4] rounded-full whitespace-nowrap px-2">
                        {member?.first_name} {member?.last_name}
                      </span>
                    );
                  })
                )}
              </div>
              {dropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute z-10 shadow-2xl border border-[#e5e5e5] mt-2 left-0 right-0 bg-white rounded max-h-60 overflow-y-auto"
                >
                  {/* All team members toggle */}
                  <label className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer font-medium border-b">
                    <input
                      type="checkbox"
                      checked={selectedMembers.length === members.length}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        const updated = checked ? members.map((m) => m.id) : [];
                        setSelectedMembers(updated);
                        setValue("team_members", updated);
                      }}
                      className="mr-2"
                    />
                    All team members
                  </label>

                  {members.map((member) => (
                    <label
                      key={member.id}
                      className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedMembers.includes(member.id)}
                        onChange={() => handleMemberToggle(member.id)}
                        className="mr-2"
                      />
                      {member?.first_name + " " + member?.last_name}
                    </label>
                  ))}
                </div>
              )}
            </div>
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
            <select
              {...register("locations")}
              className="border border-[#a0a0a0] rounded px-3 py-1 w-full"
            >
              <option value="">All locations</option>
              <option value="video">Video call</option>
            </select>
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

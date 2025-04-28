import React, { useState } from "react";
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
import currencies from "../../../../../../data/Currencies";

function CreateService({ isOpen, onClose }) {
  const [isDescription, setIsDescription] = useState(false);
  const user = useUserStore((state) => state.user);

  const [formData, setFormData] = useState({
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
    team_members: "",
    locations: "",
  });

  const closeHandler = () => {
    setIsDescription(false);
    onClose();
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <Modal isOpen={isOpen} onClose={closeHandler}>
      <ModalHeader
        title="New service"
        onClose={closeHandler}
        icon={
          <svg
            className="fill-context-dark/60 size-6"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20.41 8.41L15.58 3.58C15.21 3.21 14.7 3 14.17 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V9.83C21 9.3 20.79 8.79 20.41 8.41ZM7 7H14V9H7V7ZM17 17H7V15H17V17ZM17 13H7V11H17V13Z" />
          </svg>
        }
      />
      <ModalBody className="flex flex-col gap-5 mt-5 sm:max-h-[65vh] overflow-y-auto">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm">Service name*</label>
            <input
              type="text"
              name="service_name"
              value={formData.service_name}
              onChange={handleInputChange}
              className="border border-[#a0a0a0] rounded px-3 py-1 w-full"
            />
          </div>
          <div>
            <label className="text-sm">Display name</label>
            <input
              type="text"
              name="display_name"
              value={formData.display_name}
              onChange={handleInputChange}
              className="border border-[#a0a0a0] rounded px-3 py-1 w-full"
            />
          </div>
          <div>
            <label className="text-sm">Code*</label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleInputChange}
              className="border border-[#a0a0a0] rounded px-3 py-1 w-full"
            />
          </div>
          <div>
            <label className="text-sm">Duration</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              className="border border-[#a0a0a0] rounded px-3 py-1 w-full"
            />
          </div>
          <div>
            <label className="text-sm">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="border border-[#a0a0a0] rounded px-3 py-1 w-full"
            />
          </div>
        </div>

        {/* descriptions start */}
        <div>
          {isDescription ? (
            <textarea
              cols={10}
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="border border-[#a0a0a0] rounded px-3 py-1 w-full"
              placeholder="Write your description here..."
            />
          ) : (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-primary-800 font-bold self-start bg-transparent p-2"
              onClick={() => setIsDescription((prev) => !prev)}
            >
              <Plus size={20} className="relative -top-px" />
              <span>Add description</span>
            </Button>
          )}
        </div>
        {/* descriptions end */}

        <div className="">
          <p className=" text-sm">Assign team member</p>
          <select
            name=""
            id=""
            className="border border-[#a0a0a0] rounded px-3 py-1 w-full"
          >
            <option value=""></option>
            <option value=""></option>
          </select>
        </div>

        {/* missing field assign member */}
        <div className="flex flex-col gap-5 my-2">
          <GroupEventToggler
            groupEvent={formData.group_event}
            setGroupEvent={(value) =>
              setFormData({ ...formData, group_event: value })
            }
            maxAttendees={formData.max_attendees}
            setMaxAttendees={(value) =>
              setFormData({ ...formData, max_attendees: value })
            }
          />

          <ServiceTogggler
            title="Taxable"
            description="Includes sales tax on generated invoices"
            name="taxable"
            value={formData.taxable}
            onChange={(e) =>
              setFormData({ ...formData, taxable: e.target.checked })
            }
          />
        </div>

        <div className="flex flex-col gap-5 border-y border-outline-medium my-2 py-5">
          <div className="flex items-center gap-2 text-context-dark">
            <BookText size={22} />
            <p className="text-base font-bold">Online bookings</p>
          </div>

          <p className="text-sm text-context-light">
            Choose when online bookings can be made and by which type of clients
          </p>

          <div className="flex flex-col gap-5 mb-2">
            <ServiceTogggler
              title="Bookable online"
              description="Clients can book this service online"
              name="bookable_online"
              value={formData.bookable_online}
              onChange={(e) =>
                setFormData({ ...formData, bookable_online: e.target.checked })
              }
            />

            {formData.bookable_online && (
              <ServiceTogggler
                title="Allow for new clients"
                description="New clients can book this service"
                name="allow_new_clients"
                value={formData.allow_new_clients}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    allow_new_clients: e.target.checked,
                  })
                }
              />
            )}
          </div>
        </div>
        <div className="">
          <p className="font-bold">Location of service</p>
          <select
            name=""
            id=""
            className="border border-[#a0a0a0] rounded px-3 py-1 w-full"
          >
            <option value="">All locations</option>
            <option value="">Video call</option>
          </select>
        </div>
      </ModalBody>
      <ModalFooter className="justify-end">
        <div className="w-full sm:w-auto flex flex-col-reverse sm:flex-row items-center gap-3">
          <Button
            type="button"
            variant="outline"
            className="w-full sm:w-auto"
            onClick={closeHandler}
          >
            Cancel
          </Button>
          <Button type="submit" className="w-full sm:w-auto">
            Save
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
}

export default CreateService;

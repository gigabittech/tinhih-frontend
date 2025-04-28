import React from "react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "../../../../../../components/ui/Modal";
import Button from "../../../../../../components/ui/Button";
import { UserRoundPlus } from "lucide-react";
import { BiSolidInfoCircle } from "react-icons/bi";

function CreateNewTeamMember({ isOpen, onClose }) {
  /* const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    id_number: "",
    phone_number: "",
    members: [],
  }; */

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader
        icon={<UserRoundPlus className="text-context-light size-6" />}
        title="New client"
        onClose={onClose}
      />
      <ModalBody className="my-3 flex flex-col gap-3">
        <div className=" grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="" className=" text-sm">
              First Name*
            </label>
            <input
              type="text"
              className="border border-[#a0a0a0] w-full rounded px-2 py-1"
            />
          </div>
          <div>
            <label htmlFor="" className=" text-sm">
              last Name*
            </label>
            <input
              type="text"
              className="border border-[#a0a0a0] w-full rounded px-2 py-1"
            />
          </div>
          <div>
            <label htmlFor="" className=" text-sm">
              Email*
            </label>
            <input
              type="text"
              className="border border-[#a0a0a0] w-full rounded px-2 py-1"
            />
          </div>
          <div>
            <label htmlFor="" className=" text-sm">
              Phone number
            </label>
            <input
              type="text"
              className="border border-[#a0a0a0] w-full rounded px-2 py-1"
            />
          </div>
          <div>
            <label htmlFor="" className=" text-sm">
              Job title
            </label>
            <input
              type="text"
              className="border border-[#a0a0a0] w-full rounded px-2 py-1"
            />
          </div>

          <div>
            <label htmlFor="" className=" text-sm">
              License number
            </label>
            <input
              type="text"
              className="border border-[#a0a0a0] w-full rounded px-2 py-1"
            />
          </div>
          <div>
            <label htmlFor="" className=" text-sm">
              National provider identifier(NPI)
            </label>
            <input
              type="text"
              className="border border-[#a0a0a0] w-full rounded px-2 py-1"
            />
          </div>
          <div>
            <label htmlFor="" className=" text-sm">
              Taxonomy code
            </label>
            <input
              type="text"
              className="border border-[#a0a0a0] w-full rounded px-2 py-1"
            />
          </div>
        </div>
        <div>
          <label htmlFor="" className=" text-sm">
            Assign services
          </label>
          <input
            type="text"
            className="border border-[#a0a0a0] w-full rounded px-2 py-1"
          />
        </div>
        <p className=" bg-amber-100 px-5 py-3 flex items-center gap-2 text-sm">
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
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button type="submit" className="w-full sm:w-auto">
            Create
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
}

export default CreateNewTeamMember;

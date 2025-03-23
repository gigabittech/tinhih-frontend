import React from "react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "../../../../../../components/ui/Modal";
import { Form, Formik } from "formik";
import Button from "../../../../../../components/ui/Button";
import validationSchema from "../../../../../../FormSchema/Provider/createService";

function CreateService({ isOpen, onClose }) {
  const initialValues = {
    user_id: "",
    service_name: "",
    display_name: "",
    code: "",
    duration: "",
    price: "",
    description: "",
    group_event: "",
    max_attendees: "",
    taxable: "",
    bookable_online: "",
    allow_new_clients: "",
    team_members: "",
    locations: "",
  };

  const closeHandler = () => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={closeHandler}>
      <Formik validationSchema={validationSchema} initialValues={initialValues}>
        {(formik) => (
          <Form>
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
            <ModalBody></ModalBody>
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
          </Form>
        )}
      </Formik>
    </Modal>
  );
}

export default CreateService;

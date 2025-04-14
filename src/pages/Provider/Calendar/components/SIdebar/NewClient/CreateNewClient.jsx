import React from "react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "../../../../../../components/ui/Modal";
import { createNewClientSchema as validationSchema } from "../../../../../../FormSchema/Provider/createNewClient";
import { Form, Formik } from "formik";
import Button from "../../../../../../components/ui/Button";
import Input from "../../../../../../components/ui/Input";
import { UserRoundPlus } from "lucide-react";

function CreateNewClient({ isOpen, onClose }) {
  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    id_number: "",
    phone_number: "",
    members: [],
  };

  const submitHandler = (values) => {
    console.log(values);
  };

  
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={submitHandler}
      >
        {(formilk) => (
          <Form>
            <ModalHeader
              icon={<UserRoundPlus className="text-context-light size-6" />}
              title="New client"
              onClose={onClose}
            />
            <ModalBody className="my-3 flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input label="First name" name="first_name" formik={formilk} />
                <Input label="Last name" name="last_name" formik={formilk} />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Input label="Email" name="email" formik={formilk} />
                <Input
                  label="Phone number"
                  name="phone_number"
                  formik={formilk}
                />
              </div>

              <Input
                label="Identification number"
                name="id_number"
                className=" sm:w-1/2"
                formik={formilk}
              />
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

export default CreateNewClient;

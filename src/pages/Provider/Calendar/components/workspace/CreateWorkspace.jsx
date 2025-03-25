import React from "react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "../../../../../components/ui/Modal";
import { Form, Formik } from "formik";
import Button from "../../../../../components/ui/Button";
import { BriefcaseBusiness } from "lucide-react";
import { createWorkspaceSchema as validationSchema } from "../../../../../FormSchema/Provider/createWorkspace";
import Input from "../../../../../components/ui/Input";

function CreateWorkspace({ isOpen, onClose }) {
  const initialValues = {
    name: "",
    country: "",
    profession: "",
  };
  const closeHandler = () => {
    onClose();
  };

  const submitHandler = (values) => {
    console.log(values);
  };

  return (
    <Modal isOpen={isOpen} onClose={closeHandler}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        {(formik) => (
          <Form>
            <ModalHeader
              title="New workspace"
              onClose={closeHandler}
              icon={<BriefcaseBusiness className="text-context-light size-6" />}
            />
            <ModalBody className="flex flex-col gap-3 my-3">
              <div className="flex gap-3">
                <Input label="Workspace name" name="name" formik={formik} />
                <Input label="Country" name="country" formik={formik} />
              </div>
              <Input label="Profession" name="profession" formik={formik} />
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
          </Form>
        )}
      </Formik>
    </Modal>
  );
}

export default CreateWorkspace;

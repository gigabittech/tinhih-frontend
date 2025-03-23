import React, { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "../../../../../../components/ui/Modal";
import { Form, Formik } from "formik";
import Button from "../../../../../../components/ui/Button";
import { createServiceSchema as validationSchema } from "../../../../../../FormSchema/Provider/createService";
import Input from "../../../../../../components/ui/Input";
import { Plus, BookText } from "lucide-react";
import Textarea from "../../../../../../components/ui/Textarea";
import useUserStore from "./../../../../../../store/global/userStore";
import ServiceTogggler from "./components/ServiceTogggler";
import GroupEventToggler from "./components/GroupEventToggler";
import currencies from "../../../../../../data/Currencies";

function CreateService({ isOpen, onClose }) {
  const [isDescription, setIsDescription] = useState(false);
  const user = useUserStore((state) => state.user);

  const initialValues = {
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
  };

  const closeHandler = () => {
    setIsDescription(false);
    onClose();
  };

  const submitHandler = (values) => {
    console.log(values);
  };

  return (
    <Modal isOpen={isOpen} onClose={closeHandler}>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={submitHandler}
      >
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
            <ModalBody className="flex flex-col gap-3 mt-5 sm:max-h-[65vh] overflow-y-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  label="Service Name"
                  name="service_name"
                  formik={formik}
                />
                <Input
                  label="Display Name"
                  name="display_name"
                  formik={formik}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Input label="Code" name="code" formik={formik} />
                <Input
                  label="Duration"
                  name="duration"
                  type="number"
                  icon={<p className="">mins</p>}
                  iconPosition="right"
                  formik={formik}
                  className="pr-14"
                />
              </div>

              <Input
                label="Price"
                name="price"
                type="number"
                formik={formik}
                icon={
                  <p className="">
                    {user?.country
                      ? currencies[user?.country]
                      : currencies["United States"]}
                  </p>
                }
                className="sm:w-1/2 pl-14"
              />

              {/* descriptions start */}

              {isDescription ? (
                <Textarea
                  label="Description"
                  name="description"
                  className="resize-none"
                  formik={formik}
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

              {/* descriptions end */}

              {/* missing field assign member*/}

              <div className="flex flex-col gap-5 my-2">
                <GroupEventToggler formik={formik} />

                <ServiceTogggler
                  title="Taxable"
                  description="Includes sales tax on generated invoices"
                  name="taxable"
                  formik={formik}
                />
              </div>

              <div className="flex flex-col gap-5 border-y border-outline-medium my-2 py-5">
                <div className="flex items-center gap-2 text-context-dark">
                  <BookText size={22} />
                  <p className="text-base font-bold">Online bookings</p>
                </div>

                <p className="text-sm text-context-light">
                  Choose when online bookings can be made and by which type of
                  clients
                </p>

                <div className="flex flex-col gap-5 mb-2">
                  <ServiceTogggler
                    title="Bookable online"
                    description="Clients can book this service online"
                    name="bookable_online"
                    formik={formik}
                  />

                  {formik.values.bookable_online && (
                    <ServiceTogggler
                      title="Allow for new clients"
                      description="New clients can book this service"
                      name="allow_new_clients"
                      formik={formik}
                    />
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

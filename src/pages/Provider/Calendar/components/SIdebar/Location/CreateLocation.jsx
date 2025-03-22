import React, { useEffect, useState } from "react";
import useLocationStore from "../../../../../../store/provider/locationStore";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "../../../../../../components/ui/Modal";
import {
  createLocationSchema as validationSchema,
  formTypes,
} from "../../../../../../FormSchema/Provider/createLocation";
import { Formik, Form, ErrorMessage } from "formik";
import Input from "../../../../../../components/ui/Input";
import Button from "../../../../../../components/ui/Button";
import Dropdown, {
  DropdownTrigger,
} from "../../../../../../components/ui/Dropdown";
import {
  LocationPlaceholder,
  SelectedLocationPlaceholder,
  LocationMenu,
} from "./components/LocationType";
import FormLoader from "../../../../../../components/ui/FormLoader";
import InPersonForm from "./components/InPersonForm";

const CreateLocation = ({ isOpen, onClose }) => {
  const { getLocationTypes, createLocation, isSuccess, isLoading } =
    useLocationStore();
  const [locationType, setLocationType] = useState("");
  const [locationTypePlaceholder, setLocationTypePlaceholder] = useState(
    <LocationPlaceholder />
  );

  useEffect(() => {
    getLocationTypes();
  }, [getLocationTypes]);

  const closeHandler = () => {
    setLocationType("");
    setLocationTypePlaceholder(<LocationPlaceholder />);
    onClose();
  };

  const initialValues = {
    type_id: "",
    display_name: "",
    address: "",
    suburb_province: "",
    city: "",
    state: "",
    zip_code: "",
    country: "",
    phone_number: "",
    link: "",
  };

  const submitHandler = async (values, { resetForm }) => {
    await createLocation(locationType, values);
    if (isSuccess.create) {
      resetForm();
      closeHandler();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={closeHandler}>
      <Formik
        initialValues={initialValues}
        validationSchema={() => validationSchema(locationType)}
        onSubmit={submitHandler}
      >
        {(formik) => (
          <Form>
            <ModalHeader
              title="New Location"
              icon={
                <svg
                  className="fill-context-dark/60 size-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_131_12798)">
                    <path d="M20 1V4H23V6H20V9H18V6H15V4H18V1H20ZM12 13C13.1 13 14 12.1 14 11C14 9.9 13.1 9 12 9C10.9 9 10 9.9 10 11C10 12.1 10.9 13 12 13ZM14 3.25V7H17V10H19.92C19.97 10.39 20 10.79 20 11.2C20 14.52 17.33 18.45 12 23C6.67 18.45 4 14.52 4 11.2C4 6.22 7.8 3 12 3C12.68 3 13.35 3.08 14 3.25Z" />
                  </g>
                  <defs>
                    <clipPath id="clip0_131_12798">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              }
              onClose={closeHandler}
            />
            <ModalBody className="flex flex-col gap-3">
              <div className="flex gap-3 flex-col sm:flex-row">
                <div className="w-full">
                  <Dropdown
                    className="max-h-[20rem] overflow-y-auto"
                    trigger={(isOpen) => (
                      <DropdownTrigger label="Location Type" isOpen={isOpen}>
                        {locationTypePlaceholder}
                      </DropdownTrigger>
                    )}
                    menuRenderer={(closeMenu) => (
                      <LocationMenu
                        onClick={(item) => {
                          setLocationType(item.type);
                          formik.setFieldValue("type_id", item.id);
                          setLocationTypePlaceholder(
                            <SelectedLocationPlaceholder item={item} />
                          );
                          closeMenu();
                        }}
                      />
                    )}
                  />
                  <ErrorMessage
                    name="type_id"
                    component="p"
                    className="text-xs text-error mt-1"
                  />
                </div>

                <Input
                  name="display_name"
                  label="Display Name"
                  formik={formik}
                />
              </div>

              {locationType === formTypes.ONLINE && (
                <Input name="link" label="Link" formik={formik} />
              )}
              {locationType === formTypes.PHONE && (
                <Input
                  name="phone_number"
                  label="Phone Number"
                  formik={formik}
                />
              )}

              {locationType === formTypes.PERSON && (
                <InPersonForm formik={formik} />
              )}
            </ModalBody>
            <ModalFooter isLoading={false} className="justify-end border-none">
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
              {isLoading.create && <FormLoader className="hidden sm:block" />}
            </ModalFooter>
          </Form>
        )}
      </Formik>
      {isLoading.create && <FormLoader className="block sm:hidden" />}
    </Modal>
  );
};

export default CreateLocation;

import React, { useEffect, useState } from "react";
import useLocationStore from "../../../../../../store/provider/locationStore";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "../../../../../../components/ui/Modal";
import { createLocationSchema as validationSchema, formTypes } from "../../../../../../FormSchema/Provider/createLocation";
import Input from "../../../../../../components/ui/Input";
import Button from "../../../../../../components/ui/Button";
import Dropdown, { DropdownTrigger } from "../../../../../../components/ui/Dropdown";
import {
  LocationPlaceholder,
  SelectedLocationPlaceholder,
  LocationMenu,
} from "./components/LocationType";
import FormLoader from "../../../../../../components/ui/FormLoader";
import InPersonForm from "./components/InPersonForm";

const CreateLocation = ({ isOpen, onClose }) => {
  const { getLocationTypes, createLocation } = useLocationStore();
  const isLoading = useLocationStore((state) => state.isLoading.create);
  const isSuccess = useLocationStore((state) => state.isSuccess.create);

  const [locationType, setLocationType] = useState("");
  const [locationTypePlaceholder, setLocationTypePlaceholder] = useState(<LocationPlaceholder />);
  const [formData, setFormData] = useState({
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
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    getLocationTypes();
  }, [getLocationTypes]);

  const closeHandler = () => {
    setLocationType("");
    setLocationTypePlaceholder(<LocationPlaceholder />);
    setFormData({
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
    });
    setErrors({});
    onClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validate = () => {
    const validationErrors = {};
    const schema = validationSchema(locationType);

    Object.keys(formData).forEach((field) => {
      const error = schema[field]?.validate(formData[field]);
      if (error) {
        validationErrors[field] = error;
      }
    });

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const submitHandler = async () => {
    if (validate()) {
      await createLocation(locationType, formData);
      if (isSuccess) {
        closeHandler();
      }
    }
  };

  useEffect(() => {
    if (isSuccess) closeHandler();
  }, [isSuccess]);

  return (
    <Modal isOpen={isOpen} onClose={closeHandler}>
      <ModalHeader
        title="New Location"
        icon={<svg className="fill-context-dark/60 size-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 1V4H23V6H20V9H18V6H15V4H18V1H20ZM12 13C13.1 13 14 12.1 14 11C14 9.9 13.1 9 12 9C10.9 9 10 9.9 10 11C10 12.1 10.9 13 12 13ZM14 3.25V7H17V10H19.92C19.97 10.39 20 10.79 20 11.2C20 14.52 17.33 18.45 12 23C6.67 18.45 4 14.52 4 11.2C4 6.22 7.8 3 12 3C12.68 3 13.35 3.08 14 3.25Z" /></svg>}
        onClose={closeHandler}
      />
      <ModalBody className="flex flex-col gap-3 my-3">
        <div className="flex gap-3 flex-col sm:flex-row">
          <div className="w-full">
            <Dropdown
              className="max-h-[20rem] overflow-y-auto"
              trigger={(isOpen) => (
                <DropdownTrigger
                  label="Location Type"
                  isOpen={isOpen}
                  className="rounded-md"
                >
                  {locationTypePlaceholder}
                </DropdownTrigger>
              )}
              menuRenderer={(closeMenu) => (
                <LocationMenu
                  onClick={(item) => {
                    setLocationType(item.type);
                    setFormData((prevData) => ({
                      ...prevData,
                      type_id: item.id,
                    }));
                    setLocationTypePlaceholder(<SelectedLocationPlaceholder item={item} />);
                    closeMenu();
                  }}
                />
              )}
            />
            {errors.type_id && <p className="text-xs text-error mt-1">{errors.type_id}</p>}
          </div>

          <Input
            name="display_name"
            label="Display Name"
            value={formData.display_name}
            onChange={handleInputChange}
            error={errors.display_name}
          />
        </div>

        {locationType === formTypes.ONLINE && (
          <Input
            name="link"
            label="Link"
            value={formData.link}
            onChange={handleInputChange}
            error={errors.link}
          />
        )}
        {locationType === formTypes.PHONE && (
          <Input
            name="phone_number"
            label="Phone Number"
            value={formData.phone_number}
            onChange={handleInputChange}
            error={errors.phone_number}
          />
        )}

        {locationType === formTypes.PERSON && (
          <InPersonForm formData={formData} onChange={handleInputChange} />
        )}
      </ModalBody>
      <ModalFooter className="justify-end border-none">
        <div className="w-full sm:w-auto flex flex-col-reverse sm:flex-row items-center gap-3">
          <Button type="button" variant="outline" className="w-full sm:w-auto" onClick={closeHandler}>
            Cancel
          </Button>
          <Button type="button" className="w-full sm:w-auto" onClick={submitHandler}>
            Save
          </Button>
        </div>
        {isLoading && <FormLoader className="hidden sm:block" />}
      </ModalFooter>
    </Modal>
  );
};

export default CreateLocation;


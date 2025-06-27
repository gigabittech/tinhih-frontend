import { Globe, Lock, User2 } from "lucide-react";
import { useState } from "react";
import EditButton from "../components/EditButton";
import SettingsInput from "../components/SettingsInput";
import Title from "../components/Title";
import useUserStore from "../../../../store/global/userStore";
import { useForm } from "react-hook-form";
import axiosInstance from "../../../../lib/axiosInstanceWithToken";
import { Notify } from "../../../../components/ui/Toaster";
import countries_data from "../../../../data/countryData";

function Details() {
  const [editPersonalDetails, setEditPersonalDetails] = useState(false);
  const [editTimezone, setEditTimezone] = useState(false);
  const { user } = useUserStore();

  const {
    register: registerDetails,
    handleSubmit: handleSubmitDetails,
    reset: resetDetails,
  } = useForm({
    defaultValues: {
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      phone: user?.phone || "",
      email: user?.email || "",
    },
  });

  const {
    register: registerTimezone,
    handleSubmit: handleSubmitTimezone,
    reset: resetTimezone,
  } = useForm({
    defaultValues: {
      time_zone: user?.time_zone || "",
    },
  });

  const updateUserProfile = async (data) => {
    const response = await axiosInstance.put("/profile/settings", data);
    return response;
  };

  const onSubmitDetails = async (data) => {
    try {
      const response = await updateUserProfile(data);
      if (response.status === 200) {
        Notify(response.data.message);
        setEditPersonalDetails(false);
      }
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  const onSubmitTimezone = async (data) => {
    try {
      const response = await updateUserProfile(data);
      if (response.status === 200) {
        Notify(response.data.message);
        setEditTimezone(false);
      }
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  return (
    <div className="flex gap-5">
      {/* Left side */}
      <div className="w-[50%]">
        <div className="bg-white rounded-lg p-6">
          <div className="flex justify-between items-center">
            <Title icon={<User2 />} title="Calendar details" />
            <EditButton
              isEditMode={editPersonalDetails}
              onClose={() => {
                setEditPersonalDetails(false);
                resetDetails();
              }}
              onOpen={() => setEditPersonalDetails(true)}
            />
          </div>

          <div className="flex items-center justify-center py-10">
            <div className="w-40 h-40 rounded-full bg-primary-500 flex items-center justify-center text-white text-6xl font-bold">
              DP
            </div>
          </div>

          <form
            onSubmit={handleSubmitDetails(onSubmitDetails)}
            className="grid gap-5"
          >
            <div className="grid grid-cols-2 gap-5">
              <SettingsInput
                label="First name"
                defaultValue={user?.first_name}
                isEditMode={editPersonalDetails}
                register={registerDetails}
                name="first_name"
              />
              <SettingsInput
                label="Last name"
                defaultValue={user?.last_name}
                isEditMode={editPersonalDetails}
                register={registerDetails}
                name="last_name"
              />
            </div>
            <div className="grid grid-cols-2 gap-5">
              <SettingsInput
                label="Email"
                defaultValue={user?.email}
                isEditMode={editPersonalDetails}
                register={registerDetails}
                name="email"
              />
              <SettingsInput
                label="Phone number"
                defaultValue={user?.phone}
                isEditMode={editPersonalDetails}
                register={registerDetails}
                name="phone"
              />
            </div>

            {editPersonalDetails && (
              <div className="flex justify-end gap-3 pt-5">
                <button
                  type="button"
                  onClick={() => {
                    setEditPersonalDetails(false);
                    resetDetails();
                  }}
                  className="px-3 py-1 rounded border border-gray-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 rounded border border-primary-500 bg-primary-500 text-white font-bold cursor-pointer"
                >
                  Save
                </button>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Right side */}
      <div className="w-[50%]">
        {/* Timezone */}
        <div className="bg-white rounded-lg p-6 mb-5">
          <div className="flex justify-between items-center">
            <Title icon={<Globe />} title="Language and timezone" />
            <EditButton
              isEditMode={editTimezone}
              onClose={() => {
                setEditTimezone(false);
                resetTimezone();
              }}
              onOpen={() => setEditTimezone(true)}
            />
          </div>

          <form
            onSubmit={handleSubmitTimezone(onSubmitTimezone)}
            className="grid gap-5"
          >
            <p>Manage settings for your language and timezone</p>
            <div className="grid grid-cols-2 gap-5">
              <SettingsInput
                label="Timezone"
                defaultValue={user?.time_zone}
                isEditMode={editTimezone}
                register={registerTimezone}
                name="time_zone"
                showDropdownIcon={true}
                dropdownOptions={countries_data}
                optionLabelKey="name"
                optionValueKey="name"
              />
            </div>
            {editTimezone && (
              <div className="flex justify-end gap-3 pt-5">
                <button
                  type="button"
                  onClick={() => {
                    setEditTimezone(false);
                    resetTimezone();
                  }}
                  className="px-3 py-1 rounded border border-gray-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 rounded border border-primary-500 bg-primary-500 text-white font-bold cursor-pointer"
                >
                  Save
                </button>
              </div>
            )}
          </form>
        </div>

        {/* MFA */}
        <div className="bg-white rounded-lg p-6">
          <Title icon={<Lock />} title="Multi-Factor Authentication (MFA)" />
          <p>
            Secure your account by enabling Multi-Factor Authentication (MFA)
            for an extra layer of protection. Verify your identity through a
            secondary method to prevent unauthorized access.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Details;

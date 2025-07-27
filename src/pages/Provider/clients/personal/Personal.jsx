import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router";
import axiosInstance from "../../../../lib/axiosInstanceWithToken";
import { IoIosArrowForward } from "react-icons/io";
import Avatar from "../../../../components/ui/Avatar";
import Title from "../../settings/components/Title";
import SettingsInput from "../../settings/components/SettingsInput";
import EditButton from "../../settings/components/EditButton";
import { FaSquarePlus } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { Notify } from "../../../../components/ui/Toaster";
import useClientStore from "../../../../store/provider/clientStore";

function Personal() {
  const params = useParams();
  const id = params?.clientId;
  const [client, setClient] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const tabs = [{ label: "personal", path: `/clients/${id}/profile` }];

  const [editName, setEditName] = useState(false);
  const [editAbout, setEditAbout] = useState(false);
  const [editContact, setEditContact] = useState(false);
  const [editDetails, setEditDetails] = useState(false);

  const { fetchClients } = useClientStore();

  const {
    register,
    handleSubmit,
    reset,
    getValues,
  } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      dob: "",
      sex: "",
      relationship: "",
      emp_status: "",
      ethnicity: "",
      note: "",
      phone: "",
      email: "",
      status: "",
    },
  });

  // Fetch client data and update form defaults & state
  useEffect(() => {
    const fetchClients = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get(`/clients/${id}`);
        if (response.status === 200) {
          const clientData = response?.data?.clients || {};
          setClient(clientData);

          // Update form default values with fetched client data
          reset({
            first_name: clientData.first_name || "",
            last_name: clientData.last_name || "",
            dob: clientData.dob || "",
            sex: clientData.sex || "",
            relationship: clientData.relationship || "",
            emp_status: clientData.emp_status || "",
            ethnicity: clientData.ethnicity || "",
            note: clientData.note || "",
            phone: clientData.phone || "",
            email: clientData.email || "",
            status: clientData.status || "",
          });
        }
      } catch (error) {
        console.error("Failed to fetch clients:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClients();
  }, [id, reset]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  // Shared submit handler for all sections
  const onSubmit = async (data) => {
    const values = getValues();

    // Required fields
    const requiredFields = ["first_name", "last_name", "status", "phone"];
    const missingFields = requiredFields.filter(
      (field) => !values[field]?.trim()
    );

    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(", ")}`);
      return;
    }
    try {
      const response = await axiosInstance.put(`/clients/${id}`, data);
      if (response.status === 200) {
        // Update local client state and reset form with latest data
        const updatedClient = response.data.clients || data;
        setClient(updatedClient);
        reset(updatedClient);
        fetchClients()


        // Close all edit modes after save
        setEditName(false);
        setEditAbout(false);
        setEditContact(false);
        setEditDetails(false);
        Notify(response.data.message);
      }
    } catch (error) {
      console.error("Failed to update client:", error);
    }
  };

  return (
    <div>
      <header className="pb-5">
        <Link
          to={"/clients"}
          className="mb-2 flex items-center gap-3 text-primary-800 px-10"
        >
          Clients <IoIosArrowForward size={10} />
        </Link>
        <div className="flex items-center gap-3 px-10">
          <Avatar name={client.first_name + " " + client.last_name} />
          <p className="font-bold text-2xl">
            {client?.first_name + " " + client?.last_name}
          </p>
          <p className="text-sm bg-amber-200 px-1 rounded">{client?.status}</p>
        </div>
      </header>

      {/* ----------- Tabs ----------- */}
      {tabs.length > 0 && (
        <nav className="border-b border-[#dedede] flex px-10">
          {tabs.map((tab, index) => (
            <Link key={index} to={tab.path}>
              <button
                className={`pb-3 border-b-2 px-3 cursor-pointer ${
                  isActive(tab.path)
                    ? "border-primary-600"
                    : "border-transparent"
                }`}
              >
                {tab.label}
              </button>
            </Link>
          ))}
        </nav>
      )}

      {/* --------------------- main--------------------- */}
      <div className="flex gap-5 bg-gray-100 min-h-screen px-10 py-5">
        {/* Left side */}
        <div className="w-[50%] flex flex-col gap-5">
          {/* ---------------- name--------------- */}
          <div className="bg-white rounded-lg p-6">
            <div className="flex justify-between items-center">
              <Title icon={<FaSquarePlus />} title="Name" />
              <EditButton
                isEditMode={editName}
                onClose={() => {
                  setEditName(false);
                  reset(client); // reset form to client values on cancel
                }}
                onOpen={() => setEditName(true)}
              />
            </div>

            <div className="grid gap-5 pt-5">
              <div className="grid grid-cols-2 gap-5">
                <SettingsInput
                  label="First name"
                  defaultValue={client?.first_name}
                  isEditMode={editName}
                  register={register}
                  name="first_name"
                />
                <SettingsInput
                  label="Last name"
                  defaultValue={client?.last_name}
                  isEditMode={editName}
                  register={register}
                  name="last_name"
                />
              </div>
              {editName && (
                <div className="flex justify-end gap-3 pt-5">
                  <button
                    type="button"
                    onClick={() => {
                      setEditName(false);
                      reset(client);
                    }}
                    className="px-3 py-1 rounded border border-gray-300 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit(onSubmit)}
                    className="px-3 py-1 rounded border border-primary-500 bg-primary-500 text-white font-bold cursor-pointer"
                  >
                    Save
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ----------------- about-------------- */}
          <div className="bg-white rounded-lg p-6">
            <div className="flex justify-between items-center">
              <Title icon={<FaSquarePlus />} title="About Client" />
              <EditButton
                isEditMode={editAbout}
                onClose={() => {
                  setEditAbout(false);
                  reset(client);
                }}
                onOpen={() => setEditAbout(true)}
              />
            </div>

            <div className="grid gap-5 pt-5">
              <div className="grid grid-cols-2 gap-5">
                <SettingsInput
                  label="Date of birth"
                  defaultValue={client?.dob}
                  isEditMode={editAbout}
                  register={register}
                  name="dob"
                  type="date"
                />
                <SettingsInput
                  label="Gender"
                  defaultValue={client?.sex}
                  isEditMode={editAbout}
                  register={register}
                  name="sex"
                  showDropdownIcon={true}
                  dropdownOptions={[
                    { gender: "", label: "" },
                    { gender: "male", label: "Male" },
                    { gender: "female", label: "Female" },
                    { gender: "other", label: "Other" },
                  ]}
                  optionLabelKey="label"
                  optionValueKey="gender"
                />
                <SettingsInput
                  label="Relationship Status"
                  defaultValue={client?.relationship}
                  isEditMode={editAbout}
                  register={register}
                  name="relationship"
                />
                <SettingsInput
                  label="Employment Status"
                  defaultValue={client?.emp_status}
                  isEditMode={editAbout}
                  register={register}
                  name="emp_status"
                />
                <SettingsInput
                  label="Ethnicity"
                  defaultValue={client?.ethnicity}
                  isEditMode={editAbout}
                  register={register}
                  name="ethnicity"
                />
                <SettingsInput
                  label="Client Notes"
                  defaultValue={client?.note}
                  isEditMode={editAbout}
                  register={register}
                  name="note"
                />
              </div>
              {editAbout && (
                <div className="flex justify-end gap-3 pt-5">
                  <button
                    type="button"
                    onClick={() => {
                      setEditAbout(false);
                      reset(client);
                    }}
                    className="px-3 py-1 rounded border border-gray-300 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit(onSubmit)}
                    className="px-3 py-1 rounded border border-primary-500 bg-primary-500 text-white font-bold cursor-pointer"
                  >
                    Save
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="w-[50%]">
          {/* ------------contact ------------------ */}
          <div className="bg-white rounded-lg p-6">
            <div className="flex justify-between items-center">
              <Title icon={<FaSquarePlus />} title="Contact Details" />
              <EditButton
                isEditMode={editContact}
                onClose={() => {
                  setEditContact(false);
                  reset(client);
                }}
                onOpen={() => setEditContact(true)}
              />
            </div>

            <div className="grid gap-5 pt-5">
              <div className="grid grid-cols-1 gap-5">
                <SettingsInput
                  label="Phone number"
                  defaultValue={client?.phone}
                  isEditMode={editContact}
                  register={register}
                  name="phone"
                />

                <SettingsInput
                  label="Email"
                  defaultValue={client?.email}
                  isEditMode={editContact}
                  register={register}
                  name="email"
                  type="email"
                />
              </div>
              {editContact && (
                <div className="flex justify-end gap-3 pt-5">
                  <button
                    type="button"
                    onClick={() => {
                      setEditContact(false);
                      reset(client);
                    }}
                    className="px-3 py-1 rounded border border-gray-300 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit(onSubmit)}
                    className="px-3 py-1 rounded border border-primary-500 bg-primary-500 text-white font-bold cursor-pointer"
                  >
                    Save
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ---------- status ---------- */}
          <div className="bg-white rounded-lg p-6 mt-5">
            <div className="flex justify-between items-center">
              <Title icon={<FaSquarePlus />} title="Provider Details" />
              <EditButton
                isEditMode={editDetails}
                onClose={() => {
                  setEditDetails(false);
                  reset(client);
                }}
                onOpen={() => setEditDetails(true)}
              />
            </div>

            <div className="grid gap-5 pt-5">
              <div className="grid grid-cols-1 gap-5">
                <SettingsInput
                  label="Status"
                  defaultValue={client?.status}
                  isEditMode={editDetails}
                  register={register}
                  name="status"
                  showDropdownIcon={true}
                  dropdownOptions={[
                    { label: "Lead", value: "lead" },
                    { label: "Wait List", value: "wait list" },
                    { label: "Active", value: "active" },
                    { label: "Inactive", value: "inactive" },
                    { label: "Blocked", value: "blocked" },
                  ]}
                  optionLabelKey="label"
                  optionValueKey="value"
                />
              </div>
              {editDetails && (
                <div className="flex justify-end gap-3 pt-5">
                  <button
                    type="button"
                    onClick={() => {
                      setEditDetails(false);
                      reset(client);
                    }}
                    className="px-3 py-1 rounded border border-gray-300 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit(onSubmit)}
                    className="px-3 py-1 rounded border border-primary-500 bg-primary-500 text-white font-bold cursor-pointer"
                  >
                    Save
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Personal;

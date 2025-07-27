import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../lib/axiosInstanceWithToken";
import { Link, useLocation, useParams } from "react-router";
import { IoIosArrowForward } from "react-icons/io";
import Avatar from "../../../../components/ui/Avatar";
import SettingsInput from "../../settings/components/SettingsInput";
import Title from "../../settings/components/Title";
import { FaSquarePlus } from "react-icons/fa6";
import EditButton from "../../settings/components/EditButton";
import { useForm } from "react-hook-form";
import useTeamMemberStore from "../../../../store/provider/teamMemberStore";
import { Notify } from "../../../../components/ui/Toaster";

function TeamMemberPersonal() {
  const params = useParams();
  const id = params?.memberId;
  const [member, setMember] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [editAbout, setEditAbout] = useState(false);
  const { fetchMembers } = useTeamMemberStore();

  const { register, handleSubmit, reset,} = useForm({
    defaultValues: {
      workspace_id: member?.workspace_id,
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      job_title: "",
      npi: "",
      taxonomy: "",
    },
  });

  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const tabs = [{ label: "personal", path: `/your-team/${id}/profile` }];

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await axiosInstance.get(`/members/${id}`);
        if (response.status === 200) {
          const data = response.data.member;
          setMember(data);
          reset(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch team member:", error.message);
        setIsLoading(false);
      }
    };

    fetchMember();
  }, [id, reset]);

  const onSubmit = (formData) => {
    const requiredFields = ["first_name", "last_name"];
    const missing = requiredFields.filter((field) => !formData[field]?.trim());

    if (missing.length > 0) {
      alert(`Please fill in required fields: ${missing.join(", ")}`);
      return;
    }

    axiosInstance
      .put(`/members/${id}`, formData)
      .then((res) => {
        if (res.status === 200) {
          setEditAbout(false);
          setMember(res.data.member);
          reset(res.data.member);
          Notify(res.data.message)
          fetchMembers()
        }
      })
      .catch((err) => {
        console.error("Update failed:", err.message);
      });
  };

  if (isLoading) return null;

  return (
    <div>
      <header className="pb-5">
        <Link
          to={"/your-team"}
          className="mb-2 flex items-center gap-3 text-primary-800 px-10"
        >
          Your team <IoIosArrowForward size={10} />
        </Link>
        <div className="flex items-center gap-3 px-10">
          <Avatar name={`${member.first_name} ${member.last_name}`} />
          <p className="font-bold text-2xl">{`${member.first_name} ${member.last_name}`}</p>
          <p className="text-sm bg-amber-200 px-1 rounded">{member?.status}</p>
        </div>
      </header>

      {/* Tabs */}
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

      {/* Main */}
      <div className="flex gap-5 bg-gray-100 min-h-screen px-10 py-5">
        <div className="w-[50%] flex flex-col gap-5">
          <div className="bg-white rounded-lg p-6">
            <div className="flex justify-between items-center">
              <Title icon={<FaSquarePlus />} title="About Team Member" />
              <EditButton
                isEditMode={editAbout}
                onClose={() => {
                  setEditAbout(false);
                  reset(member);
                }}
                onOpen={() => setEditAbout(true)}
              />
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5 pt-5">
              <div className="grid grid-cols-2 gap-5">
                <SettingsInput
                  label="First name"
                  defaultValue={member?.first_name}
                  isEditMode={editAbout}
                  register={register}
                  name="first_name"
                />
                <SettingsInput
                  label="Last name"
                  defaultValue={member?.last_name}
                  isEditMode={editAbout}
                  register={register}
                  name="last_name"
                />
                <SettingsInput
                  label="Email"
                  defaultValue={member?.email}
                  isEditMode={editAbout}
                  name="email"
                  type="email"
                  disabled
                />
                <SettingsInput
                  label="Phone number"
                  defaultValue={member?.phone_number}
                  isEditMode={editAbout}
                  register={register}
                  name="phone_number"
                />
                <SettingsInput
                  label="Job Title"
                  defaultValue={member?.job_title}
                  isEditMode={editAbout}
                  register={register}
                  name="job_title"
                />
                <SettingsInput
                  label="National Provider Identifier"
                  defaultValue={member?.npi}
                  isEditMode={editAbout}
                  register={register}
                  name="npi"
                />
                <SettingsInput
                  label="Taxonomy Code"
                  defaultValue={member?.taxonomy}
                  isEditMode={editAbout}
                  register={register}
                  name="taxonomy"
                />
              </div>

              {editAbout && (
                <div className="flex justify-end gap-3 pt-5">
                  <button
                    type="button"
                    onClick={() => {
                      setEditAbout(false);
                      reset(member);
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
      </div>
    </div>
  );
}

export default TeamMemberPersonal;

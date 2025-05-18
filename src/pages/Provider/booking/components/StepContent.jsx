import { IoIosArrowForward } from "react-icons/io";
import useServiceStore from "../../../../store/provider/serviceStore";
import { useEffect } from "react";
import { IoMdVideocam } from "react-icons/io";
import Input from "./Input";
import { PhoneNumberInput } from "../../../../components/ui/PhoneNumberInput";
import { useForm } from "react-hook-form";
import DateAndTime from "./DateAndTime";

const StepContent = ({ step }) => {
  const { services, fetchServices } = useServiceStore();

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  switch (step) {
    case 0:
      return (
        <div className=" flex justify-center">
          {
            <div className="grid grid-cols-1 mt-20">
              <div className="border-b p-5 border-gray-300 flex items-center gap-80 hover:bg-amber-100 cursor-pointer">
                Returning client
                <IoIosArrowForward />
              </div>
              <div className="p-5 flex gap-80 justify-between items-center hover:bg-amber-100 cursor-pointer">
                New client
                <IoIosArrowForward />
              </div>
            </div>
          }
        </div>
      );
    case 1:
      return (
        <div className=" flex justify-center">
          <div className=" grid grid-cols-2 gap-5 mt-20">
            {services.map((s, index) => (
              <div
                key={index}
                className=" hover:bg-amber-300 flex items-center gap-60 p-5 border-b border-gray-200"
              >
                {s.service_name} <IoIosArrowForward />
              </div>
            ))}
          </div>
        </div>
      );
    case 2:
      return (
        <div className=" flex justify-center pt-20">
          <div className="flex items-center justify-between w-[40%] bg-amber-100 rounded p-3">
            <div className=" flex items-center gap-3">
              <span className=" p-3 bg-amber-200 rounded">
                <IoMdVideocam size={20} />
              </span>
              <div>
                <p className=" font-semibold">Online</p>
                <p>Video conference</p>
              </div>
            </div>
            <IoIosArrowForward />
          </div>
        </div>
      );
    case 3:
      return <DateAndTime />;
    case 4:
      return (
        <div className=" flex justify-center pt-20">
          <div className="w-[50%]">
            <div className="  grid grid-cols-2 gap-5">
              <Input type={"text"} label={"First name*"} />
              <Input type={"text"} label={"Last name*"} />
              <PhoneNumberInput
                register={register}
                setValue={setValue}
                watch={watch}
                errors={errors}
              />
              <Input type={"email"} label={"Email address*"} />
            </div>
            <div className="grid pt-5">
              <label className="text-sm">Add message</label>
              <textarea
                rows={5}
                cols={5}
                className="border rounded border-gray-400 px-2 py-1 outline-none focus:border-primary-600"
              />
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default StepContent;

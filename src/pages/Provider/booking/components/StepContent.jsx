import { IoIosArrowForward } from "react-icons/io";
import { IoMdVideocam } from "react-icons/io";
import Input from "./Input";
import { PhoneNumberInput } from "../../../../components/ui/PhoneNumberInput";
import { useForm } from "react-hook-form";
import DateAndTime from "./DateAndTime";
import useBookAppointments from "../services/useBookAppointments";
import useUserStore from "../../../../store/global/userStore";
import useBookingStore from "../../../../store/provider/bookingStore";

const StepContent = ({ step, setCurrentStep }) => {
  const { services, locations } = useBookAppointments();
  const { user } = useUserStore();
  const { setSelectedService, setSelectedLocation } = useBookingStore();

  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  switch (step) {
    case 0:
      return (
        <div className="flex justify-center">
          <div className="grid grid-cols-1 mt-20">
            <div
              onClick={() => setCurrentStep(step + 1)}
              className="border-b p-5 border-gray-300 flex items-center gap-80 hover:bg-amber-100 cursor-pointer"
            >
              Returning client <IoIosArrowForward />
            </div>
            <div
              onClick={() => setCurrentStep(step + 1)}
              className="p-5 flex gap-80 justify-between items-center hover:bg-amber-100 cursor-pointer"
            >
              New client <IoIosArrowForward />
            </div>
          </div>
        </div>
      );

    case 1:
      return (
        <div className="flex justify-center">
          <div className="grid grid-cols-2 gap-5 mt-20">
            {services?.map((s, index) => (
              <div
                key={index}
                onClick={() => {
                  setSelectedService(s);
                  setCurrentStep(step + 1);
                }}
                className="hover:bg-amber-300 flex items-center gap-60 p-5 border-b border-gray-200 cursor-pointer"
              >
                {s.service_name} <IoIosArrowForward />
              </div>
            ))}
          </div>
        </div>
      );

    case 2:
      return (
        <div className="flex justify-center pt-20">
          <div className="grid gap-5 w-[60%]">
            {locations.map((loc, index) => (
              <div
                key={index}
                onClick={() => {
                  setSelectedLocation(loc);
                  setCurrentStep(step + 1);
                }}
                className="flex items-center justify-between bg-amber-100 rounded p-3 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="p-3 bg-amber-200 rounded">
                    <IoMdVideocam size={20} />
                  </span>
                  <div>
                    <p className="font-semibold">{loc.display_name}</p>
                    <p className="text-sm text-gray-600">{loc.type.name}</p>
                  </div>
                </div>
                <IoIosArrowForward />
              </div>
            ))}
          </div>
        </div>
      );

    case 3:
      return <DateAndTime />;

    case 4:
      return (
        <form className="flex justify-center pt-20">
          <div className="w-[50%]">
            <div className="grid grid-cols-2 gap-5">
              <Input
                type="text"
                label="First name*"
                value={user.first_name}
                disabled
              />
              <Input
                type="text"
                label="Last name*"
                value={user.last_name}
                disabled
              />
              <PhoneNumberInput
                register={register}
                setValue={setValue}
                watch={watch}
                errors={errors}
                defaultValue={user.phone}
              />
              <Input
                type="email"
                label="Email address*"
                value={user.email}
                disabled
              />
            </div>
            <div className="grid pt-5">
              <label className="text-sm">Add message</label>
              <textarea
                {...register("message")}
                rows={5}
                cols={5}
                className="border rounded border-gray-400 px-2 py-1 outline-none focus:border-primary-600"
              />
            </div>
          </div>
        </form>
      );

    default:
      return null;
  }
};

export default StepContent;

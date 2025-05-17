import { IoIosArrowForward } from "react-icons/io";
import useServiceStore from "../../../../store/provider/serviceStore";
import { useEffect, useState } from "react";

const StepContent = ({ step }) => {
  const [clientType, setClientType] = useState("");
  const { services, fetchServices } = useServiceStore();

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  console.log(services);

  switch (step) {
    case 0:
      return (
        <div className=" flex justify-center">
          {clientType === "" ? (
            <div className="grid grid-cols-1 mt-20">
              <div
                onClick={() => setClientType("returning")}
                className="border-b p-5 border-gray-300 flex items-center gap-80 hover:bg-amber-100 cursor-pointer"
              >
                Returning client
                <IoIosArrowForward />
              </div>
              <div
                onClick={() => setClientType("new")}
                className="p-5 flex gap-80 justify-between items-center hover:bg-amber-100 cursor-pointer"
              >
                New client
                <IoIosArrowForward />
              </div>
            </div>
          ) : (
            <div className=" grid grid-cols-2 gap-5 mt-20">
              {services.map((s, index) => (
                <div key={index} className=" hover:bg-amber-300 flex items-center gap-60 p-5 border-b border-gray-200">
                  {s.service_name} <IoIosArrowForward />
                </div>
              ))}
            </div>
          )}
        </div>
      );
    case 1:
      return <div>📍 Choose a location</div>;
    case 2:
      return <div>👨‍⚕️ Select staff</div>;
    case 3:
      return <div>📅 Pick a date and time</div>;
    case 4:
      return <div>📧 Enter contact details</div>;
    default:
      return null;
  }
};

export default StepContent;

import { IoIosArrowForward } from "react-icons/io";

const StepContent = ({ step }) => {
  switch (step) {
    case 0:
      return (
        <div className=" flex justify-center">
          <div className="grid grid-cols-1 mt-20">
            <div className="border-b p-5 border-gray-300 flex items-center gap-60 hover:bg-amber-100 cursor-pointer">
              Returning client
              <IoIosArrowForward />
            </div>
            <div className="p-5 flex gap-60 justify-between items-center hover:bg-amber-100 cursor-pointer">
              New client
              <IoIosArrowForward />
            </div>
          </div>
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

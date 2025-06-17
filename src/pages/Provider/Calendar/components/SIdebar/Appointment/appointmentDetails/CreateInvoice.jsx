import { CgClose } from "react-icons/cg";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaFileInvoice } from "react-icons/fa";

function CreateInvoice({ isOpen, onClose }) {
  return (
    <div
      className={`${
        isOpen ? " h-auto w-auto" : "hidden"
      } fixed inset-0 z-[202] transition-all duration-300 bg-gray-200`}
    >
      <p className="bg-primary-600 px-10 py-3">
        <CgClose
          onClick={onClose}
          size={20}
          fontWeight={20}
          className="text-white cursor-pointer "
        />
      </p>
      <div className="bg-white px-5 py-3 border-b border-gray-200">
        <p className="flex items-center gap-3">
          Billing <MdKeyboardArrowRight size={20} />
          <span className=" text-primary-700">Bobby Doe</span>
        </p>
        <div className="pt-3 flex items-center gap-3">
          <span className="p-2 rounded bg-gray-100">
            <FaFileInvoice size={20}/>
          </span>
          <p className="text-2xl font-bold">Invoice 11110</p>
          <p className=" bg-orange-200 px-3 rounded text-sm">Unpaid</p>
        </div>
      </div>
    </div>
  );
}

export default CreateInvoice;

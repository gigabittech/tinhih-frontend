import { CgClose } from "react-icons/cg";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaFileInvoice } from "react-icons/fa";
import { HiCurrencyDollar } from "react-icons/hi2";
import { BiSolidPencil } from "react-icons/bi";
import { RxDotsVertical } from "react-icons/rx";
import { useState } from "react";
import EditInvoice from "./EditInvoice";
import DropDown from "./components/DropDown";
import useInvoice from "../utilities/useInvoice";
import useUserStore from "../../../../store/global/userStore";
import InvoicePreview from "./components/InvoicePreview";

function ViewInvoice({ isOpen, onClose, invoice_id }) {
  const [editInvoice, setEditInvoice] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { invoiceData, loading } = useInvoice(invoice_id);
  const { user } = useUserStore();

  if (loading) return null;


  return (
    <div
      className={`${
        isOpen ? "h-auto w-auto" : "hidden"
      } fixed inset-0 z-[202] transition-all duration-300 bg-gray-200`}
    >
      {/* -----------Closing button-------------- */}
      <p className="bg-primary-600 px-10 py-3">
        <CgClose
          onClick={onClose}
          size={20}
          fontWeight={20}
          className="text-white cursor-pointer "
        />
      </p>
      {/* -------------------header----------------------- */}
      <div className="bg-white px-5 py-3 border-b border-gray-200">
        <p className="flex items-center gap-3">
          Billing <MdKeyboardArrowRight size={20} />
          <span className=" text-primary-700">{invoiceData?.client.email}</span>
        </p>
        <div className="flex items-center justify-between">
          <div className="pt-3 flex items-center gap-3">
            <span className="p-2 rounded bg-gray-100">
              <FaFileInvoice size={20} />
            </span>
            <p className="text-2xl font-bold">
              Invoice {invoiceData?.serial_number}
            </p>
            {invoiceData?.is_paid === 0 ? (
              <p className=" bg-orange-200 px-3 rounded text-sm">Unpaid</p>
            ) : (
              <p className=" bg-green-200 px-3 rounded text-sm">Paid</p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-primary-600 font-bold text-white px-3 py-2 rounded  cursor-not-allowed">
              <HiCurrencyDollar size={20} />
              Mark as paid
            </button>
            <button
              onClick={() => setEditInvoice(true)}
              className=" text-gray-500 w-10 h-10 bg-gray-100 flex items-center justify-center rounded  cursor-pointer"
            >
              <BiSolidPencil size={25} />
            </button>
            <div className=" relative">
              <button
                onClick={() => setIsDropdownOpen(true)}
                className=" text-gray-500 w-10 h-10 bg-gray-100 flex items-center justify-center rounded  cursor-pointer"
              >
                <RxDotsVertical size={20} />
              </button>
              <DropDown
                isOpen={isDropdownOpen}
                onClose={() => setIsDropdownOpen(false)}
                serial_number={invoiceData?.serial_number}
                id={invoiceData?.id}
                onCloseViewInvoice={onClose}
                currentWorkspace={user?.currentWorkspace?.businessName}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ------------------ main ------------------------ */}

      <InvoicePreview invoiceData={invoiceData} currentWorkspace={user?.currentWorkspace?.businessName} className={"w-[90%] xl:w-[60%] 2xl:w-[40%]"}/>

      <EditInvoice
        isOpen={editInvoice}
        onClose={() => {
          setEditInvoice(false);
        }}
        invoiceId={invoice_id}
        onCloseViewInvoice={onClose}
      />
    </div>
  );
}

export default ViewInvoice;

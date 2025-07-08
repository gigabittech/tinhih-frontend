import { CgClose } from "react-icons/cg";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaFileInvoice } from "react-icons/fa";
import { HiCurrencyDollar } from "react-icons/hi2";
import { BiSolidPencil } from "react-icons/bi";
import { RxDotsVertical } from "react-icons/rx";
import { useState } from "react";
import EditInvoice from "./EditInvoice";
import DropDown from "./components/DropDown";
import useInvoice from "../services/useInvoice";

function ViewInvoice({ isOpen, onClose, invoice_id }) {
  const [editInvoice, setEditInvoice] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { invoiceData, loading } = useInvoice(invoice_id);

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
            <button className="flex items-center gap-2 bg-primary-600 font-bold text-white px-3 py-2 rounded  cursor-pointer">
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
              />
            </div>
          </div>
        </div>
      </div>

      {/* ------------------ main ------------------------ */}

      <div className="w-[40%] mx-auto mt-10 h-screen bg-white rounded-lg p-10">
        <header className="text-end">
          <h1 className="text-4xl font-medium">Invoice</h1>
          <p className="text-sm">Workspace name</p>
        </header>
        <main className="py-5 border-t border-gray-200 mt-5">
          <div className="flex justify-between text-sm">
            <div>
              <h6 className=" font-bold mb-2">Bill to</h6>
              <p>{invoiceData?.biller?.email}</p>
            </div>
            <div>
              <h6 className=" font-bold mb-2">Client</h6>
              <p>Client name</p>
              <p>0000000000</p>
              <p>{invoiceData?.client?.email}</p>
            </div>
            <div>
              <h6>
                <span className=" font-bold">Invoice</span>&nbsp; #
                {invoiceData?.serial_number}
              </h6>
              <p className="my-2">
                <span className=" font-bold">Date issued </span>&nbsp;{" "}
                {invoiceData?.issue_date}
              </p>
              <p>
                <span className=" font-bold">Due date </span>&nbsp;{" "}
                {invoiceData?.due_date}
              </p>
            </div>
          </div>
          <table className="w-full my-5">
            <thead>
              <tr className="bg-amber-100">
                <th className="ps-5 py-2 text-left">Date</th>
                <th className="text-left">Service</th>
                <th className="text-left">Code</th>
                <th className="text-left">Units</th>
                <th className="text-left">Price</th>
                <th className="text-left">Tax</th>
                <th className="text-left">Amount</th>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="ps-5 py-4 text-left"> </td>
                <td className="text-left">{invoiceData?.services[0]?.id}</td>
                <td className="text-left">{invoiceData?.services[0]?.code}</td>
                <td className="text-left">{invoiceData?.services[0]?.unit}</td>
                <td className="text-left">
                  BDT {invoiceData?.services[0]?.price}
                </td>
                <td className="text-left">{invoiceData?.services[0]?.tax}</td>
                <td className="text-left">
                  BDT {invoiceData?.services[0]?.amount}
                </td>
              </tr>
            </thead>
          </table>
          <div className="flex justify-end">
            <table className=" w-[300px]">
              <tbody>
                <tr className="border-b border-gray-200 text-sm">
                  <td className="text-end pb-2">Subtotal</td>
                  <td className="text-end pb-2 font-medium">
                    BDT {invoiceData?.subtotal}
                  </td>
                </tr>
                <tr>
                  <td className="text-end pt-2 font-semibold text-sm">
                    Total (BDT)
                  </td>
                  <td className="text-end pt-2 font-bold">
                    BDT {invoiceData?.subtotal}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
        <footer className="text-sm">
          <p className=" font-bold">Practitioner</p>
          <p>first_name last_name</p>
          <p>{invoiceData?.client?.email}</p>
        </footer>
      </div>

      <EditInvoice
        isOpen={editInvoice}
        onClose={() => {
          setEditInvoice(false);
          onClose()
        }}
        invoiceId={invoice_id}
      />
    </div>
  );
}

export default ViewInvoice;

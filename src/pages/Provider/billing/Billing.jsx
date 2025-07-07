import { CircleDollarSign, Plus } from "lucide-react";
import { useState } from "react";
import InvoiceTab from "./components/InvoiceTab";
import CreateInvoice from "./components/CreateInvoice";

function Billing() {
  const [tab, setTab] = useState(0);
  const [openInvoice, setOpenInvoice] = useState(false);

  return (
    <div>
      <CreateInvoice
        isOpen={openInvoice}
        onClose={() => setOpenInvoice(false)}
      />
      {/* -----------header------------- */}
      <header className=" px-10 pb-5">
        <div className="flex justify-between items-center gap-3 ">
          <div className="flex items-center gap-3 text-2xl">
            <span className=" p-2 bg-amber-100 text-[#6e6e6e]">
              {" "}
              <CircleDollarSign />
            </span>
            <p className=" font-bold">Billing</p>
          </div>
          <button
            onClick={() => setOpenInvoice(true)}
            className=" bg-primary-700 font-semibold text-white px-3 py-1 rounded hover:bg-primary-800 cursor-pointer flex items-center gap-2"
          >
            <Plus size={18} /> New invoice
          </button>
        </div>
      </header>

      {/* -------------------- button to switch tabs---------------- */}
      <div className="border-b border-[#dedede] flex px-10">
        <button
          onClick={() => setTab(0)}
          className={`${
            tab === 0 ? "border-primary-600" : "border-transparent"
          } pb-3 border-b-2 px-3 cursor-pointer`}
        >
          Invoices
        </button>
        <button
          onClick={() => setTab(1)}
          className={`${
            tab === 1 ? "border-primary-600" : "border-transparent"
          } pb-3 border-b-2 px-3 cursor-pointer`}
        >
          Payments
        </button>
      </div>

      {/* --------------------------tabs--------------------- */}
      <div className=" bg-gray-100 h-svh">
        {tab === 0 ? (
          <InvoiceTab />
        ) : (
          <div className="flex justify-center items-center">
            <div className=" absolute top-1/2 grid gap-10 justify-center">
              <h1 className=" text-xl">Automate your billing and Payments</h1>
              <div className=" flex justify-center">
                <button
                  onClick={() => setOpenInvoice(true)}
                  className=" bg-primary-700 font-semibold text-white px-3 py-1 rounded hover:bg-primary-800 flex items-center gap-2"
                >
                  <Plus size={18} /> New invoice
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Billing;

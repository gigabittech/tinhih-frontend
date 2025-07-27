import React from "react";
import dateFormatToDDMMMYYYY from "../../../../../hook/dateFormatToDDMMMYYYY";

const InvoicePreview = ({ currentWorkspace, invoiceData, className }) => {
  return (
    <div
      className={`${className} mx-auto mt-10 rounded-lg p-10 bg-white h-screen`}
    >
      {/* Header */}
      <header className="flex justify-between items-center">
        <img src="/Logo.svg" alt="Logo" className="w-16 h-16"/>
        <div>
          <h1 className="text-4xl font-medium">Invoice</h1>
          <p className="text-sm pt-3">{currentWorkspace}</p>
        </div>
      </header>

      {/* Main */}
      <main
        className="py-5 mt-5 border-t"
        style={{ borderColor: "#E5E7EB", borderTopWidth: "1px" }}
      >
        <div className="flex justify-between gap-5 text-sm">
          <div>
            <h6 className="font-bold mb-2">Bill to</h6>
            <p>{invoiceData?.biller?.email}</p>
          </div>
          <div>
            <h6 className="font-bold mb-2">Client</h6>
            <p>{invoiceData?.client?.email}</p>
          </div>
          <div>
            <h6>
              <span className="font-bold">Invoice</span> #{" "}
              {invoiceData?.serial_number}
            </h6>
            <p className="my-2">
              <span className="font-bold">Date issued:</span>{" "}
              {dateFormatToDDMMMYYYY(invoiceData?.issue_date)}
            </p>
            <p>
              <span className="font-bold">Due date:</span>{" "}
              {dateFormatToDDMMMYYYY(invoiceData?.due_date)}
            </p>
          </div>
        </div>

        {/* Services Table */}
        <table className="w-full my-5 text-sm border-collapse">
          <thead>
            <tr style={{ backgroundColor: "#FEF3C7", textAlign: "left" }}>
              <th className="ps-5 py-2">Date</th>
              <th>Service</th>
              <th>Code</th>
              <th>Units</th>
              <th>Price</th>
              <th>Tax</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData?.services?.map((service, index) => (
              <tr
                key={index}
                style={{ borderBottom: "1px solid #E5E7EB" }}
                className="text-sm"
              >
                <td className="ps-5 py-2">{service.date || "-"}</td>
                <td>{service.id}</td>
                <td>{service.code}</td>
                <td>{service.unit}</td>
                <td>USD {service.price}</td>
                <td>{service.tax}</td>
                <td>USD {service.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="flex justify-end mt-6">
          <table className="w-[300px] text-sm border-collapse">
            <tbody>
              <tr style={{ borderBottom: "1px solid #E5E7EB" }}>
                <td className="text-end pb-2">Subtotal</td>
                <td className="text-end pb-2 font-medium">
                  USD {invoiceData?.subtotal}
                </td>
              </tr>
              <tr>
                <td className="text-end pt-2 font-semibold">Total (USD)</td>
                <td className="text-end pt-2 font-bold">
                  USD {invoiceData?.subtotal}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-sm mt-10">
        <p className="font-bold">Practitioner</p>
        <p>{invoiceData?.client?.email}</p>
      </footer>
    </div>
  );
};

export default InvoicePreview;

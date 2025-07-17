import React from "react";
import dateFormatToDDMMMYYYY from "../../../../../hook/dateFormatToDDMMMYYYY";

const InvoicePreview = ({
  currentWorkspace,
  invoiceData,
  className = "w-[40%]",
}) => {
  return (
    <div
      className={`${className} mx-auto mt-10 h-screen bg-white rounded-lg p-10`}
    >
      <header className="text-end">
        <h1 className="text-4xl font-medium">Invoice</h1>
        <p className="text-sm pt-3">{currentWorkspace}</p>
      </header>

      <main className="py-5 border-t border-gray-200 mt-5">
        <div className="flex justify-between text-sm">
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
              <span className="font-bold">Date issued</span> &nbsp;
              {dateFormatToDDMMMYYYY(invoiceData?.issue_date)}
            </p>
            <p>
              <span className="font-bold">Due date</span> &nbsp;
              {dateFormatToDDMMMYYYY(invoiceData?.due_date)}
            </p>
          </div>
        </div>

        <table className="w-full my-5">
          <thead>
            <tr className="bg-amber-100 text-left">
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
              <tr key={index} className="border-b border-gray-200">
                <td className="ps-5 py-4">{service.date || "-"}</td>
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

        <div className="flex justify-end">
          <table className="w-[300px] text-sm">
            <tbody>
              <tr className="border-b border-gray-200">
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

      <footer className="text-sm mt-5">
        <p className="font-bold">Practitioner</p>
        <p>{invoiceData?.client?.email}</p>
      </footer>
    </div>
  );
};

export default InvoicePreview;

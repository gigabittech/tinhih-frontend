import { useEffect, useState } from "react";
import ViewInvoice from "../viewInvoice/ViewInvoice";
import useInvoiceStore from "../../../../store/provider/invoiceStore";
import dateFormatToDDMMMYYYY from "../../../../hook/dateFormatToDDMMMYYYY";
function InvoiceTab() {
  const [viewInvoiceId, setViewInvoiceId] = useState(null);
  const { invoices, loading, fetchInvoices } = useInvoiceStore();

  useEffect(() => {
    fetchInvoices();
  }, []);

  return (
    <div>
      {/* 🔒 Always mounted, only visible when invoice is selected */}
      <ViewInvoice
        invoice_id={viewInvoiceId}
        isOpen={!!viewInvoiceId}
        onClose={() => setViewInvoiceId(null)}
      />

      {/* --------- Invoice Stat Boxes --------- */}
      <header className="py-5 flex gap-5 px-10 opacity-50">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="relative bg-white rounded-lg shadow p-4 w-64 text-center"
          >
            <span className="absolute top-2 right-2 bg-amber-100 text-primary-600 text-xs font-semibold px-2 py-0.5 rounded">
              Bkash
            </span>
            <div className="text-2xl font-bold text-primary-800">120 USD</div>
            <div className="text-sm text-gray-600 mt-1 font-medium">
              In Transit
            </div>
          </div>
        ))}
      </header>

      {/* --------- Invoices Table Header --------- */}
      <div className="flex items-center gap-10 py-5 px-10 bg-white">
        <h2 className="text-lg font-semibold whitespace-nowrap">
          {invoices?.length} Invoices
        </h2>
        <input
          type="text"
          placeholder="Search invoices"
          className="w-96 border rounded px-3 py-2 cursor-not-allowed"
          disabled
        />
      </div>

      {/* --------- Invoice Table --------- */}
      <div className="overflow-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 ps-10 py-3">Issue date</th>
              <th className="p-2">Invoice #</th>
              <th className="p-2">Client</th>
              <th className="p-2">Bill to</th>
              <th className="p-2">Services</th>
              <th className="p-2">Price</th>
              <th className="p-2">Due date</th>
              <th className="p-2">Status</th>
              <th className="p-2 opacity-50 cursor-not-allowed">Date received</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {loading ? (
              <tr>
                <td className="px-10 py-5" colSpan={10}>
                  Loading...
                </td>
              </tr>
            ) : invoices.length === 0 ? (
              <tr>
                <td className="px-10 py-5" colSpan={10}>
                  No invoices found.
                </td>
              </tr>
            ) : (
              invoices.map((invoice, index) => (
                <tr
                  onClick={() => setViewInvoiceId(invoice.id)}
                  key={invoice.id || index}
                  className="border-t border-[#d7d7d7] hover:bg-[#f2f2f2] cursor-pointer"
                >
                  <td className="ps-10 py-3">{dateFormatToDDMMMYYYY(invoice.issue_date) || "-"}</td>
                  <td className="p-2">{invoice?.serial_number || "-"}</td>
                  <td className="p-2">{invoice?.client.email || "-"}</td>
                  <td className="p-2">{invoice?.biller.email || "-"}</td>
                  <td className="p-2">
                    {invoice.services?.map((s) => s?.service_id).join(", ") ||
                      "-"}
                  </td>
                  <td className="p-2">USD {invoice?.subtotal || "-"}</td>
                  <td className="p-2">{dateFormatToDDMMMYYYY(invoice?.due_date) || "-"}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                        invoice?.is_paid === 1
                          ? "bg-green-300"
                          : invoice?.is_paid === 0
                          ? "bg-orange-200"
                          : "bg-gray-300"
                      }`}
                    >
                      {invoice?.is_paid === 1
                        ? "Paid"
                        : invoice?.is_paid === 0
                        ? "Unpaid"
                        : "-"}
                    </span>
                  </td>
                  <td className="p-2"></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InvoiceTab;

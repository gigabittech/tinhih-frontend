import React from "react";

function InvoiceTab() {
  return (
    <div>
      <header className="py-5 flex gap-5 px-10">
        <div className="relative bg-white rounded-lg shadow p-4 w-64 text-center">
          {/* Badge */}
          <span className="absolute top-2 right-2 bg-amber-100 text-primary-600 text-xs font-semibold px-2 py-0.5 rounded">
            Bkash
          </span>

          {/* Amount */}
          <div className="text-2xl font-bold text-primary-800">120BDT</div>

          {/* Label */}
          <div className="text-sm text-gray-600 mt-1 font-medium">
            In Transit
          </div>
        </div>
        <div className="relative bg-white rounded-lg shadow p-4 w-64 text-center">
          {/* Badge */}
          <span className="absolute top-2 right-2 bg-amber-100 text-primary-600 text-xs font-semibold px-2 py-0.5 rounded">
            Bkash
          </span>

          {/* Amount */}
          <div className="text-2xl font-bold text-primary-800">120BDT</div>

          {/* Label */}
          <div className="text-sm text-gray-600 mt-1 font-medium">
            In Transit
          </div>
        </div>
        <div className="relative bg-white rounded-lg shadow p-4 w-64 text-center">
          {/* Badge */}
          <span className="absolute top-2 right-2 bg-amber-100 text-primary-600 text-xs font-semibold px-2 py-0.5 rounded">
            Bkash
          </span>

          {/* Amount */}
          <div className="text-2xl font-bold text-primary-800">120BDT</div>

          {/* Label */}
          <div className="text-sm text-gray-600 mt-1 font-medium">
            In Transit
          </div>
        </div>
        <div className="relative bg-white rounded-lg shadow p-4 w-64 text-center">
          {/* Badge */}
          <span className="absolute top-2 right-2 bg-amber-100 text-primary-600 text-xs font-semibold px-2 py-0.5 rounded">
            Bkash
          </span>

          {/* Amount */}
          <div className="text-2xl font-bold text-primary-800">120BDT</div>

          {/* Label */}
          <div className="text-sm text-gray-600 mt-1 font-medium">
            In Transit
          </div>
        </div>
      </header>

      <div>
        {/* Header */}
        <div className="flex items-center gap-10 py-5 px-10 bg-white">
          <h2 className="text-lg font-semibold whitespace-nowrap">
            5 Invoices
          </h2>
          <input
            type="text"
            placeholder="Search invoices"
            className="w-96 border rounded px-3 py-2"
          />
        </div>

        {/* Table */}
        <div className="overflow-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 ps-10 py-3 ">Issue date</th>
                <th className="p-2">Invoice #</th>
                <th className="p-2">Client</th>
                <th className="p-2">Bill to</th>
                <th className="p-2">Services</th>
                <th className="p-2">Price</th>
                <th className="p-2">Due date</th>
                <th className="p-2">Team</th>
                <th className="p-2">Status</th>
                <th className="p-2">Date received</th>
              </tr>
            </thead>
            <tbody className="bg-white">
             {/*  {loading ? (
                <tr>
                  <td className="px-10 py-5" colSpan={7}>
                    Loading...
                  </td>
                </tr>
              ) : members.length === 0 ? (
                <tr>
                  <td className="px-10 py-5" colSpan={7}>
                    No team members found.
                  </td>
                </tr>
              ) : (
                members.map((client, index) => ( */}
                  <tr className="border-t border-[#d7d7d7] hover:bg-[#f2f2f2]">
                    
                    <td className="ps-10 py-3  text-purple-600">
                      data
                    </td>
                    <td className="p-2">data</td>
                    <td className="p-2">data</td>
                    <td className="p-2">data</td>
                    <td className="p-2">data</td>
                    <td className="p-2">data</td>
                    <td className="p-2">data</td>
                    <td className="p-2">data</td>
                    <td className="p-2">data</td>
                    <td className="p-2">data</td>
                  </tr>
                  <tr className="border-t border-[#d7d7d7] hover:bg-[#f2f2f2]">
                    
                    <td className="ps-10 py-3  text-purple-600">
                      data
                    </td>
                    <td className="p-2">data</td>
                    <td className="p-2">data</td>
                    <td className="p-2">data</td>
                    <td className="p-2">data</td>
                    <td className="p-2">data</td>
                    <td className="p-2">data</td>
                    <td className="p-2">data</td>
                    <td className="p-2">data</td>
                    <td className="p-2">data</td>
                  </tr>
               {/*  ))
              )} */}
            </tbody>
          </table>
        </div>
        </div>
    </div>
  );
}

export default InvoiceTab;

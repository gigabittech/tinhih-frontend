import { ShieldEllipsis, ShieldEllipsisIcon } from 'lucide-react'
import React from 'react'

function Payers() {
  return (
    <div className="flex gap-5">
      {/* -------------left side-------------------- */}
      <div className=" w-[50%] ">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <ShieldEllipsis />Insurance payers
          </h2>
        </div>
      </div>

      {/* --------------------right side-------------------- */}
      <div className=" w-[50%] ">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <ShieldEllipsisIcon /> Billing profiles
          </h2>
        </div>
      </div>
    </div>
  )
}

export default Payers
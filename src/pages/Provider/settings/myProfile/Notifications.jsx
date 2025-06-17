import { Bell } from 'lucide-react'

function Notifications() {
  return (
    <div className="flex gap-5">
      {/* -------------left side-------------------- */}
      <div className=" w-[50%]">
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <Bell/>Notification preferences
          </h2>
        </div>
      </div>

     
    </div>
  )
}

export default Notifications
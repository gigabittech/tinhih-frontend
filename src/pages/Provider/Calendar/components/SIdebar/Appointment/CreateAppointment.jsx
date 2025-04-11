import React from "react";

function CreateAppointment({ onClose }) {
  return (
    <div className=" h-screen pt-10">
      <div className="grid grid-cols-1 gap-3">
        <p className="font-bold">Appointment details</p>
        <form className="grid grid-cols-1 gap-3">
          <div className="grid grid-cols-1">
            <label className="text-[#6c6c6c] text-sm">Attendees</label>
            <input
              type="text"
              placeholder="Choose clients and their relationships"
              className="border border-[#6c6c6c] rounded px-3 py-1"
            />
          </div>
          <div className="grid grid-cols-1">
            <label className="text-[#6c6c6c] text-sm">Team member</label>
            <input
              type="text"
              placeholder="Choose team members"
              className="border rounded px-3 py-1"
            />
          </div>
          <div className="grid grid-cols-1">
            <label className="text-[#6c6c6c] text-sm">Services</label>
            <input
              type="text"
              placeholder="Choose services"
              className="border rounded px-3 py-1"
            />
          </div>
          <div className="grid grid-cols-1">
            <label className="text-[#6c6c6c] text-sm">Location</label>
            <input
              type="text"
              placeholder="Enter or choose location"
              className="border rounded px-3 py-1"
            />
          </div>
        </form>
        <div className=" absolute bottom-0 left-0 right-0 py-10 px-5 border-t border-[#a0a0a0b9] ">
          <div>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={onClose} className="border py-1 rounded font-semibold">
                Cancel
              </button>
              <button className="border rounded font-semibold">
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateAppointment;

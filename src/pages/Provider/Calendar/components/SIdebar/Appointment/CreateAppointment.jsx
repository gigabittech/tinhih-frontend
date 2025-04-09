import React from "react";

function CreateAppointment() {
  return (
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
    </div>
  );
}

export default CreateAppointment;

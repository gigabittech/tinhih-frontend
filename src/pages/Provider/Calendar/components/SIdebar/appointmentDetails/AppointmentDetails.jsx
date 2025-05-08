import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../../../lib/axiosInstanceWithToken";
import useDateFormat from "../../../../../../hook/dateFormat";

function AppointmentDetails({ id, onClose }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const date=useDateFormat(details?.date)

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/appointments/${id}`);
        if (response.status === 200) {
          setDetails(response.data.appointment);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching appointment details:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAppointmentDetails();
    }
  }, [id]);

  if (loading) {
    return;
  }
  console.log(details);
  

  return (
    <div className="relative h-screen flex flex-col">
      <div className="py-4 px-5 border-b border-gray-200 bg-white">
        <div className="flex justify-between items-center gap-3">
            <div>
                {date}
            </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto pb-20">
        <div className="px-7 py-5 grid grid-cols-1 gap-4">
          <h2 className="font-bold">Attendees</h2>
        </div>
        <div className="fixed bottom-0 right-0 left-0 p-6 border-t mt-20 border-gray-200 bg-white">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={onClose}
              className="border border-gray-300 py-2 rounded font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentDetails;

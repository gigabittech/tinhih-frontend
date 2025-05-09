import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../../../lib/axiosInstanceWithToken";
import { IoMdCalendar } from "react-icons/io";
import { BsDot } from "react-icons/bs";
import convertTo12HourFormat from "../../../../../../hook/timeFormatTo12Hour";
import dateFormat from "../../../../../../hook/dateFormat";
import { MdDeleteForever } from "react-icons/md";
import useAppointmentStore from "../../../../../../store/provider/appointmentsStore";
import { Notify } from "../../../../../../components/ui/Toaster";

function AppointmentDetails({ id, onClose }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { fetchAppointments } = useAppointmentStore();

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

  const handleDeleteApp = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.delete(
        `/appointments/${details.id}`
      );
      if (response.status === 200) {
        onClose();
        fetchAppointments();
        Notify(response.data.message);
      }
    } catch (err) {
      console.error("Error fetching appointment details:", err);
    }
  };

  if (loading) {
    return;
  }

  return (
    <div className="relative h-screen flex flex-col">
      <div className="py-5 px-7 border-b border-gray-200 bg-white">
        <div className="flex justify-between   items-center gap-3">
          <div className="flex items-center gap-3">
            <span className=" bg-gray-100 p-3">
              <IoMdCalendar size={20} className="text-gray-600" />
            </span>
            <div>
              <p className=" font-bold">Name</p>
              <div className="flex items-center gap-1 text-sm">
                <p>{dateFormat(details?.date)}</p>
                <BsDot />
                <p>{convertTo12HourFormat(details.time)}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <span onClick={handleDeleteApp} className="bg-red-100 p-2">
              <MdDeleteForever size={20} className="text-red-600" />
            </span>
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

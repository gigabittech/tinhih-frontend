import { useEffect, useState } from "react";
import axiosInstance from "../../../../lib/axiosInstanceWithToken";

function useBookAppointments( workspaceId, userId ) {
  const [bookingDetails, setBookingDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookingDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(
        `/booking/${workspaceId}/${userId}`
      );
      const result = response.data;
      setBookingDetails(result);
    } catch (err) {
      console.error("booking details fetch failed", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (workspaceId && userId) {
      fetchBookingDetails();
    }
  }, [workspaceId, userId]);

  return {
    bookingDetails,
    loading,
    error,
  };
}

export default useBookAppointments;

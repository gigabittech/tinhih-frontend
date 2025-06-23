import { useEffect, useState } from "react";
import axiosInstance from "../../../../lib/axiosInstanceWithToken";

function useBookAppointments() {
  const [services, setServices] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const [servicesRes, locationsRes] = await Promise.all([
        axiosInstance.get("/services"),
        axiosInstance.get("/locations"),
      ]);
      setServices(servicesRes.data.services );
      setLocations(locationsRes.data.locations);
    } catch (err) {
      console.error("Booking API fetch failed", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return {
    services,
    locations,
    loading,
    error,
  };
}

export default useBookAppointments;

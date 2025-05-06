import { create } from "zustand";
import axiosInstance from "../../lib/axiosInstanceWithToken";

const useAppointmentStore = create((set) => ({
  appointments: [],
  loading: false,
  fetchAppointments: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get("/appointments");
      if (response.status === 200) {
        set({ appointments: response?.data?.appointments, loading: false });
      }
    } catch (error) {
      console.error("Failed to fetch appointments:", error.message);
      set({ loading: false });
    }
  },
  addAppointment: (newAppointment) => {
    set((state) => ({
      appointments: [...state.appointments, newAppointment],
    }));
  },
}));
export default useAppointmentStore;

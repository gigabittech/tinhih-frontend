import { create } from "zustand";
import axiosInstance from "../../lib/axiosInstanceWithToken";

const useServiceStore = create((set) => ({
  services: [],
  loading: false,
  fetchServices: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get("/services");
      if (response.status === 200) {
        set({ services: response.data.services, loading: false });
      }
    } catch (error) {
      console.error("Failed to fetch services:", error.message);
      set({ loading: false });
    }
  },
  addService: (newService) => {
    set((state) => ({
      services: [...state.services, newService],
    }));
  },
}));

export default useServiceStore;

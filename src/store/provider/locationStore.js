import { create } from "zustand";
import axiosInstance from "../../lib/axiosInstanceWithToken";

const useLocationStore = create((set) => ({
  locations: [],
  loading: false,
  fetchLocations: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get("/locations");
      if (response.status === 200) {
        set({ locations: response.data.locations, loading: false });
      }
    } catch (error) {
      console.error("Failed to fetch locations:", error.message);
      set({ loading: false });
    }
  },
  addLocation: (newLocation) => {
    set((state) => ({
      locations: [...state.locations, newLocation],
    }));
  },
}));

export default useLocationStore;

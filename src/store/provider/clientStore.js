import { create } from "zustand";
import axiosInstance from "../../lib/axiosInstanceWithToken";

const useClientStore = create((set) => ({
  clients: [],
  loading: false,
  fetchClients: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get("/clients");
      if (response.status === 200) {
        set({ clients: response.data.clients, loading: false });
      }
    } catch (error) {
      console.error("Failed to fetch clients:", error.message);
      set({ loading: false });
    }
  },
  addClient: (newClient) => {
    set((state) => ({
      clients: [...state.clients, newClient],
    }));
  },
}));
export default useClientStore;

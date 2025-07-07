import { create } from "zustand";
import axiosInstance from "../../lib/axiosInstanceWithToken";

const useInvoiceStore = create((set) => ({
  invoices: [],
  loading: false,
  fetchInvoices: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get("/invoices");
      if (response.status === 200) {
        set({ invoices: response?.data?.invoices, loading: false });
      }
    } catch (error) {
      console.error("Failed to fetch Invoices:", error.message);
      set({ loading: false });
    }
  },
  addInvoice: (newInvoice) => {
    set((state) => ({
      invoices: [...state.invoices, newInvoice],
    }));
  },
}));
export default useInvoiceStore;
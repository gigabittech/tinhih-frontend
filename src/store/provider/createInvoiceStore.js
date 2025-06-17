import { create } from "zustand";

export const useCreateInvoiceStore = create((set) => ({
  isOpen: false,
  openPopup: () => set({ isOpen: true }),
  closePopup: () => set({ isOpen: false }),
  togglePopup: () => set((state) => ({ isOpen: !state.isOpen })),
}));

import { create } from "zustand";

const useBookingStore = create((set) => ({
  selectedService: null,
  selectedLocation: null,
  selectedDate: null,
  selectedTimeSlot: null,
  setSelectedService: (service) => set({ selectedService: service }),
  setSelectedLocation: (location) => set({ selectedLocation: location }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  setSelectedTimeSlot: (slot) => set({ selectedTimeSlot: slot }),
  resetBooking: () =>
    set({
      selectedService: null,
      selectedLocation: null,
      selectedDate: null,
      selectedTimeSlot: null,
    }),
}));

export default useBookingStore;

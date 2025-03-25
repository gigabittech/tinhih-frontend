import { create } from "zustand";

export const useCalendarStore = create((set, get) => ({
  currentDate: new Date(),
  selectedDate: new Date(),
  calendarDuratuion: 30,
  calendarType: "grid",
  setCurrentDate: (date) =>
    set({ currentDate: date instanceof Date ? date : new Date(date) }),
  setSelectedDate: (date) => set({ selectedDate: date }),

  goToToday: () => {
    const today = new Date();
    set({ selectedDate: today, currentDate: today });
  },

  onSelectDuration: (duration) => {
    set({ calendarDuratuion: duration });
  },

  prevNextDateSlotes: (action = 1) => {
    const { selectedDate, calendarDuratuion } = get();
    let newDate = new Date(selectedDate);

    if (calendarDuratuion === 30) {
      newDate.setMonth(newDate.getMonth() + action);
    } else {
      newDate.setDate(newDate.getDate() + action * calendarDuratuion);
    }

    set({ selectedDate: newDate, currentDate: newDate });
  },

  setCalendarType: (type) => set({ calendarType: type }),
}));

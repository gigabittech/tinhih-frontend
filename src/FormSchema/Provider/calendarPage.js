import { create } from "zustand";

const useCalendarPage = create((set) => ({
  isOpenCalendarSideBar: false,
  sidebarType: "",
  setMeetingDate: new Date(),

  openCalendarSideBar: (type) =>
    set({ isOpenCalendarSideBar: true, sidebarType: type }),
  closeCalendarSideBar: () => set({ isOpenCalendarSideBar: false }),
}));

export default useCalendarPage;

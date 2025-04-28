import { create } from "zustand";

const useCalendarPage = create((set) => ({
  isOpenCalendarSideBar: false,
  sidebarType: "",
  setMeetingDate: new Date(),

  // add new client
  isClientCreate: false,
  openCreateClient: () => set({ isClientCreate: true }),
  closeCreateClient: () => set({ isClientCreate: false }),
  // add new client
  isTeamMemberCreate: false,
  openCreateTeamMember: () => set({ isTeamMemberCreate: true }),
  closeCreateTeamMember: () => set({ isTeamMemberCreate: false }),

  // add new service
  isServiceCreate: false,
  openCreateService: () => set({ isServiceCreate: true }),
  closeCreateService: () => set({ isServiceCreate: false }),

  //add new location
  isLocationCreate: false,
  openCreateLocation: () => set({ isLocationCreate: true }),
  closeCreateLocation: () => set({ isLocationCreate: false }),

  openCalendarSideBar: (type) =>
    set({ isOpenCalendarSideBar: true, sidebarType: type }),
  closeCalendarSideBar: () => set({ isOpenCalendarSideBar: false }),
}));

export default useCalendarPage;

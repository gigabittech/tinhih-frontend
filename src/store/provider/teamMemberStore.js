import { create } from "zustand";
import axiosInstance from "../../lib/axiosInstanceWithToken";

const useTeamMemberStore = create((set) => ({
  members: [],
  loading: false,
  fetchMembers: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get("/members");
      if (response.status === 200) {
        set({ members: response.data.members, loading: false });
      }
    } catch (error) {
      console.error("Failed to fetch members:", error.message);
      set({ loading: false });
    }
  },
  addMember: (newMember) => {
    set((state) => ({
      members: [...state.members, newMember],
    }));
  },
}));
export default useTeamMemberStore;
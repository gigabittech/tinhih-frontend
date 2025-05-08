import { create } from "zustand";
import axiosInstance from "../../lib/axiosInstanceWithToken";

const useWorkspaceStore = create((set) => ({
  workspaces: [],
  loading: false,
  fetchWorkspaces: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get("/workspaces/user");
      if (response.status === 200) {
        set({ workspaces: response.data.workspaces, loading: false });
      }
    } catch (error) {
      console.error("Failed to fetch workspaces:", error.message);
      set({ loading: false });
    }
  },
  addWorkspaces: (newWorkspaces) => {
    set((state) => ({
      workspaces: [...state.workspaces, newWorkspaces],
    }));
  },
}));

export default useWorkspaceStore;
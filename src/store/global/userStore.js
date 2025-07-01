import { create } from "zustand";
import updateState from "../../lib/updateState";
import axiosInstance from "../../lib/axiosInstance";
import { Notify } from "../../components/ui/Toaster";

const API_STATE = {
  user: false,
  login: false,
  register: false,
  logout: false,
};

const useUserStore = create((set) => ({
  isAuthenticated: false,
  user: null,
  role: null,
  hydrated: false,
  isLoading: { ...API_STATE },
  isError: { ...API_STATE },
  isSuccess: { ...API_STATE },
  message: { login: "", register: "", logout: "" },

  setUser: (newUser) => set({ user: newUser }),

  getUser: async () => {
    const token = localStorage.getItem("auth-token");
    if (!token) {
      set({ hydrated: true });
      return;
    }

    updateState(set, "user", { loading: true, success: false, error: false });

    try {
      const response = await axiosInstance.get("/user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        set({
          isAuthenticated: true,
          user: response.data?.user,
          role: response.data?.user?.role,
        });

        updateState(set, "user", {
          loading: false,
          success: true,
          error: false,
          message: "User logged in successfully",
        });
      }
    } catch (error) {
      updateState(set, "user", {
        loading: false,
        success: false,
        error: true,
        message: error?.response?.data?.message || "User not found.",
      });

      set({
        isAuthenticated: false,
        user: null,
        role: null,
      });
    } finally {
      set({ hydrated: true });
    }
  },

  loginHandler: async (userData) => {
    updateState(set, "login", { loading: true, success: false, error: false });

    try {
      const response = await axiosInstance.post("/auth/login", userData);

      if (response.status === 200) {
        const token = response.data?.payload?.token;
        localStorage.setItem("auth-token", token);

        updateState(set, "login", {
          loading: false,
          success: true,
          error: false,
          message: "User logged in successfully",
        });

        Notify("User logged in successfully");

        await useUserStore.getState().getUser();
      }
    } catch (error) {
      const errorInfo = error?.response?.data?.message || "Login failed.";
      updateState(set, "login", {
        loading: false,
        success: false,
        error: true,
        message: errorInfo,
      });

      Notify("error", errorInfo);
    }
  },

  logoutHandler: async () => {
    updateState(set, "logout", { loading: true, success: false, error: false });

    try {
      const token = localStorage.getItem("auth-token");
      const response = await axiosInstance.post(
        "/auth/logout",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        localStorage.removeItem("auth-token");
        set({ isAuthenticated: false, user: null, role: null });

        updateState(set, "logout", {
          loading: false,
          success: true,
          error: false,
          message: "User logged out successfully",
        });
        Notify("User logged out successfully");
      }
    } catch (error) {
      const errorInfo = error?.response?.data?.message || "Logout failed.";
      updateState(set, "logout", {
        loading: false,
        success: false,
        error: true,
        message: errorInfo,
      });
      Notify("error", errorInfo);
    }
  },

  registerHandler: async (userData) => {
    updateState(set, "register", {
      loading: true,
      success: false,
      error: false,
    });

    try {
      const response = await axiosInstance.post("/auth/register", userData);
      if (response.status === 200) {
        const token = response.data?.payload?.token;
        localStorage.setItem("auth-token", token);

        updateState(set, "register", {
          loading: false,
          success: true,
          error: false,
          message: "User registered successfully",
        });

        await useUserStore.getState().getUser();
      }
    } catch (error) {
      const errorInfo =
        error?.response?.data?.message || "Registration failed.";
      updateState(set, "register", {
        loading: false,
        success: false,
        error: true,
        message: errorInfo,
      });
      Notify("error", errorInfo);
    }
  },
}));

export default useUserStore;

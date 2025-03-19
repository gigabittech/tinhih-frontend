import { create } from "zustand";
import updateState from "../lib/updateState";
import axiosInstance from "../lib/axiosInstance";
import { head } from "framer-motion/client";

const API_STATE = {
  login: false,
  register: false,
  logout: false,
};

const useUserStore = create((set) => ({
  isAuthenticated: false,
  user: null,
  role: "provider",
  isLoading: { ...API_STATE },
  isEorror: { ...API_STATE },
  isSuccess: { ...API_STATE },
  message: { login: "", register: "", logout: "" },

  loginHandler: async (userData) => {
    updateState(set, "login", {
      loading: true,
      success: false,
      error: false,
      message: "",
    });
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
      }
    } catch (error) {
      const errorInfo =
        error?.response?.data?.message || "Login failed. Please try again.";
      updateState(set, "login", {
        loading: false,
        success: false,
        error: true,
        message: errorInfo,
      });
    }
  },
  logoutHandler: async () => {
    updateState(set, "logout", {
      loading: true,
      success: false,
      error: false,
      message: "",
    });

    try {
      const token = localStorage.getItem("auth-token");
      const response = await axiosInstance.post("/auth/logout", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        localStorage.removeItem("auth-token");
        updateState(set, "logout", {
          loading: false,
          success: true,
          error: false,
          message: "User logged out successfully",
        });
      }
    } catch (error) {
      const errorInfo =
        error?.response?.data?.message || "Logout failed. Please try again.";
      updateState(set, "logout", {
        loading: false,
        success: false,
        error: true,
        message: errorInfo,
      });
    }
  },

  registerHandler: async (userData) => {
    updateState(set, "register", {
      loading: true,
      success: false,
      error: false,
      message: "",
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
      }
    } catch (error) {
      const errorInfo =
        error?.response?.data?.message ||
        "Registration failed. Please try again.";
      updateState(set, "register", {
        loading: false,
        success: false,
        error: true,
        message: errorInfo,
      });
    }
  },
}));

export default useUserStore;

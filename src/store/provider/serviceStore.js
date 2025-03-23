import { create } from "zustand";

const API_STATE = {};

const useServiceStore = create((set) => ({
  teamMembers: [],
  services: [],
  isLoading: { ...API_STATE },
  isSuccess: { ...API_STATE },
  isError: { ...API_STATE },
  message: {},
}));

export default useServiceStore;

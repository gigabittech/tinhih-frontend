import { create } from "zustand";
import axiosInstance from "./../../lib/axiosInstance";
import updateState from "./../../lib/updateState";
import { Notify } from "../../components/ui/Toaster";
import { formTypes } from "../../FormSchema/Provider/createLocation";

const API_STATE = {
  types: false,
  create: false,
};

const useLocationStore = create((set, get) => ({
  locationTypes: [],
  isLoading: { ...API_STATE },
  isSuccess: { ...API_STATE },
  isError: { ...API_STATE },
  message: { types: "", create: "" },

  getLocationTypes: async () => {
    const token = localStorage.getItem("auth-token");
    if (!token) return;

    updateState(set, "types", {
      loading: true,
      success: false,
      error: false,
    });

    try {
      const response = await axiosInstance.get("/location_types", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        const data = response.data?.types;
        set({ locationTypes: data });

        updateState(set, "types", {
          loading: false,
          success: true,
          error: false,
          message: "Locations fetched successfully",
        });
      }
    } catch (error) {
      const errorInfo =
        error?.response?.data?.message || "Failed to fetch locations";

      updateState(set, "types", {
        loading: false,
        success: false,
        error: true,
        message: errorInfo,
      });

      Notify("error", errorInfo);
    }
  },

  createLocation: async (type, location) => {
    const token = localStorage.getItem("auth-token");
    if (!token) return;

    updateState(set, "create", {
      loading: true,
      success: false,
      error: false,
    });

    try {
      const fieldMapping = {
        [formTypes.PERSON]: [
          "type_id",
          "display_name",
          "address",
          "suburb_province",
          "city",
          "state",
          "zip_code",
          "country",
        ],
        [formTypes.PHONE]: ["type_id", "display_name", "phone_number"],
        [formTypes.ONLINE]: ["type_id", "display_name", "link"],
      };

      const filteredLocation = Object.fromEntries(
        Object.entries(location).filter(([key]) =>
          fieldMapping[type]?.includes(key)
        )
      );

      const response = await axiosInstance.post(
        "/locations",
        filteredLocation,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 201) {
        updateState(set, "create", {
          loading: false,
          success: true,
          error: false,
          message: "A new location created successfully",
        });

        Notify("success", "A new location created successfully");
      }
    } catch (error) {
      const errorInfo =
        error?.response?.data?.message || "Failed to create location";

      updateState(set, "create", {
        loading: false,
        success: false,
        error: true,
        message: errorInfo,
      });

      Notify("error", errorInfo);
    }
  },
}));

export default useLocationStore;

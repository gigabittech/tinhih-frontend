import axios from "axios";

const token = localStorage.getItem("auth-token");

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  },
});

export default axiosInstance;

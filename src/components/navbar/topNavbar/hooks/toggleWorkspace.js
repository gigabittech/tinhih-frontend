import axios from "axios";
import { useState } from "react";

function useToggleWorkspace() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleWorkspace = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("auth-token");
      const res = await axios.post(
        `${import.meta.env.VITE_APP_SERVER_URL}/workspaces/toggle`,
        { id: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      
      if (res.status === 200) {
        window.location.href = "/calendar";
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setIsLoading(false);
    }
  };
  return { toggleWorkspace, isLoading, error };
}

export default useToggleWorkspace;

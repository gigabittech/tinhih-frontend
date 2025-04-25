import { useState } from "react";
import axiosInstance from "../../../../lib/axiosInstanceWithToken";

function useToggleWorkspace() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleWorkspace = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.post("/workspaces/toggle", { id: id });
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

import { useEffect, useState, useCallback } from "react";
import axiosInstance from "../lib/axiosInstanceWithToken";

function useWorkspace() {
  const [workspaces, setWorkspaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchWorkspaces = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `workspaces/user`,
       
      );
      setWorkspaces(response.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch workspaces.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWorkspaces();
  }, [fetchWorkspaces]);

  return { workspaces, loading, error, refetch: fetchWorkspaces };
}

export default useWorkspace;
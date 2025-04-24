import axios from "axios";
import { useEffect, useState, useCallback } from "react";

function useWorkspace() {
  const [workspaces, setWorkspaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchWorkspaces = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("auth-token");
      const response = await axios.get(
        `${import.meta.env.VITE_APP_SERVER_URL}/workspaces/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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
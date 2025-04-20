import axios from "axios";
import { useEffect, useState } from "react";

function useWorkspace() {
  const [workspaces, setWorkspaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        const token = localStorage.getItem("auth-token");
        const response = await axios.get(
          `${import.meta.env.VITE_APP_SERVER_URL}/workspaces`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setWorkspaces(response.data);
      } catch (err) {
        setError("Failed to fetch workspaces.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkspaces();
  }, []);
  return { workspaces, loading, error };
}

export default useWorkspace;

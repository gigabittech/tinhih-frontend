import { Navigate } from "react-router";
import useUserStore from "../../store/global/userStore";
import { useEffect } from "react";
import useWorkspaceStore from "../../store/global/useWorkspace";
import AppLoader from "../global/AppLoader";

function ProtectedRoute({
  allowedRoles,
  shouldHaveNoWorkspace = false,
  children,
}) {
  const { isAuthenticated, role, hydrated } = useUserStore();
  const {
    workspaces,
    fetchWorkspaces,
    loading: workspaceLoading,
  } = useWorkspaceStore();

  useEffect(() => {
    if (!workspaces || workspaces.length === 0) {
      fetchWorkspaces();
    }
  }, [fetchWorkspaces, workspaces]);

  if (workspaceLoading || !hydrated) {
    return <AppLoader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const hasWorkspace = workspaces?.length > 0;

  // If user shouldn't have workspace but does, redirect
  if (shouldHaveNoWorkspace && hasWorkspace) {
    return role === "provider" ? (
      <Navigate to="/calendar" replace />
    ) : (
      <Navigate to="/client/calendar" replace />
    );
  }

  // ✅ Updated condition
  if (
    !shouldHaveNoWorkspace &&
    !hasWorkspace &&
    hydrated &&
    !workspaceLoading
  ) {
    return <Navigate to="/Onboarding" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

export default ProtectedRoute;

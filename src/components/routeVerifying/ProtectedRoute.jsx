import { Navigate } from "react-router";
import useUserStore from "../../store/global/userStore";
import { useEffect } from "react";
import useWorkspaceStore from "../../store/global/useWorkspace";

function ProtectedRoute({
  allowedRoles,
  shouldHaveNoWorkspace = false,
  children,
}) {
  const { isAuthenticated, role } = useUserStore();
  const { workspaces, fetchWorkspaces } = useWorkspaceStore();

  useEffect(() => {
    fetchWorkspaces();
  }, [fetchWorkspaces]);


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

  // If user should have workspace but doesn't, redirect
  if (!shouldHaveNoWorkspace && !hasWorkspace) {
    return <Navigate to="/Onboarding" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

export default ProtectedRoute;

import { Navigate } from "react-router";
import useUserStore from "../../store/global/userStore";
import useWorkspace from "../../hook/useWorkspace";
import { useEffect, useState } from "react";

function ProtectedRoute({
  allowedRoles,
  shouldHaveNoWorkspace = false,
  children,
}) {
  const { isAuthenticated, role } = useUserStore();
  const { workspaces, loading } = useWorkspace();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Only proceed with checks after workspaces have loaded
    if (!loading) {
      setShouldRender(true);
    }
  }, [loading]);

  if (!shouldRender) {
    return null; // or a loading spinner
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (shouldHaveNoWorkspace && !workspaces?.workspaces?.length) {
    return role === "provider" ? (
      <Navigate to="/calendar" replace />
    ) : (
      <Navigate to="/client/calendar" replace />
    );
  }

  if (!shouldHaveNoWorkspace && workspaces?.workspaces?.length) {
    return <Navigate to="/Onboarding" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

export default ProtectedRoute;

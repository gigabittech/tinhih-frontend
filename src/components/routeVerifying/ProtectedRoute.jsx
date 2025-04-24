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
    if (!loading) {
      // Wait an extra frame to ensure workspace state is settled
      const timer = setTimeout(() => {
        setShouldRender(true);
      }, 100); // small delay (can adjust)
      return () => clearTimeout(timer);
    }
  }, [loading, workspaces]);

  if (!shouldRender) {
    return null; // Or a loading spinner
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const hasWorkspace = workspaces?.workspaces?.length > 0;

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


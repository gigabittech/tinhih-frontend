import { Navigate } from "react-router";
import useUserStore from "../../store/global/userStore";
import AppLoader from "../global/AppLoader";

function ProtectedRoute({
  allowedRoles,
  shouldHaveNoWorkspace = false,
  children,
}) {
  const { user, isAuthenticated, role, hydrated } = useUserStore();
  const currentWorkspace = user?.currentWorkspace;

  // hasWorkspace is true if currentWorkspace is a non-null object
  const hasWorkspace = currentWorkspace && Object.keys(currentWorkspace).length > 0;

  if (!hydrated) {
    return <AppLoader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (shouldHaveNoWorkspace && hasWorkspace) {
    return role === "provider" ? (
      <Navigate to="/calendar" replace />
    ) : (
      <Navigate to="/client/calendar" replace />
    );
  }

  if (!shouldHaveNoWorkspace && !hasWorkspace) {
    return <Navigate to="/Onboarding" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

export default ProtectedRoute;



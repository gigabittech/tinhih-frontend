import { Navigate } from "react-router";
import useUserStore from "../../store/global/userStore";

function ProtectedRoute({ allowedRoles, children }) {
  const { isAuthenticated, role } = useUserStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

export default ProtectedRoute;

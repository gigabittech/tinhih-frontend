import { Navigate } from "react-router";
import useUserStore from "../../store/global/userStore";

function ProtectedRoute() {
  const { isAuthenticated, role } = useUserStore();

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  const path = role === "client" ? "/client/calendar" : "/provider/calendar";
  return <Navigate to={path} replace />;
}

export default ProtectedRoute;

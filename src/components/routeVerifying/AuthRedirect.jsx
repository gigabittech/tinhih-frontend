import React from "react";
import { Navigate } from "react-router";
import useUserStore from "../../store/global/userStore";

function AuthRedirect({ children }) {
  const { isAuthenticated, role } = useUserStore();

  if (isAuthenticated) {
    return role === "client" ? (
      <Navigate to="/client/calendar" replace />
    ) : (
      <Navigate to="/provider/calendar" replace />
    );
  }

  return children;
}

export default AuthRedirect;


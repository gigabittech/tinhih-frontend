import React from "react";
import { Outlet, Navigate } from "react-router";
import useUserStore from "../../store/userStore";

function VerifyingSpecialRoute() {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const role = useUserStore((state) => state.role);

  if (isAuthenticated && role) {
    return role === "provider" ? (
      <Navigate to="/provider" replace />
    ) : (
      <Navigate to="/client" replace />
    );
  }

  return <Outlet />;
}

export default React.memo(VerifyingSpecialRoute);

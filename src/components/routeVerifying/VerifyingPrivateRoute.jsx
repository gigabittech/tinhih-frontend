import React, { useMemo } from "react";
import { Outlet, Navigate } from "react-router";
import useUserStore from "../../store/global/userStore";

function VerifyingPrivateRoute({ allowedRole }) {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const role = useUserStore((state) => state.role);

  const isAuthorized = useMemo(() => role === allowedRole, [role, allowedRole]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return isAuthorized ? <Outlet /> : <Navigate to="/unauthorized" replace />;
}

export default React.memo(VerifyingPrivateRoute);

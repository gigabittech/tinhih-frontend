import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router";
import AppLoader from "../components/global/AppLoader";
import useMenuStore from "../store/global/menuStore";

const VerifyingPrivateRoute = lazy(() =>
  import("../components/routeVerifying/VerifyingPrivateRoute")
);

function ClientRoutes() {
  const setMenu = useMenuStore((state) => state.setMenu);

  // useEffect(() => {
  //   setMenu(providerNav);
  // }, [setMenu]);

  return (
    <Suspense fallback={<AppLoader />}>
      <Routes>
        <Route element={<VerifyingPrivateRoute allowedRole="client" />}>
          <Route index element={<Navigate to="calendar" replace />} />
          <Route path="dashboard" element={<p>Client Dashboard</p>} />
          <Route path="calendar" element={<p>Client Calendar</p>} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default ClientRoutes;

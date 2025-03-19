import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router";
import AppLoader from "../components/global/AppLoader";
import useMenuStore from "../store/menuStore";
import providerNav from "../data/providerNav";

const VerifyingPrivateRoute = lazy(() =>
  import("../components/routeVerifying/VerifyingPrivateRoute")
);

function ProviderRoutes() {
  const setMenu = useMenuStore((state) => state.setMenu);

  useEffect(() => {
    setMenu(providerNav);
  }, [setMenu]);

  return (
    <Suspense fallback={<AppLoader />}>
      <Routes>
        <Route element={<VerifyingPrivateRoute allowedRole="provider" />}>
          <Route index element={<Navigate to="calendar" replace />} />
          <Route path="dashboard" element={<p>Provider Dashboard</p>} />
          <Route path="calendar" element={<p>Provider Calendar</p>} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default ProviderRoutes;

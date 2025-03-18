import React, { lazy, Suspense, useEffect } from "react";
import AppLoader from "../components/global/AppLoader";
import { Routes, Route, Navigate } from "react-router";
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
          <Route path="calendar" element={<p>Calendar</p>} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default ProviderRoutes;

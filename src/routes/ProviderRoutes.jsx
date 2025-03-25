import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router";
import AppLoader from "../components/global/AppLoader";
import useMenuStore from "../store/global/menuStore";
import providerNav from "../data/providerNav";
import ProviderLayout from "../layout/ProviderLayout";

const VerifyingPrivateRoute = lazy(() =>
  import("../components/routeVerifying/VerifyingPrivateRoute")
);
const CalendarPage = lazy(() =>
  import("./../pages/Provider/Calendar/CalendarPage")
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
          <Route element={<ProviderLayout />}>
            <Route index element={<Navigate to="calendar" replace />} />
            <Route path="dashboard" element={<p>Provider Dashboard</p>} />
            <Route path="calendar" element={<CalendarPage />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default ProviderRoutes;

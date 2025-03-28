import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router";
import AppLoader from "../components/global/AppLoader";
import useMenuStore from "../store/global/menuStore";
import NotFoundRoute from "../pages/NotFoundRoute";

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
          <Route path="*" element={<NotFoundRoute />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default ClientRoutes;

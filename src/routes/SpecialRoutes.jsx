import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router";
import AppLoader from "../components/global/AppLoader";
import Layout from "../layout/Layout";
import { Navigate } from "react-router";

const VerifyingSpecialRoute = lazy(() =>
  import("../components/routeVerifying/VerifyingSpecialRoute")
);
const Login = lazy(() => import("../pages/Common/Authentication/pages/Login"));
const Register = lazy(() =>
  import("../pages/Common/Authentication/pages/Register")
);

function SpecialRoutes() {
  return (
    <Suspense fallback={<AppLoader />}>
      <Routes>
        <Route element={<VerifyingSpecialRoute />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default SpecialRoutes;

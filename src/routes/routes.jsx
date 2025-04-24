import { createBrowserRouter, Navigate } from "react-router";
import { lazy } from "react";

const Login = lazy(() => import("../pages/Common/Authentication/pages/Login"));
const Register = lazy(() =>
  import("../pages/Common/Authentication/pages/Register")
);
const CalendarPage = lazy(() =>
  import("../pages/Provider/Calendar/CalendarPage")
);
const Onboarding = lazy(() => import("../pages/Provider/onboarding/Onboarding"));
const Layout = lazy(() => import("../layout/Layout"));
const NotFoundRoute = lazy(() => import("../pages/NotFoundRoute"));

import AuthRedirect from "../components/routeVerifying/AuthRedirect";
import ProtectedRoute from "../components/routeVerifying/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: (
      <AuthRedirect>
        <Login />
      </AuthRedirect>
    ),
  },
  {
    path: "/register",
    element: (
      <AuthRedirect>
        <Register />
      </AuthRedirect>
    ),
  },
  {
    path: "/Onboarding",
    element: (
      <ProtectedRoute shouldHaveNoWorkspace={true}>
        <Onboarding />
      </ProtectedRoute>
    ),
  },
  {
    path: "/calendar",
    element: (
      <ProtectedRoute allowedRoles={["provider"]}>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/calendar",
        element: <CalendarPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundRoute />,
  },
]);

export default router;

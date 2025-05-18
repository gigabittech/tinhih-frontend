import { createBrowserRouter, Navigate } from "react-router";
import { lazy } from "react";

const Login = lazy(() => import("../pages/Common/Authentication/pages/Login"));
const Register = lazy(() =>
  import("../pages/Common/Authentication/pages/Register")
);
const CalendarPage = lazy(() =>
  import("../pages/Provider/Calendar/CalendarPage")
);
const Inbox = lazy(() => import("../pages/Provider/inbox/Inbox"));
const Clients = lazy(() => import("../pages/Provider/clients/Clients"));
const Billing = lazy(() => import("../pages/Provider/billing/Billing"));
const YourTeam = lazy(() => import("../pages/Provider/yourTeam/YourTeam"));
const Booking = lazy(() => import("../pages/Provider/booking/Booking"));

const Onboarding = lazy(() =>
  import("../pages/Provider/onboarding/Onboarding")
);
const Layout = lazy(() => import("../layout/Layout"));
const NotFoundRoute = lazy(() => import("../pages/NotFoundRoute"));

import AuthRedirect from "../components/routeVerifying/AuthRedirect";
import ProtectedRoute from "../components/routeVerifying/ProtectedRoute";

const router = createBrowserRouter([
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
    path: "/:workspace_name/:user_name",
    element: (
      <ProtectedRoute>
        <Booking />
      </ProtectedRoute>
    ),
  },
  {
    path: "/",
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
      {
        path: "/inbox",
        element: <Inbox />,
      },
      {
        path: "/clients",
        element: <Clients />,
      },
      {
        path: "/billing",
        element: <Billing />,
      },
      {
        path: "/your-team",
        element: <YourTeam />,
      },
      {
        path: "/settings",
        element: <YourTeam />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundRoute />,
  },
]);

export default router;

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
        element: <Inbox />,
      },
      {
        path: "/billing",
        element: <Inbox />,
      },
      {
        path: "/your-team",
        element: <Inbox />,
      },
      {
        path: "/contacts",
        element: <Inbox />,
      },
      {
        path: "/settings",
        element: <Inbox />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundRoute />,
  },
]);

export default router;

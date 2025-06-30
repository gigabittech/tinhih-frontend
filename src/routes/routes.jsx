import { createBrowserRouter, Navigate } from "react-router";
import { lazy } from "react";

const Login = lazy(() => import("../pages/Common/Authentication/pages/Login"));
const Register = lazy(() =>
  import("../pages/Common/Authentication/pages/Register")
);
const CalendarPage = lazy(() =>
  import("../pages/Provider/Calendar/CalendarPage")
);
const Onboarding = lazy(() =>
  import("../pages/Provider/onboarding/Onboarding")
);
const Layout = lazy(() => import("../layout/Layout"));
const NotFoundRoute = lazy(() => import("../pages/NotFoundRoute"));

import AuthRedirect from "../components/routeVerifying/AuthRedirect";
import ProtectedRoute from "../components/routeVerifying/ProtectedRoute";

const Inbox = lazy(() => import("../pages/Provider/inbox/Inbox"));
const Clients = lazy(() => import("../pages/Provider/clients/Clients"));
const Billing = lazy(() => import("../pages/Provider/billing/Billing"));
const YourTeam = lazy(() => import("../pages/Provider/yourTeam/YourTeam"));
const Booking = lazy(() => import("../pages/Provider/booking/Booking"));
const Trash = lazy(() => import("../pages/Provider/trash/Trash"));
const Settings = lazy(() =>
  import("../pages/Provider/settings/calendarSettings/Settings")
);

/* ---------my profile settings--------- */
import MyProfileLayout from "../pages/Provider/settings/myProfile/MyProfileLayout";
import Details from "../pages/Provider/settings/myProfile/Details";
import ServicesAvailability from "../pages/Provider/settings/myProfile/ServicesAvailability";
import ConnectedApps from "../pages/Provider/settings/myProfile/ConnectedApps";
import Notifications from "../pages/Provider/settings/myProfile/Notifications";

/* --------------workspace setting----------------- */
import WorkspaceSettingsLayout from "../pages/Provider/settings/workspaceSettings/WorkspaceSettingsLayout";
import WorkspaceDetails from "../pages/Provider/settings/workspaceSettings/Details";
import Subscriptions from "../pages/Provider/settings/workspaceSettings/Subscriptions";
import CustomFields from "../pages/Provider/settings/workspaceSettings/CustomFields";
import Reminders from "../pages/Provider/settings/workspaceSettings/Reminders";
import BillingLayout from "../pages/Provider/settings/billing/BillingLayout";
import BillingDetails from "../pages/Provider/settings/billing/BillingDetails";
import Invoices from "../pages/Provider/settings/billing/Invoices";
import InsuranceLayout from "../pages/Provider/settings/insurance/InsuranceLayout";
import Payers from "../pages/Provider/settings/insurance/Payers";
import SchedulingLayout from "../pages/Provider/settings/scheduling/SchedulingLayout";
import Locations from "../pages/Provider/settings/scheduling/Locations";
import Services from "../pages/Provider/settings/scheduling/Services";
import OnlineBooking from "../pages/Provider/settings/scheduling/OnlineBooking";
import Templates from "../pages/Provider/settings/workflowManagement/Templates";
import BasicReminders from "../pages/Provider/settings/workflowManagement/BasicReminders";
import WorkflowLayout from "../pages/Provider/settings/workflowManagement/WorkflowLayout";

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
    path: "/booking/:workspace_name/:user_name",
    element: <Booking />,
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
        index: true,
        element: <Navigate to="/calendar" replace />,
      },
      {
        path: "/calendar",
        element: <CalendarPage />,
      },
      {
        path: "/calendar/settings",
        element: <Settings />,
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
        path: "/trash",
        element: <Trash />,
      },
      /* -------my prfile----------- */
      {
        path: "/settings/Personal",
        element: <MyProfileLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="Details" replace />,
          },
          {
            path: "Details",
            element: <Details />,
          },
          {
            path: "ServiceAvailability",
            element: <ServicesAvailability />,
          },
          {
            path: "ConnectedApps",
            element: <ConnectedApps />,
          },
          {
            path: "Notifications",
            element: <Notifications />,
          },
        ],
      },
      /* -------workspaces----------- */
      {
        path: "/settings/Workspace",
        element: <WorkspaceSettingsLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="Details" replace />,
          },
          {
            path: "Details",
            element: <WorkspaceDetails />,
          },
          {
            path: "Subscriptions",
            element: <Subscriptions />,
          },
          {
            path: "CustomFields",
            element: <CustomFields />,
          },
          {
            path: "Reminders",
            element: <Reminders />,
          },
        ],
      },
      /* ------billing----------- */
      {
        path: "/settings/Billing",
        element: <BillingLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="Details" replace />,
          },
          {
            path: "Details",
            element: <BillingDetails />,
          },
          {
            path: "Invoicing",
            element: <Invoices />,
          },
        ],
      },
      /* -------insurance----------- */
      {
        path: "/settings/Insurance",
        element: <InsuranceLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="Payers" replace />,
          },
          {
            path: "Payers",
            element: <Payers />,
          },
        ],
      },
      /* -------scheduling----------- */
      {
        path: "/settings/Scheduling",
        element: <SchedulingLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="Locations" replace />,
          },
          {
            path: "Locations",
            element: <Locations />,
          },
          {
            path: "Services",
            element: <Services />,
          },
          {
            path: "OnlineBooking",
            element: <OnlineBooking />,
          },
        ],
      },
      /* -------workflow----------- */
      {
        path: "/settings/Workflow",
        element: <WorkflowLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="Templates" replace />,
          },
          {
            path: "Templates",
            element: <Templates />,
          },
          {
            path: "BasicReminders",
            element: <BasicReminders />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundRoute />,
  },
]);

export default router;

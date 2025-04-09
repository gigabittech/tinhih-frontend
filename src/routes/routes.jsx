import { createBrowserRouter } from "react-router";
import Login from "../pages/Common/Authentication/pages/Login";
import NotFoundRoute from "../pages/NotFoundRoute";
import Register from "../pages/Common/Authentication/pages/Register";
import CalendarPage from "../pages/Provider/Calendar/CalendarPage";
import Layout from "../layout/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/calender",
    element: <Layout />,
    children: [
      {
        path: "/calender",
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

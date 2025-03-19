import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router";
import AppLoader from "./components/global/AppLoader";
import useUserStore from "./store/userStore";
import AuthRedirect from "./components/routeVerifying/AuthRedirect";
import ProtectedRoute from "./components/routeVerifying/ProtectedRoute";

const ProviderRoutes = lazy(() => import("./routes/ProviderRoutes"));
const ClientRoutes = lazy(() => import("./routes/ClientRoutes"));
const Layout = lazy(() => import("./layout/Layout"));
const Login = lazy(() => import("./pages/Common/Authentication/pages/Login"));
const Register = lazy(() =>
  import("./pages/Common/Authentication/pages/Register")
);

function App() {
  const { getUser, isLoading } = useUserStore();

  useEffect(() => {
    getUser();
  }, [getUser]);

  if (isLoading.user) return <AppLoader />;

  return (
    <BrowserRouter>
      <Suspense fallback={<AppLoader />}>
        <Routes>
          <Route path="/" element={<ProtectedRoute />} />

          {/* Prevent authenticated users from accessing login/register */}
          <Route
            path="/login"
            element={
              <AuthRedirect>
                <Login />
              </AuthRedirect>
            }
          />
          <Route
            path="/register"
            element={
              <AuthRedirect>
                <Register />
              </AuthRedirect>
            }
          />

          <Route element={<Layout />}>
            <Route path="/client/*" element={<ClientRoutes />} />
            <Route path="/provider/*" element={<ProviderRoutes />} />
          </Route>

          <Route path="*" element={<p>Not Found</p>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;

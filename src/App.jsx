import { BrowserRouter, Route, Routes } from "react-router";
import { lazy, Suspense } from "react";
import AppLoader from "./components/global/AppLoader";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import ProviderRoutes from "./routes/ProviderRoutes";

const SpecialRoutes = lazy(() => import("./routes/SpecialRoutes"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<AppLoader />}>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="/*" element={<SpecialRoutes />} />
          </Route>

          <Route element={<Layout />}>
            <Route path="/provider/*" element={<ProviderRoutes />} />
          </Route>
          <Route path="/404" element={<p>Not Found</p>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;

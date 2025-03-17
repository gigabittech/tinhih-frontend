import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./layout/Layout";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="*" element={<Layout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

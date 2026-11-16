
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import WasteListings from "./pages/WasteListings";
import GetTransport from "./pages/GetTransport";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import CreateListing from "./pages/CreateListing";
import MyListings from "./pages/MyListings";
import Unauthorized from "./pages/Unauthorized";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />

          <Route path="/listings" element={<WasteListings />} />

          <Route path="/transport" element={<GetTransport />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route
            path="/create-listing"
            element={
              <ProtectedRoute allowedRoles={["farmer"]}>
                <CreateListing />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-listings"
            element={
              <ProtectedRoute allowedRoles={["farmer"]}>
                <MyListings />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
          <Route path="/unauthorized" element={<Unauthorized/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

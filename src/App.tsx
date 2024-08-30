import { Route, Routes } from "react-router-dom";

import Navbar from "./commons/Header";
import AdminDashboard from "./dashboard/admin/AdminDashboard";

import ProtectedRoute from "./Protected/ProtectedRoute";

import StripeIntegration from "./StripeIntegration"; // Import the StripeIntegration component
import Footer from "./commons/Footer";
import UserDashboard from "./dashboard/user/userDashboard";

const App = () => {
  return (
    <>
      <StripeIntegration /> {/* Add StripeIntegration at the top level */}
      <Navbar />
      <Routes>
        {/* Public Routes */}

        {/* Private Route Wrapper */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/user/dashboard" element={<UserDashboard />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
};

export default App;

import { Route, Routes } from "react-router-dom";

import Navbar from "./commons/Header";
import AdminDashboard from "./dashboard/admin/AdminDashboard";
import UserDashboard from "./dashboard/user/userDashboard";

import ProtectedRoute from "./Protected/ProtectedRoute";
import Footer from "./commons/Footer";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Private Route Wrapper */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/user/dashboard" element={<UserDashboard />} />
        </Route>
      </Routes>
      <Footer></Footer>
    </>
  );
};

export default App;

import { Route, Routes } from "react-router-dom";
import Login from "./Auth/SignIn";
import Navbar from "./commons/Header";
import AdminDashboard from "./dashboard/admin/AdminDashboard";
import UserDashboard from "./dashboard/user/userDashboard";
import AboutPage from "./pages/AboutPage";
import ProtectedRoute from "./Protected/ProtectedRoute";
import HeroSection from "./Sections/HeroSection";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<Login />} />
        {/* Private Route examples */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;

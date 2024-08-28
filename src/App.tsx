import React from "react";
import { useLocation } from "react-router-dom";
import Footer from "./commons/Footer";
import AdminDashboard from "./dashboard/admin/AdminDashboard";

import HeroSection from "./Sections/HeroSection";
import Navbar from "./commons/Header";
import { useUser } from "./context/UserContext";
import UserDashboard from "./dashboard/user/userDashboard";

const App: React.FC = () => {
  const { pathname } = useLocation();
  const { user } = useUser();

  // Check if the user is authenticated and has the role 'admin'
  const isAdmin = user.isAuthenticated && user.role === "admin";
  // Check if the user is authenticated and has the role 'user'
  const isUser = user.isAuthenticated && user.role === "user";

  return (
    <div>
      {/* Render dashboard based on user role */}
      <Navbar />
      {isAdmin ? (
        <AdminDashboard />
      ) : isUser ? (
        <UserDashboard /> // Render UserDashboard if the user is authenticated as a user
      ) : (
        <>
          <main className="pt-16 bg-green-600">
            {/* Conditionally render HeroSection only on the home route */}
            {pathname === "/" && <HeroSection />}
            {/* Render other main content */}
          </main>
        </>
      )}

      <Footer />
    </div>
  );
};

export default App;

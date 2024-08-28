import React from "react";
import { useLocation } from "react-router-dom";
import Footer from "./commons/Footer";
import Navbar from "./commons/Header";
import AdminDashboard from "./dashboard/admin/AdminDashboard";

import HeroSection from "./Sections/HeroSection";
import { useUser } from "./context/UserContext";

const App: React.FC = () => {
  const { pathname } = useLocation();
  const { user } = useUser();

  // Check if the user is authenticated and has the role 'admin'
  const isAdmin = user.isAuthenticated && user.role === "admin";

  return (
    <div>
      <Navbar />
      {isAdmin ? (
        // Render AdminDashboard if the user is an admin
        <AdminDashboard />
      ) : (
        <>
          <Navbar />
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

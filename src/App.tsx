// src/App.tsx

import React from "react";
import { useLocation } from "react-router-dom";
import Footer from "./commons/Footer";
import Navbar from "./commons/Header";
import HeroSection from "./Sections/HeroSection";

const App: React.FC = () => {
  const location = useLocation();

  return (
    <div>
      <Navbar />
      <main className="pt-16">
        {/* Conditionally render HeroSection only on the home route */}
        {location.pathname === "/" && <HeroSection />}
      </main>
      <Footer />
    </div>
  );
};

export default App;

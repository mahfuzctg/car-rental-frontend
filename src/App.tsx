// src/App.tsx

import React from "react";

import Footer from "./commons/Footer";
import Navbar from "./commons/Header";

const App: React.FC = () => {
  // const location = useLocation();

  return (
    <div>
      <Navbar />
      <main className="pt-16">
        {/* Conditionally render HeroSection only on the home route */}
        {/* {location.pathname === "/" && <HeroSection />} */}
      </main>
      <Footer />
    </div>
  );
};

export default App;

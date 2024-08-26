import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./commons/Footer";
import Navbar from "./commons/Header";

const App: React.FC = () => {
  return (
    <div>
      <Navbar />
      <main className="pt-16">
        {" "}
        {/* Adjust padding-top as needed */}
        <Outlet /> {/* Renders the matched child route */}
      </main>
      <Footer></Footer>
    </div>
  );
};

export default App;

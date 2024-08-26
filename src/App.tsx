import React from "react";
import { Outlet } from "react-router-dom";
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
    </div>
  );
};

export default App;

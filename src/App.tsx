import React from "react";
import Footer from "./commons/Footer";
import Navbar from "./commons/Header";

// import { AuthContext } from "./contexts/AuthContext"; // Uncomment if using context

const App: React.FC = () => {
  // Example of getting user role from context or state
  // const { user } = useContext(AuthContext);
  // Example user role, replace with actual data from context or props
  const user = { isAuthenticated: true, role: "admin" }; // or "user"

  return (
    <div>
      <Navbar />
      <main className="pt-16">
        {user.isAuthenticated ? (
          user.role === "admin" ? (
            ""
          ) : (
            ""
          )
        ) : (
          // Render the main content if not authenticated
          <>
            {/* Conditionally render HeroSection only on the home route */}
            {/* {location.pathname === "/" && <HeroSection />} */}
            {/* Other main content here */}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;

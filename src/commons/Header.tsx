import React from "react";
import { FaBook, FaCar, FaHome, FaInfoCircle, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import HeroSection from "../components/HeroSection"; // Import the HeroSection component

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Function to handle navigation
  const handleNavigation = (path: string) => {
    navigate(path); // Navigate to the specified path
    setIsMenuOpen(false); // Close the menu after navigating on small devices
  };

  return (
    <div className="flex h-screen">
      {/* Navbar Section */}
      <nav
        className={`bg-white text-gray-800 fixed top-0 left-0 h-full w-2/12 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:w-2/12 z-40`}
      >
        {/* Logo, Name, and Profile (Visible on Large Devices) */}
        <div className="hidden md:flex flex-col items-center justify-center p-4 space-y-4 border-b border-gray-200">
          <img
            src="/Logo/logo-1.jpg"
            alt="Logo"
            className="h-12 w-12 rounded-full cursor-pointer"
            onClick={() => handleNavigation("/")}
          />
          <span
            className="text-xl font-semibold cursor-pointer"
            onClick={() => handleNavigation("/")}
          >
            CarRental
          </span>
          <Link to="/profile" className="hover:text-green-600">
            <FaUser className="text-gray-800" />
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col items-start p-4 space-y-4 mt-16 md:mt-4">
          <button
            onClick={() => handleNavigation("/")}
            className="flex items-center w-full px-4 py-2 text-gray-800 hover:bg-gray-100"
          >
            <FaHome className="mr-2" /> Home
          </button>
          <button
            onClick={() => handleNavigation("/about")}
            className="flex items-center w-full px-4 py-2 text-gray-800 hover:bg-gray-100"
          >
            <FaInfoCircle className="mr-2" /> About
          </button>
          <button
            onClick={() => handleNavigation("/bookings")}
            className="flex items-center w-full px-4 py-2 text-gray-800 hover:bg-gray-100"
          >
            <FaBook className="mr-2" /> Bookings
          </button>
          <button
            onClick={() => handleNavigation("/cars")}
            className="flex items-center w-full px-4 py-2 text-gray-800 hover:bg-gray-100"
          >
            <FaCar className="mr-2" /> Cars
          </button>
          <button
            onClick={() => handleNavigation("/signin")}
            className="flex items-center w-full px-4 py-2 text-gray-800 hover:bg-gray-100"
          >
            <FaUser className="mr-2" /> Sign In
          </button>
          <button
            onClick={() => handleNavigation("/signup")}
            className="w-full px-4 py-2 bg-green-600 text-white text-center rounded hover:bg-green-700"
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-grow bg-gray-100 p-4 ml-1/12 md:ml-[20%]">
        {/* Main content goes here */}
        <HeroSection />
        {/* Include HomePage or other content components as needed */}
      </div>
    </div>
  );
};

export default Navbar;

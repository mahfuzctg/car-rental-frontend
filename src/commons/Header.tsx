// src/commons/Navbar.tsx

import React from "react";
import {
  FaBars,
  FaBook,
  FaCar,
  FaHome,
  FaInfoCircle,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import { Link, Outlet, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative">
      {/* Navbar for Small Devices */}
      <nav className="fixed top-0 left-0 w-full bg-white text-gray-800 md:hidden z-50 flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <img
            src="/src/assets/Logo/logo-1.jpg"
            alt="Logo"
            className="h-12 w-12 rounded-full cursor-pointer"
            onClick={() => handleNavigation("/")}
          />
          <span
            className="text-lg font-semibold cursor-pointer"
            onClick={() => handleNavigation("/")}
          >
            CarRental
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/profile" className="hover:text-green-600">
            <FaUser className="text-gray-800 text-xl" />
          </Link>
          <button onClick={toggleMenu} className="text-gray-800 text-2xl">
            <FaBars />
          </button>
        </div>
      </nav>

      {/* Sidebar Menu for Small Devices */}
      <nav
        className={`fixed top-0 left-0 h-full w-3/4 bg-white text-gray-800 transform transition-transform duration-300 ease-in-out z-40 md:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={toggleMenu}
          className="absolute top-4 right-4 text-gray-800 text-2xl"
        >
          <FaTimes />
        </button>
        <div className="flex flex-col items-start p-4 space-y-4 mt-16">
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
            onClick={() => handleNavigation("/sign-in")}
            className="flex items-center w-full px-4 py-2 text-gray-800 hover:bg-gray-100"
          >
            <FaUser className="mr-2" /> Sign In
          </button>
          <button
            onClick={() => handleNavigation("/sign-up")}
            className="w-full px-4 py-2 bg-green-600 text-white text-center rounded hover:bg-green-700"
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* Sidebar for Large Devices */}
      <nav className="hidden md:flex flex-col fixed top-0 left-0 h-full w-[20%] bg-white text-gray-800 border-r border-gray-200 z-40">
        <div className="flex flex-col items-center justify-center p-4 space-y-4 border-b border-gray-200">
          <img
            src="/src/assets/Logo/logo-1.jpg"
            alt="Logo"
            className="h-20 w-20 rounded-full cursor-pointer"
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
        <div className="flex flex-col items-start p-4 space-y-4 mt-16">
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
            onClick={() => handleNavigation("/sign-in")}
            className="flex items-center w-full px-4 py-2 text-gray-800 hover:bg-gray-100"
          >
            <FaUser className="mr-2" /> Sign In
          </button>
          <button
            onClick={() => handleNavigation("/sign-up")}
            className="w-full px-4 py-2 bg-green-600 text-white text-center rounded hover:bg-green-700"
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="mt-14 md:mt-0 md:ml-[20%] md:w-[80%] mx-auto p-4">
        {/* This is where the content will be rendered based on the route */}
        <Outlet />
      </div>
    </div>
  );
};

export default Navbar;

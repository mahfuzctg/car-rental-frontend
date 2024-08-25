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
import { Link } from "react-router-dom";
import HomePage from "../pages/HomePage";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="flex flex-col h-screen">
      {/* Main Navbar */}
      <nav className="bg-gray-800 text-white shadow-md fixed w-full top-0 left-0 z-50 flex items-center justify-between p-4">
        {/* Show/Hide Menu Button */}
        <button
          className="md:hidden text-white p-4"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Logo and User Profile */}
        <div className="flex items-center space-x-4 w-full">
          <img src="/Logo/logo-1.jpg" alt="Logo" className="h-8 w-8" />
          <span className="text-lg font-semibold">CarRental</span>
          <div className="hidden md:flex flex-grow items-center justify-end space-x-4">
            <Link to="/signin" className="hover:text-green-400">
              <FaUser className="inline mr-1" /> Sign In
            </Link>
            <Link
              to="/signup"
              className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
            >
              Sign Up
            </Link>
          </div>
        </div>

        {/* User Profile Icon (Small Devices) */}
        <div className="md:hidden flex items-center">
          <Link to="/profile" className="hover:text-green-400">
            <FaUser className="text-white" />
          </Link>
        </div>
      </nav>

      <div className="flex flex-1 mt-16">
        {/* Menu Section */}
        <div
          className={`bg-gray-700 text-white w-1/3 md:w-1/4 lg:w-1/5 h-full fixed top-16 left-0 ${
            isMenuOpen ? "block" : "hidden"
          } md:block`}
        >
          <div className="flex flex-col h-full">
            <Link
              to="/"
              className="block px-4 py-2 text-white hover:bg-gray-600"
            >
              <FaHome className="inline mr-1" /> Home
            </Link>
            <Link
              to="/about"
              className="block px-4 py-2 text-white hover:bg-gray-600"
            >
              <FaInfoCircle className="inline mr-1" /> About
            </Link>
            <Link
              to="/bookings"
              className="block px-4 py-2 text-white hover:bg-gray-600"
            >
              <FaBook className="inline mr-1" /> Bookings
            </Link>
            <Link
              to="/cars"
              className="block px-4 py-2 text-white hover:bg-gray-600"
            >
              <FaCar className="inline mr-1" /> Cars
            </Link>
            <Link
              to="/signin"
              className="block px-4 py-2 text-white hover:bg-gray-600"
            >
              <FaUser className="inline mr-1" /> Sign In
            </Link>
            <Link
              to="/signup"
              className="block px-4 py-2 bg-green-600 text-white text-center rounded hover:bg-green-700"
            >
              Sign Up
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow bg-gray-100 p-4 ml-0 md:ml-1/4 lg:ml-[calc(10%+1px)]">
          <HomePage></HomePage>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

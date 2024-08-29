import React, { useState } from "react";
import {
  FaBars,
  FaBook,
  FaSignOutAlt,
  FaTachometerAlt,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/Logo/logo-2.png";
import { logout } from "../../Auth/AuthSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hook";

const UserDashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const handleNavigation = (path: string) => {
    navigate(`/user${path}`);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="flex">
      {/* Show/Hide Menu Icon for Small Devices */}
      <button
        className="lg:hidden p-4 text-gray-800 focus:outline-none z-50"
        onClick={toggleSidebar}
      >
        {isSidebarVisible ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Sidebar */}
      <nav
        className={`fixed top-0 left-0 h-full bg-white text-gray-800 border-r border-gray-200 flex flex-col p-4 space-y-4 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:w-64 ${
          isSidebarVisible ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo and Website Name */}
        <div className="flex flex-col items-center mb-10">
          <img
            src={logo}
            alt="Logo"
            className="h-16 w-16 rounded-full cursor-pointer"
            onClick={() => handleNavigation("/")}
          />
        </div>

        {/* User Profile */}
        <div
          className="flex flex-col items-center cursor-pointer relative"
          onMouseEnter={() => setIsProfileHovered(true)}
          onMouseLeave={() => setIsProfileHovered(false)}
        >
          <FaUser className="text-gray-800 text-3xl mb-2" />
          <span className="text-gray-600 text-sm">
            {user?.email || "user@example.com"}
          </span>

          {/* Hover Info */}
          {isProfileHovered && (
            <div className="absolute top-full mt-2 py-2 px-4 bg-white border border-gray-300 shadow-lg rounded-md z-10">
              <p className="text-gray-800 text-sm font-semibold">
                {`Role: ${user?.role || "User Role"}`}
              </p>
              <p className="text-gray-800 text-sm">
                {`Name: ${user?.name || "User Name"}`}
              </p>
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col items-start space-y-4">
          <button
            onClick={() => handleNavigation("/overview")}
            className={`flex items-center w-full px-4 py-2 hover:bg-gray-100 rounded ${
              location.pathname === "/user/overview" ? "bg-gray-200" : ""
            }`}
          >
            <FaTachometerAlt className="mr-2" /> Overview
          </button>
          <button
            onClick={() => handleNavigation("/booking-management")}
            className={`flex items-center w-full px-4 py-2 hover:bg-gray-100 rounded ${
              location.pathname === "/user/booking-management"
                ? "bg-gray-200"
                : ""
            }`}
          >
            <FaBook className="mr-2" /> Booking Management
          </button>
          <button
            onClick={() => handleNavigation("/payment-management")}
            className={`flex items-center w-full px-4 py-2 hover:bg-gray-100 rounded ${
              location.pathname === "/user/payment-management"
                ? "bg-gray-200"
                : ""
            }`}
          >
            <FaUser className="mr-2" /> Payment Management
          </button>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-auto w-full px-4 py-2 bg-red-600 text-white text-center rounded hover:bg-red-700"
        >
          <FaSignOutAlt className="mr-2 inline-block" /> Logout
        </button>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 p-8 ">
        <h2 className="text-2xl text-gray-700 md:text-3xl font-bold text-center mb-6 uppercase">
          user dashboard
          <div className="w-24 h-1 bg-red-600 mt-2 mx-auto"></div>
        </h2>
        {/* Insert Overview Component Here */}
      </div>
    </div>
  );
};

export default UserDashboard;

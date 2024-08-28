import React, { useState } from "react";
import {
  FaBars,
  FaBook,
  FaCar,
  FaChartBar,
  FaClipboardList,
  FaSignOutAlt,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { logout } from "../../Auth/AuthSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hook";
import logo from "/src/assets/Logo/logo-1.jpg";

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  // Fetch user info from the Redux store
  const user = useAppSelector((state) => state.auth.user);

  const handleNavigation = (path: string) => {
    navigate(path);
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
          <span
            className="text-xl font-semibold cursor-pointer mt-2"
            onClick={() => handleNavigation("/")}
          >
            CarRental Admin
          </span>
        </div>

        {/* User Profile */}
        <div
          className="flex flex-col items-center cursor-pointer relative"
          onMouseEnter={() => setIsProfileHovered(true)}
          onMouseLeave={() => setIsProfileHovered(false)}
        >
          <FaUser className="text-gray-800 text-3xl mb-2" />
          <span className="text-gray-600 text-sm">
            {user?.name || "Admin Name"}
          </span>

          {/* Hover Info */}
          {isProfileHovered && (
            <div className="absolute top-full mt-2 py-2 px-4 bg-white border border-gray-300 shadow-lg rounded-md z-10">
              <p className="text-gray-800 text-sm font-semibold">
                Role: {user?.role || "Admin"}
              </p>
              <p className="text-gray-800 text-sm">
                Email: {user?.email || "admin@example.com"}
              </p>
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col items-start space-y-4">
          <button
            onClick={() => handleNavigation("/manage-cars")}
            className="flex items-center w-full px-4 py-2 text-gray-800 hover:bg-gray-100 rounded"
          >
            <FaCar className="mr-2" /> Manage Cars
          </button>
          <button
            onClick={() => handleNavigation("/manage-bookings")}
            className="flex items-center w-full px-4 py-2 text-gray-800 hover:bg-gray-100 rounded"
          >
            <FaBook className="mr-2" /> Manage Bookings
          </button>
          <button
            onClick={() => handleNavigation("/manage-return-cars")}
            className="flex items-center w-full px-4 py-2 text-gray-800 hover:bg-gray-100 rounded"
          >
            <FaClipboardList className="mr-2" /> Manage Return Cars
          </button>
          <button
            onClick={() => handleNavigation("/user-management")}
            className="flex items-center w-full px-4 py-2 text-gray-800 hover:bg-gray-100 rounded"
          >
            <FaUser className="mr-2" /> User Management
          </button>
          <button
            onClick={() => handleNavigation("/reports")}
            className="flex items-center w-full px-4 py-2 text-gray-800 hover:bg-gray-100 rounded"
          >
            <FaChartBar className="mr-2" /> Reports
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
      <div className="flex-1 p-8 lg:ml-64">
        <h1 className="text-3xl font-semibold mb-8">Admin Dashboard</h1>
        {/* The content for each route will be rendered here */}
      </div>
    </div>
  );
};

export default AdminDashboard;

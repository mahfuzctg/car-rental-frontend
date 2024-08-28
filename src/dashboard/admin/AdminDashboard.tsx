import React from "react";
import {
  FaBook,
  FaCar,
  FaChartBar,
  FaClipboardList,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Importing the logo image correctly

import { logout } from "../../Auth/AuthSlice";
import { useAppDispatch } from "../../redux/hooks/hook";
import logo from "/src/assets/Logo/logo-1.jpg";

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    // Perform logout action
    dispatch(logout()); // This will clear the user data in Redux store
    navigate("/"); // Redirect to the home page
  };

  return (
    <div className="flex w-full h-screen">
      {/* Sidebar */}
      <nav className="w-7/9 bg-[#ffffff] text-gray-800 border-r border-gray-200 flex flex-col items-start p-4 space-y-4">
        {/* Logo and Website Name */}
        <div className="flex flex-col items-center justify-center">
          <img
            src={logo}
            alt="Logo"
            className="h-20 w-20 rounded-full cursor-pointer"
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
        <div className="mt-10 flex items-center space-x-4 cursor-pointer">
          <FaUser className="text-gray-800 text-xl" />
          <span className="text-lg font-semibold">Admin Name</span>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col items-start space-y-4 mt-10 w-full">
          <button
            onClick={() => handleNavigation("/manage-cars")}
            className="flex items-center w-full px-4 py-2 text-gray-800 hover:bg-gray-100"
          >
            <FaCar className="mr-2" /> Manage Cars
          </button>
          <button
            onClick={() => handleNavigation("/manage-bookings")}
            className="flex items-center w-full px-4 py-2 text-gray-800 hover:bg-gray-100"
          >
            <FaBook className="mr-2" /> Manage Bookings
          </button>
          <button
            onClick={() => handleNavigation("/manage-return-cars")}
            className="flex items-center w-full px-4 py-2 text-gray-800 hover:bg-gray-100"
          >
            <FaClipboardList className="mr-2" /> Manage Return Cars
          </button>
          <button
            onClick={() => handleNavigation("/user-management")}
            className="flex items-center w-full px-4 py-2 text-gray-800 hover:bg-gray-100"
          >
            <FaUser className="mr-2" /> User Management
          </button>
          <button
            onClick={() => handleNavigation("/reports")}
            className="flex items-center w-full px-4 py-2 text-gray-800 hover:bg-gray-100"
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
      <div className="w-3/4 p-8">
        <h1 className="text-3xl font-semibold mb-8">Admin Dashboard</h1>
        {/* The content for each route will be rendered here */}
      </div>
    </div>
  );
};

export default AdminDashboard;

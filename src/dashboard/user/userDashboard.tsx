import React, { useState } from "react";
import { FaBook, FaCar, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { logout } from "../../Auth/AuthSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hook";
import logo from "/src/assets/Logo/logo-1.jpg";

const UserDashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user); // Assuming user is stored in auth slice
  const [isProfileHovered, setIsProfileHovered] = useState(false);

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    dispatch(logout()); // Clear user data in Redux store
    navigate("/"); // Redirect to the home page
  };

  return (
    <div className="flex w-full h-screen">
      {/* Sidebar */}
      <nav className="w-1/4 bg-[#ffffff] text-gray-800 border-r border-gray-200 flex flex-col items-start p-4 space-y-4">
        {/* Logo and Website Name */}
        <div className="flex flex-col items-center justify-center">
          <img
            src={logo}
            alt="Logo"
            className="h-20 w-20 rounded-full cursor-pointer"
            onClick={() => handleNavigation("/")}
          />
        </div>

        {/* User Profile */}
        <div
          className="mt-10 flex items-center space-x-4 cursor-pointer relative"
          onMouseEnter={() => setIsProfileHovered(true)}
          onMouseLeave={() => setIsProfileHovered(false)}
        >
          <FaUser className="text-gray-800 text-xl" />
          <div className="flex flex-col">
            <span className="text-lg font-semibold">
              {user?.name || "User Name"}
            </span>
            <span className="text-gray-600">
              {user?.email || "user@example.com"}
            </span>
          </div>

          {/* Hover Info - Displayed in front of the profile */}
          {isProfileHovered && (
            <div className="absolute left-full py-2 px-4 bg-white border border-gray-300 shadow-lg rounded-md z-10">
              <p className="text-gray-800 text-sm font-semibold ">
                {`Role : ${user?.role || "User Role"}`}
              </p>
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col items-start space-y-4 mt-10 w-full">
          <button
            onClick={() => handleNavigation("/overview")}
            className="flex items-center w-full px-4 py-2 text-gray-800 hover:bg-gray-100"
          >
            <FaCar className="mr-2" /> Overview
          </button>
          <button
            onClick={() => handleNavigation("/booking-management")}
            className="flex items-center w-full px-4 py-2 text-gray-800 hover:bg-gray-100"
          >
            <FaBook className="mr-2" /> Booking Management
          </button>
          <button
            onClick={() => handleNavigation("/payment-management")}
            className="flex items-center w-full px-4 py-2 text-gray-800 hover:bg-gray-100"
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
      <div className="w-3/4 p-8">
        <h1 className="text-3xl font-semibold mb-8">
          {user?.role === "admin" ? "Admin" : "User"} Dashboard
        </h1>
        {/* The content for each route will be rendered here */}
      </div>
    </div>
  );
};

export default UserDashboard;

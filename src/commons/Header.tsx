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
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="relative">
      {/* Navbar for Small Devices */}
      <nav className="fixed top-0 left-0 w-full bg-white text-gray-700 md:hidden z-50 flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center ">
          <img
            src="https://i.postimg.cc/g0d35Rbd/minimalist-car-logo-design-red-black-wings-check-mark-develop-conveys-energy-excitement-high-perform.webp"
            alt="Logo"
            className="h-12 w-12 rounded-full cursor-pointer"
            onClick={() => handleNavigation("/")}
          />
          <span
            className="text-lg text-gray-700 uppercase font-bold cursor-pointer"
            onClick={() => handleNavigation("/")}
          >
            Car <span className="text-red-600">Rental</span>
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/profile" className="hover:text-red-600">
            <FaUser className="text-gray-700 text-xl" />
          </Link>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-red-600 text-2xl"
          >
            <FaBars />
          </button>
        </div>
      </nav>

      {/* Sidebar Menu for Small Devices */}
      <nav
        className={`fixed top-0 left-0 h-full w-3/4 bg-white text-gray-700 transform transition-transform duration-300 ease-in-out z-40 md:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-4 right-4 text-gray-700 text-2xl"
        >
          <FaTimes />
        </button>
        <div className="flex flex-col items-start p-4 space-y-4 mt-16">
          {["/", "/about", "/booking", "/cars", "/sign-in"].map(
            (path, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(path)}
                className={`flex items-center w-full px-4 py-2 text-gray-800 hover:text-red-600 hover:border-l-4 hover:border-red-600 transition-all duration-300 ease-in-out ${
                  isActive(path) ? "border-l-4 border-red-600 text-red-600" : ""
                }`}
              >
                {index === 0 && <FaHome className="mr-2" />}
                {index === 1 && <FaInfoCircle className="mr-2" />}
                {index === 2 && <FaBook className="mr-2" />}
                {index === 3 && <FaCar className="mr-2" />}
                {index === 4 && <FaUser className="mr-2" />}
                {index === 0 && "Home"}
                {index === 1 && "About"}
                {index === 2 && "Bookings"}
                {index === 3 && "Cars"}
                {index === 4 && "Sign In"}
              </button>
            )
          )}
          <button
            onClick={() => handleNavigation("/sign-up")}
            className="w-full px-4 py-2 bg-red-600 text-white text-center rounded hover:bg-red-700"
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* Sidebar for Large Devices */}
      <nav className="hidden md:flex flex-col fixed top-0 left-0 w-[20%] bg-white text-gray-800 border border-gray-200 z-40">
        <div className="flex flex-col items-center justify-center">
          <img
            src="https://i.postimg.cc/g0d35Rbd/minimalist-car-logo-design-red-black-wings-check-mark-develop-conveys-energy-excitement-high-perform.webp"
            alt="Logo"
            className="h-20 w-20 rounded-full cursor-pointer"
            onClick={() => handleNavigation("/")}
          />
          <span
            className="text-lg text-gray-700 uppercase font-bold cursor-pointer"
            onClick={() => handleNavigation("/")}
          >
            Car <span className="text-red-600">Rental</span>
          </span>
          <Link to="/profile" className="hover:text-red-600">
            <FaUser className="text-gray-800" />
          </Link>
        </div>
        <div className="flex flex-col items-start p-4 space-y-4 mt-16">
          {["/", "/about", "/booking", "/cars", "/sign-in"].map(
            (path, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(path)}
                className={`flex items-center w-full px-4 py-2 text-gray-800 hover:text-red-600 hover:border-l-4 hover:border-red-600 transition-all duration-300 ease-in-out ${
                  isActive(path) ? "border-l-4 border-red-600 text-red-600" : ""
                }`}
              >
                {index === 0 && <FaHome className="mr-2" />}
                {index === 1 && <FaInfoCircle className="mr-2" />}
                {index === 2 && <FaBook className="mr-2" />}
                {index === 3 && <FaCar className="mr-2" />}
                {index === 4 && <FaUser className="mr-2" />}
                {index === 0 && "Home"}
                {index === 1 && "About"}
                {index === 2 && "Bookings"}
                {index === 3 && "Cars"}
                {index === 4 && "Sign In"}
              </button>
            )
          )}
          <button
            onClick={() => handleNavigation("/sign-up")}
            className="w-full px-4 py-2 bg-red-600 text-white text-center rounded hover:bg-red-700"
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-16 md:pt-0 md:ml-[20%]">
        <Outlet />
      </div>
    </div>
  );
};

export default Navbar;

import { createBrowserRouter } from "react-router-dom";

// Admin Imports
import AdminDashboard from "../dashboard/admin/AdminDashboard";
import ManageBookings from "../dashboard/admin/Managements/ManageBookings";
import ManageCars from "../dashboard/admin/Managements/ManageCars";
import ManageReturnCars from "../dashboard/admin/Managements/ManageReturnCars";
import UserManagement from "../dashboard/admin/Managements/UserManagement";

// User Imports

import BookingManagement from "../dashboard/user/Managements/BookingManagement";
import PaymentManagement from "../dashboard/user/Managements/PaymentManagement";

// Other Imports
import App from "../App";
import SignIn from "../Auth/SignIn";
import SignUp from "../Auth/SignUp";
import Overview from "../dashboard/user/Managements/Overview ";
import UserDashboard from "../dashboard/user/userDashboard";
import AdminLayout from "../Layout/AdminLayout";
import UserLayout from "../Layout/UserLayout";
import AboutPage from "../pages/AboutPage";
import BookingPage from "../pages/BookingPage";
import CarDetails from "../pages/CarDetailsPage";
import CarListing from "../pages/CarListing";
import NotFoundPage from "../pages/NotFoundPage";
import HeroSection from "../Sections/HeroSection";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HeroSection /> },
      { path: "about", element: <AboutPage /> },
      { path: "bookings", element: <BookingPage /> },
      { path: "cars", element: <CarListing /> },
      { path: "/car/:id", element: <CarDetails /> },
      { path: "/book/:id", element: <BookingPage /> },

      { path: "sign-in", element: <SignIn /> },
      { path: "sign-up", element: <SignUp /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "manage-cars", element: <ManageCars /> },
      { path: "manage-bookings", element: <ManageBookings /> },
      { path: "manage-return-cars", element: <ManageReturnCars /> },
      { path: "manage-users", element: <UserManagement /> },
    ],
  },
  {
    path: "/user",
    element: <UserLayout />,
    children: [
      { path: "dashboard", element: <UserDashboard /> },
      { path: "overview", element: <Overview /> },
      { path: "booking-management", element: <BookingManagement /> },
      { path: "payment-management", element: <PaymentManagement /> },
    ],
  },
]);

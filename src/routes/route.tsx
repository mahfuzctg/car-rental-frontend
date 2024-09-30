import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ChangePassword from "../Auth/ChangePassword";
import ForgetPassword from "../Auth/ForgetPassword";
import SignIn from "../Auth/SignIn";
import SignUp from "../Auth/SignUp";
import AdminDashboard from "../dashboard/admin/AdminDashboard";
import CreateCar from "../dashboard/admin/Managements/CRUD/CreateCar";

import ManageBookings from "../dashboard/admin/Managements/ManageBookings";
import ManageCars from "../dashboard/admin/Managements/ManageCars";
import ManageReturnCars from "../dashboard/admin/Managements/ManageReturnCars";
import Reports from "../dashboard/admin/Managements/Reports";
import UserManagement from "../dashboard/admin/Managements/UserManagement";

import Overview from "../dashboard/user/Managements/Overview ";
import PaymentManagement from "../dashboard/user/Managements/PaymentManagement";
import UserDashboard from "../dashboard/user/userDashboard";
import AdminLayout from "../Layout/AdminLayout";
import UserLayout from "../Layout/UserLayout";
import AboutPage from "../pages/AboutPage";

import AdminOverview from "../dashboard/admin/Managements/DashboardOverview";
import MyBookings from "../dashboard/user/Managements/MyBooking";
import BookingConfirmation from "../pages/Booking/BookingConfirm";
import BookingForm from "../pages/Booking/BookingForm";
import BookingPage from "../pages/BookingPage";
import CarDetails from "../pages/CarDetailsPage";
import CarListing from "../pages/CarListing";
import NotFoundPage from "../pages/NotFoundPage";
import ProtectedRoute from "../Protected/ProtectedRoute";
import HeroSection from "../Sections/HeroSection";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HeroSection /> },
      { path: "about", element: <AboutPage /> },
      { path: "booking", element: <BookingPage /> },
      { path: "booking-form/:id", element: <BookingForm /> },
      {
        path: "booking-confirmation/:id",
        element: <BookingConfirmation></BookingConfirmation>,
      },
      { path: "cars", element: <CarListing /> },
      { path: "car/:id", element: <CarDetails /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
  { path: "sign-in", element: <SignIn /> },
  { path: "sign-up", element: <SignUp /> },
  { path: "/forget-password", element: <ForgetPassword /> },
  { path: "/reset-password", element: <ChangePassword /> },

  { path: "*", element: <NotFoundPage /> },

  // Admin routes
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "overview", element: <AdminOverview /> },
      { path: "manage-cars", element: <ManageCars /> },
      { path: "create-car", element: <CreateCar /> },
      // { path: "update-car/:id", element: <UpdateCar /> },
      { path: "manage-bookings", element: <ManageBookings /> },
      { path: "manage-return-cars", element: <ManageReturnCars /> },
      { path: "manage-users", element: <UserManagement /> },
      { path: "reports", element: <Reports /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },

  // User routes
  {
    path: "/user",
    element: (
      <ProtectedRoute>
        <UserLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "dashboard", element: <UserDashboard /> },
      { path: "overview", element: <Overview /> },
      { path: "booking-management", element: <MyBookings /> },
      { path: "payment-management", element: <PaymentManagement /> },
      { path: "*", element: <NotFoundPage /> }, // User-Level 404
    ],
  },
]);

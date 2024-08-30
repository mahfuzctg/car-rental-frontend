import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ChangePassword from "../Auth/ChangePassword";
import ForgetPassword from "../Auth/ForgetPassword";
import SignIn from "../Auth/SignIn";
import SignUp from "../Auth/SignUp";
import AdminDashboard from "../dashboard/admin/AdminDashboard";
import CreateCar from "../dashboard/admin/Managements/CRUD/CreateCar";
import UpdateCar from "../dashboard/admin/Managements/CRUD/UpdateCarModal";
import DashboardOverview from "../dashboard/admin/Managements/DashboardOverview";
import ManageBookings from "../dashboard/admin/Managements/ManageBookings";
import ManageCars from "../dashboard/admin/Managements/ManageCars";
import ManageReturnCars from "../dashboard/admin/Managements/ManageReturnCars";
import Reports from "../dashboard/admin/Managements/Reports";
import UserManagement from "../dashboard/admin/Managements/UserManagement";
import BookingManagement from "../dashboard/user/Managements/BookingManagement";
import Overview from "../dashboard/user/Managements/Overview ";
import PaymentManagement from "../dashboard/user/Managements/PaymentManagement";
import UserDashboard from "../dashboard/user/userDashboard";
import AdminLayout from "../Layout/AdminLayout";
import UserLayout from "../Layout/UserLayout";
import AboutPage from "../pages/AboutPage";
import BookingConfirmation from "../pages/Booking/BookingConfirm";
import BookingForm from "../pages/Booking/BookingForm";
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
      { path: "booking", element: <BookingPage /> },
      { path: "booking-form/:id", element: <BookingForm /> },
      {
        path: "booking-confirmation/:id",
        element: <BookingConfirmation />,
      },
      { path: "cars", element: <CarListing /> },
      { path: "car/:id", element: <CarDetails /> },
      { path: "*", element: <NotFoundPage /> }, // Root-Level 404
    ],
  },
  { path: "sign-in", element: <SignIn /> },
  { path: "sign-up", element: <SignUp /> },
  { path: "/forget-password", element: <ForgetPassword /> },
  { path: "/reset-password", element: <ChangePassword /> },

  { path: "*", element: <NotFoundPage /> },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "overview", element: <DashboardOverview /> },
      { path: "manage-cars", element: <ManageCars /> },
      { path: "create-car", element: <CreateCar /> },
      { path: "update-car/:id", element: <UpdateCar /> },
      { path: "manage-bookings", element: <ManageBookings /> },
      { path: "manage-return-cars", element: <ManageReturnCars /> },
      { path: "manage-users", element: <UserManagement /> },
      { path: "reports", element: <Reports /> },
      { path: "*", element: <NotFoundPage /> },
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
      { path: "*", element: <NotFoundPage /> }, // User-Level 404
    ],
  },
]);

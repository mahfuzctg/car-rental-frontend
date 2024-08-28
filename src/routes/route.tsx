import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import SignIn from "../Auth/SignIn";
import SignUp from "../Auth/SignUp";
import AdminDashboard from "../dashboard/admin/AdminDashboard";
import ManageBookings from "../dashboard/admin/Managements/ManageBookings";
import ManageCars from "../dashboard/admin/Managements/ManageCars";
import ManageReturnCars from "../dashboard/admin/Managements/ManageReturnCars";
import UserManagement from "../dashboard/admin/Managements/UserManagement";
import AdminLayout from "../Layout/AdminLayout";
import AboutPage from "../pages/AboutPage";
import BookingPage from "../pages/BookingPage";
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
]);

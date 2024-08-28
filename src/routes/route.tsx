import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import SignIn from "../Auth/SignIn";
import SignUp from "../Auth/SignUp";
import AdminDashboard from "../dashboard/admin/AdminDashboard";
import ManageBookings from "../dashboard/admin/Managements/ManageBookings";
import ManageCars from "../dashboard/admin/Managements/ManageCars";
import ManageReturnCars from "../dashboard/admin/Managements/ManageReturnCars";
import Reports from "../dashboard/admin/Managements/Reports";
import UserManagement from "../dashboard/admin/Managements/UserManagement";
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
    element: <AdminDashboard />, // Main Dashboard Component
    children: [
      { path: "manage-cars", element: <ManageCars /> },
      { path: "manage-bookings", element: <ManageBookings /> },
      { path: "manage-return-cars", element: <ManageReturnCars /> },
      { path: "user-management", element: <UserManagement /> },
      { path: "reports", element: <Reports /> },
    ],
  },
]);

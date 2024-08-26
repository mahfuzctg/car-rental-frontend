import React from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "../Auth/SignIn";
import SignUp from "../Auth/SignUp";
import AboutPage from "../pages/AboutPage";
import BookingPage from "../pages/BookingPage";
import CarListingPage from "../pages/CarListingPage";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/bookings" element={<BookingPage />} />
      <Route path="/cars" element={<CarListingPage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<NotFoundPage />} />
      {/* Optional: Handle unknown routes */}
    </Routes>
  );
};

export default AppRoutes;

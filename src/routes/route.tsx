// src/router/router.tsx

import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import SignIn from "../Auth/SignIn";
import SignUp from "../Auth/SignUp";
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
]);

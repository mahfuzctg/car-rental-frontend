// router.tsx

import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import SignIn from "../Auth/SignIn";
import SignUp from "../Auth/SignUp";

import AboutPage from "../pages/AboutPage";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // This is the layout component
    errorElement: <NotFoundPage />, // Optional: Handle unknown routes
    children: [
      {
        index: true, // Default child route for "/"
        element: <HomePage />, // Render HomePage component for the root path
      },
      {
        path: "about",
        element: <AboutPage />, // Render SignIn component for "/sign-in"
      },
      {
        path: "sign-in",
        element: <SignIn />, // Render SignIn component for "/sign-in"
      },
      {
        path: "/sign-up",
        element: <SignUp />, // Render SignUp component for "/sign-up"
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />, // Render NotFoundPage for any other unknown routes
  },
]);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom"; // Import RouterProvider

import "./index.css";
import { router } from "./routes/route";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} /> {/* Provide the router to your app */}
  </StrictMode>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import "./index.css";

import { UserProvider } from "./context/UserContext"; // Import UserProvider
import { store } from "./redux/store";
import { router } from "./routes/route";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <UserProvider>
        <RouterProvider router={router} />
        <Toaster position="top-center" />
      </UserProvider>
    </Provider>
  </StrictMode>
);

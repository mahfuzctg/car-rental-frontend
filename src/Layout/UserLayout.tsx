import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/UserContext";

const UserLayout: React.FC = () => {
  const { user } = useUser(); // Get user data from context

  // Redirect to the user's dashboard if the user is authenticated and has the 'user' role
  if (user.isAuthenticated && user.role === "user") {
    return <Navigate to="/user/dashboard" />;
  }

  // Redirect to the sign-in page if the user is not authenticated
  if (!user.isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <div className="flex p-5">
      <main className="w-full">
        {/* Render the protected routes here */}
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;

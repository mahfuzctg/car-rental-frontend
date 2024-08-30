import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/UserContext";

const AdminLayout: React.FC = () => {
  const { user } = useUser(); // Get user data from context

  // Redirect to the sign-in page if the user is not authenticated
  if (!user.isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  // Redirect to the user's dashboard if the user does not have the 'admin' role
  if (user.isAuthenticated && user.role !== "admin") {
    return <Navigate to="/user/dashboard" replace />;
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

export default AdminLayout;

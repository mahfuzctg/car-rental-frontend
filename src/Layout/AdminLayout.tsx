import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/UserContext";

const AdminLayout: React.FC = () => {
  const { user } = useUser(); // Get user data from context

  // Redirect to sign-in if user is not an admin
  if (!user.isAuthenticated || user.role !== "admin") {
    return <Navigate to="/sign-in" />;
  }

  return (
    <div className="flex">
      <main className="w-3/4 p-8">
        {/* Render the admin routes here */}
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

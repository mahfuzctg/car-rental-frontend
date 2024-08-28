import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/UserContext";

const UserLayout: React.FC = () => {
  const { user } = useUser(); // Get user data from context

  // Redirect to sign-in if user is not authenticated
  if (!user.isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <div className="flex p-5">
      <main className=" w-full ">
        {/* Render the admin routes here */}
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;

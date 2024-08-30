import React from "react";
import { Navigate } from "react-router-dom";

interface User {
  isAuthenticated: boolean;
  role: "admin" | "user" | undefined;
}

// Replace this with your actual authentication logic
const useAuth = (): User | null => {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    return user && user.isAuthenticated ? user : null;
  } catch (error) {
    console.error("Error parsing user data:", error);
    return null;
  }
};

interface ProtectedRouteProps {
  children: JSX.Element;
  role: "admin" | "user";
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }) => {
  const user = useAuth();

  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  if (user.role !== role) {
    return <Navigate to="/not-authorized" replace />;
  }

  return children;
};

export default ProtectedRoute;

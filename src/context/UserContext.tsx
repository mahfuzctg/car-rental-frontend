import React, { createContext, ReactNode, useContext } from "react";

interface UserContextType {
  user: {
    isAuthenticated: boolean;
    role: string;
  };
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Example user data, replace with actual data fetching logic
  const user = { isAuthenticated: true, role: "admin" }; // Mocked user data

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

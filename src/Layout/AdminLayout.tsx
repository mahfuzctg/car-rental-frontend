import React from "react";

interface DashboardSidebarProps {
  sidebarType: "admin" | "user";
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ sidebarType }) => {
  return (
    <div
      className={`sidebar ${
        sidebarType === "admin" ? "admin-sidebar" : "user-sidebar"
      }`}
    >
      {/* Sidebar content here */}
    </div>
  );
};

export default DashboardSidebar;

import React from "react";

const DashboardOverview: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow-md">
          <h3 className="text-xl font-semibold">Total Bookings</h3>
          <p className="text-3xl font-bold">150</p>{" "}
          {/* Replace with actual data */}
        </div>
        <div className="bg-white p-4 rounded shadow-md">
          <h3 className="text-xl font-semibold">Available Cars</h3>
          <p className="text-3xl font-bold">20</p>{" "}
          {/* Replace with actual data */}
        </div>
        <div className="bg-white p-4 rounded shadow-md">
          <h3 className="text-xl font-semibold">Revenue</h3>
          <p className="text-3xl font-bold">$50,000</p>{" "}
          {/* Replace with actual data */}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;

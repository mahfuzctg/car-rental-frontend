/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { IoMdRefresh } from "react-icons/io";

// Sample booking data
const bookings = [
  {
    id: 1,
    customer: "John Doe",
    car: "Toyota Camry",
    date: "2024-08-25",
    status: "Pending",
  },
  {
    id: 2,
    customer: "Jane Smith",
    car: "Honda Accord",
    date: "2024-08-26",
    status: "Approved",
  },
  // Add more bookings as needed
];

const ManageBookings: React.FC = () => {
  const [bookingList, setBookingList] = useState(bookings);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleApprove = (id: number) => {
    setBookingList(
      bookingList.map((booking) =>
        booking.id === id ? { ...booking, status: "Approved" } : booking
      )
    );
  };

  const handleCancel = (id: number) => {
    setBookingList(
      bookingList.map((booking) =>
        booking.id === id ? { ...booking, status: "Cancelled" } : booking
      )
    );
  };

  useEffect(() => {
    // Fetch actual booking data from the server
    // fetchBookings();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-800">Manage Bookings</h1>
          <button
            onClick={() => {
              setLoading(true);
              // Simulate a refresh
              setTimeout(() => setLoading(false), 1000);
            }}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <IoMdRefresh className="text-lg mr-2" />
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <table className="w-full bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="p-4 text-left text-gray-600">Customer</th>
              <th className="p-4 text-left text-gray-600">Car</th>
              <th className="p-4 text-left text-gray-600">Date</th>
              <th className="p-4 text-left text-gray-600">Status</th>
              <th className="p-4 text-center text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookingList.map((booking) => (
              <tr
                key={booking.id}
                className={`hover:bg-gray-50 transition-colors ${
                  booking.status === "Approved"
                    ? "bg-green-50"
                    : booking.status === "Cancelled"
                    ? "bg-red-50"
                    : ""
                }`}
              >
                <td className="p-4 text-gray-800">{booking.customer}</td>
                <td className="p-4 text-gray-800">{booking.car}</td>
                <td className="p-4 text-gray-800">{booking.date}</td>
                <td className="p-4 text-gray-800">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                      booking.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : booking.status === "Cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>
                <td className="p-4 text-center">
                  {booking.status === "Pending" ? (
                    <>
                      <button
                        onClick={() => handleApprove(booking.id)}
                        className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-lg shadow-sm hover:bg-green-600 transition-colors"
                      >
                        <FaCheck className="mr-2" /> Approve
                      </button>
                      <button
                        onClick={() => handleCancel(booking.id)}
                        className="inline-flex items-center px-4 py-2 bg-red-500 text-white rounded-lg shadow-sm hover:bg-red-600 transition-colors ml-2"
                      >
                        <FaTimes className="mr-2" /> Cancel
                      </button>
                    </>
                  ) : (
                    <span className="text-gray-500">No actions</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBookings;

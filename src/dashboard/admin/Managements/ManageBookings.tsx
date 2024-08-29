import React, { useEffect, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

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
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Manage Bookings</h1>
      <table className="w-full bg-white border border-gray-200 rounded-md shadow-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Customer</th>
            <th className="p-3 text-left">Car</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookingList.map((booking) => (
            <tr key={booking.id}>
              <td className="p-3">{booking.customer}</td>
              <td className="p-3">{booking.car}</td>
              <td className="p-3">{booking.date}</td>
              <td className="p-3">{booking.status}</td>
              <td className="p-3 text-center">
                {booking.status === "Pending" ? (
                  <>
                    <button
                      onClick={() => handleApprove(booking.id)}
                      className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600"
                    >
                      <FaCheck /> Approve
                    </button>
                    <button
                      onClick={() => handleCancel(booking.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      <FaTimes /> Cancel
                    </button>
                  </>
                ) : (
                  <span
                    className={`px-4 py-2 rounded ${
                      booking.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {booking.status}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageBookings;

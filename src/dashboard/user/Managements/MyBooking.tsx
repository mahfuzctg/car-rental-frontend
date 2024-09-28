import React, { useState } from "react";
import { useGetMyBookingsQuery, useCancelBookingMutation } from "../../../redux/features/booking/bookingApi";
import { TBooking } from "../../../types/bookingTypes";

const MyBookings: React.FC = () => {
  const { data, isLoading, error } = useGetMyBookingsQuery(undefined);
  const [cancelBooking, { isLoading: isCancelling }] = useCancelBookingMutation();
  const allBookings: TBooking[] = Array.isArray(data) ? data : []; // Adjusted line
  const [editingBookingId, setEditingBookingId] = useState<string | null>(null);

  const handleEdit = (bookingId: string) => {
    setEditingBookingId(bookingId);
    // Additional logic for editing can be added here
  };

  const handleCancel = async (bookingId: string) => {
    try {
      await cancelBooking(bookingId).unwrap(); // Use unwrap for better error handling
      console.log("Booking canceled successfully:", bookingId);
    } catch (err) {
      console.error("Failed to cancel booking:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center">
        <p>Error loading bookings. Please try again later.</p>
      </div>
    );
  }

  if (allBookings.length === 0) {
    return (
      <div className="mx-40 my-10">
        <p className="text-center text-xl font-semibold">
          Please wait for your booking confirmation here. It will be completed
          within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <div className="px-6 py-4">
      <h2 className="text-2xl text-gray-700 md:text-3xl font-bold text-center mb-6 uppercase">
        My Bookings
        <div className="w-24 h-1 bg-red-600 mt-2 mx-auto"></div>
      </h2>
      <div className="px-2 w-full">
        <table className="table-auto w-full text-left bg-gray-50 rounded-lg">
          <thead className="bg-gray-100">
            <tr className="text-gray-700">
              <th className="p-4"><input type="checkbox" className="checkbox" /></th>
              <th className="p-4">Name</th>
              <th className="p-4">Start Time</th>
              <th className="p-4">End Time</th>
              <th className="p-4">Total Cost</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {allBookings.map((booking: TBooking) => (
              <tr key={booking._id.toString()} className="hover:bg-gray-50">
                <td className="p-4"><input type="checkbox" className="checkbox" /></td>
                <td className="p-4">{booking.user?.name || "N/A"}</td>
                <td className="p-4">{booking.startTime || "N/A"}</td>
                <td className="p-4">{booking.endTime || "N/A"}</td>
                <td className="p-4">${booking.totalCost?.toFixed(2) || "N/A"}</td>
                <td className={`p-4 ${booking.status === "booked" ? "text-green-500" : booking.status === "canceled" ? "text-red-500" : "text-yellow-500"}`}>
                  {booking.status ? (booking.status.charAt(0).toUpperCase() + booking.status.slice(1)) : "N/A"}
                </td>
                <td className="p-4">
                  {booking.status === "booked" ? (
                    <div className="flex space-x-2">
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleCancel(booking._id.toString())}
                        disabled={isCancelling}
                      >
                        {isCancelling ? "Cancelling..." : "Cancel"}
                      </button>
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => handleEdit(booking._id.toString())}
                      >
                        Edit
                      </button>
                    </div>
                  ) : (
                    <p className="text-gray-500">Pending</p>
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

export default MyBookings;

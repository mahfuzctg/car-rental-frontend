/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { useGetMyBookingsQuery } from "../../../redux/features/booking/bookingApi";
import { TBooking } from "../../../types/bookingTypes";

const MyBookings: React.FC = () => {
  const { data, isLoading } = useGetMyBookingsQuery(undefined);
  const allBookings = data?.data || [];
  const [editingBookingId, setEditingBookingId] = useState<string | null>(null);

  const handleEdit = (bookingId: string) => {
    setEditingBookingId(bookingId);
  };

  const handleCancel = (bookingId: string) => {
    // Add your cancel logic here
    console.log("Cancel booking with ID:", bookingId);
  };

  return (
    <div className="px-6 py-4">
      {isLoading ? (
        <div className="flex items-center justify-center w-full h-full">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : allBookings.length === 0 ? (
        <div className="mx-40 my-10">
          <p className="text-center text-xl font-semibold">
            Please wait for your booking confirmation here. It will be completed
            within 24 hours.
          </p>
        </div>
      ) : (
        <>
          <h2 className="text-2xl text-gray-700 md:text-3xl font-bold text-center mb-6 uppercase">
            My Bookings
            <div className="w-24 h-1 bg-red-600 mt-2 mx-auto"></div>
          </h2>
          <div className="px-2 w-full">
            <table className="table-auto w-full text-left bg-gray-50 rounded-lg">
              {/* Table Head */}
              <thead className="bg-gray-100">
                <tr className="text-gray-700">
                  <th className="p-4">
                    <input type="checkbox" className="checkbox" />
                  </th>
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
                  <tr key={booking._id} className="hover:bg-gray-50">
                    <td className="p-4">
                      <input type="checkbox" className="checkbox" />
                    </td>
                    <td className="p-4">{booking?.user?.name || "N/A"}</td>
                    <td className="p-4">{booking?.startTime || "N/A"}</td>
                    <td className="p-4">{booking?.endTime || "N/A"}</td>
                    <td className="p-4">
                      ${booking?.totalCost?.toFixed(2) || "N/A"}
                    </td>
                    <td
                      className={`p-4 ${
                        booking.status === "approved"
                          ? "text-green-500"
                          : "text-yellow-500"
                      }`}
                    >
                      {booking.status.charAt(0).toUpperCase() +
                        booking.status.slice(1)}
                    </td>
                    <td className="p-4">
                      {booking.status === "approved" ? (
                        <div className="flex space-x-2">
                          <button
                            className="text-red-600 hover:text-red-800"
                            onClick={() => handleCancel(booking._id)}
                          >
                            Cancel
                          </button>
                          <button
                            className="text-blue-600 hover:text-blue-800"
                            onClick={() => handleEdit(booking._id)}
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
        </>
      )}
    </div>
  );
};

export default MyBookings;

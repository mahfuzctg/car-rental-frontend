/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa"; // Importing icons from react-icons
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useBookingApprovalMutation,
  useCancelBookingMutation,
  useGetAllBookingsQuery,
} from "../../../redux/features/booking/bookingApi";
import { TBooking } from "../../../types/bookingTypes";

const ManageBookings = () => {
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Mutation hooks for booking approval and cancellation
  const [bookingApproval] = useBookingApprovalMutation();
  const [cancelBooking] = useCancelBookingMutation();

  const { data, isLoading } = useGetAllBookingsQuery([
    { name: "limit", value: 5 },
    { name: "page", value: 1 }, // Always fetching the first page as pagination is removed
    { name: "sort", value: `${sortField},${sortOrder}` },
  ]);

  const allBookings = data?.data || [];

  // Function to approve a booking
  const handleApprove = async (bookingId: string) => {
    try {
      await bookingApproval(bookingId).unwrap();
      toast.success("Booking approved successfully!");
    } catch (error) {
      toast.error("Failed to approve booking.");
    }
  };

  // Function to cancel a booking
  const handleCancel = async (bookingId: string) => {
    try {
      await cancelBooking(bookingId).unwrap();
      toast.success("Booking canceled successfully!");
    } catch (error) {
      toast.error("Failed to cancel booking.");
    }
  };

  return (
    <div className="px-8 lg:px-20 py-10">
      <ToastContainer />
      {isLoading ? (
        <div className="flex items-center justify-center h-full w-full">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <>
          <h2 className="text-2xl  text-gray-700 md:text-3xl font-bold text-center mb-6 uppercase">
            manage bookings!
            <div className="w-24 h-1 bg-red-600 mt-2 mx-auto"></div>
          </h2>

          {/* Booking Table */}
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">User Name</th>
                <th className="py-2 px-4 border-b">Start Time</th>
                <th className="py-2 px-4 border-b">End Time</th>
                <th className="py-2 px-4 border-b">Total Cost</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allBookings.length > 0 ? (
                allBookings.map((booking: TBooking) => (
                  <tr key={booking._id} className="hover:bg-gray-100">
                    <td className="py-4 px-4 border-b">{booking.user?.name}</td>
                    <td className="py-4 px-4 border-b">
                      {new Date(booking.startTime).toLocaleString()}
                    </td>
                    <td className="py-4 px-4 border-b">
                      {new Date(booking.endTime).toLocaleString()}
                    </td>
                    <td className="py-4 px-4 border-b">
                      ${booking.totalCost.toFixed(2)}
                    </td>
                    <td className="py-4 px-4 border-b">{booking.status}</td>
                    <td className="py-4 px-4 border-b">
                      <div className="flex space-x-2">
                        <button
                          className="bg-green-500 text-white text-sm py-1 px-2 rounded hover:bg-green-600 transition flex items-center"
                          onClick={() => handleApprove(booking._id)}
                        >
                          <FaCheck className="mr-1" /> Approve
                        </button>
                        <button
                          className="bg-red-500 text-white text-sm py-1 px-2 rounded hover:bg-red-600 transition flex items-center"
                          onClick={() => handleCancel(booking._id)}
                        >
                          <FaTimes className="mr-1" /> Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center text-gray-500 py-4">
                    No bookings available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default ManageBookings;

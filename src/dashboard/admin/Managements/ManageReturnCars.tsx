import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useGetAllBookingsQuery,
  useReturnBookingMutation,
} from "../../../redux/features/booking/bookingApi";
import { TBooking } from "../../../types/bookingTypes";


const ManageReturnCars = () => {
  const { data, isLoading, error } = useGetAllBookingsQuery([]);
  const [returnBooking] = useReturnBookingMutation();
  const [returnError, setReturnError] = useState<string | null>(null);

  const bookings = data?.data || [];

  const handleReturnCar = async (bookingId: string) => {
    try {
      await returnBooking(bookingId).unwrap();
      toast.success("Car returned successfully!");
    } catch (error) {
      setReturnError("Failed to return the car. Please try again.");
      console.error("Return booking error:", error);
      toast.error("Failed to return the car.");
    }
  };

  useEffect(() => {
    if (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Error fetching bookings.");
    }
  }, [error]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!Array.isArray(bookings) || bookings.length === 0) {
    return <p className="text-gray-600 text-lg">No booked cars available.</p>;
  }

  return (
    <div className="px-8 lg:px-20 py-10">
      <ToastContainer />
      {returnError && <p className="text-red-500 mb-4">{returnError}</p>}
      <h2 className="text-2xl text-gray-700 md:text-3xl font-bold text-center mb-6 uppercase">
        Manage Return Cars!
        <div className="w-24 h-1 bg-red-600 mt-2 mx-auto"></div>
      </h2>

      <div className="mb-4 text-center">
        <p className="text-lg text-gray-700">
          Total Booked Cars: <strong>{bookings.length}</strong>
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-gray-300 rounded-lg shadow-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Model</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {bookings.map((booking: TBooking) => (
              <tr
                key={booking._id.toString()} // Ensure the key is a string
                className="hover:bg-gray-50 transition duration-200"
              >
                <td className="py-4 px-4 border-b">
                  {typeof booking.user === "object" && booking.user !== null
                    ? booking.user?.name
                    : "N/A"}
                </td>
                <td className="py-4 px-4 border-b">
                  {typeof booking.car === "object" && booking.car !== null
                    ? booking.car.name
                    : "N/A"}
                </td>
                <td className="py-4 px-4 border-b">
                  <span
                    className={`font-semibold ${
                      booking.status === "booked"
                        ? "text-green-600"
                        : "text-gray-500"
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>
                <td className="py-4 px-4 border-b">
                  {new Date(booking.date).toLocaleDateString()}
                </td>
                <td className="py-4 px-4 border-b flex justify-center">
                  {booking.status !== "returned" ? (
                    <button
                      className="bg-red-500 text-center justify-center text-white text-xs py-1 px-2 rounded-lg hover:bg-red-600 transition duration-300 flex items-center shadow-md w-28"
                      onClick={() => handleReturnCar(booking._id.toString())} // Convert ObjectId to string
                    >
                      <FaCheck className="mr-1" /> Return
                    </button>
                  ) : (
                    <button
                      className="bg-gray-400 text-white text-xs py-1 px-2 rounded-lg cursor-not-allowed shadow-md w-28"
                      disabled
                    >
                      Returned
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {bookings.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center text-gray-500 py-4">
                  No bookings available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageReturnCars;

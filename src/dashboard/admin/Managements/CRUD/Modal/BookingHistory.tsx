import { ClipLoader } from "react-spinners";
import { useGetUserBookingsQuery } from "../../../../../redux/features/booking/bookingApi";
import { TBooking } from "../../../../../types/bookingTypes";

const BookingHistory = () => {
  const { data, isLoading } = useGetUserBookingsQuery(undefined);

  const bookings: TBooking[] = data?.data || [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color={"#ef4444"} loading={isLoading} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      {/* Heading */}
      <div className="text-center my-16">
        <h2 className="text-3xl lg:text-4xl carter-one-regular text-center text-gray-700 font-bold">
          Booking History
        </h2>
        <p className="mt-2 text-gray-500 lg:text-lg">
          Explore a wide variety of vehicles we have to offer for every journey.
        </p>
      </div>

      {/* Booking Cards */}
      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <div
            key={booking._id}
            className="card bg-white border border-gray-300 shadow-md rounded-lg mb-6 p-6 flex flex-col md:flex-row hover:shadow-lg transition-shadow"
          >
            {/* Image Section */}
            <div className="md:w-1/3">
              <img
                src={booking.car.images[0]}
                alt={booking.car.name}
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>

            {/* Details Section */}
            <div className="md:w-2/3 md:pl-6 mt-4 md:mt-0">
              <h3 className="text-2xl text-gray-700 font-semibold mb-2">
                {booking.car.name} -{" "}
                <span className="text-red-600">{booking.car.color}</span>
              </h3>

              <div className="mt-2 text-gray-600 space-y-2">
                <p>
                  <strong>Booked by:</strong> {booking.user.name} (
                  {booking.user.email})
                </p>
                <p>
                  <strong>Booking Date:</strong>{" "}
                  {new Date(booking.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Price per Hour:</strong>{" "}
                  <span className="text-red-600">
                    ${booking.car.pricePerHour}
                  </span>
                </p>
                <p>
                  <strong>Car Status:</strong> {booking.car.status}
                </p>
                <p>
                  <strong>Electric:</strong>{" "}
                  {booking.car.isElectric ? "Yes" : "No"}
                </p>
              </div>

              {/* Button Section */}
              <div className="mt-4">
                <button className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-200">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center mt-16">
          <p className="text-gray-600 text-lg">No booking history found.</p>
        </div>
      )}
    </div>
  );
};

export default BookingHistory;

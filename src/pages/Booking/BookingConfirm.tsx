import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/ui/UI/button";
import { useCreateBookingMutation } from "../../redux/features/booking/bookingApi";
import { useGetSingleCarQuery } from "../../redux/features/car/carApi";
import { useAppSelector } from "../../redux/hooks/hook";
import { TBooking } from "../../types/bookingTypes";
import { TUser } from "../../types/userTypes"; // Assuming you have a TUser type defined somewhere

const BookingConfirmation = () => {
  const { id } = useParams<{ id: string }>(); // Ensure id is a string
  const { data: carData } = useGetSingleCarQuery(id || ""); // Handle the case where id could be undefined

  const booking = useAppSelector((state) => state.booking);
  const user = useAppSelector((state) => state.auth.user) as unknown as
    | TUser
    | undefined; // Ensure user exists and matches TUser type

  const navigate = useNavigate();

  const [createBooking] = useCreateBookingMutation();

  const handleBooking = async () => {
    // Check if necessary data exists
    if (!carData || !user || !id) {
      console.error("Missing car data, user data, or car ID");
      return;
    }

    const phone = user.phone || "N/A"; // Fallback if phone is not available

    const bookingData: TBooking = {
      car: carData.data, // Pass the full car object instead of just the car ID
      GPS: booking.GPS || false,
      childSeat: booking.childSeat || false,
      startTime: new Date().toISOString(), // ISO formatted start time
      // Remove creditCard
      drivingLicense: booking.drivingLicense || null,
      passport: booking.passport || null,
      date: new Date().toISOString(), // Current date
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: phone,
        status: user.status, // Make sure `status` exists
        createdAt: user.createdAt, // Make sure `createdAt` exists
        updatedAt: user.updatedAt, // Make sure `updatedAt` exists
        __v: user.__v, // Make sure `__v` exists
      },
      phone: phone, // Phone number from user
      location: booking.location || "Unknown", // Default location if undefined
      paymentMethod: booking.paymentMethod || "Credit Card", // Default payment method
    };

    try {
      await createBooking(bookingData);
      navigate("/booking");
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  return (
    <section className="max-w-screen-xl mx-auto px-4 lg:px-0 min-h-screen flex items-center justify-center">
      <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6">
        {carData?.data?.image && (
          <img
            className="rounded-lg h-48 w-full object-cover mb-4"
            src={carData?.data?.image}
            alt={carData?.data?.name}
          />
        )}
        <h3 className="text-3xl font-bold text-gray-800 mb-2">
          {carData?.data?.name}
        </h3>
        <h3 className="text-xl font-semibold text-red-600 mb-4">
          Price Per Hour:{" "}
          <span className="text-gray-800">
            {carData?.data?.pricePerHour} USD
          </span>
        </h3>

        <div className="mt-3 border-t border-gray-200 py-4">
          <h3 className="text-gray-800 font-medium">
            GPS:{" "}
            <span className={booking?.GPS ? "text-green-600" : "text-red-600"}>
              {booking?.GPS ? "Yes" : "No"}
            </span>
          </h3>
          <h3 className="text-gray-800 font-medium">
            Child Seat:{" "}
            <span
              className={booking?.childSeat ? "text-green-600" : "text-red-600"}
            >
              {booking?.childSeat ? "Yes" : "No"}
            </span>
          </h3>
        </div>

        <Button
          onClick={handleBooking}
          className="w-full mt-6 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
        >
          Confirm Booking
        </Button>
      </div>
    </section>
  );
};

export default BookingConfirmation;

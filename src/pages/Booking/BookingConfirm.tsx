/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "../../components/ui/UI/button";
import { useCreateBookingMutation } from "../../redux/features/booking/bookingApi";
import { useGetSingleCarQuery } from "../../redux/features/car/carApi";
import { useAppSelector } from "../../redux/hooks/hook";

const BookingConfirmation = () => {
  const { id } = useParams<string>();
  const {
    data: carData,
    error: carError,
    isLoading: carLoading,
  } = useGetSingleCarQuery(id || "");

  const booking = useAppSelector((state: { booking: any }) => state.booking);

  const navigate = useNavigate();

  const [createBooking] = useCreateBookingMutation();

  const handleBooking = async () => {
    if (!carData?.data) {
      toast.error("Car data is not available.");
      return;
    }

    const bookingData = {
      carId: carData.data._id, // Ensure this matches your backend's expected format
      GPS: booking.GPS,
      childSeat: booking.childSeat,
      startTime: new Date().toISOString(), // Use ISO format for consistency
      creditCard: booking.creditCard,
      drivingLicense: booking.drivingLicense,
      passport: booking.passport,
      userEmail: booking.userEmail || "default@example.com", // Add userEmail if required
      date: new Date().toISOString(), // Current date
      endTime: null, // Set endTime if applicable
      totalCost: carData.data.pricePerHour || 0, // Calculate total cost if needed
    };

    try {
      await createBooking(bookingData).unwrap(); // Unwrap to handle fulfilled or rejected states
      toast.success("Booking confirmed successfully!");
      navigate("/booking-confirmation"); // Redirect to confirmation page
    } catch (err) {
      console.error("Booking error:", err); // Log detailed error for debugging
      toast.error("Failed to confirm booking. Please try again.");
    }
  };

  // Handle loading and error states
  if (carLoading) return <div>Loading...</div>;
  if (carError) return <div>Error loading car data</div>;

  return (
    <section className="max-w-screen-xl mx-auto px-3 lg:px-0 min-h-screen flex items-center justify-center py-8">
      <div className="max-w-lg mx-auto">
        <img
          className="rounded-xl"
          src={carData?.data?.image}
          alt={carData?.data?.name || "Car Image"}
        />
        <h3 className="text-2xl font-semibold text-gray-100 mt-2">
          {carData?.data?.name}
        </h3>
        <h3 className="text-xl font-semibold text-orange-500">
          Price Per Hour: {carData?.data?.pricePerHour} USD
        </h3>

        <div className="mt-3 border-t py-3">
          <h3 className="text-gray-100">GPS: {booking?.GPS ? "Yes" : "No"}</h3>
          <h3 className="text-gray-100">
            Child Seat: {booking?.childSeat ? "Yes" : "No"}
          </h3>
        </div>
        <Button
          onClick={handleBooking}
          className="w-full bg-orange-500 hover:bg-orange-600"
        >
          Confirm Booking
        </Button>
      </div>
      {/* Add ToastContainer for toast notifications */}
      <ToastContainer />
    </section>
  );
};

export default BookingConfirmation;

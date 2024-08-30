import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/ui/UI/button";
import { useCreateBookingMutation } from "../../redux/features/booking/bookingApi";
import { useGetSingleCarQuery } from "../../redux/features/car/carApi";
import { useAppSelector } from "../../redux/hooks/hook";

const BookingConfirmation = () => {
  const { id } = useParams();
  const { data: carData } = useGetSingleCarQuery(id);

  const booking = useAppSelector((state) => state.booking);

  const navigate = useNavigate();

  const [createBooking] = useCreateBookingMutation();

  const handleBooking = () => {
    const bookingData = {
      carId: carData.car,
      GPS: booking.GPS,
      childSeat: booking.childSeat,
      startTime: new Date().getHours(),
      creditCard: booking.creditCard,
      drivingLicense: booking.drivingLicense,
      passport: booking.passport,
    };
    createBooking(bookingData);
    navigate("/booking");
  };

  return (
    <section className="max-w-screen-xl mx-auto px-3 lg:px-0 min-h-screen flex items-center justify-center py-8">
      <div className="max-w-lg mx-auto">
        <img className="rounded-xl" src={carData?.data?.image} alt="" />
        <h3 className="text-2xl font-semibold text-gray-100 mt-2">
          {carData?.data?.name}
        </h3>
        <h3 className="text-xl font-semibold text-orange-500">
          Price Per Hour: {carData?.data?.pricePerHour} USD
        </h3>

        <div className="mt-3 border-t py-3">
          <h3 className="text-gray-100">GPS: {booking?.gps ? "Yes" : "No"}</h3>
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
    </section>
  );
};

export default BookingConfirmation;

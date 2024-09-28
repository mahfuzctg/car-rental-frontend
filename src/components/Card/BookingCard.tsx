import { FaRegHourglass } from "react-icons/fa";
import { Link } from "react-router-dom";
import { TCar } from "../../types/carTypes";
import { Button } from "../ui/UI/button";
import { toast } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

type TCardData = {
  car: TCar | undefined; // Allow car to be undefined
  cardType: string;
};

const BookingCard = ({ car, cardType }: TCardData) => {
  let route;

  // Route changes based on the cardType (booking or details)
  if (cardType === "booking") {
    route = `/booking-form/${car?._id}`;
  } else {
    route = `/car-details/${car?._id}`;
  }

  // Check if the car is unavailable
  const isUnavailable = car?.status === "unavailable";

  // Function to handle the booking action
  const handleBooking = () => {
    if (isUnavailable) {
      toast.error("This car is currently unavailable."); // Show error toast
      return;
    }

    // Simulate booking success or failure
    const bookingSuccess = true; // Replace this with actual booking logic
    if (bookingSuccess) {
      toast.success("Booking successful!"); // Show success toast
    } else {
      toast.error("Booking failed. Please try again."); // Show error toast
    }
  };

  return (
    <div className="h-full bg-white p-1 md:p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <div className="flex-grow mb-4">
        {/* Display the car image if available or show a placeholder */}
        <div className="w-full h-[200px] overflow-hidden rounded-lg">
          {car?.image ? (
            <img
              className="w-full h-full object-cover"
              src={car.image}
              alt={car?.name}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <span className="text-gray-500">Image not available</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-gray-800 text-sm font-semibold">{car?.name}</h3>
        <h3 className="text-gray-800 text-sm font-semibold">{car?._id}</h3>


        {/* Display car price with the hourglass icon */}
        <h4 className="text-red-600 text-sm flex items-center gap-1">
          USD
          <span className="text-lg font-bold">{car?.pricePerHour}</span>
          <span className="flex items-center gap-1">
            / per hour <FaRegHourglass className="text-red-500" />
          </span>
        </h4>

        {/* Show car availability status */}
        <h3 className="text-gray-800 text-sm font-semibold">
          Status <span className={`text-${isUnavailable ? 'red' : 'green'}-500`}>{car?.status}</span>
        </h3>

        {/* Car description, limited to 100 characters */}
        <p className="text-gray-600 text-xs">
          {car?.description && car.description.length > 0
            ? `${car.description.slice(0, 100)}${
                car.description.length > 100 ? "..." : ""
              }`
            : "Description not available"}
        </p>

        {/* Disable the link if the car is unavailable */}
        <Link to={isUnavailable ? "#" : route}>
          <Button
            className={`w-full ${isUnavailable ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 text-white hover:bg-red-700"}`}
            disabled={isUnavailable} // Disable button if car is unavailable
            onClick={handleBooking} // Trigger booking on click
          >
            {/* Change button text based on car availability */}
            {isUnavailable ? "Unavailable" : cardType === "booking" ? "Book Now" : "View Details"}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default BookingCard;

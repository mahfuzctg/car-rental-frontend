import { FaRegHourglass } from "react-icons/fa";
import { Link } from "react-router-dom";
import { TCar } from "../../types/carTypes";
import { Button } from "../ui/UI/button";

type TCardData = {
  car: TCar | undefined; // Allow car to be undefined
  cardType: string;
};

const BookingCard = ({ car, cardType }: TCardData) => {
  let route;

  if (cardType === "booking") {
    route = `/booking-form/${car?._id}`;
  } else {
    route = `/car-details/${car?._id}`;
  }

  return (
    <div className="h-full bg-white p-1 md:p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <div className="flex-grow mb-4">
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
        <h4 className="text-red-600 text-sm flex items-center gap-1">
          USD
          <span className="text-lg font-bold">{car?.pricePerHour}</span>
          <span className="flex items-center gap-1">
            / per hour <FaRegHourglass className="text-red-500" />
          </span>
        </h4>
        <p className="text-gray-600 text-xs">
          {car?.description && car.description.length > 0
            ? `${car.description.slice(0, 100)}${
                car.description.length > 100 ? "..." : ""
              }`
            : "Description not available"}
        </p>
        <Link to={route}>
          <Button className="w-full bg-red-600 text-white hover:bg-red-700">
            {cardType === "booking" ? "Book Now" : "View Details"}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default BookingCard;

import { FaRegHourglass } from "react-icons/fa";
import { Link } from "react-router-dom";
import { TCar } from "../../types/carTypes";
import { Button } from "../ui/UI/button";

type TCardData = {
  car: TCar;
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
    <div className="h-full bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <div className="flex-grow mb-4">
        <div className="w-full h-[200px] overflow-hidden rounded-lg">
          <img
            className="w-full h-full object-cover"
            src={car?.image}
            alt={car?.name}
          />
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
          {car?.description.slice(0, 100)}
          {car?.description.length > 100 ? "..." : ""}
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

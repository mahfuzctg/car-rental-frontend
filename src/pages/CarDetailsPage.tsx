import { useState } from "react";
import { IoIosWarning, IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import { Button } from "../components/ui/UI/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/UI/select";
import "../Customs/Magnifier.css";
import { useGetSingleCarQuery } from "../redux/features/car/carApi";
import { setOptions } from "../redux/features/car/carSlice";
import { useAppDispatch } from "../redux/hooks/hook";

const CarDetails = () => {
  const { id } = useParams();
  const { data: carData, isLoading } = useGetSingleCarQuery(id);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const [insurance, setInsurance] = useState("");
  const [GPS, setGPS] = useState(false);
  const [childSeat, setChildSeat] = useState(false);

  const handleMouseHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    const cursorX = e.pageX - left - window.scrollX;
    const cursorY = e.pageY - top - window.scrollY;

    setPosition({ x, y });
    setCursorPosition({ x: cursorX, y: cursorY });
  };

  const handleBooking = () => {
    const bookingData = {
      insurance,
      GPS,
      childSeat,
    };

    dispatch(setOptions(bookingData));
    navigate(`/booking`);
  };

  return (
    <section className="max-w-screen-xl mx-auto my-16 px-4 lg:px-8 flex flex-col lg:flex-row gap-12">
      {/* Image Section */}
      <div
        className="w-full lg:w-1/3 h-auto rounded-lg overflow-hidden relative"
        onMouseEnter={() => setShowMagnifier(true)}
        onMouseLeave={() => setShowMagnifier(false)}
        onMouseMove={handleMouseHover}
      >
        <img
          className="w-full h-auto object-cover rounded-lg"
          src={carData?.data?.image}
          alt={`Image of ${carData?.data?.name}`}
        />
        {showMagnifier && (
          <div
            style={{
              position: "absolute",
              left: `${cursorPosition.x - 100}px`,
              top: `${cursorPosition.y - 100}px`,
              pointerEvents: "none",
              width: "200px",
              height: "200px",
              border: "2px solid rgba(255, 255, 255, 0.8)",
              borderRadius: "10px",
              backgroundImage: `url(${carData?.data?.image})`,
              backgroundSize: "700%",
              backgroundPosition: `${position.x}% ${position.y}%`,
              zIndex: 10,
              transform: "scale(1.5)",
            }}
          />
        )}
      </div>

      {/* Details Section */}
      <div className="w-full lg:w-2/3 space-y-8">
        {/* Basic Info */}
        <div className="p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Rating className="size-6" ratingValue={3} />
              <span className="text-gray-600 text-sm">3 Reviews</span>
            </div>
            <div className="text-gray-600 text-sm flex items-center">
              <span className="text-xl font-semibold text-orange-600">
                ${carData?.data?.pricePerHour}
              </span>
              <span className="ml-2">
                / per hour <IoIosWarning className="inline text-yellow-500" />
              </span>
            </div>
          </div>
          <h2 className="text-2xl uppercase font-semibold text-gray-700 mb-2">
            {carData?.data?.name}
          </h2>
          <p className="text-gray-700">{carData?.data?.description}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column */}
          <div className="flex-1 space-y-4">
            <div className="p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Features
              </h3>
              <ul className="list-disc list-inside space-y-2">
                {carData?.data?.features?.[0]
                  .split(",")
                  .map((feature: string, index: number) => (
                    <li
                      key={index}
                      className="text-gray-700 text-sm flex items-center gap-2"
                    >
                      <IoMdCheckmarkCircleOutline className="text-green-600" />
                      {feature}
                    </li>
                  ))}
              </ul>
            </div>
            <div className="p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Specifications
              </h3>
              <div className="space-y-2">
                {[
                  { label: "Name", value: carData?.data?.name },
                  { label: "Model", value: carData?.data?.model },
                  { label: "Color", value: carData?.data?.color },
                  {
                    label: "Fuel",
                    value: carData?.data?.isElectric
                      ? "Electric"
                      : "Non-electric",
                  },
                  { label: "Year", value: carData?.data?.year },
                  { label: "Location", value: carData?.data?.location },
                ].map((spec, index) => (
                  <div
                    key={index}
                    className="flex justify-between text-gray-700 text-xs"
                  >
                    <span className="font-medium">{spec.label}:</span>
                    <span className="ml-2">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex-1 space-y-4">
            <div className="p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Additional Options
              </h3>
              <div className="space-y-4">
                <Select onValueChange={setInsurance}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select an insurance option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Basic Insurance">
                        Basic Insurance
                      </SelectItem>
                      <SelectItem value="Standard Insurance">
                        Standard Insurance
                      </SelectItem>
                      <SelectItem value="Premium Insurance">
                        Premium Insurance
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <Select onValueChange={(value) => setGPS(value === "true")}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select GPS" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="true">GPS</SelectItem>
                      <SelectItem value="false">No GPS</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <Select
                  onValueChange={(value) => setChildSeat(value === "true")}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Child Seat" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="true">Child Seat</SelectItem>
                      <SelectItem value="false">No Child Seat</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="rounded-lg">
              <Button
                onClick={() => handleBooking()}
                disabled={carData?.data?.status !== "available"}
                className="w-full bg-red-600 hover:bg-red-700 text-white mt-4"
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarDetails;

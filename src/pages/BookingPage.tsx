/* eslint-disable @typescript-eslint/no-unused-vars */
import { animated, useSpring } from "@react-spring/web";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import CarCard from "../components/Card/BookingCard";
import { useGetAllCarsQuery } from "../redux/features/car/carApi";
import { TCar } from "../types/carTypes";

const BookingPage = () => {
  const searchParams = new URLSearchParams(location.search);
  const searchableValue = searchParams.get("searchValue");

  const [searchValue, setSearchValue] = useState(searchableValue || "");
  const [carType, setCarType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const onSubmit: SubmitHandler<{ searchValue: string }> = (data) => {
    setSearchValue(data.searchValue);
  };

  const { data: carData, isLoading } = useGetAllCarsQuery({
    searchValue,
    carType,
    minPrice,
    maxPrice,
  });

  // Animation for filters
  const filterAnimation = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    reset: true,
    config: { duration: 500 },
  });

  // Animation for car cards
  const cardAnimation = useSpring({
    opacity: 1,
    transform: "translateY(0)",
    from: { opacity: 0, transform: "translateY(20px)" },
    reset: true,
    config: { duration: 500 },
    delay: 200, // Delay for card animation
  });

  return (
    <section className="min-h-screen max-w-screen-xl mx-auto  px-3 lg:px-0">
      {/* Filter Controls */}
      <animated.div
        style={filterAnimation}
        className="filters mb-4 p-4 rounded-md shadow-sm"
      >
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          {/* Search Field */}
          <div className="flex-1">
            <label className="block text-gray-700 font-semibold mb-2">
              Search:
              <input
                type="text"
                placeholder="Search by name or features"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              />
            </label>
          </div>

          {/* Type Filter */}
          <div className="flex-1">
            <label className="block text-gray-700 font-semibold mb-2">
              Type:
              <select
                value={carType}
                onChange={(e) => setCarType(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              >
                <option value="">All Types</option>
                <option value="SUV">SUV</option>
                <option value="Sedan">Sedan</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Sports">Sports</option>
                {/* Add more options as needed */}
              </select>
            </label>
          </div>
        </div>

        <div className="flex  flex-col md:flex-row gap-4">
          {/* Price Range */}
          <div className="flex-1">
            <label className="block text-gray-700 font-semibold mb-2">
              Price Range:
              <div className="flex gap-2 mt-1">
                <input
                  type="number"
                  placeholder="Min Price"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
                <span>-</span>
                <input
                  type="number"
                  placeholder="Max Price"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
              </div>
            </label>
          </div>
        </div>
      </animated.div>

      {/* Booking content */}
      <h2 className="text-xl md:text-3xl text-gray-700 font-bold text-center mb-6 uppercase">
        Book your car now!
        <div className="w-24 h-1 bg-red-600 mt-2 mx-auto"></div>
      </h2>
       {/* Display total length of cars */}
       <p className="text-center text-gray-700 mb-4">
        Total Available Cars: {carData?.data?.length || 0}
      </p>
      <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:mx-6 my-12">
        {carData?.data?.map((car: TCar) => (
          <animated.div key={car._id} style={cardAnimation}>
            <CarCard car={car} cardType="booking" />
          </animated.div>
        ))}
      </div>
    </section>
  );
};

export default BookingPage;

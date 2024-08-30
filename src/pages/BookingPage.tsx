/* eslint-disable @typescript-eslint/no-unused-vars */
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

  return (
    <section className="min-h-screen max-w-screen-xl mx-auto my-8 px-3 lg:px-0">
      {/* Filter Controls */}
      <div className="filters mb-4 p-4 bg-gray-100 rounded-md shadow-sm">
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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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

        <div className="flex flex-col md:flex-row gap-4">
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <span>-</span>
                <input
                  type="number"
                  placeholder="Max Price"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Booking content */}

      {/* Booking content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-12">
        {carData?.data?.map((car: TCar) => (
          <div key={car._id}>
            <CarCard car={car} cardType="booking" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default BookingPage;

import React, { useState } from "react";
import { Oval } from "react-loader-spinner";
import ListCard from "../components/Card/ListCard";
import { useGetAllCarsQuery } from "../redux/features/car/carApi";
import { TCar } from "../types/carTypes";

const CarListing: React.FC = () => {
  const { data, isLoading, isError } = useGetAllCarsQuery();
  const [filters, setFilters] = useState({
    type: "",
    minPrice: 0,
    maxPrice: 10000,
    search: "",
  });
  const [visibleCount, setVisibleCount] = useState(10);
  const [showLess, setShowLess] = useState(false);

  const cars: TCar[] = data?.data || [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Oval
          height={80}
          width={80}
          color="#4fa94d"
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#4fa94d"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    );
  }

  if (isError) {
    return <p className="text-center text-red-600">Failed to load cars.</p>;
  }

  const minPrice = Number(filters.minPrice);
  const maxPrice = Number(filters.maxPrice);

  const filteredCars = cars.filter(
    (car) =>
      car.pricePerHour >= minPrice &&
      car.pricePerHour <= maxPrice &&
      (filters.type ? car.model === filters.type : true) &&
      (filters.search
        ? car.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          car.features.toLowerCase().includes(filters.search.toLowerCase())
        : true)
  );

  const carsToDisplay = filteredCars.slice(0, visibleCount);

  const toggleVisibility = () => {
    setShowLess(!showLess);
    setVisibleCount((prev) => (showLess ? Math.max(prev - 10, 10) : prev + 10));
  };

  return (
    <div className="p-4">
      {/* Filter Controls */}
      <div className="filters mb-4 p-4  rounded-md ">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          {/* Search Field */}
          <div className="flex-1">
            <label className="block text-gray-700 font-semibold mb-2">
              Search for cars:
              <input
                type="text"
                placeholder="Search by name or features"
                value={filters.search}
                onChange={(e) =>
                  setFilters({ ...filters, search: e.target.value })
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
            </label>
          </div>

          {/* Type Filter */}
          <div className="flex-1">
            <label className="block text-gray-700 font-semibold mb-2">
              Car Type:
              <select
                value={filters.type}
                onChange={(e) =>
                  setFilters({ ...filters, type: e.target.value })
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              >
                <option value="">All Types</option>
                <option value="SUV">SUV</option>
                <option value="Sedan">Sedan</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </label>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-gray-700 font-semibold mb-2">
              Price Range:
              <div className="flex gap-2 mt-1">
                <input
                  type="number"
                  placeholder="Min Price"
                  value={filters.minPrice}
                  onChange={(e) =>
                    setFilters({ ...filters, minPrice: Number(e.target.value) })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
                <span>-</span>
                <input
                  type="number"
                  placeholder="Max Price"
                  value={filters.maxPrice}
                  onChange={(e) =>
                    setFilters({ ...filters, maxPrice: Number(e.target.value) })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Featured Cars Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Featured Cars
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredCars.slice(0, 6).map((car) => (
            <ListCard key={car._id} car={car} cardType="booking" />
          ))}
        </div>
      </div>

      {/* Car Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {carsToDisplay.length > 0 ? (
          carsToDisplay.map((car) => (
            <ListCard key={car._id} car={car} cardType="booking" />
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">
            No cars available for the selected filters.
          </p>
        )}
      </div>

      {/* Show More/Less Button */}
      <div className="text-center mt-4">
        <button
          onClick={toggleVisibility}
          className="bg-red-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-700 transition duration-300"
        >
          {showLess ? "Show Less" : "Show More"}
        </button>
      </div>
    </div>
  );
};

export default CarListing;

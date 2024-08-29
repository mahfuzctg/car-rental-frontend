import React, { useState } from "react";

import { Oval } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { Card } from "../components/ui/UI/card";
import { useGetAllCarsQuery } from "../redux/api/carApi";
import { Car } from "../types/carTypes";

const CarListing: React.FC = () => {
  const { data, isLoading, isError } = useGetAllCarsQuery();
  const [filters, setFilters] = useState({
    type: "",
    minPrice: 0,
    maxPrice: 10000,
    search: "",
  });
  const [visibleCount, setVisibleCount] = useState(10);

  // Ensure data is always an array
  const cars: Car[] = Array.isArray(data) ? data : [];

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

  // Filter cars based on filters
  const filteredCars = cars.filter(
    (car) =>
      car.pricePerHour >= filters.minPrice &&
      car.pricePerHour <= filters.maxPrice &&
      (filters.type ? car.color === filters.type : true) &&
      (filters.search
        ? car.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          car.description.toLowerCase().includes(filters.search.toLowerCase())
        : true)
  );

  // Get cars to display based on visibility count
  const carsToDisplay = filteredCars.slice(0, visibleCount);

  // Load more cars when button is clicked
  const loadMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  return (
    <div className="car-listing p-4">
      {/* Filter Controls */}
      <div className="filters mb-4 p-4 bg-gray-100 rounded-md shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          {/* Search Field */}
          <div className="flex-1">
            <label className="block text-gray-700 font-semibold mb-2">
              Search:
              <input
                type="text"
                placeholder="Search by name or description"
                value={filters.search}
                onChange={(e) =>
                  setFilters({ ...filters, search: e.target.value })
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </label>
          </div>

          {/* Type Filter */}
          <div className="flex-1">
            <label className="block text-gray-700 font-semibold mb-2">
              Type:
              <select
                value={filters.type}
                onChange={(e) =>
                  setFilters({ ...filters, type: e.target.value })
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">All Types</option>
                <option value="SUV">SUV</option>
                <option value="sedan">Sedan</option>
                <option value="hybrid">Hybrid</option>
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
                  value={filters.minPrice}
                  onChange={(e) =>
                    setFilters({ ...filters, minPrice: Number(e.target.value) })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <span>-</span>
                <input
                  type="number"
                  placeholder="Max Price"
                  value={filters.maxPrice}
                  onChange={(e) =>
                    setFilters({ ...filters, maxPrice: Number(e.target.value) })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Car Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {carsToDisplay.map((car) => (
          <Card key={car._id} className="shadow-lg rounded-lg overflow-hidden">
            <img
              src={car.imageUrl || "https://via.placeholder.com/200"}
              alt={car.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{car.name}</h3>
              <p className="text-gray-600 mb-4">{car.description}</p>
              <p className="text-lg font-bold text-gray-800">
                ${car.pricePerHour} per hour
              </p>
              <div className="mt-5 text-center mx-auto w-full ">
                <Link
                  to={`/car/${car._id}`}
                  className="mx-auto w-full shadow-md text-center px-8 py-2 bg-white text-gray-700 rounded hover:bg-gray-200"
                >
                  Details
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Show More Button */}
      {filteredCars.length > visibleCount && (
        <div className="flex justify-center mt-4">
          <button
            onClick={loadMore}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
            aria-label="Load more cars"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default CarListing;

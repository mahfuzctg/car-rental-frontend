import React, { useState } from "react";
import { Card } from "../components/ui/UI/card";
import { useGetAllCarsQuery } from "../redux/api/carApi";
import { Car } from "../types/carTypes";

const CarListing: React.FC = () => {
  const { data, isLoading, isError } = useGetAllCarsQuery();
  const [filters, setFilters] = useState({
    type: "",
    minPrice: 0,
    maxPrice: 10000,
  });

  // Ensure data is always an array
  const cars: Car[] = Array.isArray(data) ? data : [];

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Failed to load cars.</p>;
  }

  // Filter cars based on filters
  const filteredCars = cars.filter(
    (car) =>
      car.pricePerHour >= filters.minPrice &&
      car.pricePerHour <= filters.maxPrice &&
      (filters.type ? car.color === filters.type : true)
  );

  return (
    <div className="car-listing p-4">
      {/* Filter Controls */}
      <div className="filters mb-4">
        <label>
          Type:
          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          >
            <option value="">All</option>
            <option value="SUV">SUV</option>
            <option value="sedan">Sedan</option>
            <option value="hybrid">Hybrid</option>
            {/* Add more options as needed */}
          </select>
        </label>
        <label>
          Price Range:
          <input
            type="number"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={(e) =>
              setFilters({ ...filters, minPrice: Number(e.target.value) })
            }
          />
          -
          <input
            type="number"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={(e) =>
              setFilters({ ...filters, maxPrice: Number(e.target.value) })
            }
          />
        </label>
      </div>

      {/* Car Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredCars.map((car) => (
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
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                View Details
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CarListing;

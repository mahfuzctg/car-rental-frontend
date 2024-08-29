import axios from "axios";
import React, { useEffect, useState } from "react";

interface Car {
  _id: string;
  name: string;
  description: string;
  color: string;
  isElectric: boolean;
  features: string[];
  pricePerHour: number;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

const CarListing: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    carType: "",
    minPrice: 0,
    maxPrice: 1000,
    isElectric: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/cars")
      .then((response) => {
        setCars(response.data.data);
        setFilteredCars(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load cars.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, cars]);

  const applyFilters = () => {
    let filtered = cars;

    if (filters.carType) {
      filtered = filtered.filter((car) =>
        car.name.toLowerCase().includes(filters.carType.toLowerCase())
      );
    }

    if (filters.minPrice || filters.maxPrice) {
      filtered = filtered.filter(
        (car) =>
          car.pricePerHour >= filters.minPrice &&
          car.pricePerHour <= filters.maxPrice
      );
    }

    if (filters.isElectric) {
      filtered = filtered.filter((car) => car.isElectric);
    }

    setFilteredCars(filtered);
  };

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="car-listing-page">
      <div className="filters mb-4">
        <div className="flex space-x-4">
          <input
            type="text"
            name="carType"
            value={filters.carType}
            onChange={handleFilterChange}
            placeholder="Search.."
            className="border p-2 rounded"
          />
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleFilterChange}
            placeholder="Min Price"
            className="border p-2 rounded"
          />
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            placeholder="Max Price"
            className="border p-2 rounded"
          />
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isElectric"
              checked={filters.isElectric}
              onChange={handleFilterChange}
              className="border p-2 rounded"
            />
            <span>Electric</span>
          </label>
        </div>
      </div>

      <div className="car-listing grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredCars.map((car) => (
          <div key={car._id} className="car-item border p-4 rounded shadow">
            <img
              src={`https://source.unsplash.com/random/200x200?car=${car.name}`}
              alt={car.name}
              className="w-full h-48 object-cover rounded"
            />
            <h3 className="mt-4 text-lg font-semibold">{car.name}</h3>
            <p className="text-sm text-gray-600">{car.description}</p>
            <p className="text-green-500 mt-2 font-bold">
              Price per hour: ${car.pricePerHour}
            </p>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarListing;

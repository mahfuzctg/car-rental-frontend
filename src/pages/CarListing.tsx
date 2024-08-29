import React from "react";

import { Link } from "react-router-dom";
import { Card } from "../components/ui/UI/card";
import { useGetAllCarsQuery } from "../redux/api/carApi";

const CarListing: React.FC = () => {
  const { data: cars = [], isLoading, isError } = useGetAllCarsQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Failed to load cars.</p>;
  }

  return (
    <div className="car-listing grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {cars.map((car) => (
        <Card key={car._id} className="shadow-lg rounded-lg overflow-hidden">
          <img
            src={`https://source.unsplash.com/random/200x200?car=${car.name}`}
            alt={car.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">{car.name}</h3>
            <p className="text-gray-600 mb-4">{car.description}</p>
            <p className="text-lg font-bold text-gray-800">
              ${car.pricePerHour}
            </p>
            <Link to={`/car-details/${car._id}`}>
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                View Details
              </button>
            </Link>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default CarListing;

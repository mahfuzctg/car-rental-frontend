import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Car {
  _id: string;
  name: string;
  description: string;
  color: string;
  isElectric: boolean;
  features: string[];
  pricePerHour: number;
  status: string;
  image?: string;
}

const CarDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<Car | null>(null);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(`/api/cars/${id}`);
        setCar(response.data.data);
      } catch (error) {
        console.error("Failed to fetch car:", error);
      }
    };

    fetchCar();
  }, [id]);

  if (!car) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{car.name}</h1>
      <img
        src={car.image || "https://via.placeholder.com/300"}
        alt={car.name}
        className="w-full h-64 object-cover mb-4"
      />
      <p className="text-gray-700 mb-4">{car.description}</p>
      <p className="text-green-600 font-bold mb-4">${car.pricePerHour}/hour</p>
      <p className="text-gray-600 mb-2">
        <strong>Color:</strong> {car.color}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Electric:</strong> {car.isElectric ? "Yes" : "No"}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Features:</strong> {car.features.join(", ")}
      </p>
      <p className="text-gray-600">
        <strong>Status:</strong> {car.status}
      </p>
    </div>
  );
};

export default CarDetails;

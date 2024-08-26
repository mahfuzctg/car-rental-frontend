import React from "react";
import { Card } from "../components/ui/UI/card";

// Dummy data for featured cars
const featuredCars = [
  {
    id: 1,
    image: "/path/to/car1.jpg",
    title: "Car Model 1",
    description: "Brief description of Car Model 1.",
    price: "$20,000",
  },
  {
    id: 2,
    image: "/path/to/car2.jpg",
    title: "Car Model 2",
    description: "Brief description of Car Model 2.",
    price: "$25,000",
  },
  {
    id: 3,
    image: "/path/to/car3.jpg",
    title: "Car Model 3",
    description: "Brief description of Car Model 3.",
    price: "$30,000",
  },
  {
    id: 4,
    image: "/path/to/car4.jpg",
    title: "Car Model 4",
    description: "Brief description of Car Model 4.",
    price: "$35,000",
  },
];

const FeaturedCars: React.FC = () => {
  return (
    <section className="py-10 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Featured Cars
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featuredCars.map((car) => (
            <Card key={car.id} className="shadow-lg rounded-lg overflow-hidden">
              <img
                src={car.image}
                alt={car.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{car.title}</h3>
                <p className="text-gray-600 mb-4">{car.description}</p>
                <p className="text-lg font-bold text-gray-800">{car.price}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;

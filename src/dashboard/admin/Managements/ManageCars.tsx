/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  AiOutlineCheckCircle,
  AiOutlineDelete,
  AiOutlineEdit,
} from "react-icons/ai";
import { FaCar } from "react-icons/fa";
import { Oval } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/UI/button";
import { Card, CardContent, CardHeader } from "../../../components/ui/UI/card";
import "../../../Customs/heading-custom.css";
import {
  useDeleteCarMutation,
  useGetAllCarsQuery,
} from "../../../redux/features/car/carApi";

interface Car {
  _id: string;
  name: string;
  image?: string;
  pricePerHour: number;
  features: string;
}

const ManageCars: React.FC = () => {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);

  // Fetch cars and manage loading and error states
  const { data: response, isLoading, error } = useGetAllCarsQuery({});
  const [deleteCar] = useDeleteCarMutation();
  const cars = response?.data || [];
  const [totalCars, setTotalCars] = useState(cars.length);

  useEffect(() => {
    if (Array.isArray(cars)) {
      setTotalCars(cars.length);
    }
  }, [cars]);

  // Function to handle car deletion
  const handleDelete = async (_id: string) => {
    toast.custom(
      (t) => (
        <div
          className={`flex flex-col p-4 rounded-lg shadow-lg ${
            t.visible ? "animate-enter" : "animate-leave"
          } bg-white border border-gray-300`}
        >
          <div className="flex items-center mb-2">
            <AiOutlineCheckCircle className="text-green-500 text-2xl" />
            <p className="ml-2 text-gray-800">
              Are you sure you want to delete this car?
            </p>
          </div>
          <div className="flex justify-between mt-2">
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                const loadingToastId = toast.loading("Confirming deletion...");
                try {
                  await deleteCar(_id).unwrap();
                  toast.success("Car deleted successfully", {
                    id: loadingToastId,
                  });
                  setTotalCars((prev: number) => prev - 1);
                } catch (err) {
                  toast.error("Failed to delete car", { id: loadingToastId });
                }
              }}
              className="bg-green-600 text-white rounded-lg px-4 py-2"
            >
              Yes
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="bg-red-600 text-white rounded-lg px-4 py-2"
            >
              No
            </button>
          </div>
        </div>
      ),
      { duration: 2000 }
    );
  };

  // Display a subset of cars based on `showAll` state
  const displayedCars = cars.slice(0, showAll ? cars.length : 12);

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

  if (error) {
    return <p className="text-center text-red-500">Error loading cars</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl text-gray-700 md:text-3xl font-bold text-center mb-6 uppercase">
          Manage cars
          <div className="w-24 h-1 bg-red-600 mt-2 mx-auto"></div>
        </h2>
        <div className="flex items-center space-x-4">
          <FaCar className="text-3xl text-red-600" />
          <span className="text-xl font-semibold text-gray-700">
            Total Cars: {totalCars}
          </span>
          <Link to="/admin/create-car">
            <Button className="bg-red-600 text-white hover:bg-red-700 rounded-lg px-4 py-2">
              Add New Car
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-4">
        {displayedCars.map((car: Car) => (
          <Card
            key={car._id}
            className="flex flex-col  rounded-lg overflow-hidden bg-white border border-gray-200"
          >
            <CardHeader className="relative h-2/5">
              <img
                src={car.image || "/default-image.jpg"}
                alt={car.name}
                className="h-full w-full object-cover"
              />
            </CardHeader>
            <CardContent className="flex flex-col flex-grow p-4">
              <div className="flex flex-col flex-grow">
                <span className="text-gray-700 text-xl font-semibold mb-2">
                  ${car.pricePerHour} /hr
                </span>
                <h2 className="text-xl font-bold mb-2 ">{car.name}</h2>
                <p className="text-gray-600 mb-4">{car.features}</p>
              </div>
              <div className="flex justify-between mt-4">
                <Button
                  onClick={() => navigate(`/admin/update-car/${car._id}`)}
                  className="flex items-center bg-white text-red-600 outline-3"
                >
                  <AiOutlineEdit className="mr-2" /> Edit
                </Button>
                <Button
                  onClick={() => handleDelete(car._id)}
                  variant="danger"
                  className="flex items-center"
                >
                  <AiOutlineDelete className="mr-2" /> Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {!showAll && cars.length > 12 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setShowAll(true)}
            className="bg-red-600 text-white hover:bg-red-700 rounded-lg px-4 py-2"
          >
            Show All
          </button>
        </div>
      )}

      <Toaster />
    </div>
  );
};

export default ManageCars;

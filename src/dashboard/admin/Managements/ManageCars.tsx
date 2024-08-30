/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { FaCar } from "react-icons/fa";
import Modal from "react-modal";
import { Button } from "../../../components/ui/UI/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../../../components/ui/UI/card";
import { Input } from "../../../components/ui/UI/input";
import { cn } from "../../../lib/utils";
import {
  useAddCarMutation,
  useDeleteCarMutation,
  useGetAllCarsQuery,
  useUpdateCarMutation,
} from "../../../redux/api/carApi";
import { Car } from "../../../types/carTypes";

interface CarFormState {
  make: string;
  model: string;
  year: string;
  features: string;
  pricing: string;
  image: File | null;
}

const ManageCars: React.FC = () => {
  const { data: cars = [], isLoading, error } = useGetAllCarsQuery();
  const [addCar] = useAddCarMutation();
  const [updateCar] = useUpdateCarMutation();
  const [deleteCar] = useDeleteCarMutation();
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
  const [currentCar, setCurrentCar] = useState<Car | null>(null);
  const [carForm, setCarForm] = useState<CarFormState>({
    make: "",
    model: "",
    year: "",
    features: "",
    pricing: "",
    image: null,
  });

  // State to handle whether to show all cars or just a subset
  const [showAll, setShowAll] = useState(false);
  // State to handle the total car count
  const [totalCars, setTotalCars] = useState(cars.length);

  useEffect(() => {
    setTotalCars(cars.length);
  }, [cars]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCarForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      setCarForm((prev) => ({
        ...prev,
        image: files[0],
      }));
    }
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(carForm).forEach((key) => {
      const value = carForm[key as keyof CarFormState];
      if (key === "features") {
        formData.append(key, JSON.stringify(value?.split(",") || []));
      } else if (key === "image" && value) {
        formData.append(key, value);
      } else {
        formData.append(key, value?.toString() || "");
      }
    });
    try {
      await addCar(formData).unwrap();
      toast.success("Car added successfully");
      setTotalCars((prev) => prev + 1); // Update total car count
    } catch (err) {
      toast.error("Failed to add car");
    }
    setAddModalIsOpen(false);
    resetForm();
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(carForm).forEach((key) => {
      const value = carForm[key as keyof CarFormState];
      if (key === "features") {
        formData.append(key, JSON.stringify(value?.split(",") || []));
      } else if (key === "image" && value) {
        formData.append(key, value);
      } else {
        formData.append(key, value?.toString() || "");
      }
    });
    try {
      if (currentCar) {
        await updateCar({ id: currentCar._id, carData: formData }).unwrap();
        toast.success("Car updated successfully");
      }
    } catch (err) {
      toast.error("Failed to update car");
    }
    setUpdateModalIsOpen(false);
    resetForm();
    setCurrentCar(null);
  };

  const handleEdit = (car: Car) => {
    setCurrentCar(car);
    setCarForm({
      make: car.make,
      model: car.model,
      year: car.year.toString(),
      features: car.features.join(", "),
      pricing: car.pricing.toString(),
      image: null,
    });
    setUpdateModalIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    // Show a custom confirmation toast
    const confirmDeleteToast = toast.custom(
      (t) => (
        <div
          className={`toast ${t.visible ? "animate-enter" : "animate-leave"}`}
        >
          <div className="flex items-center">
            <AiOutlineCheckCircle className="text-green-500" />
            <p className="ml-2">Are you sure you want to delete this car?</p>
          </div>
          <div className="mt-2 flex justify-end space-x-2">
            <button
              onClick={async () => {
                toast.dismiss(t.id); // Dismiss the confirmation toast
                // Show loading toast
                const loadingToast = toast.loading("Confirming deletion...");
                try {
                  await deleteCar(id).unwrap();
                  toast.success("Car deleted successfully", {
                    id: loadingToast,
                  });
                  setTotalCars((prev) => prev - 1); // Update total car count
                } catch (err) {
                  toast.error("Failed to delete car", { id: loadingToast });
                }
              }}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Yes
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              No
            </button>
          </div>
        </div>
      ),
      {
        duration: 2000, // Duration in milliseconds (2 seconds)
      }
    );
  };

  const resetForm = () => {
    setCarForm({
      make: "",
      model: "",
      year: "",
      features: "",
      pricing: "",
      image: null,
    });
  };

  // Show only a subset of cars based on showAll state
  const displayedCars = showAll ? cars : cars.slice(0, 12);

  if (isLoading) return <p>Loading cars...</p>;
  if (error) return <p>Error loading cars</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Manage Cars</h1>
      <div className="flex items-center mb-4">
        <FaCar className="text-2xl mr-2" />
        <span className="text-xl font-semibold">Total Cars: {totalCars}</span>
      </div>
      <Button variant="primary" onClick={() => setAddModalIsOpen(true)}>
        Add New Car
      </Button>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {displayedCars.map((car) => (
          <Card key={car._id} className="shadow-lg">
            <CardHeader>
              <img
                src={car.image}
                alt={car.make}
                className="h-48 w-full object-cover"
              />
            </CardHeader>
            <CardContent>
              <h2 className="text-xl font-semibold">
                {car.make} {car.model} ({car.year})
              </h2>
              <p className="text-sm text-gray-600">{car.features.join(", ")}</p>
              <p className="text-lg font-bold mt-2">${car.pricing}/hour</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => handleEdit(car)}>
                Edit
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDelete(car._id)}
              >
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {!showAll && cars.length > 10 && (
        <Button variant="" className="mt-4" onClick={() => setShowAll(true)}>
          Show More
        </Button>
      )}

      {/* Add New Car Modal */}

      <Modal
        isOpen={addModalIsOpen}
        onRequestClose={() => setAddModalIsOpen(false)}
        className={cn(
          "bg-white p-4 rounded-lg shadow-lg max-w-lg mx-auto mt-20",
          "focus:outline-none"
        )}
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-2xl font-bold mb-4">Add New Car</h2>
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <Input
            type="text"
            name="make"
            value={carForm.make}
            onChange={handleInputChange}
            placeholder="Make"
            required
          />
          <Input
            type="text"
            name="model"
            value={carForm.model}
            onChange={handleInputChange}
            placeholder="Model"
            required
          />
          <Input
            type="number"
            name="year"
            value={carForm.year}
            onChange={handleInputChange}
            placeholder="Year"
            required
          />
          <Input
            type="text"
            name="features"
            value={carForm.features}
            onChange={handleInputChange}
            placeholder="Features (comma separated)"
          />
          <Input
            type="number"
            name="pricing"
            value={carForm.pricing}
            onChange={handleInputChange}
            placeholder="Pricing"
            required
          />
          <Input
            type="file"
            name="image"
            onChange={handleFileChange}
            accept="image/*"
          />
          <div className="flex justify-end space-x-2 mt-4">
            <Button type="button" onClick={() => setAddModalIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Car</Button>
          </div>
        </form>
      </Modal>

      {/* Update Car Modal */}
      <Modal
        isOpen={updateModalIsOpen}
        onRequestClose={() => setUpdateModalIsOpen(false)}
        className={cn(
          "bg-white p-4 rounded-lg shadow-lg max-w-lg mx-auto mt-20",
          "focus:outline-none"
        )}
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-2xl font-bold mb-4">Update Car</h2>
        <form onSubmit={handleUpdateSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Make</label>
            <Input
              type="text"
              name="make"
              value={carForm.make}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Model</label>
            <Input
              type="text"
              name="model"
              value={carForm.model}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Year</label>
            <Input
              type="number"
              name="year"
              value={carForm.year}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Features</label>
            <Input
              type="text"
              name="features"
              value={carForm.features}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Pricing</label>
            <Input
              type="number"
              name="pricing"
              value={carForm.pricing}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Image</label>
            <Input type="file" name="image" onChange={handleFileChange} />
          </div>
          <div className="flex justify-end">
            <Button
              variant="secondary"
              onClick={() => setUpdateModalIsOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="ml-2">
              Update Car
            </Button>
          </div>
        </form>
      </Modal>

      <Toaster />
    </div>
  );
};

export default ManageCars;

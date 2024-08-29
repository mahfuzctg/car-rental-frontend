/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import toast from "react-hot-toast";
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
    if (window.confirm("Are you sure you want to delete this car?")) {
      try {
        await deleteCar(id).unwrap();
        toast.success("Car deleted successfully");
      } catch (err) {
        toast.error("Failed to delete car");
      }
    }
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
  const displayedCars = showAll ? cars : cars.slice(0, 10);

  if (isLoading) return <p>Loading cars...</p>;
  if (error) return <p>Error loading cars</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Manage Cars</h1>
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
        <Button variant="" className="mt-4 " onClick={() => setShowAll(true)}>
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
            name="make"
            value={carForm.make}
            onChange={handleInputChange}
            placeholder="Make"
            required
          />
          <Input
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
            name="features"
            value={carForm.features}
            onChange={handleInputChange}
            placeholder="Features (comma separated)"
            required
          />
          <Input
            type="number"
            name="pricing"
            value={carForm.pricing}
            onChange={handleInputChange}
            placeholder="Pricing"
            required
          />
          <Input type="file" name="image" onChange={handleFileChange} />
          <Button type="submit" variant="primary">
            Save
          </Button>
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
        <form onSubmit={handleUpdateSubmit} className="space-y-4">
          <Input
            name="make"
            value={carForm.make}
            onChange={handleInputChange}
            placeholder="Make"
            required
          />
          <Input
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
            name="features"
            value={carForm.features}
            onChange={handleInputChange}
            placeholder="Features (comma separated)"
            required
          />
          <Input
            type="number"
            name="pricing"
            value={carForm.pricing}
            onChange={handleInputChange}
            placeholder="Pricing"
            required
          />
          <Input type="file" name="image" onChange={handleFileChange} />
          <Button type="submit" variant="primary">
            Save
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default ManageCars;

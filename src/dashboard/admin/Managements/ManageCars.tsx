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
import {
  useAddCarMutation,
  useDeleteCarMutation,
  useGetAllCarsQuery,
  useUpdateCarMutation,
} from "../../../redux/api/carApi";
import { Car } from "../../../types/carTypes";

interface CarFormState {
  name: string;
  description: string;
  color: string;
  isElectric: boolean;
  status: string;
  features: string;
  pricePerHour: string;
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
    name: "",
    description: "",
    color: "",
    isElectric: false,
    status: "available",
    features: "",
    pricePerHour: "",
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
    const { name, value, type, checked } = e.target;
    setCarForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
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
      name: car.name || "",
      description: car.description || "",
      color: car.color || "",
      isElectric: car.isElectric || false,
      status: car.status || "available",
      features: car.features ? car.features.join(", ") : "",
      pricePerHour: car.pricePerHour ? car.pricePerHour.toString() : "",
      image: null, // Reset image on edit
    });
    setUpdateModalIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    const confirmDeleteToast = toast.custom(
      (t) => (
        <div
          className={`flex flex-col p-4 rounded-lg shadow-lg ${
            t.visible ? "animate-enter" : "animate-leave"
          } bg-white border border-gray-300`}
        >
          <div className="flex items-center">
            <AiOutlineCheckCircle className="text-green-500" />
            <p className="ml-2">Are you sure you want to delete this car?</p>
          </div>
          <div className="mt-2 flex justify-end space-x-2">
            <button
              onClick={async () => {
                toast.dismiss(t.id); // Dismiss the confirmation toast
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
      name: "",
      description: "",
      color: "",
      isElectric: false,
      status: "available",
      features: "",
      pricePerHour: "",
      image: null,
    });
  };

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
                alt={car.name}
                className="h-48 w-full object-cover"
              />
            </CardHeader>
            <CardContent>
              <h2 className="text-xl font-semibold">
                {car.name} ({car.color})
              </h2>
              <p className="text-sm text-gray-600">{car.description}</p>
              <p className="text-sm text-gray-600">{car.features.join(", ")}</p>
              <p className="text-lg font-bold mt-2">${car.pricePerHour}/hour</p>
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
      <Button
        variant="secondary"
        className="mt-4"
        onClick={() => setShowAll(!showAll)}
      >
        {showAll ? "Show Less" : "Show All"}
      </Button>

      {/* Add Car Modal */}
      <Modal
        isOpen={addModalIsOpen}
        onRequestClose={() => setAddModalIsOpen(false)}
      >
        <h2 className="text-xl font-bold mb-4">Add New Car</h2>
        <form onSubmit={handleAddSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label className="block text-sm font-semibold">Name</label>
            <Input
              type="text"
              name="name"
              value={carForm.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold">Description</label>
            <Input
              type="text"
              name="description"
              value={carForm.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold">Color</label>
            <Input
              type="text"
              name="color"
              value={carForm.color}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold">Is Electric</label>
            <Input
              type="checkbox"
              name="isElectric"
              checked={carForm.isElectric}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold">Status</label>
            <select
              name="status"
              value={carForm.status}
              onChange={handleInputChange}
              className="w-full px-2 py-1 border border-gray-300 rounded"
            >
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
              <option value="under maintenance">Under Maintenance</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold">
              Features (comma separated)
            </label>
            <Input
              type="text"
              name="features"
              value={carForm.features}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold">
              Price Per Hour
            </label>
            <Input
              type="number"
              name="pricePerHour"
              value={carForm.pricePerHour}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold">Image</label>
            <input type="file" name="image" onChange={handleFileChange} />
          </div>
          <Button type="submit" variant="primary">
            Add Car
          </Button>
        </form>
      </Modal>

      {/* Update Car Modal */}
      <Modal
        isOpen={updateModalIsOpen}
        onRequestClose={() => setUpdateModalIsOpen(false)}
      >
        <h2 className="text-xl font-bold mb-4">Update Car</h2>
        <form onSubmit={handleUpdateSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label className="block text-sm font-semibold">Name</label>
            <Input
              type="text"
              name="name"
              value={carForm.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold">Description</label>
            <Input
              type="text"
              name="description"
              value={carForm.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold">Color</label>
            <Input
              type="text"
              name="color"
              value={carForm.color}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold">Is Electric</label>
            <Input
              type="checkbox"
              name="isElectric"
              checked={carForm.isElectric}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold">Status</label>
            <select
              name="status"
              value={carForm.status}
              onChange={handleInputChange}
              className="w-full px-2 py-1 border border-gray-300 rounded"
            >
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
              <option value="under maintenance">Under Maintenance</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold">
              Features (comma separated)
            </label>
            <Input
              type="text"
              name="features"
              value={carForm.features}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold">
              Price Per Hour
            </label>
            <Input
              type="number"
              name="pricePerHour"
              value={carForm.pricePerHour}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold">Image</label>
            <input type="file" name="image" onChange={handleFileChange} />
          </div>
          <Button type="submit" variant="primary">
            Update Car
          </Button>
        </form>
      </Modal>

      <Toaster />
    </div>
  );
};

export default ManageCars;

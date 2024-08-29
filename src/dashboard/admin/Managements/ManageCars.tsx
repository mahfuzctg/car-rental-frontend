import React, { useState } from "react";
import toast from "react-hot-toast";
import Modal from "react-modal";
import "../../../Customs/ManageCars.css"; // Import your CSS file
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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentCar, setCurrentCar] = useState<Car | null>(null);
  const [carForm, setCarForm] = useState<CarFormState>({
    make: "",
    model: "",
    year: "",
    features: "",
    pricing: "",
    image: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name in carForm) {
      setCarForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in carForm) {
      if (key === "features") {
        formData.append(key, JSON.stringify(carForm[key]?.split(",") || []));
      } else {
        formData.append(key, carForm[key] || ""); // Handle possible null values
      }
    }
    try {
      if (currentCar) {
        await updateCar({ id: currentCar._id, carData: formData }).unwrap();
        toast.success("Car updated successfully");
      } else {
        await addCar(formData).unwrap();
        toast.success("Car added successfully");
      }
    } catch (err) {
      toast.error("Failed to save car");
    }
    setModalIsOpen(false);
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
    setModalIsOpen(true);
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

  if (isLoading) return <p>Loading cars...</p>;
  if (error) return <p>Error loading cars</p>;

  return (
    <div className="manage-cars-container">
      <h1>Manage Cars</h1>
      <button className="add-car-button" onClick={() => setModalIsOpen(true)}>
        Add New Car
      </button>
      <div className="car-list">
        {cars.map((car: Car) => (
          <div key={car._id} className="car-card">
            <img src={car.image} alt={car.make} className="car-image" />
            <div className="car-info">
              <h2 className="car-title">
                {car.make} {car.model} ({car.year})
              </h2>
              <p className="car-features">{car.features.join(", ")}</p>
              <p className="car-pricing">{car.pricing}</p>
              <div className="car-actions">
                <button className="edit-button" onClick={() => handleEdit(car)}>
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(car._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="modal"
        overlayClassName="overlay"
      >
        <h2>{currentCar ? "Update Car" : "Add New Car"}</h2>
        <form onSubmit={handleSubmit} className="car-form">
          <input
            type="text"
            name="make"
            value={carForm.make}
            onChange={handleInputChange}
            placeholder="Make"
            required
          />
          <input
            type="text"
            name="model"
            value={carForm.model}
            onChange={handleInputChange}
            placeholder="Model"
            required
          />
          <input
            type="number"
            name="year"
            value={carForm.year}
            onChange={handleInputChange}
            placeholder="Year"
            required
          />
          <input
            type="text"
            name="features"
            value={carForm.features}
            onChange={handleInputChange}
            placeholder="Features (comma separated)"
            required
          />
          <input
            type="number"
            name="pricing"
            value={carForm.pricing}
            onChange={handleInputChange}
            placeholder="Pricing"
            required
          />
          <input type="file" name="image" onChange={handleFileChange} />
          <button type="submit" className="submit-button">
            Save
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default ManageCars;

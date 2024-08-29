/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Button } from "../../../../components/ui/UI/button";
import { Input } from "../../../../components/ui/UI/input";
import { cn } from "../../../../lib/utils";
import { useUpdateCarMutation } from "../../../../redux/api/carApi";

interface UpdateCarModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  carToUpdate: Car | null;
}

const UpdateCarModal: React.FC<UpdateCarModalProps> = ({
  isOpen,
  onRequestClose,
  carToUpdate,
}) => {
  const [updateCar] = useUpdateCarMutation();
  const [carForm, setCarForm] = useState({
    make: "",
    model: "",
    year: "",
    features: "",
    pricing: "",
    image: null as File | null,
  });

  useEffect(() => {
    if (carToUpdate) {
      setCarForm({
        make: carToUpdate.make,
        model: carToUpdate.model,
        year: carToUpdate.year.toString(),
        features: carToUpdate.features.join(", "),
        pricing: carToUpdate.pricing.toString(),
        image: null,
      });
    }
  }, [carToUpdate]);

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

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in carForm) {
      if (key === "features") {
        formData.append(key, JSON.stringify(carForm[key]?.split(",") || []));
      } else {
        formData.append(key, carForm[key] || "");
      }
    }
    if (carToUpdate) {
      try {
        await updateCar({ id: carToUpdate._id, carData: formData }).unwrap();
        alert("Car updated successfully");
      } catch (err) {
        alert("Failed to update car");
      }
      onRequestClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
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
        <Button variant="outline" onClick={onRequestClose}>
          Cancel
        </Button>
      </form>
    </Modal>
  );
};

export default UpdateCarModal;

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"; // or use your preferred data fetching method
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { Button } from "../components/ui/UI/button";
import { Input } from "../components/ui/UI/input";
import { Select } from "../components/ui/UI/select";

const BookingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [carDetails, setCarDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    phone: "",
    paymentMethod: "Credit Card",
  });

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(`/api/cars/${id}`);
        setCarDetails(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch car details");
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Assume we send booking data to an API endpoint
      await axios.post(`/api/bookings`, {
        ...bookingData,
        carId: id,
      });
      toast.success("Booking successful!");
    } catch (error) {
      toast.error("Failed to complete booking");
    }
  };

  if (loading) return <p>Loading car details...</p>;
  if (!carDetails) return <p>Car not found</p>;

  // Default to empty array if features are undefined
  const features = carDetails.features || [];

  return (
    <div className="booking-page p-4 max-w-3xl mx-auto bg-white shadow-md rounded-md">
      <h1 className="text-3xl font-bold mb-4">Booking Page</h1>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Car Details</h2>
        <div className="border p-4 rounded-md bg-gray-100">
          <img
            src={carDetails.image}
            alt={carDetails.make}
            className="w-full h-64 object-cover mb-4 rounded-md"
          />
          <h3 className="text-xl font-bold">
            {carDetails.make} {carDetails.model} ({carDetails.year})
          </h3>
          <p className="text-lg text-gray-700">
            Price: ${carDetails.pricing}/hour
          </p>
          <p className="text-sm text-gray-600">
            Features: {features.join(", ")}
          </p>
        </div>
      </div>
      <h2 className="text-2xl font-semibold mb-4">Booking Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Name"
          placeholder="Email"
          name="name"
          value={bookingData.name}
          onChange={handleInputChange}
          required
        />
        <Input
          label="Email"
          placeholder="Email"
          name="email"
          type="email"
          value={bookingData.email}
          onChange={handleInputChange}
          required
        />
        <Input
          label="Phone"
          placeholder="Phone Number"
          name="phone"
          value={bookingData.phone}
          onChange={handleInputChange}
          required
        />
        <div className="form-group">
          <label
            htmlFor="paymentMethod"
            className="block text-sm font-medium text-gray-700"
          >
            Payment Method
          </label>
          <Select
            name="paymentMethod"
            value={bookingData.paymentMethod}
            onChange={handleSelectChange}
          >
            <option value="Credit Card">Credit Card</option>
            <option value="PayPal">PayPal</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </Select>
        </div>
        <div className="flex justify-end">
          <Button type="submit" variant="primary">
            Confirm Booking
          </Button>
        </div>
      </form>
      <Toaster position="top-right" />
    </div>
  );
};

export default BookingPage;

import { CardElement, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { Button } from "../components/ui/UI/button";
import { Input } from "../components/ui/UI/input";

// Load Stripe
const stripePromise = loadStripe("YOUR_STRIPE_PUBLIC_KEY");

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
        toast.error("Failed to fetch car details. Please try again later.");
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!bookingData.name || !bookingData.email || !bookingData.phone) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!stripe || !elements) {
      toast.error("Stripe.js has not yet loaded.");
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement) as any,
      billing_details: {
        name: bookingData.name,
        email: bookingData.email,
        phone: bookingData.phone,
      },
    });

    if (error) {
      toast.error(error.message || "Failed to create payment method.");
      return;
    }

    try {
      await axios.post(`/api/bookings`, {
        ...bookingData,
        carId: id,
        paymentMethodId: paymentMethod.id,
      });
      toast.success("Booking successful!");
    } catch (error) {
      toast.error("Failed to complete booking. Please try again.");
    }
  };

  if (loading)
    return <p className="text-center text-gray-600">Loading car details...</p>;
  if (!carDetails)
    return <p className="text-center text-red-600">Car not found</p>;

  // Ensure features is always an array
  const features = carDetails.features || [];

  return (
    <div className="booking-page p-6 max-w-6xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-extrabold mb-6 text-gray-900 text-center">
        Booking Page
      </h1>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Car Details */}
        <div className="lg:w-1/2 flex flex-col gap-6">
          <h2 className="text-3xl font-semibold mb-4 text-gray-900">
            Car Details
          </h2>
          <div className="border p-6 rounded-lg bg-gray-50 shadow-md">
            <img
              src={carDetails.image}
              alt={carDetails.make}
              className="w-full h-48 object-cover mb-4 rounded-lg"
            />
            <h3 className="text-2xl font-bold mb-2 text-gray-800">
              {carDetails.make} {carDetails.model} ({carDetails.year})
            </h3>
            <p className="text-lg font-semibold text-gray-800 mb-2">
              ${carDetails.pricePerHour}/hour
            </p>
            <p className="text-md text-gray-600">
              Features: {features.length > 0 ? features.join(", ") : "None"}
            </p>
          </div>
        </div>
        {/* Booking Form */}
        <div className="lg:w-1/2 flex flex-col gap-6">
          <h2 className="text-3xl font-semibold mb-4 text-gray-900">
            Booking Form
          </h2>
          <Elements stripe={stripePromise}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Name"
                placeholder="Enter your name"
                name="name"
                value={bookingData.name}
                onChange={handleInputChange}
                required
                className="focus:ring-green-500"
              />
              <Input
                label="Email"
                placeholder="Enter your email"
                name="email"
                type="email"
                value={bookingData.email}
                onChange={handleInputChange}
                required
                className="focus:ring-green-500"
              />
              <Input
                label="Phone"
                placeholder="Enter your phone number"
                name="phone"
                value={bookingData.phone}
                onChange={handleInputChange}
                required
                className="focus:ring-green-500"
              />
              <div className="form-group">
                <label
                  htmlFor="paymentMethod"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Payment Method
                </label>
                <CardElement className="border p-4 rounded-lg" />
              </div>
              <div className="flex justify-end">
                <Button type="submit" variant="primary" className="px-6 py-3">
                  Confirm Booking
                </Button>
              </div>
            </form>
          </Elements>
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default BookingPage;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCreateBookingMutation } from "../../redux/features/booking/bookingApi";
import { TBooking } from "../../types/bookingTypes";

const BookingForm = () => {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [totalCost, setTotalCost] = useState(0);
  const { id: carId } = useParams();
  const navigate = useNavigate();
  const [createBooking, { isLoading, error }] = useCreateBookingMutation();
  const [isBooked, setIsBooked] = useState(false); // Track if the car is booked
  const userId = "66749a26c6371e8e922ce1b7"; // Replace with actual user ID retrieval logic

  const convertTo24Hour = (time: string): number | null => {
    const [hours, minutes] = time.split(":").map(Number);
    if (isNaN(hours) || isNaN(minutes)) return null;

    const now = new Date();
    const timeDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hours,
      minutes
    );
    return timeDate.getTime();
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!date) {
      toast.error("Please select a valid date.");
      return;
    }

    const start = convertTo24Hour(startTime);
    const end = convertTo24Hour(endTime);

    if (start === null || end === null || start >= end) {
      toast.error("Please enter valid start and end times.");
      return;
    }

    const hours = (end - start) / (1000 * 60 * 60);
    const pricePerHour = 10; // Set this to your car's price per hour
    const cost = hours * pricePerHour;
    setTotalCost(cost);

    const bookingInfo: TBooking = {
      date: new Date(date),
      user: userId,
      car: carId!,
      startTime,
      endTime,
      totalCost: cost,
    };

    try {
      await createBooking(bookingInfo).unwrap();
      toast.success("Successfully booked your car! Thank you!"); // Show success message
      setIsBooked(true); // Set isBooked to true upon successful booking

      // Delay navigation to home page for 2 seconds
      setTimeout(() => {
        navigate("/"); // Redirect to home page after booking
      }, 2000);
    } catch (err) {
      console.error("Booking error:", err);
      if (error?.data?.message === "Car is already booked!") {
        setIsBooked(true); // Set isBooked to true if the car is already booked
        toast.error("Already booked! Unable to book this car."); // Show toast message
      } else {
        toast.error(
          "Error creating booking: " + (error?.data?.message || "Unknown error")
        );
      }
    }
  };

  useEffect(() => {
    if (error) {
      toast.error("Error: " + error.message);
      if (error?.data?.message === "Car is already booked!") {
        setIsBooked(true); // Update state if the car is already booked
        toast.error("Already booked! Unable to book this car."); // Show toast message
      }
    }
  }, [error]);

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Booking Form</h1>
      <form onSubmit={handleBooking} className="space-y-4">
        <div className="flex flex-col">
          <label className="font-semibold">Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="mt-1 p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Start Time (HH:mm):</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
            className="mt-1 p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">End Time (HH:mm):</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
            className="mt-1 p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Conditional button rendering */}
        {isBooked ? (
          <button
            type="button"
            className="w-full py-2 rounded bg-gray-400 cursor-not-allowed text-white"
            disabled
          >
            Booked
          </button>
        ) : (
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 rounded text-white ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            } transition duration-200`}
          >
            {isLoading ? "Booking..." : "Book Now"}
          </button>
        )}
      </form>
      {totalCost > 0 && (
        <p className="mt-4 text-lg font-semibold">
          Total Cost: ${totalCost.toFixed(2)}
        </p>
      )}
      <ToastContainer />
    </div>
  );
};

export default BookingForm;

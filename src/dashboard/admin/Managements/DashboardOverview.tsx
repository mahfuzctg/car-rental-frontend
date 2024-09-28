/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import "chart.js/auto";
import React, { useEffect, useState } from "react";
import { Line, Pie } from "react-chartjs-2";
import { Toaster } from "react-hot-toast";
import { FaCar, FaClipboardList, FaDollarSign } from "react-icons/fa";
import { Oval } from "react-loader-spinner";
import { useGetAllBookingsQuery } from "../../../redux/features/booking/bookingApi";
import { useGetAllCarsQuery } from "../../../redux/features/car/carApi";

// Define TErrorResponse if not already defined
interface TErrorResponse {
  message?: string;
  status?: number;
}

const AdminOverview: React.FC = () => {
  const {
    data: bookingsResponse,
    isLoading: bookingsLoading,
    error: bookingsError,
  } = useGetAllBookingsQuery([]);

  const {
    data: carsResponse,
    isLoading: carsLoading,
    error: carsError,
  } = useGetAllCarsQuery({});

  const bookings = bookingsResponse?.data || [];
  const cars = carsResponse?.data || [];

  const [totalCars, setTotalCars] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [availableCars, setAvailableCars] = useState(0);

  useEffect(() => {
    setTotalCars(cars.length);

    const available = cars.filter(
      (car: { isAvailable: any }) => car.isAvailable
    ).length;
    setAvailableCars(available);
  }, [cars]);

  useEffect(() => {
    setTotalBookings(bookings.length);

    const revenue = bookings.reduce(
      (acc: number, booking: any) => acc + booking.amount,
      0
    );
    setTotalRevenue(revenue);
  }, [bookings]);

  const bookingDates = bookings.map((booking) => booking.date);
  const bookingAmounts = bookings.map((booking) => booking.amount); // Ensure amount is in TBooking

  const bookingsChartData = {
    labels: bookingDates,
    datasets: [
      {
        label: "Booking Amounts",
        data: bookingAmounts,
        fill: false,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        tension: 0.4,
      },
    ],
  };

  const carsChartData = {
    labels: ["Available Cars", "Booked Cars"],
    datasets: [
      {
        data: [availableCars, totalCars - availableCars],
        backgroundColor: ["#f87171", "#6b7280"],
        hoverBackgroundColor: ["#ef4444", "#4b5563"],
      },
    ],
  };

  if (bookingsLoading || carsLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Oval
          height={80}
          width={80}
          color="#ef4444"
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#ef4444"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    );
  }

  if (bookingsError || carsError) {
    const err = bookingsError as TErrorResponse; // Use the defined error type
    return <p className="text-center text-red-500">Error loading data: {err.message || 'Unknown error'}</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl text-gray-700 md:text-3xl font-bold text-center mb-6 uppercase">
        Admin Overview
        <div className="w-24 h-1 bg-red-600 mt-2 mx-auto"></div>
      </h2>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-200">
          <FaCar className="text-5xl text-red-600 mb-4" />
          <h2 className="text-xl font-semibold text-gray-700">Total Cars</h2>
          <p className="text-5xl font-bold text-gray-900">{totalCars}</p>
        </div>
        <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-200">
          <FaClipboardList className="text-5xl text-red-600 mb-4" />
          <h2 className="text-xl font-semibold text-gray-700">
            Total Bookings
          </h2>
          <p className="text-5xl font-bold text-gray-900">{totalBookings}</p>
        </div>
        <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-200">
          <FaDollarSign className="text-5xl text-red-600 mb-4" />
          <h2 className="text-xl font-semibold text-gray-700">Total Revenue</h2>
          <p className="text-5xl font-bold text-gray-900">
            ${totalRevenue.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-200">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            Bookings Trend
          </h2>
          <div className="w-full h-64">
            <Line data={bookingsChartData} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-200">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            Cars Availability
          </h2>
          <div className="w-full h-64">
            <Pie data={carsChartData} />
          </div>
        </div>
      </div>

      <Toaster />
    </div>
  );
};

export default AdminOverview;

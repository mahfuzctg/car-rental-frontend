import React, { useEffect, useState } from "react";
import { FaCar } from "react-icons/fa";

// Sample return cars data
const returnCarsData = [
  {
    id: 1,
    customer: "John Doe",
    car: "Toyota Camry",
    bookingDate: "2024-08-20",
    returnDate: null,
    status: "Booked",
  },
  {
    id: 2,
    customer: "Jane Smith",
    car: "Honda Accord",
    bookingDate: "2024-08-22",
    returnDate: "2024-08-25",
    status: "Returned",
  },
  // Add more return cars as needed
];

const ManageReturnCars: React.FC = () => {
  const [returnCars, setReturnCars] = useState(returnCarsData);

  const handleReturn = (id: number) => {
    const today = new Date().toISOString().split("T")[0];
    setReturnCars(
      returnCars.map((car) =>
        car.id === id ? { ...car, returnDate: today, status: "Returned" } : car
      )
    );
  };

  useEffect(() => {
    // Fetch actual return cars data from the server
    // fetchReturnCars();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Manage Return Cars</h1>
      <table className="w-full bg-white border border-gray-200 rounded-md shadow-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Customer</th>
            <th className="p-3 text-left">Car</th>
            <th className="p-3 text-left">Booking Date</th>
            <th className="p-3 text-left">Return Date</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {returnCars.map((car) => (
            <tr key={car.id}>
              <td className="p-3">{car.customer}</td>
              <td className="p-3">{car.car}</td>
              <td className="p-3">{car.bookingDate}</td>
              <td className="p-3">{car.returnDate || "-"}</td>
              <td className="p-3">
                <span
                  className={`px-4 py-2 rounded ${
                    car.status === "Returned"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {car.status}
                </span>
              </td>
              <td className="p-3 text-center">
                {car.status === "Booked" && (
                  <button
                    onClick={() => handleReturn(car.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    <FaCar className="mr-2" /> Return
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageReturnCars;

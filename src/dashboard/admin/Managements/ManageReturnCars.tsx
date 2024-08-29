import React, { useEffect, useState } from "react";
import { FaCar } from "react-icons/fa";

interface ReturnCar {
  id: number;
  customer: string;
  car: string;
  bookingDate: string;
  returnDate: string | null;
  status: string;
}

const returnCarsData: ReturnCar[] = [
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
  const [returnCars, setReturnCars] = useState<ReturnCar[]>(returnCarsData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleReturn = async (id: number) => {
    setLoading(true);
    setError(null);

    const today = new Date().toISOString().split("T")[0];
    const endTime = new Date().toISOString().split("T")[1].substring(0, 5); // Current time

    try {
      const response = await fetch(
        "https://assignment3-phi-fawn.vercel.app/api/cars/return",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
          },
          body: JSON.stringify({
            bookingId: id,
            endTime,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "An error occurred");
      }

      setReturnCars((prev) =>
        prev.map((car) =>
          car.id === id
            ? {
                ...car,
                returnDate: today,
                status: "Returned",
              }
            : car
        )
      );
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch actual return cars data from the server if needed
    // fetchReturnCars();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl text-gray-700 md:text-3xl font-bold text-center mb-6 uppercase">
        Manage Return Cars
        <div className="w-24 h-1 bg-red-600 mt-2 mx-auto"></div>
      </h2>
      {loading && <p className="text-blue-500 mb-4">Processing...</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead className="bg-gray-200 text-gray-600">
            <tr>
              <th className="p-4 text-left" scope="col">
                Customer
              </th>
              <th className="p-4 text-left" scope="col">
                Car
              </th>
              <th className="p-4 text-left" scope="col">
                Booking Date
              </th>
              <th className="p-4 text-left" scope="col">
                Return Date
              </th>
              <th className="p-4 text-left" scope="col">
                Status
              </th>
              <th className="p-4 text-center" scope="col">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {returnCars.map((car) => (
              <tr
                key={car.id}
                className={`transition-colors duration-300 ease-in-out ${
                  car.status === "Returned"
                    ? "bg-green-50"
                    : car.status === "Booked"
                    ? "bg-yellow-50"
                    : "bg-white"
                } hover:bg-gray-50`}
              >
                <td className="p-4 text-gray-800">{car.customer}</td>
                <td className="p-4 text-gray-800">{car.car}</td>
                <td className="p-4 text-gray-800">{car.bookingDate}</td>
                <td className="p-4 text-gray-800">{car.returnDate || "-"}</td>
                <td className="p-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                      car.status === "Returned"
                        ? "bg-green-100 text-green-700"
                        : car.status === "Booked"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {car.status}
                  </span>
                </td>
                <td className="p-4 text-center">
                  {car.status === "Booked" ? (
                    <button
                      onClick={() => handleReturn(car.id)}
                      className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-colors"
                    >
                      <FaCar className="mr-2" /> Return
                    </button>
                  ) : (
                    <span className="text-gray-500">N/A</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageReturnCars;

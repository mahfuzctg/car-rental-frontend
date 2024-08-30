/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";

interface Booking {
  id: number;
  car: string;
  date: string;
  status: string;
}

interface User {
  name: string;
  email: string;
  phone: string;
  address: string;
  preferences: string;
}

const Overview: React.FC = () => {
  // Example data
  const [user, setUser] = useState<User>({
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    address: "123 Main St, Anytown, USA",
    preferences: "Automatic transmission, GPS",
  });

  const [bookings, setBookings] = useState<Booking[]>([
    { id: 1, car: "Toyota Camry", date: "2024-08-20", status: "Completed" },
    { id: 2, car: "Honda Accord", date: "2024-08-22", status: "Pending" },
    { id: 3, car: "BMW 3 Series", date: "2024-08-25", status: "Cancelled" },
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleUpdateProfile = () => {
    // Handle profile update logic here (e.g., API call)
    alert("Profile updated successfully!");
  };

  return (
    <div className="p-6 w-full max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Overview</h1>

      {/* Personal Information Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
        <div className="bg-gray-100 p-4 rounded-md">
          <div className="mb-2">
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              value={user.phone}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium">Address</label>
            <input
              type="text"
              name="address"
              value={user.address}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium">Preferences</label>
            <input
              type="text"
              name="preferences"
              value={user.preferences}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            onClick={handleUpdateProfile}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Update Profile
          </button>
        </div>
      </div>

      {/* Booking History Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Booking History</h2>
        <div className="bg-gray-100 p-4 rounded-md">
          {bookings.length > 0 ? (
            <ul className="space-y-2">
              {bookings.map((booking) => (
                <li
                  key={booking.id}
                  className="p-3 bg-white rounded-md shadow-sm border border-gray-300"
                >
                  <p className="text-sm">
                    <span className="font-medium">Car:</span> {booking.car}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Date:</span> {booking.date}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Status:</span>{" "}
                    {booking.status}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm">No bookings found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Overview;

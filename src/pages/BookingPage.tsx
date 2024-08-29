import React from "react";
import { useParams } from "react-router-dom";

const BookingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Fetch car details and handle booking logic here

  return (
    <div className="booking-page p-4">
      <h1 className="text-3xl font-bold mb-4">Booking Page</h1>
      <p>Booking details for car ID: {id}</p>
      {/* Add form and booking logic here */}
    </div>
  );
};

export default BookingPage;

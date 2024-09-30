import { Types } from "mongoose";

// User Type
export type TUser = {
  _id: Types.ObjectId; // Use Types.ObjectId for consistency with MongoDB references
  address: string; // User's address
  email: string; // User's email
  isDeleted: boolean; // Soft delete flag
  name: string; // User's name
  phone: string; // User's phone number
  role: string; // User's role (e.g., admin, user, etc.)
};

// Car Type
export type TCar = {
  _id: Types.ObjectId; // Use Types.ObjectId for consistency with MongoDB references
  name: string; // Car name
  description: string; // Car description
  color: string; // Car color
  isElectric: boolean; // Indicates if the car is electric
  image: string[]; // Array of image URLs
  features: string[]; // List of features of the car
  isDeleted: boolean; // Soft delete flag
  pricePerHour: number; // Price per hour in currency
  status: string; // Status (available, booked, etc.)
};

// Booking Type
export type TBooking = {
  date: Date; // Date of the booking
  user: Types.ObjectId; // Reference to the user
  car: Types.ObjectId; // Reference to the booked car
  startTime: string; // Start time in 24-hour format
  endTime: string; // End time in 24-hour format
  totalCost: number; // Total cost calculated based on the rental duration and price per hour
};

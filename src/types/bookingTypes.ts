import { Types } from "mongoose";

// User Type
export type TUser = {
  _id: Types.ObjectId; // MongoDB ObjectId
  address: string; // User's address
  email: string; // User's email
  isDeleted: boolean; // Soft delete flag
  name: string; // User's name
  phone: string; // User's phone number
  role: string; // User's role (e.g., admin, user, etc.)
};

// Car Type
export type TCar = {
  _id: Types.ObjectId | string; // MongoDB ObjectId
  name: string; // Car name
  description: string; // Car description
  color: string; // Car color
  isElectric: boolean; // Indicates if the car is electric
  image: string[]; // Array of image URLs
  features: string[]; // List of features of the car
  isDeleted: boolean; // Soft delete flag
  pricePerHour: number; // Price per hour in currency
  status?: 'pending' | 'confirmed' | 'canceled'; // Optional status field for car availability
};

// Booking Type
export type TBooking = {
  status: 'booked' | 'returned' | 'canceled'; // Booking status
  _id: Types.ObjectId | string; // MongoDB ObjectId for booking
  name: string; // User's name associated with the booking
  date: Date; // Date of the booking
  user: TUser | any; // Reference to the user object
  car: Types.ObjectId | any; // Reference to the car ID
  startTime: string; // Start time in 24-hour format (HH:mm)
  endTime: string; // End time in 24-hour format (HH:mm)
  totalCost: number; // Total cost based on rental duration and price per hour
  amount?: number; // Optional amount field
  location?: string; // Optional location field
  phone?: string; // Optional phone number field
  paymentMethod?: string; // Optional payment method field
  data?: Record<string, unknown>; // Optional data field, replace `unknown` with a more specific type if possible
};

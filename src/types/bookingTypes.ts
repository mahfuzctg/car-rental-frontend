import { TCar } from "./carTypes";
import { TUser } from "./userTypes";

export type TBooking = {
  _id?: string;
  date: string; // The date the booking was made
  user: TUser; // The user who made the booking
  car: TCar; // The car being booked
  phone: string; // Contact phone number of the user
  location: string; // Pickup or drop-off location
  paymentMethod: string; // Payment method
  startTime: string | null; // Start time of the booking
  endTime?: string | null; // Optional: End time of the booking
  status?: string; // Optional: Status of the booking
  isReturnProcess?: boolean; // Optional: Whether the car return process has started
  totalCost?: number; // Optional: Total cost of the booking
  createdAt?: string; // Optional: Creation timestamp
  updatedAt?: string; // Optional: Last updated timestamp
  isPaid?: boolean; // Optional: Payment status
  GPS: boolean; // Whether GPS was selected
  childSeat: boolean; // Whether a child seat was selected
  creditCard?: string | null; // Add creditCard property (make it optional)
};

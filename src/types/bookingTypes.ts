import { TCar } from "./carTypes";
import { TUser } from "./userTypes";

export type TBooking = {
  _id?: string;
  date: string;
  user: TUser;
  car: TCar;
  phone: string;
  location: string;
  paymentMethod: string;
  startTime: string | null;
  status?: string;
  isReturnProcess?: boolean;
  endTime?: string | null;
  totalCost?: number;
  createdAt?: string;
  updatedAt?: string;
  isPaid?: boolean;

  GPS: boolean;
  childSeat: boolean;
};

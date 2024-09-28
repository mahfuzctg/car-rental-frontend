/* eslint-disable @typescript-eslint/no-explicit-any */
export type TUser = {
  isActive: boolean;
  status(status: "active" | "inactive"): void; // Adjust the type as necessary
  _id: string;
  name: string;
  email: string;
  role: string;
  phone: string;
  createdAt: string; // Consider using Date if applicable
  updatedAt: string; // Consider using Date if applicable
  __v: number;
  userRole: "admin" | "user";
  status(status: "active" | "inactive"): void;

};


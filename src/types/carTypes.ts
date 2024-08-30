import { ReactNode } from "react";

export interface Car {
  image: string | undefined;
  year: ReactNode;
  pricing: ReactNode;
  make: ReactNode;
  model: ReactNode;
  imageUrl: string;
  _id: string;
  name: string;
  description: string;
  color: string;
  isElectric: boolean;
  features: string[];
  pricePerHour: number;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

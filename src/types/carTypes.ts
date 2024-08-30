import { Key } from "react";

export type TCar = {
  images: [] | "";
  id: Key | null | undefined;
  price: number;
  type: string;
  imageUrl?: string;
  _id: string;
  name: string;
  model: string;
  year: string;
  image: string | null; // Allow `null` here
  location: string;
  ownerEmail: string | undefined;
  ownerName: string;
  description: string;
  color: string;
  isElectric: boolean;
  status: string;
  features: string | string[];
  pricePerHour: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

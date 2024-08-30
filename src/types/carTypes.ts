import { Key } from "react";

export type TCar = {
  id: Key | null | undefined;
  price: number;
  type: string;
  imageUrl?: string;
  _id: string;
  name: string;
  model: string;
  year: string;
  image: string;
  location: string;
  ownerEmail: string;
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

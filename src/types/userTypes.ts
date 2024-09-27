/* eslint-disable @typescript-eslint/no-explicit-any */
export type TUser = {
  status(status: any): unknown;
  _id: string;
  name: string;
  email: string;
  role: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

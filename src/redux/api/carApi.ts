import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Car } from "../../types/carTypes";

interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export const carApi = createApi({
  reducerPath: "carApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  endpoints: (builder) => ({
    getAllCars: builder.query<Car[], void>({
      query: () => "/cars",
      transformResponse: (response: ApiResponse<Car[]>) => response.data,
    }),
    getCarById: builder.query<Car, string>({
      query: (id) => `/cars/${id}`,
      transformResponse: (response: ApiResponse<Car>) => response.data,
    }),
  }),
});

export const { useGetAllCarsQuery, useGetCarByIdQuery } = carApi;

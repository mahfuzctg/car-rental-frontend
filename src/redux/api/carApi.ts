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
  baseQuery: fetchBaseQuery({
    baseUrl: "https://assignment3-phi-fawn.vercel.app/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken"); // Assuming you're storing the token in localStorage
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllCars: builder.query<Car[], void>({
      query: () => "/cars",
      transformResponse: (response: ApiResponse<Car[]>) => response.data,
    }),
    getCarById: builder.query<Car, string>({
      query: (id) => `/cars/${id}`,
      transformResponse: (response: ApiResponse<Car>) => response.data,
    }),
    addCar: builder.mutation<void, FormData>({
      query: (formData) => ({
        url: "/cars",
        method: "POST",
        body: formData,
      }),
    }),
    updateCar: builder.mutation<void, { id: string; carData: FormData }>({
      query: ({ id, carData }) => ({
        url: `/cars/${id}`,
        method: "PUT",
        body: carData,
      }),
    }),
    deleteCar: builder.mutation<void, string>({
      query: (id) => ({
        url: `/cars/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllCarsQuery,
  useGetCarByIdQuery,
  useAddCarMutation,
  useUpdateCarMutation,
  useDeleteCarMutation,
} = carApi;

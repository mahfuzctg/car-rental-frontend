import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

// Define the API slice with base query and tag types
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/",
    prepareHeaders: (headers, { getState }) => {
      // Get the token from the Redux state
      const token = (getState() as RootState).auth.token;

      if (token) {
        // If a token exists, set the Authorization header
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
    // Optional: Handle errors globally
    // If needed, you can add more customization to handle errors
    // credentials: 'include', // If you are using cookies
  }),
  tagTypes: ["cars", "users"], // Define tags for invalidating and refetching
  endpoints: (builder) => ({
    // Define your endpoints here
    // Example:
    getCars: builder.query({
      query: () => "cars",
      providesTags: ["cars"],
    }),
    createCar: builder.mutation({
      query: (newCar) => ({
        url: "cars",
        method: "POST",
        body: newCar,
      }),
      invalidatesTags: ["cars"],
    }),
    // Add other endpoints as needed
  }),
});

export const { useGetCarsQuery, useCreateCarMutation } = baseApi;

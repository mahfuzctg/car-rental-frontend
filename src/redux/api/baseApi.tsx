import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const baseApi = createApi({
 
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://assignment3-phi-fawn.vercel.app/api", 
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token; 
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
    // Optional: global error handling
    fetchFn: async (input, init) => {
      const response = await fetch(input, init);
      if (!response.ok) {
        const error = await response.json();
        // Handle specific error responses as needed
        throw new Error(error.message || 'An error occurred');
      }
      return response;
    }
  }),
  tagTypes: [
    "Cars",
    "Single-car",
    "users",
    "Single-user",
    "booking",
    "Single-booking",
    "Statistics",
  ],
  endpoints: () => ({}),
});

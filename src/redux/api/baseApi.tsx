import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://assignment3-phi-fawn.vercel.app/api", // Live URL

    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: [
    "Cars",
    "Single-car",
    "User",
    "Single-user",
    "Bookings",
    "Single-booking",
    "Statistics",
  ],
  endpoints: () => ({}),
});

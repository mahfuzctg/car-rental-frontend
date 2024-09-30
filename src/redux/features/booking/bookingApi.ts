// bookingApi.ts
import { TBooking } from "../../../types/bookingTypes";
import { TQueryParam, TResponseRedux } from "../../../types/globalTypes";

import { baseApi } from "../../api/baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation<TBooking, Partial<TBooking>>({
      query: (bookingInfo) => ({
        url: `/bookings`,
        method: `POST`,
        body: bookingInfo,
      }),
      invalidatesTags: ["booking"], // Ensure tag matches exactly
    }),

    getAllBookings: builder.query<TResponseRedux<TBooking[]>, TQueryParam[]>({
      providesTags: ["booking"],
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `/bookings`,
          method: `GET`,
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TBooking[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    getMyBookings: builder.query<TBooking[], void>({
      providesTags: ["booking", "users"],
      query: () => ({
        url: `/bookings/my-bookings`,
        method: "GET",
      }),
    }),

    getUsersBooking: builder.query<TBooking[], void>({
      providesTags: ["booking"],
      query: () => ({
        url: `/bookings/my-bookings`, // Ensure it matches your route
        method: "GET",
      }),
    }),

    getSingleBooking: builder.query<TBooking, string>({
      providesTags: ["booking", "users"],
      query: (id) => ({
        url: `/bookings/${id}`, // Update to match the correct endpoint
        method: "GET",
      }),
    }),

    bookingApproval: builder.mutation<TBooking, string>({
      query: (bookingId) => ({
        url: `/bookings/${bookingId}/approve`,
        method: "PATCH",
      }),
      invalidatesTags: ["booking", "Single-booking"],
    }),

    updateStatusInApproved: builder.mutation({
      query: ({ id, status }) => ({
        url: `/bookings/change-booking-status/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["booking"],
    }),

    bookingCompletion: builder.mutation({
      query: (args) => ({
        url: `/bookings/complete/${args.id}`, // Adjust the endpoint if needed
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["booking"],
    }),

    cancelBooking: builder.mutation<TBooking, string>({
      query: (bookingId) => ({
        url: `/bookings/${bookingId}/cancel`, // Ensure this matches your route
        method: "PATCH",
      }),
      invalidatesTags: ["booking", "Single-booking"],
    }),

    returnBooking: builder.mutation<TBooking, string>({
      query: (bookingId) => ({
        url: `/bookings/${bookingId}/return`, // Ensure this matches your route
        method: "PATCH",
      }),
      invalidatesTags: ["booking", "Single-booking"],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetAllBookingsQuery,
  useGetMyBookingsQuery,
  useGetUsersBookingQuery,
  useGetSingleBookingQuery,
  useBookingApprovalMutation,
  useUpdateStatusInApprovedMutation,
  useBookingCompletionMutation,
  useCancelBookingMutation,
  useReturnBookingMutation,
} = bookingApi;

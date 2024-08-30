import { TCar } from "../../../dashboard/admin/Managements/CRUD/Modal/CreateCarModal";
import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCar: builder.mutation({
      query: (car: TCar) => ({
        url: "/cars",
        method: "POST",
        body: car,
      }),
      invalidatesTags: ["Cars"],
    }),

    getAllCars: builder.query({
      query: (query) => ({
        url: "/cars",
        method: "GET",
        params: query,
      }),
      providesTags: ["Cars"],
    }),

    getSingleCar: builder.query({
      query: (carId: string) => ({
        url: `/cars/${carId}`,
        method: "GET",
      }),
      providesTags: ["Single-car"],
    }),

    deleteCar: builder.mutation({
      query: (carId: string) => ({
        url: `/cars/${carId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cars"],
    }),

    updateCar: builder.mutation({
      query: ({ carId, payload }: { carId: string; payload: TCar }) => ({
        url: `/cars/${carId}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Cars", "Single-car"],
    }),

    returnCar: builder.mutation({
      query: (payload: { bookingId: string }) => ({
        url: `/api/cars/return`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Cars", "Bookings"],
    }),
  }),
});

export const {
  useCreateCarMutation,
  useGetAllCarsQuery,
  useUpdateCarMutation,
  useDeleteCarMutation,
  useGetSingleCarQuery,
  useReturnCarMutation,
} = productApi;

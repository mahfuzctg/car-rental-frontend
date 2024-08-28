import { baseApi } from "../api/baseApi";

const carApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCars: builder.query({
      query: () => ({
        url: "/cars",
        method: "GET",
      }),
      providesTags: ["cars"],
    }),
    getSingleCar: builder.query({
      query: (id) => ({
        url: `/cars/${id}`,
        method: "GET",
      }),
      providesTags: ["cars"],
    }),
    createCar: builder.mutation({
      query: (carData) => ({
        url: "/cars",
        method: "POST",
        body: carData,
      }),
      invalidatesTags: ["cars"],
    }),

    updateCar: builder.mutation({
      query: (carData) => ({
        url: `/cars/${carData.id}`,
        method: "PUT",
        body: carData.data,
      }),
      invalidatesTags: ["cars"],
    }),

    deleteCar: builder.mutation({
      query: (id) => ({
        url: `/cars/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["cars"],
    }),
  }),
});

export const {
  useGetAllCarsQuery,
  useGetSingleCarQuery,
  useCreateCarMutation,
  useUpdateCarMutation,
  useDeleteCarMutation,
} = carApi;

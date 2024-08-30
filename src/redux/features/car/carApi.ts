import { baseApi } from "../../api/baseApi";

const carApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCars: builder.query({
      query: (query) => {
        const params = new URLSearchParams();

        if (query?.searchValue) {
          params.append("searchValue", query.searchValue);
        }
        if (query?.carType) {
          params.append("carType", query.carType);
        }
        if (query?.minPrice) {
          params.append("minPrice", query.minPrice);
        }

        if (query?.maxPrice) {
          params.append("maxPrice", query.maxPrice);
        }

        return {
          url: `/cars?${params.toString()}`,
          method: "GET",
        };
      },
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

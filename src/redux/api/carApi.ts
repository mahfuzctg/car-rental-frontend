import { baseApi } from "./baseApi";

const carApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCars: builder.query<Car[], void>({
      query: () => ({
        url: "/cars",
        method: "GET",
      }),
      providesTags: ["cars"],
    }),
    getSingleCar: builder.query<Car, string>({
      query: (id) => ({
        url: `/cars/${id}`,
        method: "GET",
      }),
      providesTags: ["cars"],
    }),
    createCar: builder.mutation<void, Car>({
      query: (carData) => ({
        url: "/cars",
        method: "POST",
        body: carData,
      }),
      invalidatesTags: ["cars"],
    }),
    updateCar: builder.mutation<void, { id: string; data: Partial<Car> }>({
      query: ({ id, data }) => ({
        url: `/cars/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["cars"],
    }),
    deleteCar: builder.mutation<void, string>({
      query: (id) => ({
        url: `/cars/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["cars"],
    }),
  }),
  overrideExisting: false, // Optionally add this to control if endpoints should be overridden
});

export const {
  useGetAllCarsQuery,
  useGetSingleCarQuery,
  useCreateCarMutation,
  useUpdateCarMutation,
  useDeleteCarMutation,
} = carApi;

// Define Car type here or import if defined elsewhere
interface Car {
  _id: string;
  name: string;
  description: string;
  color: string;
  isElectric: boolean;
  features: string[];
  pricePerHour: number;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

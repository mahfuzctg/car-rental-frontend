import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all users
    getAllUsers: builder.query({
      query: () => `/users`, // Matches backend route for fetching all users
      providesTags: ["User"], // Cache management for "user"
    }),
    // Fetch specific user info by email
    getUserInfo: builder.query({
      query: () => `/user-info`, // Matches backend route for fetching user info
      providesTags: ["User"], // Cache management for "user"
    }),
    // Update user details
    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/users/update-user/${id}`, // Fix this path
        method: "PUT",
        body: data, // Send the correct payload
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserInfoQuery,
  useUpdateUserMutation,
} = userApi;

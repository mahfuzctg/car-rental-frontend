import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllUser: build.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      providesTags: ["users"], // Track users for caching and invalidation
    }),
    updateUser: build.mutation({
      query: (data) => ({
        url: `/users/${data?.id}`,
        method: "PUT",
        body: data?.userInfo,
      }),
      invalidatesTags: ["users"], // Invalidate user list after updating
    }),
    updateRole: build.mutation({
      query: (data) => ({
        url: `/users/${data?.id}/role`, // Ensure correct endpoint
        method: "PATCH",
        body: { role: data?.role }, // Sending updated role
      }),
      invalidatesTags: ["users"], // Invalidate user list after updating role
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"], // Invalidate user list after deletion
    }),
    updateUserStatus: build.mutation({
      query: (data) => ({
        url: `/users/${data?.id}/status`, // Ensure correct endpoint for status
        method: "PATCH",
        body: { isActive: data?.isActive }, // Sending updated status
      }),
      invalidatesTags: ["users"], // Invalidate user list after updating status
    }),
  }),
});

export const {
  useGetAllUserQuery,
  useUpdateUserMutation,
  useUpdateRoleMutation,
  useDeleteUserMutation,
  useUpdateUserStatusMutation, // Export the new hook
} = userApi;

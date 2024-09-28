import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Fetch all users (admin only)
    getAllUser: build.query({
      query: () => '/users',
      providesTags: ['users'],
    }),

    // Fetch user information by email (admin or user)
    getUserByEmail: build.query({
      query: (email) => `/users/user-info/${email}`,
      providesTags: ['users'],
    }),

    // Create a new user (admin only)
    createUser: build.mutation({
      query: (userData) => ({
        url: '/users',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['users'],
    }),

    // Update user information (admin can update any user, user can update their own info)
 
    updateUser: build.mutation({
      query: ({ id, userInfo }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body: userInfo,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'users', id }],
    }),

    // Update user role (admin only)
    updateRole: build.mutation({
      query: ({ id, role }) => ({
        url: `/users/${id}/role`,
        method: 'PATCH',
        body: { role },
      }),
      invalidatesTags: ['users'],
    }),

    // Update user status (admin only)
    updateUserStatus: build.mutation({
      query: ({ id, isActive }) => ({
        url: `/users/${id}/status`,
        method: 'PATCH',
        body: { isActive },
      }),
      invalidatesTags: ['users'],
    }),

    // Delete a user (admin only)
    deleteUser: build.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['users'],
    }),

    // Fetch user by ID (admin only)
    getUserByAdmin: build.query({
      query: (id) => `/users/${id}`,
      providesTags: ['users'],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetAllUserQuery,
  useGetUserByEmailQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useUpdateRoleMutation,
  useUpdateUserStatusMutation,
  useDeleteUserMutation,
  useGetUserByAdminQuery,
} = userApi;

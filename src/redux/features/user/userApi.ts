import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllUser: build.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      providesTags: ["users"],
    }),
    updateRole: build.mutation({
      query: (data) => {
        console.log("data from api", data.role);
        return {
          url: `/users/${data.id}`,
          method: "PATCH",
          body: { role: data.role },
        };
      },
      invalidatesTags: ["users"],
    }),

    deleteUser: build.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useGetAllUserQuery,
  useUpdateRoleMutation,
  useDeleteUserMutation,
} = userApi;

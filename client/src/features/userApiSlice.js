import { apiSlice } from "../app/api/apiSlice";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (user) => ({
        url: "/auth/generate-account",
        method: "POST",
        body: { ...user },
      }),
    }),
    getUsers: builder.query({
      query: (query) => ({
        url: `/get-users?q=${query}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    getUser: builder.query({
      query: (id) => ({
        url: `/get-user/${id}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: ({ id, ...user }) => ({
        url: `/update-user/${id}`,
        method: "PATCH",
        body: { ...user },
      }),
      invalidatesTags: ["User"],
    }),
    updateUserRole: builder.mutation({
      query: (query) => ({
        url: `/update-user-role/${query.id}`,
        method: "PATCH",
        body: { role: query.role },
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/delete-user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useGetUsersQuery,
  useGetUserQuery,
  useUpdateUserMutation,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
} = userApiSlice;

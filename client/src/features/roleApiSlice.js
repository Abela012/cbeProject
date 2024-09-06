import { apiSlice } from "../app/api/apiSlice";

export const roleApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRoles: builder.query({
      query: (query) => ({
        url: `/get-roles?q=${query}`,
        method: "GET",
      }),
      providesTags: ["Role"],
    }),
    getRole: builder.query({
      query: (id) => ({
        url: `/get-role/${id}`,
        method: "GET",
      }),
      providesTags: ["Role"],
    }),
    createRole: builder.mutation({
      query: (role) => ({
        url: "create-role",
        method: "POST",
        body: { ...role },
      }),
      invalidatesTags: ["Role"],
    }),
    updateRole: builder.mutation({
      query: ({ id, roleName, roleType }) => ({
        url: `update-role/${id}`,
        method: "PATCH",
        body: { roleName, roleType },
      }),
      invalidatesTags: ["Role"],
    }),
    deleteRole: builder.mutation({
      query: (id) => ({
        url: `delete-role/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Role"],
    }),
  }),
});

export const {
  useGetRolesQuery,
  useGetRoleQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
} = roleApiSlice;

import { apiSlice } from "../app/api/apiSlice";

export const officeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOffices: builder.query({
      query: (query) => ({
        url: `/get-offices?q=${query}`,
        method: "GET",
      }),
      providesTags: ["Office"],
    }),
    getOffice: builder.query({
      query: (id) => ({
        url: `/get-office/${id}`,
        method: "GET",
      }),
      providesTags: ["Office"],
    }),
    createOffice: builder.mutation({
      query: (officeName) => ({
        url: "/create-office",
        method: "POST",
        body: { ...officeName },
      }),
      invalidatesTags: ["Office"],
    }),
    updateOffice: builder.mutation({
      query: ({ id, officeName }) => ({
        url: `/update-office/${id}`,
        method: "PATCH",
        body: { officeName },
      }),
      invalidatesTags: ["Office"],
    }),
    deleteOffice: builder.mutation({
      query: (id) => ({
        url: `/delete-office/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Office"],
    }),
  }),
});

export const {
  useGetOfficesQuery,
  useGetOfficeQuery,
  useCreateOfficeMutation,
  useUpdateOfficeMutation,
  useDeleteOfficeMutation,
} = officeApiSlice;

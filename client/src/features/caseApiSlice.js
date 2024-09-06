import { apiSlice } from "../app/api/apiSlice";

export const caseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCase: builder.mutation({
      query: (newCase) => ({
        url: "/create-case",
        method: "POST",
        body: { ...newCase },
      }),
      invalidatesTags: ["Case"],
    }),
    getCases: builder.query({
      query: (query) => ({
        url: `/get-cases/${query.officeId}?q=${query.searchTerm}`,
        method: "GET",
      }),
      providesTags: ["Case"],
    }),
    getCase: builder.query({
      query: (query) => ({
        url: `/get-case/${query}`,
        method: "GET",
      }),
      providesTags: ["Case"],
    }),
    updateCase: builder.mutation({
      query: (query) => ({
        url: `/update-case/${query.id}`,
        method: "PATCH",
        body: { ...query },
      }),
      invalidatesTags: ["Case"],
    }),
    updateCaseStatus: builder.mutation({
      query: (query) => ({
        url: `/update-case-status/${query.id}`,
        method: "PATCH",
        body: { status: query.status },
      }),
    }),
    deleteCase: builder.mutation({
      query: (query) => ({
        url: `/delete-case/${query}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Case"],
    }),
  }),
});

export const {
  useCreateCaseMutation,
  useGetCasesQuery,
  useGetCaseQuery,
  useUpdateCaseMutation,
  useUpdateCaseStatusMutation,
  useDeleteCaseMutation,
} = caseApiSlice;

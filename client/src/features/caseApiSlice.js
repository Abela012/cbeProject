import { apiSlice } from "../app/api/apiSlice";

export const caseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCase: builder.mutation({
      query: (newCase) => ({
        url: "/create-case",
        method: "POST",
        body: { ...newCase },
      }),
    }),
    getCases: builder.mutation({
      query: (query) => ({
        url: `/get-cases?q=${query}`,
        method: "GET",
      }),
      invalidatesTags: ["Case"],
    }),
    getCase: builder.mutation({
      query: (query) => ({
        url: `/get-case/${query}`,
        method: "GET",
      }),
    }),
    updateCase: builder.mutation({
      query: (query) => ({
        url: `/update-case/${query}`,
        method: "PATCH",
      }),
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
    }),
  }),
});

export const {
  useCreateCaseMutation,
  useGetCasesMutation,
  useGetCaseMutation,
  useUpdateCaseMutation,
  useUpdateCaseStatusMutation,
  useDeleteCaseMutation,
} = caseApiSlice;

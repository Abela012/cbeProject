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
    assigneCase: builder.mutation({
      query: (query) => ({
        url: `/assigne-case/${query.caseId}/${query.officeId}`,
        method: "PATCH",
      }),
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
  useAssigneCaseMutation,
  useUpdateCaseMutation,
  useUpdateCaseStatusMutation,
  useDeleteCaseMutation,
} = caseApiSlice;

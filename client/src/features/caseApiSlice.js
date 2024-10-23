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
    getCaseStati: builder.query({
      query: () => ({
        url: "/get-case-stati",
        method: "GET",
      }),
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
    getCaseTask: builder.query({
      query: (query) => ({
        url: `/get-case-task/${query.caseId}/${query.officeId}`,
        method: "GET",
      }),
      providesTags: ["Case"],
    }),
    assigneCase: builder.mutation({
      query: (query) => ({
        url: `/assigne-case/${query.caseId}`,
        method: "PATCH",
        body: { ...query.newAssignment },
      }),
      invalidatesTags: ["Case"],
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
    updateCasePriority: builder.mutation({
      query: (query) => ({
        url: `/update-case-priority/${query.id}`,
        method: "PATCH",
        body: { priority: query.priority },
      }),
      invalidatesTags: ["Case"],
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
  useGetCaseStatiQuery,
  useGetCasesQuery,
  useGetCaseQuery,
  useGetCaseTaskQuery,
  useAssigneCaseMutation,
  useUpdateCaseMutation,
  useUpdateCaseStatusMutation,
  useUpdateCasePriorityMutation,
  useDeleteCaseMutation,
} = caseApiSlice;

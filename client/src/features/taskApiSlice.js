import { apiSlice } from "../app/api/apiSlice";

export const taskApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: (query) => ({
        url: `/get-tasks/${query.officeId}`,
        method: "GET",
      }),
    }),
    getTaskFollowUp: builder.query({
      query: (query) => ({
        url: `/get-task-follow-up/${query.caseId}/${query.officeId}`,
        method: "GET",
      }),
      providesTags: ["FollowUp"],
    }),
    sendMessage: builder.mutation({
      query: (query) => ({
        url: "/send-follow-up-message",
        method: "POST",
        body: { ...query },
      }),
      invalidatesTags: ["FollowUp"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTaskFollowUpQuery,
  useSendMessageMutation,
} = taskApiSlice;

import { apiSlice } from "../app/api/apiSlice";

export const scheduleSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSchedule: builder.mutation({
      query: (schedule) => ({
        url: "/creat-schedule",
        method: "POST",
        body: { ...schedule },
      }),
      invalidatesTags: ["Schedule"],
    }),
    getScheduleList: builder.query({
      query: (query) => ({
        url: `/get-schedule-list/${query.officeId}`,
        method: "GET",
      }),
      providesTags: ["Schedule"],
    }),
    getSchedule: builder.query({
      query: (query) => ({
        url: `/get-schedule/${query}`,
        method: "GET",
      }),
      providesTags: ["Schedule"],
    }),
    getScheduleList: builder.query({
      query: (query) => ({
        url: `/get-schedule-list/${query.officeId}`,
        method: "GET",
      }),
      providesTags: ["Schedule"],
    }),
    updateSchedule: builder.mutation({
      query: (id) => ({
        url: `/update-schedule/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Schedule"],
    }),
    deleteSchedule: builder.mutation({
      query: (id) => ({
        url: `/delete-schedule/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Schedule"],
    }),
  }),
});

export const {
  useCreateScheduleMutation,
  useGetScheduleListQuery,
  useGetScheduleQuery,
  useUpdateScheduleMutation,
  useDeleteScheduleMutation,
} = scheduleSlice;

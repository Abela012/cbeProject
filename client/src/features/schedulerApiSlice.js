import { apiSlice } from "../app/api/apiSlice";

export const scheduleSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSchedule: builder.mutation({
      query: (schedule) => ({
        url: "/creat-schedule",
        method: "POST",
        body: { ...schedule },
      }),
      invalidatesTags: ["Schedule", "Appointment"],
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
    getUpcomingScheduleList: builder.query({
      query: (query) => ({
        url: `/get-upcoming-schedule-list/${query.officeId}`,
        method: "GET",
      }),
      providesTags: ["Schedule"],
    }),
    updateSchedule: builder.mutation({
      query: ({ id, ...schedule }) => ({
        url: `/update-schedule/${id}`,
        method: "PATCH",
        body: { ...schedule },
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
  useGetUpcomingScheduleListQuery,
  useGetScheduleQuery,
  useUpdateScheduleMutation,
  useDeleteScheduleMutation,
} = scheduleSlice;

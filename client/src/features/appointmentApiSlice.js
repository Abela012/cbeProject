import { apiSlice } from "../app/api/apiSlice";

export const appointmentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createAppointment: builder.mutation({
      query: (appointment) => ({
        url: "/create-appointment",
        method: "POST",
        body: appointment,
      }),
      invalidatesTags: ["Appointment"],
    }),
    getAppointments: builder.query({
      query: (query) => ({
        url: `/get-appointments/${query.officeId}?q=${query.searchTerm}`,
        method: "GET",
      }),
      providesTags: ["Appointment"],
    }),
    getAppointment: builder.query({
      query: (id) => ({
        url: `/get-appointment/${id}`,
        method: "GET",
      }),
      providesTags: ["Appointment"],
    }),
    getAppointmentFile: builder.mutation({
      query: ({ id }) => ({
        url: `/view-file/${id}`,
        method: "GET",
      }),
      providesTags: ["Appointment"],
    }),
    updateAppointment: builder.mutation({
      query: ({ id, ...appointment }) => ({
        url: `/update-appointment/${id}`,
        method: "PATCH",
        body: { ...appointment },
      }),
      invalidatesTags: ["Appointment"],
    }),
    updateAppointmentStatus: builder.mutation({
      query: (query) => ({
        url: `/update-appointment-status/${query.id}`,
        method: "PATCH",
        body: { status: query.status },
      }),
    }),
    deleteAppointment: builder.mutation({
      query: (id) => ({
        url: `/delete-appointments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Appointment"],
    }),
  }),
});

export const {
  useCreateAppointmentMutation,
  useGetAppointmentsQuery,
  useGetAppointmentQuery,
  useGetAppointmentFileMutation,
  useUpdateAppointmentMutation,
  useUpdateAppointmentStatusMutation,
  useDeleteAppointmentMutation,
} = appointmentApiSlice;

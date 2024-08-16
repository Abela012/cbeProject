import { apiSlice } from "../app/api/apiSlice";

const appointmentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createAppointment: builder.mutation({
      query: (appointment) => ({
        url: "/create-appointment",
        method: "POST",
        body: { ...appointment },
      }),
    }),
    getAppointments: builder.mutation({
      query: (query) => ({
        url: `/get-appointments?q=${query}`,
        method: "GET",
      }),
    }),
    getAppointment: builder.mutation({
      query: (id) => ({
        url: `/get-appointment/${id}`,
        method: "GET",
      }),
    }),
    updateAppointment: builder.mutation({
      query: ({ id, appointment }) => ({
        url: `/update-appointment/${id}`,
        method: "PATCH",
        body: { ...appointment },
      }),
    }),
    deleteAppointment: builder.mutation({
      query: (id) => ({
        url: `/delete-appointments/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateAppointmentMutation,
  useGetAppointmentsMutation,
  useGetAppointmentMutation,
  useUpdateAppointmentMutation,
  useDeleteAppointmentMutation,
} = appointmentApiSlice;

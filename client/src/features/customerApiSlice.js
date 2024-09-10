import { apiSlice } from "../app/api/apiSlice";

export const customerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCustomer: builder.mutation({
      query: ({ query }) => ({
        url: `/get-customer?q=${query}`,
        method: "GET",
      }),
    }),
    registerCustomer: builder.mutation({
      query: (formData) => ({
        url: "/customer-registration",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useGetCustomerMutation, useRegisterCustomerMutation } =
  customerApiSlice;

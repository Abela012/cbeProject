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
      query: (customer) => ({
        url: "/customer-registration",
        method: "POST",
        body: { ...customer },
      }),
    }),
  }),
});

export const { useGetCustomerMutation, useRegisterCustomerMutation } =
  customerApiSlice;

import { apiSlice } from "../app/api/apiSlice";

export const customerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCustomer: builder.mutation({
      query: ({ query }) => ({
        url: `/get-customer?q=${query}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetCustomerMutation } = customerApiSlice;

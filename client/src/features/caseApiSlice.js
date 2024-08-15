import { apiSlice } from "../app/api/apiSlice";

export const caseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCase: builder.mutation({
      query: (newCase) => ({
        url: "/create-case",
        method: "POST",
        body: { ...newCase },
      }),
    }),
    getCase: builder.mutation({
      query: ({ query }) => ({
        url: `/get-cases?q=${query}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateCaseMutation, useGetCaseMutation } = caseApiSlice;

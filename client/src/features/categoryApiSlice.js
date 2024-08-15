import { apiSlice } from "../app/api/apiSlice";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.mutation({
      query: () => ({
        url: "/get-categories",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetCategoriesMutation } = categoryApiSlice;

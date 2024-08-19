import { apiSlice } from "../app/api/apiSlice";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (user) => ({
        url: "/auth/generate-account",
        method: "POST",
        body: { ...user },
      }),
    }),
  }),
});

export const { useCreateUserMutation } = userApiSlice;

import { apiSlice } from "../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "GET",
      }),
    }),
    refreshToken: builder.query({
      query: () => ({
        url: "/auth/refresh-token",
        method: "GET",
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useRefreshTokenQuery } =
  authApiSlice;

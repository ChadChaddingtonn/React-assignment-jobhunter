import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3030/",
  }),
  endpoints: (build) => ({
    login: build.mutation({
      query: (body) => ({
        url: "authentication",
        method: "POST",
        body,
      }),
    }),

    register: build.mutation({
      query: (body) => ({
        url: "users",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;

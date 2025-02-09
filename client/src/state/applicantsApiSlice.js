import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const applicantsApiSlice = createApi({
  reducerPath: "applicantsApiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3030/applicants",
    prepareHeaders: (header, { getState }) => {
      const token = getState().auth.accessToken;

      if (token) {
        header.set("authorization", `Bearer ${token}`);
      }

      return header;
    },
  }),
  tagTypes: ["Applicants"],
  endpoints: (builder) => ({
    getApplicantsByJob: builder.query({
      query: (id) => `?jobId=${id}`,
      providesTags: ["Applicants"],
    }),
    getApplicantsByUser: builder.query({
      query: (id) => `?userId=${id}`,
    }),
    applyForJob: builder.mutation({
      query: (body) => ({
        method: "POST",
        body,
      }),
    }),
    deleteApplication: builder.mutation({
      query: (id) => ({
        url: `?jobId=${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetApplicantsByJobQuery,
  useGetApplicantsByUserQuery,
  useApplyForJobMutation,
  useDeleteApplicationMutation,
} = applicantsApiSlice;

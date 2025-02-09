import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jobApiSlice = createApi({
  reducerPath: "jobApiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3030/jobs",
    prepareHeaders: (header, { getState }) => {
      const token = getState().auth.accessToken;

      if (token) {
        header.set("authorization", `Bearer ${token}`);
      }

      return header;
    },
  }),
  tagTypes: ["Jobs"],
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: () => "",
      transformResponse: (result) => result.data,
      providesTags: ["Jobs"],
    }),
    createJob: builder.mutation({
      query: (body) => ({
        method: "POST",
        body,
      }),
      invalidatesTags: ["Jobs"],
    }),
    getJob: builder.query({
      query: (id) => `/${id}`,
    }),
    getFilteredJobs: builder.query({
      query: ({
        company,
        salaryFrom,
        salaryTo,
        type,
        location,
        homeOffice,
      }) => {
        let returnQuery = "?";

        returnQuery += company ? `company[$like]=%${company}%` : "";

        if (salaryFrom !== "") {
          returnQuery +=
            returnQuery === "?"
              ? `salaryFrom[$gte]=${salaryFrom}`
              : `&salaryFrom[$gte]=${salaryFrom}`;
        }

        if (salaryTo !== "") {
          returnQuery +=
            returnQuery === "?"
              ? `salaryTo[$lte]=${salaryTo}`
              : `&salaryTo[$lte]=${salaryTo}`;
        }

        if (type !== "") {
          returnQuery += returnQuery === "?" ? `type=${type}` : `&type=${type}`;
        }

        if (location !== "") {
          returnQuery +=
            returnQuery === "?" ? `city=${location}` : `&city=${location}`;
        }

        if (homeOffice !== "") {
          returnQuery +=
            returnQuery === "?"
              ? `homeOffice=${homeOffice}`
              : `&homeOffice=${homeOffice}`;
        }

        return returnQuery;
      },
      transformResponse: (result) => result.data,
    }),
    getJobByUserId: builder.query({
      query: (id) => `?userId=${id}`,
      transformResponse: (result) => result.data,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Jobs", id })),
              { type: "Jobs", id: "LIST" },
            ]
          : [{ type: "Jobs", id: "LIST" }],
    }),
    modifyJob: builder.mutation({
      query: ({ id, body }) => ({
        url: `${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Jobs", id }],
    }),
    deleteJob: builder.mutation({
      query: (id) => ({
        url: `${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Jobs", id }],
    }),
  }),
});

export const {
  useGetJobByUserIdQuery,
  useGetFilteredJobsQuery,
  useGetJobQuery,
  useGetJobsQuery,
  useCreateJobMutation,
  useDeleteJobMutation,
  useModifyJobMutation,
} = jobApiSlice;

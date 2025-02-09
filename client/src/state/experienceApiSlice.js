import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const experienceApiSlice = createApi({
  reducerPath: "experienceApiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3030/experiences",
    prepareHeaders: (header, { getState }) => {
      const token = getState().auth.accessToken;

      if (token) {
        header.set("authorization", `Bearer ${token}`);
      }

      return header;
    },
  }),
  tagTypes: ["Experiences"],
  endpoints: (builder) => ({
    getExperiences: builder.query({
      query: () => "",
      transformResponse: (result) => result.data,
      providesTags: ["Experiences"],
    }),
    createExperience: builder.mutation({
      query: (body) => ({
        method: "POST",
        body,
      }),
      invalidatesTags: ["Experiences"],
    }),
    modifyExperience: builder.mutation({
      query: ({ id, body }) => ({
        url: `/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Experiences"],
    }),
    deleteExperience: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Experiences"],
    }),
  }),
});

export const {
  useGetExperiencesQuery,
  useCreateExperienceMutation,
  useModifyExperienceMutation,
  useDeleteExperienceMutation,
} = experienceApiSlice;

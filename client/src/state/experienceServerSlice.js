import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const experienceServerSlice = createSlice({
  name: "experienceServer",
  initialState: {
    data: [],
    isSuccess: false,
    isLoading: false,
    isError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadExperiencesApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadExperiencesApi.rejected, (state) => {
        state.isError = true;
      })
      .addCase(loadExperiencesApi.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isSuccess = true;
      });
  },
});

export const loadExperiencesApi = createAsyncThunk("jobs/all", async () => {
  const response = await fetch("http://localhost:3030/jobs");

  const data = await response.json();

  return data.data;
});

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const jobServerSlice = createSlice({
  name: "jobServer",
  initialState: {
    data: [],
    isSuccess: false,
    isLoading: false,
    isError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadJobsApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadJobsApi.rejected, (state) => {
        state.isError = true;
      })
      .addCase(loadJobsApi.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isSuccess = true;
      });
  },
});

export const loadJobsApi = createAsyncThunk("jobs/all", async () => {
  const response = await fetch("http://localhost:3030/jobs");

  const data = await response.json();

  return data.data;
});

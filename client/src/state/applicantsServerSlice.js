import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const applicantsServerSlice = createSlice({
  name: "applicantsServer",
  initialState: {
    data: [],
    isSuccess: false,
    isLoading: false,
    isError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadApplicantsApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadApplicantsApi.rejected, (state) => {
        state.isError = true;
      })
      .addCase(loadApplicantsApi.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isSuccess = true;
      });
  },
});

export const loadApplicantsApi = createAsyncThunk(
  "applicants/all",
  async () => {
    const response = await fetch("http://localhost:3030/applicants");

    const data = await response.json();

    return data.data;
  }
);

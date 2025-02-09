import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { authApi } from "./authApiSlice";
import { jobServerSlice } from "./jobServerSlice";
import { jobApiSlice } from "./jobApiSlice";
import { experienceServerSlice } from "./experienceServerSlice";
import { experienceApiSlice } from "./experienceApiSlice";
import { applicantsServerSlice } from "./applicantsServerSlice";
import { applicantsApiSlice } from "./applicantsApiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [jobServerSlice.name]: jobServerSlice.reducer,
    [jobApiSlice.reducerPath]: jobApiSlice.reducer,
    [experienceServerSlice.name]: experienceServerSlice.reducer,
    [experienceApiSlice.reducerPath]: experienceApiSlice.reducer,
    [applicantsServerSlice.name]: applicantsServerSlice.reducer,
    [applicantsApiSlice.reducerPath]: applicantsApiSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(jobApiSlice.middleware)
      .concat(experienceApiSlice.middleware)
      .concat(applicantsApiSlice.middleware)
      .concat(authApi.middleware),
});

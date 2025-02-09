import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  email: null,
  fullname: null,
  role: null,
  accessToken: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, { payload }) {
      state.id = payload.id;
      state.email = payload.email;
      state.fullname = payload.fullname;
      state.role = payload.role;
      state.accessToken = payload.accessToken;
    },

    logout() {
      return initialState;
    },
  },
});

export const authReducer = authSlice.reducer;

export const selectUserId = (state) => state.auth.id;
export const selectUserRole = (state) => state.auth.role;
export const selectUserName = (state) => state.auth.fullname;
export const selectUserEmail = (state) => state.auth.email;
export const selectUserPassword = (state) => state.auth.password;
export const selectIsAuthenticated = (state) => state.auth.accessToken != null;

export const { login, logout } = authSlice.actions;

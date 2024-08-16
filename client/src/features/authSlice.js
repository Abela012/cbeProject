import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const initialState = {
  status: "idle",
  user: null,
  token: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = jwtDecode(action.payload.data);
      state.token = action.payload.data;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export const getCurrentUser = (state) => state.auth.user;
export const getCurrentToken = (state) => state.auth.token;

export default authSlice.reducer;

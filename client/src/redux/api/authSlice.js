import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    admin: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
    setAdmin: (state, action) => {
      state.admin = action.payload;
      state.token = action.payload.token;
    },
    logoutAsAdmin: (state) => {
      state.admin = null;
      state.token = null;
    },
  },
});
export const { setUser, logout, setAdmin, logoutAsAdmin } = authSlice.actions;

export default authSlice.reducer;

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { initialState } from "./constants";
import { getCaptchaThunk, userAuthThunk } from "./authThunk";

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state) => {
      state.isAuth = true;
    },
    logOutUser: (state) => {
      state.isAuth = false;
    },
    setAuthErrors: (state, action: PayloadAction<string>) => {
      state.errors = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload.id;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCaptchaThunk.fulfilled, (state, action) => {
        state.captcha = action.payload.url;
      })
      .addCase(userAuthThunk.fulfilled, (state, action) => {
        state.userId = action.payload.id;
        state.login = action.payload.login;
        state.isAuth = true;
      });
  },
});

export default authSlice.reducer;
export const { loginUser, logOutUser, setAuthErrors, setUserId } =
  authSlice.actions;

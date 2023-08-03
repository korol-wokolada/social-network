import { createAsyncThunk } from "@reduxjs/toolkit";
import { Login } from "./types";
import {
  checkIsUserRegistrationExistRequest,
  getCaptchaRequest,
  userLoginRequest,
} from "../../api/authApi";
import { loginUser, setAuthErrors, setUserId } from "./authSlice";

export const loginThunk = createAsyncThunk(
  "auth/loginThunk",
  async (loginobj: Login, { dispatch }) => {
    let data = await userLoginRequest(loginobj).then((res) => {
      return res.data;
    });

    if (data.resultCode === 0) {
      dispatch(userAuthThunk());
    }

    if (data.resultCode === 10) {
      dispatch(getCaptchaThunk());
      dispatch(setAuthErrors(data.messages));
    }

    if (data.resultCode === 1) {
      dispatch(setAuthErrors(data.messages));
    }

    return;
  }
);

export const userAuthThunk = createAsyncThunk(
  "auth/authThunk",
  async (__, { dispatch }) => {
    let data = await checkIsUserRegistrationExistRequest().then(
      (res) => res.data
    );

    if (data.id) {
      dispatch(loginUser());
      dispatch(setUserId(data));

      return data;
    }

    return data;
  }
);

export const getCaptchaThunk = createAsyncThunk("auth/getCaptchathunk", () => {
  let data = getCaptchaRequest();
  return data;
});

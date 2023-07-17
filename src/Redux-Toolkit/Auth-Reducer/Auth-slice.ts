import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCaptcha, login, me } from "../../API/AuthApi";
import { act } from "react-dom/test-utils";

let initialState = {
  userId: null as number | null,
  login: null as string | null,
  isAuth: false,
  errors: undefined as string | undefined,
  captcha: undefined as string | undefined,
  isLoading: false,
};

export type Login = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: null | string;
};
export const loginThunk = createAsyncThunk(
  "auth/loginThunk",
  async (loginobj: Login, { dispatch }) => {
    let data = await login(loginobj).then((res) => {
      return res.data;
    });
    if (data.resultCode === 0) {
      dispatch(authThunk());
    }
    if (data.resultCode === 10) {
      dispatch(getCaptchaThunk());
      dispatch(wrongPussword(data.messages));
    }
    if (data.resultCode === 1) {
      dispatch(wrongPussword(data.messages));
    }
    return;
  }
);

export const authThunk = createAsyncThunk(
  "auth/authThunk",
  async (__, { dispatch }) => {
    let data = await me().then((res) => res.data);
    if (data.id) {
      dispatch(loginUser());
      dispatch(setUserId(data));

      return data;
    }
    console.log(data);
    return data;
  }
);

export const getCaptchaThunk = createAsyncThunk("auth/getCaptchathunk", () => {
  let data = getCaptcha();
  return data;
});

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
    wrongPussword: (state, action: PayloadAction<string>) => {
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
      .addCase(authThunk.fulfilled, (state, action) => {
        state.userId = action.payload.id;
        state.login = action.payload.login;
        state.isAuth = true;
      });
  },
});

export default authSlice.reducer;
export const { loginUser, logOutUser, wrongPussword, setUserId } =
  authSlice.actions;

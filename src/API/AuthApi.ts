import { Login } from "../store/authSlice/types";
import { instance } from "./apiSettings";

export async function checkIsUserRegistrationExistRequest() {
  return instance.get("/auth/me").then((response) => response.data);
}

export function userLoginRequest({
  email,
  password,
  rememberMe = false,
  captcha = null,
}: Login) {
  return instance.post("/auth/login", {
    email,
    password,
    rememberMe,
    captcha,
  });
}

export function userLogoutRequest() {
  return instance.delete("/auth/login");
}

export async function getCaptchaRequest() {
  const res = await instance.get(`security/get-captcha-url`);

  return res.data;
}

import { Login } from "../Redux-Toolkit/Auth-Reducer/Auth-slice";
import { instance } from "./ApiSettings";

export async function me() {
  return instance.get("/auth/me").then((response) => response.data);
}

export function login({
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

export function logout() {
  return instance.delete("/auth/login");
}

export async function getCaptcha() {
  const res = await instance.get(`security/get-captcha-url`);
  console.log(res);
  return res.data;
}

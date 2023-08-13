import { samuraiJsApi } from "../../api/apiSettings";
import { Login } from "./types";

export const userAuthRequests = samuraiJsApi.injectEndpoints({
  endpoints: (build) => ({
    checkIsUserRegistrationExistRequest: build.query({
      query: () => "/auth/me",
    }),

    userLoginRequest: build.mutation({
      query: (payload: Login) => ({
        url: "auth/login",
        method: "POST",
        body: payload,
      }),
    }),

    userLogoutRequest: build.query({
      query: () => ({
        url: "auth/login",
        method: "DELETE",
      }),
    }),

    getCaptchaRequest: build.query({
      query: () => "security/get-captcha-url",
    }),
  }),
  overrideExisting: false,
});

export const {
  useCheckIsUserRegistrationExistRequestQuery,
  useUserLoginRequestMutation,
  useUserLogoutRequestQuery,
  useGetCaptchaRequestQuery,
} = userAuthRequests;

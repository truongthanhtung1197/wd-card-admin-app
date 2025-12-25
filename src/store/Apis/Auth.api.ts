import { EditUserRequestBody, Role, User } from "@/model";
import { Admin } from "@/model/Admin.mode";
import { RootState } from "@/store";
import {
  ChangePasswordRequest,
  ChangePasswordResponse,
  ForgotPasswordRequest,
  LoginRequest,
  LoginResponse,
  ResetPasswordRequest,
  ValidateLoginOTPRequest,
  ValidateLoginOTPResponse,
} from "@/store/Apis/Api.type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { AuthActions } from "../Auth";

import Cookies from "js-cookie";

export const baseQuery = fetchBaseQuery({
  baseUrl:
    process.env.NEXT_PUBLIC_API_URL + "/" + process.env.NEXT_PUBLIC_API_PREFIX,
  prepareHeaders: (headers, { getState }) => {
    const token =
      (getState() as RootState).auth.accessToken || Cookies.get("accessToken");

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth = async (
  args: any,
  api: any,
  extraOptions: any,
) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    Cookies.remove("role");
    api.dispatch(AuthActions.logout());
  }
  return result;
};
// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation<any, any>({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
    }),

    validateLoginOTP: builder.mutation<
      ValidateLoginOTPResponse,
      ValidateLoginOTPRequest
    >({
      query: (credentials) => ({
        url: "/user/login/otp/email/validation",
        method: "POST",
        body: credentials,
      }),
    }),
    resendOTP: builder.mutation<boolean, { email: string }>({
      query: (credentials) => ({
        url: "/user/login/otp/email/resend",
        method: "POST",
        body: credentials,
      }),
    }),
    forgotPassword: builder.mutation<boolean, ForgotPasswordRequest>({
      query: (credentials) => ({
        url: "/user/forgot-password/otp/email",
        method: "POST",
        body: credentials,
      }),
    }),
    forgotPasswordResend: builder.mutation<boolean, ForgotPasswordRequest>({
      query: (credentials) => ({
        url: "/user/forgot-password/otp/email/resend",
        method: "POST",
        body: credentials,
      }),
    }),
    resetPassword: builder.mutation<boolean, ResetPasswordRequest>({
      query: (credentials) => ({
        url: "/user/reset-password",
        method: "POST",
        body: credentials,
      }),
    }),

    changePassword: builder.mutation<
      ChangePasswordResponse,
      ChangePasswordRequest
    >({
      query: (credentials) => ({
        url: "/users/change-password",
        method: "PATCH",
        body: credentials,
      }),
    }),
    updateUserById: builder.mutation<User, Partial<EditUserRequestBody>>({
      query: (credentials) => ({
        url: "/user",
        method: "PATCH",
        body: credentials,
      }),
    }),

    // ------------------69 vn ------------------
    getMe: builder.query<Admin, {}>({
      query: () => {
        return "/auth/me";
      },
    }),

    getRolesList: builder.query<Role, {}>({
      query: () => {
        return "/roles";
      },
    }),

    getPendingPayment: builder.query<any, any>({
      query: () => {
        return `/users/partner/pending-payment`;
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useValidateLoginOTPMutation,
  useResendOTPMutation,
  useForgotPasswordMutation,
  useForgotPasswordResendMutation,
  useGetMeQuery,
  useLazyGetMeQuery,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useUpdateUserByIdMutation,
  useGetRolesListQuery,
  useGetPendingPaymentQuery,
} = apiSlice;

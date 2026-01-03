import { GetListResponse, User69vn } from "@/model";
import { Admin, AdminResponse, CreateAdmin, Role } from "@/model/Admin.mode";
import { createApi } from "@reduxjs/toolkit/query/react";

import { covertObjectToSearchParams } from "./Api.util";
import { baseQueryWithReauth } from "./Auth.api";
// Define a service using a base URL and expected endpoints
export const adminSlice = createApi({
  reducerPath: "admin",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getAdminById: builder.query<any, string>({
      query: (id) => {
        return {
          url: "/users/" + id,
        };
      },
    }),

    getAdmins: builder.query<
      GetListResponse<User69vn>,
      {
        page: number;
        limit: number;
        roles?: string[];
        search?: string;
        sortBy?: string;
        sortOrder?: string;
      }
    >({
      query: (params) => {
        return `/users?${covertObjectToSearchParams(params)}`;
      },
    }),

    getLeaders: builder.query<
      GetListResponse<Admin>,
      {
        page: number;
        limit: number;
      }
    >({
      query: (params) => {
        return `/admin/leaders?${covertObjectToSearchParams(params)}`;
      },
    }),

    getStaffs: builder.query<
      GetListResponse<Admin>,
      {
        page: number;
        limit: number;
      }
    >({
      query: (params) => {
        return `/admin/staffs?${covertObjectToSearchParams(params)}`;
      },
    }),

    createAdmin: builder.mutation<Admin, CreateAdmin>({
      query: (admin) => {
        return {
          url: "/users",
          method: "POST",
          body: admin,
        };
      },
    }),

    deleteAdminById: builder.mutation<any, number>({
      query: (adminId: number) => ({
        url: "/users/" + adminId,
        method: "DELETE",
      }),
    }),
    editAdminById: builder.mutation<
      AdminResponse,
      { id: string; data: CreateAdmin }
    >({
      query: ({ id, data }) => {
        return {
          url: "/users/" + id,
          method: "PATCH",
          body: data,
        };
      },
    }),
    getRoles: builder.query<GetListResponse<Role>, void>({
      query: () => {
        return {
          url: "/roles",
        };
      },
    }),
    deletePartnerById: builder.mutation<any, number>({
      query: (partnerId: number) => ({
        url: "/users/partner/" + partnerId,
        method: "DELETE",
      }),
    }),

    setPassword: builder.mutation<any, { email: string; newPassword: string }>({
      query: (body) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: body,
      }),
    }),
    // /auth/reset-password
  }),
});

export const {
  useSetPasswordMutation,
  useGetAdminByIdQuery,
  useGetAdminsQuery,
  useCreateAdminMutation,
  useDeleteAdminByIdMutation,
  useEditAdminByIdMutation,
  useGetLeadersQuery,
  useGetStaffsQuery,
  useGetRolesQuery,
  useDeletePartnerByIdMutation,
} = adminSlice;

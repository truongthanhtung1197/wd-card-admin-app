import { GetListResponse, Player, User, User69vn } from "@/model";
import { Admin } from "@/model/Admin.mode";
import { Statistic } from "@/model/Statictics.model";
import { createApi } from "@reduxjs/toolkit/query/react";

import { covertObjectToSearchParams } from "./Api.util";
import { baseQueryWithReauth } from "./Auth.api";

// Define a service using a base URL and expected endpoints
export const userSlice = createApi({
  reducerPath: "user",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getUserById: builder.query<User69vn, string>({
      query: (id) => {
        return {
          url: "/user/" + id,
        };
      },
    }),

    getUsers: builder.query<
      GetListResponse<User69vn>,
      {
        page: number;
        limit: number;
        search?: string;
      }
    >({
      query: (params) => {
        return `/user?${covertObjectToSearchParams(params)}`;
      },
    }),

    deleteUserById: builder.mutation<any, string>({
      query: (userId: string) => ({
        url: "/user/" + userId,
        method: "DELETE",
      }),
    }),
    editUserById: builder.mutation<User69vn, { id: string; data: User69vn }>({
      query: ({ id, data }) => {
        return {
          url: "/user/" + id,
          method: "PATCH",
          body: data,
        };
      },
    }),
    getPlayersByParent: builder.query<
      GetListResponse<Player>,
      {
        parent: string;
        limit: number;
        page: number;
        startJoinTime?: string;
        endJoinTime?: string;
      }
    >({
      query: (params) => {
        return `/player/player-by-parent?${covertObjectToSearchParams(params)}`;
      },
    }),

    createUser: builder.mutation<User69vn, User>({
      query: (user) => {
        return {
          url: "/user",
          method: "POST",
          body: user,
        };
      },
    }),
    updateUser: builder.mutation<User69vn, User>({
      query: (user) => {
        return {
          url: "/user",
          method: "PATCH",
          body: user,
        };
      },
    }),

    getUserByUsername: builder.query<User69vn, string>({
      query: (username) => {
        return `/user/username/${username}`;
      },
    }),
    getStatistic: builder.query<
      Statistic & { user: Admin; totalPlayer?: number },
      {
        userId: string;
        query: {
          timeBegin?: string;
          timeEnd?: string;
        };
      }
    >({
      query: ({ userId, query }) => {
        return `/user/statistic/${userId}?${covertObjectToSearchParams(query)}`;
      },
    }),
    uploadAvatar: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/user/upload-avatar",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const {
  useDeleteUserByIdMutation,
  useGetUserByIdQuery,
  useGetUsersQuery,
  useEditUserByIdMutation,
  useGetPlayersByParentQuery,
  useCreateUserMutation,
  useGetUserByUsernameQuery,
  useGetStatisticQuery,
  useUploadAvatarMutation,
} = userSlice;

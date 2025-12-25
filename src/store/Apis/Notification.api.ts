import { GetListResponse } from "@/model";
import { INotification } from "@/model/Notification.model";
import { createApi } from "@reduxjs/toolkit/query/react";

import { covertObjectToSearchParams } from "./Api.util";
import { baseQueryWithReauth } from "./Auth.api";

export const notificationSlice = createApi({
  reducerPath: "notification",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getNotifications: builder.query<
      GetListResponse<INotification>,
      {
        page: number;
        limit: number;
        sortBy?: string;
        sortOrder?: "ASC" | "DESC";
        type?: string;
        search?: string;
      }
    >({
      query: (params) =>
        `/notifications?${covertObjectToSearchParams(params as any)}`,
    }),

    markAllAsRead: builder.mutation<any, void>({
      query: () => ({
        url: "/notifications/read-all",
        method: "PATCH",
      }),
    }),

    markAsRead: builder.mutation<any, number>({
      query: (id) => ({
        url: `/notifications/read/${id}`,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useMarkAllAsReadMutation,
  useMarkAsReadMutation,
} = notificationSlice;

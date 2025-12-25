import { GetListResponse } from "@/model";
import { Admin } from "@/model/Admin.mode";
import { CreateGroup, Group, UserTransaction } from "@/model/Group.model";
import { Statistic } from "@/model/Statictics.model";
import { createApi } from "@reduxjs/toolkit/query/react";

import { covertObjectToSearchParams } from "./Api.util";
import { baseQueryWithReauth } from "./Auth.api";

// Define a service using a base URL and expected endpoints
export const groupSlice = createApi({
  reducerPath: "group",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getGroupById: builder.query<Group, string>({
      query: (id) => {
        return {
          url: "/group/" + id,
        };
      },
    }),

    getGroups: builder.query<
      GetListResponse<Group>,
      {
        page: number;
        limit: number;
        search?: string;
        status?: string;
      }
    >({
      query: (params) => {
        return `/group?${covertObjectToSearchParams(params)}`;
      },
    }),

    deleteGroupById: builder.mutation<any, string>({
      query: (groupId: string) => ({
        url: "/group/" + groupId,
        method: "DELETE",
      }),
    }),
    editGroupById: builder.mutation<Group, { id: string; data: Group }>({
      query: ({ id, data }) => {
        return {
          url: "/group/" + id,
          method: "PATCH",
          body: data,
        };
      },
    }),
    getMembersOfGroup: builder.query<
      GetListResponse<Admin>,
      {
        groupId: string;
        limit: number;
        page: number;
        search?: string;
      }
    >({
      query: (params) => {
        return `/group/members?${covertObjectToSearchParams(params)}`;
      },
    }),

    createGroup: builder.mutation<Group, CreateGroup>({
      query: (group) => {
        return {
          url: "/group",
          method: "POST",
          body: group,
        };
      },
    }),
    updateGroup: builder.mutation<Group, Group>({
      query: (group) => {
        return {
          url: "/group",
          method: "PATCH",
          body: group,
        };
      },
    }),

    getGroupStatistic: builder.query<
      {
        group: Group;
        totalPlayer?: number;
        totalMemnerInGroup?: number;
        totalPlayerInGroup?: number;
        statistics: Statistic | null;
      },
      {
        groupId: string;
        query: {
          timeBegin?: string;
          timeEnd?: string;
        };
      }
    >({
      query: ({ groupId, query }) => {
        return `/group/statistic/${groupId}?${covertObjectToSearchParams(query)}`;
      },
    }),

    getTransactionForUsersOfGroup: builder.query<
      GetListResponse<UserTransaction[]>,
      {
        groupId: string;
        query: {
          page: number;
          limit: number;
          account?: string | null;
          direct?: string; // adn001
          parent?: string | null;
          amountBegin?: number | null;
          amountEnd?: number | null;
          isReal?: boolean | null;
          types?: number[];
          timeBegin?: string; // 2025/04/01 00:00:00
          timeEnd?: string; // 2025/04/01 23:59:59
        };
      }
    >({
      query: ({ groupId, query }) => {
        return `/group/${groupId}/users-transaction?${covertObjectToSearchParams(query)}`;
      },
    }),
  }),
});

export const {
  useDeleteGroupByIdMutation,
  useGetGroupByIdQuery,
  useGetGroupsQuery,
  useEditGroupByIdMutation,
  useCreateGroupMutation,
  useUpdateGroupMutation,
  useGetGroupStatisticQuery,
  useGetMembersOfGroupQuery,
  useLazyGetTransactionForUsersOfGroupQuery,
} = groupSlice;

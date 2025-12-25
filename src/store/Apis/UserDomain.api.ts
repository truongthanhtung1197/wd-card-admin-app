import { createApi } from "@reduxjs/toolkit/query/react";

import { covertObjectToSearchParams } from "./Api.util";
import { baseQueryWithReauth } from "./Auth.api";

// UserDomain interfaces
export interface AssignDomainDto {
  domainId: number;
  teamId?: number;
  userId?: number;
}

export interface UnassignDomainDto {
  domainId: number;
  userId: number;
}

// Define a service using a base URL and expected endpoints
export const userDomainSlice = createApi({
  reducerPath: "userDomain",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["UserDomain"],
  endpoints: (builder) => ({
    // Assign domain to user or team
    assignDomain: builder.mutation<any, AssignDomainDto>({
      query: (assignData) => {
        return {
          url: "/user-domains/assign-domain",
          method: "POST",
          body: assignData,
        };
      },
      invalidatesTags: ["UserDomain"],
    }),

    // Get user domains by userId
    getUserDomains: builder.query<
      any,
      {
        userId: number;
        page: number;
        limit: number;
        search?: string;
      }
    >({
      query: (params) => {
        return {
          url: `/user-domains/user/${params.userId}?${covertObjectToSearchParams(
            {
              page: params.page,
              limit: params.limit,
              search: params.search,
            },
          )}`,
        };
      },
      providesTags: ["UserDomain"],
    }),

    // Get user domains (general query)
    getUserDomain: builder.query<
      any,
      {
        page: number;
        limit: number;
        sortBy?: string;
        sortOrder?: string;
        search?: string;
        assignedUserId?: string;
        teamId?: string;
      }
    >({
      query: (params) => {
        return {
          url: `/user-domains?${covertObjectToSearchParams(params)}`,
        };
      },
      providesTags: ["UserDomain"],
    }),

    deleteUserDomainById: builder.mutation<any, number>({
      query: (userDomainId: number) => ({
        url: "/user-domains/" + userDomainId,
        method: "DELETE",
      }),
      invalidatesTags: ["UserDomain"],
    }),
  }),
});

export const {
  useGetUserDomainQuery,
  useGetUserDomainsQuery,
  useAssignDomainMutation,
  useDeleteUserDomainByIdMutation,
} = userDomainSlice;

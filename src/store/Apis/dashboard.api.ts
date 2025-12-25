import { ACTIVITY_STATUS } from "@/constant/lead.constant";
import { createApi } from "@reduxjs/toolkit/query/react";

import { DoasboardDataResponse } from "./Api.type";
import { covertObjectToSearchParams } from "./Api.util";
import { baseQueryWithReauth } from "./Auth.api";

export const dashboardApiSlice = createApi({
  reducerPath: "dashboardApiSlice",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getDashboarData: builder.query<
      DoasboardDataResponse,
      { timeRange: string }
    >({
      query: ({ timeRange }) => ({
        url: `/user/dashboard/metrics`,
        method: "GET",
        params: {
          timeRange,
        },
      }),
    }),

    getLeadActivities: builder.query<
      any,
      {
        params: {
          page?: string;
          limit?: string;
          activities?: ACTIVITY_STATUS[];
        };
      }
    >({
      query: ({ params }) => ({
        url: `user/dashboard/lead-recent-activities?${covertObjectToSearchParams(params)}`,
      }),
    }),
  }),
});

export const { useGetDashboarDataQuery, useGetLeadActivitiesQuery } =
  dashboardApiSlice;

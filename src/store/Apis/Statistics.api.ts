import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQueryWithReauth } from "./Auth.api";

interface GetStatisticsDto {
  timeBegin: string;
  timeEnd: string;
}

export const statisticsSlice = createApi({
  reducerPath: "statistics",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getStatistics: builder.query<any, GetStatisticsDto>({
      query: (data) => {
        return {
          url: "/statistic",
          method: "POST",
          body: data,
        };
      },
    }),
    getStatistics2: builder.query<
      {
        expenseByDomainBranch: {
          data: {
            patternType: string;
            totalAmount: string;
            totalCount: string;
          };
        };
      },
      GetStatisticsDto
    >({
      query: (data) => {
        return {
          url: "/statistic/2",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const { useGetStatisticsQuery, useGetStatistics2Query } =
  statisticsSlice;

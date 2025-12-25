import { GetListResponse } from "@/model";
import {
  CreateUserReviewDto,
  UpdateUserReviewDto,
  UserReview,
  UserReviewStats,
} from "@/model/UserReview.model";
import { createApi } from "@reduxjs/toolkit/query/react";

import { covertObjectToSearchParams } from "./Api.util";
import { baseQueryWithReauth } from "./Auth.api";

export const userReviewSlice = createApi({
  reducerPath: "userReviews",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["UserReviews", "UserReviewStats"],
  endpoints: (builder) => ({
    createReview: builder.mutation<UserReview, CreateUserReviewDto>({
      query: (data) => ({
        url: "/user-reviews",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (_res, _err, arg) => [
        { type: "UserReviews", id: `LIST-${arg.userId}` },
        { type: "UserReviewStats", id: arg.userId },
      ],
    }),

    getReviews: builder.query<
      GetListResponse<UserReview>,
      {
        page: number;
        limit: number;
        userId?: number;
        reviewerId?: number;
        orderId?: number;
      }
    >({
      query: (params) => `/user-reviews?${covertObjectToSearchParams(params)}`,
      providesTags: (res, _err, arg) => [
        { type: "UserReviews", id: `LIST-${arg.userId ?? "all"}` },
      ],
    }),

    getReviewById: builder.query<UserReview, number | string>({
      query: (id) => `/user-reviews/${id}`,
    }),

    updateReview: builder.mutation<
      UserReview,
      { id: number | string; data: UpdateUserReviewDto }
    >({
      query: ({ id, data }) => ({
        url: `/user-reviews/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_res, _err, arg) => [
        { type: "UserReviews", id: "LIST-all" },
      ],
    }),

    deleteReview: builder.mutation<{ success: boolean }, number | string>({
      query: (id) => ({
        url: `/user-reviews/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_res, _err, id) => [
        { type: "UserReviews", id: "LIST-all" },
      ],
    }),

    getUserStats: builder.query<UserReviewStats, number | string>({
      query: (userId) => `/user-reviews/stats/${userId}`,
      providesTags: (_res, _err, userId) => [
        { type: "UserReviewStats", id: userId },
      ],
    }),
  }),
});

export const {
  useCreateReviewMutation,
  useGetReviewsQuery,
  useGetReviewByIdQuery,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  useGetUserStatsQuery,
} = userReviewSlice;

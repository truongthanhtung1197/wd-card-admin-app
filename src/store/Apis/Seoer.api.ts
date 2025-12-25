import { GetListResponse } from "@/model";
import { SeoerCartDetail } from "@/model/Seoer.model";
import { createApi } from "@reduxjs/toolkit/query/react";

import { covertObjectToSearchParams } from "./Api.util";
import { baseQueryWithReauth } from "./Auth.api";
// Define a service using a base URL and expected endpoints
export const seoerSlice = createApi({
  reducerPath: "seoer",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    getCartDetailsById: builder.query<any, string>({
      query: (id) => {
        return {
          url: "/cart-details/" + id,
        };
      },
    }),

    getCartDetails: builder.query<
      GetListResponse<any>,
      {
        page: number;
        limit: number;
      }
    >({
      query: (params) => {
        return {
          url: `/cart-details?${covertObjectToSearchParams(params)}`,
        };
      },
      providesTags: ["Cart"],
    }),
    deleteCartDetailsById: builder.mutation<any, number>({
      query: (id: number) => ({
        url: `/cart-details/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
    updateCartDetailsById: builder.mutation<
      SeoerCartDetail,
      { id: number; data: SeoerCartDetail }
    >({
      query: ({ id, data }) => {
        return {
          url: "/cart-details/" + id,
          method: "PATCH",
          body: data,
        };
      },
    }),
    addCartDetail: builder.mutation<
      any,
      { data: { serviceId: number; quantity: number } }
    >({
      query: ({ data }) => {
        return {
          url: "/cart-details/",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartDetailsByIdQuery,
  useGetCartDetailsQuery,
  useDeleteCartDetailsByIdMutation,
  useUpdateCartDetailsByIdMutation,
  useAddCartDetailMutation,
} = seoerSlice;

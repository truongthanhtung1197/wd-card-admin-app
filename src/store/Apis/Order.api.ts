import { IOrder } from "@/constant/Manager.constant";
import { GetListResponse } from "@/model";
import { createApi } from "@reduxjs/toolkit/query/react";

import { covertObjectToSearchParams } from "./Api.util";
import { baseQueryWithReauth } from "./Auth.api";

// Define a service using a base URL and expected endpoints

interface orderItem {
  serviceId: number;
  quantity: number;
  cartDetailId: number;
}

interface CreateOrderDto {
  orderItems: orderItem[];
  domainId: number;
}

export enum ORDER_STATUS {
  SEOER_ORDER = "SEOER_ORDER",
  CONFIRMED_BY_TEAM_LEADER = "CONFIRMED_BY_TEAM_LEADER",
  REJECTED_BY_TEAM_LEADER = "REJECTED_BY_TEAM_LEADER",
  CANCELLED_BY_SEOER = "CANCELLED_BY_SEOER",
  CONFIRMED_BY_PARTNER = "CONFIRMED_BY_PARTNER",
  COMPLETED_BY_PARTNER = "COMPLETED_BY_PARTNER",
  CONFIRMED_COMPLETION_BY_SEOER = "CONFIRMED_COMPLETION_BY_SEOER",
  PAYMENT_APPROVED_BY_MANAGER = "PAYMENT_APPROVED_BY_MANAGER",
  PAID_BY_MANAGER = "PAID_BY_MANAGER",
  CANCELLED_BY_MANAGER = "CANCELLED_BY_MANAGER",
}

export enum ORDER_HISTORY_TYPE {
  CREATE_ORDER = "CREATE_ORDER",
  CHANGE_STATUS = "CHANGE_STATUS",
  PRICE_ADJUSTMENT = "PRICE_ADJUSTMENT",
  REMOVE_ORDER_DETAIL = "REMOVE_ORDER_DETAIL",
}

export interface IOrderHistory {
  id: number;
  orderId: number;
  type: ORDER_HISTORY_TYPE;
  metadata?: any;
  createdAt: string;
  updatedAt: string;
  user: any;
}

export const LABEL_ORDER_STATUS: Record<ORDER_STATUS, string> = {
  [ORDER_STATUS.SEOER_ORDER]: "SEOER_ORDER",
  [ORDER_STATUS.CONFIRMED_BY_TEAM_LEADER]: "CONFIRMED_BY_TEAM_LEADER",
  [ORDER_STATUS.REJECTED_BY_TEAM_LEADER]: "REJECTED_BY_TEAM_LEADER",
  [ORDER_STATUS.CANCELLED_BY_SEOER]: "CANCELLED_BY_SEOER",
  [ORDER_STATUS.CONFIRMED_BY_PARTNER]: "CONFIRMED_BY_PARTNER",
  [ORDER_STATUS.COMPLETED_BY_PARTNER]: "COMPLETED_BY_PARTNER",
  [ORDER_STATUS.CONFIRMED_COMPLETION_BY_SEOER]: "CONFIRMED_COMPLETION_BY_SEOER",
  [ORDER_STATUS.PAYMENT_APPROVED_BY_MANAGER]: "PAYMENT_APPROVED_BY_MANAGER",
  [ORDER_STATUS.PAID_BY_MANAGER]: "PAID_BY_MANAGER",
  [ORDER_STATUS.CANCELLED_BY_MANAGER]: "CANCELLED_BY_MANAGER",
};

export const optionsStatusOrder = [
  {
    key: ORDER_STATUS.SEOER_ORDER,
    label: LABEL_ORDER_STATUS?.SEOER_ORDER,
    icon: "FaPlus",
  },
  {
    key: ORDER_STATUS.CONFIRMED_BY_TEAM_LEADER,
    label: LABEL_ORDER_STATUS?.CONFIRMED_BY_TEAM_LEADER,
    icon: "FaUserCheck",
  },
  {
    key: ORDER_STATUS.REJECTED_BY_TEAM_LEADER,
    label: LABEL_ORDER_STATUS?.REJECTED_BY_TEAM_LEADER,
    icon: "FaUserTimes",
  },
  {
    key: ORDER_STATUS.CANCELLED_BY_SEOER,
    label: LABEL_ORDER_STATUS?.CANCELLED_BY_SEOER,
    icon: "FaBan",
  },
  {
    key: ORDER_STATUS.CONFIRMED_BY_PARTNER,
    label: LABEL_ORDER_STATUS?.CONFIRMED_BY_PARTNER,
    icon: "FaHandshake",
  },
  {
    key: ORDER_STATUS.COMPLETED_BY_PARTNER,
    label: LABEL_ORDER_STATUS?.COMPLETED_BY_PARTNER,
    icon: "FaTools",
  },
  {
    key: ORDER_STATUS.CONFIRMED_COMPLETION_BY_SEOER,
    label: LABEL_ORDER_STATUS?.CONFIRMED_COMPLETION_BY_SEOER,
    icon: "FaThumbsUp",
  },
  {
    key: ORDER_STATUS.PAYMENT_APPROVED_BY_MANAGER,
    label: LABEL_ORDER_STATUS?.PAYMENT_APPROVED_BY_MANAGER,
    icon: "FaMoneyCheckAlt",
  },
  {
    key: ORDER_STATUS.PAID_BY_MANAGER,
    label: LABEL_ORDER_STATUS?.PAID_BY_MANAGER,
    icon: "FaMoneyBillWave",
  },
  {
    key: ORDER_STATUS.CANCELLED_BY_MANAGER,
    label: LABEL_ORDER_STATUS?.CANCELLED_BY_MANAGER,
    icon: "FaBan",
  },
];

export const ordersSlice = createApi({
  reducerPath: "orders",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getOrders: builder.query<
      GetListResponse<any>,
      {
        page: number;
        limit: number;
        search?: string;
        timeBegin?: string;
        timeEnd?: string;
        status?: ORDER_STATUS;
        orderCode?: string;
        teamId?: string;
        sortBy?: string;
        sortOrder?: string;
        domainId?: string;
      }
    >({
      query: (params) => {
        return `/orders?${covertObjectToSearchParams(params)}`;
      },
    }),

    getOrdersByDomainId: builder.query<
      GetListResponse<any>,
      {
        page: number;
        limit: number;
        search?: string;
        timeBegin?: string;
        timeEnd?: string;
        status?: ORDER_STATUS;
        orderCode?: string;
        teamId?: string;
        sortBy?: string;
        sortOrder?: string;
        domainId?: string;
      }
    >({
      query: (params) => {
        return `/orders/domain/${params.domainId}?${covertObjectToSearchParams(params)}`;
      },
    }),

    getOrdersExport: builder.query<
      GetListResponse<any>,
      {
        search?: string;
        timeBegin?: string;
        timeEnd?: string;
        status?: ORDER_STATUS;
        orderCode?: string;
        teamId?: string;
        sortBy?: string;
        sortOrder?: string;
        domainId?: string;
      }
    >({
      query: (params) => {
        return `/orders/export?${covertObjectToSearchParams(params)}`;
      },
    }),
    changeStatusOrders: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => {
        return {
          url: "/orders/" + id,
          method: "PATCH",
          body: data,
        };
      },
    }),
    createOrders: builder.mutation<any, CreateOrderDto>({
      query: (data) => {
        return {
          url: "/orders",
          method: "POST",
          body: data,
        };
      },
    }),
    getMyOrders: builder.query<
      GetListResponse<any>,
      {
        page: number;
        limit: number;
        status?: ORDER_STATUS;
        timeBegin?: string;
        timeEnd?: string;
        orderCode?: string;
        sortBy?: string;
        sortOrder?: string;
      }
    >({
      query: (params) => {
        return `/orders/my-orders?${covertObjectToSearchParams(params)}`;
      },
    }),
    getPartnerOrder: builder.query<
      GetListResponse<any>,
      {
        page: number;
        limit: number;
        status?: ORDER_STATUS[];
        timeBegin?: string;
        timeEnd?: string;
        orderCode?: string;
        serviceType?: any;
        fieldType?: any;
        sortBy?: string;
        sortOrder?: string;
      }
    >({
      query: (params) => {
        return `/orders/partner-manage-orders?${covertObjectToSearchParams(params)}`;
      },
    }),

    // New endpoint for team orders
    getTeamOrders: builder.query<
      GetListResponse<any>,
      {
        page: number;
        limit: number;
        status?: ORDER_STATUS;
        timeBegin?: string;
        timeEnd?: string;
        orderCode?: string;
        serviceType?: any;
        teamId?: string;
        sortBy?: string;
        sortOrder?: string;
      }
    >({
      query: (params) => {
        return `/orders/order-of-my-team?${covertObjectToSearchParams(params)}`;
      },
    }),

    getOrderById: builder.query<IOrder, string>({
      query: (id) => {
        return `/orders/${id}`;
      },
    }),

    // API upload file
    uploadFile: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/file/upload", // Cập nhật URL của API upload file
        method: "POST",
        body: formData,
      }),
    }),

    // API cập nhật trạng thái đơn hàng
    updateOrderStatus: builder.mutation<
      any,
      { id: string; status: ORDER_STATUS; fileId?: string }
    >({
      query: ({ id, status, fileId }) => ({
        url: `/orders/${id}/status`,
        method: "PATCH",
        body: { status, fileId },
      }),
    }),

    updateOrderPriceAdjustment: builder.mutation({
      query: ({ id, priceAdjustment }) => ({
        url: `/orders/${id}/price-adjustment`,
        method: "PATCH",
        body: { priceAdjustment },
      }),
    }),

    updateOrderPrice: builder.mutation({
      query: ({ id, price, discount }) => ({
        url: `/orders/${id}/price`,
        method: "PATCH",
        body: { price, discount },
      }),
    }),

    updateOrderLinkDrive: builder.mutation({
      query: ({ id, linkDrive }) => ({
        url: `/orders/order-detail/${id}/add-link-drive`,
        method: "PATCH",
        body: { linkDrive },
      }),
    }),
    updateBillOrder: builder.mutation({
      query: ({ id, billPaymentLink }) => ({
        url: `/orders/${id}/bill-payment-link`,
        method: "PATCH",
        body: { billPaymentLink },
      }),
    }),
    deleteOrderDetail: builder.mutation<{ success: boolean }, string | number>({
      query: (id) => ({
        url: `/orders/order-detail/${id}`,
        method: "DELETE",
      }),
    }),

    getOrderHistories: builder.query<
      GetListResponse<IOrderHistory>,
      {
        page?: number;
        limit?: number;
        sortBy?: string;
        sortOrder?: string;
        orderId?: number;
        type?: ORDER_HISTORY_TYPE;
      }
    >({
      query: (params) => {
        return `/order-histories?${covertObjectToSearchParams(params)}`;
      },
    }),
  }),
});

export const {
  useGetOrderByIdQuery,
  useGetOrdersQuery,
  useGetOrdersExportQuery,
  useGetPartnerOrderQuery,
  useChangeStatusOrdersMutation,
  useCreateOrdersMutation,
  useGetMyOrdersQuery,
  useUploadFileMutation, // Hook cho API upload file
  useUpdateOrderStatusMutation, // Hook cho API cập nhật trạng thái đơn
  useUpdateOrderPriceAdjustmentMutation, // Hook cho API cập nhật đơn hàng
  useUpdateOrderLinkDriveMutation, // Hook cho API cập nhật link drive
  useUpdateBillOrderMutation, // Hook cho API cập nhật link drive
  useUpdateOrderPriceMutation,
  useGetTeamOrdersQuery,
  useDeleteOrderDetailMutation,
  useGetOrderHistoriesQuery,
  useGetOrdersByDomainIdQuery,
} = ordersSlice;

import { DOMAIN_ORDER_STATUS, DOMAIN_STATUS } from "@/constant/domain.constant";
import { IDomain } from "@/constant/Manager.constant";
import { GetListResponse } from "@/model";
import { Domain, DomainOrder, DomainOrderBody } from "@/model/Domain.model";
import { createApi } from "@reduxjs/toolkit/query/react";

import { covertObjectToSearchParams } from "./Api.util";
import { baseQueryWithReauth } from "./Auth.api";
// Define a service using a base URL and expected endpoints
export const domainsSlice = createApi({
  reducerPath: "domains",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getDomains: builder.query<
      GetListResponse<any>,
      {
        page: number;
        limit: number;
        search?: string;
        status?: string[];
        userId?: string;
        teamId?: string;
        sortBy?: string;
        sortOrder?: string;
        assignedUserId?: string;
      }
    >({
      query: (params) => {
        return `/domains?${covertObjectToSearchParams(params)}`;
      },
    }),

    getDomainsAssignToMe: builder.query<
      GetListResponse<any>,
      {
        page: number;
        limit: number;
        search?: string;
        status?: string[];
        userId?: string;
        teamId?: string;
        sortBy?: string;
        sortOrder?: string;
      }
    >({
      query: (params) => {
        return `/domains/assign-to-me?${covertObjectToSearchParams(params)}`;
      },
    }),

    getDomainsOfAllMyTeam: builder.query<
      GetListResponse<any>,
      {
        page: number;
        limit: number;
        search?: string;
        status?: string[];
        userId?: string;
        teamId?: string;
        sortBy?: string;
        sortOrder?: string;
      }
    >({
      query: (params) => {
        return `/domains/of-all-my-team?${covertObjectToSearchParams(params)}`;
      },
    }),

    editDomainById: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => {
        return {
          url: "/domains/" + id,
          method: "PATCH",
          body: data,
        };
      },
    }),

    createDomain: builder.mutation<any, any>({
      query: (domain) => {
        return {
          url: "/domains",
          method: "POST",
          body: domain,
        };
      },
    }),
    getDomainById: builder.query<
      {
        data: IDomain;
        totalDomainSpending: number;
      },
      string
    >({
      query: (id) => {
        return {
          url: "/domains/" + id,
        };
      },
    }),

    deleteDomainById: builder.mutation<any, number>({
      query: (domainId: number) => ({
        url: "/domains/" + domainId,
        method: "DELETE",
      }),
    }),

    getDomainsAssignToSeoer: builder.query<
      GetListResponse<any>,
      {
        page: number;
        limit: number;
        search?: string;
        status?: string[];
        assignedUserId?: string;
      }
    >({
      query: (params) => {
        return `/domains/assign-to-me?${covertObjectToSearchParams(params)}`;
      },
    }),

    orderDomains: builder.mutation<any, DomainOrderBody>({
      query: (body) => {
        return {
          url: "/domain-orders",
          method: "POST",
          body: body,
        };
      },
    }),

    getDomainsOrders: builder.query<
      GetListResponse<DomainOrder>,
      {
        page: number;
        limit: number;
        search?: string;
        status?: string[];
        sortBy?: string;
        sortOrder?: string;
        proposeCode?: string;
        orderCode?: string;
      }
    >({
      query: (params) => {
        return `/domain-orders?${covertObjectToSearchParams(params)}`;
      },
    }),

    getDomainsOrdersById: builder.query<
      DomainOrder,
      {
        id: string;
      }
    >({
      query: (params) => {
        return `/domain-orders/${params.id}`;
      },
    }),

    getDomainsOfDomainOrders: builder.query<
      Domain[],
      {
        domainOrderId: string;
      }
    >({
      query: (params) => {
        return `/domain-orders/${params.domainOrderId}/domains`;
      },
    }),

    editDomainOrderById: builder.mutation<
      any,
      {
        id: string;
        data: {
          price?: number;
          status?: DOMAIN_ORDER_STATUS;
          description?: string;
          teamId?: number;
        };
      }
    >({
      query: ({ id, data }) => {
        return {
          url: "/domain-orders/" + id,
          method: "PATCH",
          body: data,
        };
      },
    }),

    editDomainOrderDetailById: builder.mutation<
      any,
      {
        id: string;
        data: {
          price?: number;
          status?: DOMAIN_STATUS;
          teamId?: number | null;
        };
      }
    >({
      query: ({ id, data }) => {
        return {
          url: "/domain-orders/domain-detail/" + id,
          method: "PATCH",
          body: data,
        };
      },
    }),

    // /update-domain-price-by-tld/:id
    updateDomainPriceByTld: builder.mutation<
      any,
      {
        domainOrderId: string;
        data: {
          tld: string;
          price: number;
          onlyWhenZero?: boolean;
          status?: DOMAIN_STATUS;
        };
      }
    >({
      query: ({ domainOrderId, data }) => {
        const { tld, price, onlyWhenZero = true, status } = data;
        return {
          url: "/domain-orders/update-domain-price-by-tld/" + domainOrderId,
          method: "PATCH",
          body: {
            tld,
            price,
            onlyWhenZero,
            status,
          },
        };
      },
    }),
  }),
});

export const {
  useGetDomainsQuery,
  useGetDomainsAssignToMeQuery,
  useGetDomainsOfAllMyTeamQuery,
  useEditDomainByIdMutation,
  useGetDomainByIdQuery,
  useDeleteDomainByIdMutation,
  useCreateDomainMutation,
  useOrderDomainsMutation,
  useGetDomainsOrdersQuery,
  useGetDomainsOrdersByIdQuery,
  useEditDomainOrderByIdMutation,
  useEditDomainOrderDetailByIdMutation,
  useGetDomainsOfDomainOrdersQuery,
  useUpdateDomainPriceByTldMutation,
} = domainsSlice;

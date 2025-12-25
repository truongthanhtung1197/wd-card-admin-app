import {
  SERVICE_FIELD_TYPE,
  SERVICE_STATUS,
  SERVICE_TYPE,
  SERVICE_TYPE_PACK,
} from "@/constant/service.constant";
import { GetListResponse } from "@/model";
import { Service } from "@/model/Partner.model";
import { createApi } from "@reduxjs/toolkit/query/react";

import { covertObjectToSearchParams } from "./Api.util";
import { baseQueryWithReauth } from "./Auth.api";
// Define a service using a base URL and expected endpoints
export const serviceSlice = createApi({
  reducerPath: "services",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getServices: builder.query<
      GetListResponse<Service>,
      {
        page: number;
        limit: number;
        search?: string;
        fieldType?: SERVICE_FIELD_TYPE[];
        isIndex?: boolean;
        isSaleBanner?: boolean;
        isSaleGuestPost?: boolean;
        isSaleTextLink?: boolean;
        typePack?: SERVICE_TYPE_PACK;
        type?: any;
        status?: SERVICE_STATUS;
        partnerId?: any;
        serviceType?: SERVICE_TYPE;
        isShow?: boolean;
        sortBy?: string;
        sortOrder?: string;
      }
    >({
      query: (params) => {
        return `/services?${covertObjectToSearchParams(params)}`;
      },
    }),

    getMyServices: builder.query<
      GetListResponse<Service>,
      {
        page: number;
        limit: number;
        search?: string;
        fieldType?: SERVICE_FIELD_TYPE[];
        isIndex?: boolean;
        isSaleBanner?: boolean;
        isSaleGuestPost?: boolean;
        isSaleTextLink?: boolean;
        typePack: SERVICE_TYPE_PACK;
        type?: any;
        status?: SERVICE_STATUS;
        sortBy?: string;
        sortOrder?: string;
      }
    >({
      query: (params) => {
        return `/services/my-services?${covertObjectToSearchParams(params)}`;
      },
    }),

    changeStatus: builder.mutation<Service, { id: string; data: Service }>({
      query: ({ id, data }) => {
        return {
          url: "/services/" + id,
          method: "PATCH",
          body: data,
        };
      },
    }),

    updateMultipleServiceStatus: builder.mutation<
      any,
      { ids: string[]; status: SERVICE_STATUS }
    >({
      query: (body) => {
        return {
          url: "/services/status/multiple",
          method: "PATCH",
          body: body,
        };
      },
    }),

    deleteService: builder.mutation<Service, { id: string }>({
      query: ({ id }) => {
        return {
          url: "/services/" + id,
          method: "DELETE",
        };
      },
    }),
    importService: builder.mutation<any, any>({
      query: (data) => ({
        url: "/services/import",
        method: "POST",
        body: data,
      }),
    }),
    getServiceById: builder.query<Service, { id: string }>({
      query: ({ id }) => {
        return `/services/${id}`;
      },
    }),
  }),
});

export const {
  useGetServicesQuery,
  useGetMyServicesQuery,
  useChangeStatusMutation,
  useDeleteServiceMutation,
  useImportServiceMutation,
  useGetServiceByIdQuery,
  useUpdateMultipleServiceStatusMutation,
} = serviceSlice;

import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQueryWithReauth } from "./Auth.api";
// Define a service using a base URL and expected endpoints
export const partnerSlice = createApi({
  reducerPath: "partner",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    addService: builder.mutation<any, any>({
      query: (data) => {
        return {
          url: "/services",
          method: "POST",
          body: data,
        };
      },
    }),
    updateService: builder.mutation<any, any>({
      query: (data) => {
        return {
          url: `/services/${data.id}`,
          method: "PATCH",
          body: data?.data,
        };
      },
    }),
  }),
});

export const { useAddServiceMutation, useUpdateServiceMutation } = partnerSlice;

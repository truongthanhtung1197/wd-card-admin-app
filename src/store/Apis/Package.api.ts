import { GetListResponse } from "@/model";
import {
  CreatePackage,
  CreatePackageFeature,
  Package,
  PackageFeature,
  PackageResponse,
  UpdatePackage,
  UpdatePackageFeature,
} from "@/model/Package.model";
import { createApi } from "@reduxjs/toolkit/query/react";

import { covertObjectToSearchParams } from "./Api.util";
import { baseQueryWithReauth } from "./Auth.api";

export const packageSlice = createApi({
  reducerPath: "package",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Package", "PackageFeature"],
  endpoints: (builder) => ({
    getPackageById: builder.query<PackageResponse, string>({
      query: (id) => {
        return {
          url: "/packages/" + id,
        };
      },
      providesTags: (result, error, id) => [{ type: "Package", id }],
    }),

    getPackages: builder.query<
      { items: Package[]; total: number; page: number; limit: number },
      {
        page: number;
        limit: number;
        search?: string;
        sortBy?: string;
        sortOrder?: string;
      }
    >({
      query: (params) => {
        return `/packages?${covertObjectToSearchParams(params)}`;
      },
      providesTags: ["Package"],
    }),

    createPackage: builder.mutation<PackageResponse, CreatePackage>({
      query: (pkg) => {
        return {
          url: "/packages",
          method: "POST",
          body: pkg,
        };
      },
      invalidatesTags: ["Package"],
    }),

    deletePackageById: builder.mutation<any, number>({
      query: (packageId: number) => ({
        url: "/packages/" + packageId,
        method: "DELETE",
      }),
      invalidatesTags: ["Package"],
    }),

    editPackageById: builder.mutation<
      PackageResponse,
      { id: string; data: UpdatePackage }
    >({
      query: ({ id, data }) => {
        return {
          url: "/packages/" + id,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: (result, error, { id }) => [
        { type: "Package", id },
        "Package",
      ],
    }),

    // Package Features
    getPackageFeatures: builder.query<
      GetListResponse<PackageFeature>,
      {
        page?: number;
        limit?: number;
        packageId?: number;
      }
    >({
      query: (params) => {
        return `/package-features?${covertObjectToSearchParams(params)}`;
      },
      providesTags: ["PackageFeature"],
    }),

    getPackageFeatureById: builder.query<
      { data: PackageFeature },
      string
    >({
      query: (id) => {
        return {
          url: "/package-features/" + id,
        };
      },
      providesTags: (result, error, id) => [{ type: "PackageFeature", id }],
    }),

    createPackageFeature: builder.mutation<
      { data: PackageFeature },
      CreatePackageFeature
    >({
      query: (feature) => {
        return {
          url: "/package-features",
          method: "POST",
          body: feature,
        };
      },
      invalidatesTags: ["PackageFeature", "Package"],
    }),

    updatePackageFeature: builder.mutation<
      { data: PackageFeature },
      { id: string; data: UpdatePackageFeature }
    >({
      query: ({ id, data }) => {
        return {
          url: "/package-features/" + id,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: (result, error, { id }) => [
        { type: "PackageFeature", id },
        "PackageFeature",
        "Package",
      ],
    }),

    deletePackageFeatureById: builder.mutation<any, number>({
      query: (featureId: number) => ({
        url: "/package-features/" + featureId,
        method: "DELETE",
      }),
      invalidatesTags: ["PackageFeature", "Package"],
    }),
  }),
});

export const {
  useGetPackageByIdQuery,
  useGetPackagesQuery,
  useCreatePackageMutation,
  useDeletePackageByIdMutation,
  useEditPackageByIdMutation,
  useGetPackageFeaturesQuery,
  useGetPackageFeatureByIdQuery,
  useCreatePackageFeatureMutation,
  useUpdatePackageFeatureMutation,
  useDeletePackageFeatureByIdMutation,
} = packageSlice;


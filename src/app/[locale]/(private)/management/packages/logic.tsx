import React, { useMemo } from "react";
import { useSearchParams } from "next/navigation";

import { SortableHeader } from "@/app/_components/common/Sorting";
import { ROUTERS } from "@/constant";
import { ADMIN_ROLE } from "@/constant/admin.constant";
import { useLocaleRouter } from "@/hook/useLocaleRouter";
import { Package } from "@/model/Package.model";
import { useAppSelector } from "@/store";
import { useGetPackagesQuery } from "@/store/Apis/Package.api";
import { AuthSelector } from "@/store/Auth/Auth.redux";
import { formatCurrency, formatDateTime } from "@/utils/format.util";
import { createColumnHelper } from "@tanstack/react-table";

import PackageActionColumn from "./_components/PackageActionColumn";
import { checkRole } from "@/utils/auth.utils";
import { PACKAGE_STATUS } from "@/model/Package.model";

const usePackageLogic = () => {
  const searchParams = useSearchParams();
  const { admin, roles } = useAppSelector(AuthSelector.selectAuthState);

  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 10;
  const search = searchParams.get("s") || undefined;
  const sortBy = searchParams.get("sortBy") || undefined;
  const sortOrder = searchParams.get("sortOrder") || undefined;

  const {
    data,
    isLoading: fetching,
    refetch,
  } = useGetPackagesQuery(
    {
      limit: Number(limit),
      page: Number(page),
      search,
      // sortBy: sortBy as string,
      // sortOrder: sortOrder as string,
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const columnHelper = createColumnHelper<Package>();

  const router = useLocaleRouter();
  const columns = useMemo(() => {
    const result = [
      columnHelper.accessor("name", {
        cell: (info) => (
          <p className="truncate text-left text-base font-medium">
            {info.getValue()}
          </p>
        ),
        header: () => (
          <SortableHeader sortKey="name">
            <p className="text-left">Name</p>
          </SortableHeader>
        ),
        meta: {
          className: "min-w-[200px]",
        },
      }),
      columnHelper.accessor("price", {
        cell: (info) => (
          <p className="truncate text-left text-base font-medium">
            {formatCurrency(info.getValue())}
          </p>
        ),
        header: () => (
          <SortableHeader sortKey="price">
            <p className="text-left">Price</p>
          </SortableHeader>
        ),
        meta: {
          className: "min-w-[120px]",
        },
      }),
      columnHelper.accessor("durationDays", {
        cell: (info) => (
          <p className="truncate text-left text-base font-medium">
            {info.getValue()} days
          </p>
        ),
        header: () => (
          <SortableHeader sortKey="durationDays">
            <p className="text-left">Duration</p>
          </SortableHeader>
        ),
        meta: {
          className: "min-w-[120px]",
        },
      }),
      columnHelper.accessor("status", {
        cell: (info) => {
          const status = info.getValue();
          const statusClass =
            status === PACKAGE_STATUS.ACTIVE
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800";
          return (
            <span
              className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${statusClass}`}
            >
              {status === PACKAGE_STATUS.ACTIVE ? "Active" : "Inactive"}
            </span>
          );
        },
        header: () => (
          <SortableHeader sortKey="status">
            <p className="text-left">Status</p>
          </SortableHeader>
        ),
        meta: {
          className: "min-w-[120px]",
        },
      }),
      columnHelper.accessor("createdAt", {
        cell: (info) => (
          <p className="truncate text-left text-base font-medium">
            {formatDateTime((info.getValue() as unknown as string) || "")}
          </p>
        ),
        header: () => (
          <SortableHeader sortKey="createdAt">
            <p className="text-left">Created At</p>
          </SortableHeader>
        ),
        meta: {
          className: "min-w-[156px]",
        },
      }),
    ];

    // Only show action column for Super Admin users
    if (
      checkRole({
        userRoles: roles || [],
        allowRoles: [ADMIN_ROLE.SUPER_ADMIN, ADMIN_ROLE.MANAGER],
      })
    ) {
      result.push(
        columnHelper.display({
          id: "action",
          header: () => <>Actions</>,
          cell: (cell) => {
            return (
              <PackageActionColumn
                data={cell.row.original}
                refetch={refetch}
                dataLength={data?.items?.length || 0}
              />
            );
          },
          meta: {
            className: "!w-[58px] px-0",
          },
        }) as any,
      );
    }

    return result;
  }, [admin, data?.items?.length, refetch, router]);

  return {
    data: data?.items || [],
    total: data?.total || 0,
    fetching,
    columns,
  };
};

export { usePackageLogic };

import React, { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { SortableHeader } from "@/app/_components/common/Sorting";
import { ROUTERS } from "@/constant";
import { ADMIN_ROLE } from "@/constant/admin.constant";
import { useLocaleRouter } from "@/hook/useLocaleRouter";
import { Admin, UserRole } from "@/model/Admin.mode";
import { useAppSelector } from "@/store";
import { useGetAdminsQuery } from "@/store/Apis/Admin.api";
import { AuthSelector } from "@/store/Auth/Auth.redux";
import { formatDateTime } from "@/utils/format.util";
import { createColumnHelper } from "@tanstack/react-table";

import ActionColumn from "../_components/ActionColumn";
import { checkRole } from "@/utils/auth.utils";
import { log } from "console";

const useAdminLogic = () => {
  const searchParams = useSearchParams();
  const { admin, roles } = useAppSelector(AuthSelector.selectAuthState);
  const t = useTranslations("Admin");

  const role: any = searchParams.get("role") || undefined;
  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 10;
  const search = searchParams.get("s") || undefined;
  const sortBy = searchParams.get("sortBy") || undefined;
  const sortOrder = searchParams.get("sortOrder") || undefined;
  console.log(roles, 99);
  const {
    data,
    isLoading: fetching,
    refetch,
  } = useGetAdminsQuery(
    {
      limit: Number(limit),
      page: Number(page),
      search,
      sortBy: sortBy as string,
      sortOrder: sortOrder as string,
      roles: role ? role.split(",") : [],
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const columnHelper = createColumnHelper<Admin>();

  const router = useLocaleRouter();
  const columns = useMemo(() => {
    const result = [
      columnHelper.accessor("email", {
        cell: (info) => (
          <p className="truncate text-left text-base font-medium">
            {info.getValue()}
          </p>
        ),
        header: () => (
          <SortableHeader sortKey="username">
            <p className="text-left">{"Email"}</p>
          </SortableHeader>
        ),
        meta: {
          className: "min-w-[156px]",
        },
      }),
      columnHelper.accessor("userRoles", {
        cell: (info) => (
          <p className="truncate text-left text-base font-medium">
            {info
              .getValue()
              ?.map((role: UserRole) => role.role?.roleName)
              .join(", ") || "-"}
          </p>
        ),
        header: () => (
          <SortableHeader sortKey="role">
            <p className="text-left">{t("columns.role")}</p>
          </SortableHeader>
        ),
        meta: {
          className: "min-w-[156px]",
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
            <p className="text-left">{t("columns.createdAt")}</p>
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
          header: () => <>Thao tác</>,
          cell: (cell) => {
            return (
              <ActionColumn
                data={cell.row.original}
                refetch={refetch}
                dataLength={data?.length}
                onDetail={() => {
                  router.push(
                    ROUTERS.MANAGEMENT_ADMIN_DETAIL.replace(
                      ":id",
                      String(cell.row.original.id || ""),
                    ),
                  );
                }}
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
  }, [admin, t, data?.length, refetch]);

  return {
    data: data?.data || [],
    total: data?.total || 0,
    fetching,
    columns,
  };
};

export { useAdminLogic };

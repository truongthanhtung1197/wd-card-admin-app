import React, { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { SortableHeader } from "@/app/_components/common/Sorting";
import { ROUTERS } from "@/constant";
import { ADMIN_ROLE, ADMIN_ROLE_OPTIONS } from "@/constant/admin.constant";
import { IUserStatistics } from "@/constant/Manager.constant";
import { PermissionEnum } from "@/constant/Permission.constant";
import { useLocaleRouter } from "@/hook/useLocaleRouter";
import { useAppSelector } from "@/store";
import { useGetAdminsQuery } from "@/store/Apis/Admin.api";
import { AuthSelector } from "@/store/Auth/Auth.redux";
import { checkPermission } from "@/utils/auth.utils";
import { formatDateTime } from "@/utils/format.util";
import { getLabelFromOptions } from "@/utils/loan.utils";
import { createColumnHelper } from "@tanstack/react-table";

import ActionColumn from "../_components/ActionColumn";

const useAdminLogic = () => {
  const searchParams = useSearchParams();
  const { admin } = useAppSelector(AuthSelector.selectAuthState);
  const t = useTranslations("Admin");

  const role: any = searchParams.get("role") || undefined;
  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 10;
  const search = searchParams.get("s") || undefined;
  const sortBy = searchParams.get("sortBy") || undefined;
  const sortOrder = searchParams.get("sortOrder") || undefined;

  const adminRole = useMemo(() => {
    return [
      ADMIN_ROLE.SUPER_ADMIN,
      ADMIN_ROLE.ASSISTANT,
      ADMIN_ROLE.MANAGER,
      ADMIN_ROLE.SEOER,
      ADMIN_ROLE.PARTNER,
    ];
  }, []);

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
      role: role
        ? role.split(",")
        : [
            ADMIN_ROLE.ASSISTANT,
            ADMIN_ROLE.MANAGER,
            ADMIN_ROLE.VICE_TEAM_LEADER,
            ADMIN_ROLE.TEAM_LEADER,
          ],
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const columnHelper = createColumnHelper<IUserStatistics>();

  const router = useLocaleRouter();
  const columns = useMemo(() => {
    const result = [
      columnHelper.accessor("username", {
        cell: (info) => (
          <p className="truncate text-left text-base font-medium">
            {info.getValue()}
          </p>
        ),
        header: () => (
          <SortableHeader sortKey="username">
            <p className="text-left">{t("columns.account")}</p>
          </SortableHeader>
        ),
        meta: {
          className: "min-w-[156px]",
        },
      }),
      columnHelper.accessor("role", {
        cell: (info) => (
          <p className="truncate text-left text-base font-medium">
            {getLabelFromOptions(info.getValue()?.roleName, [
              {
                label: "Super Admin",
                key: ADMIN_ROLE.SUPER_ADMIN,
              },
              ...ADMIN_ROLE_OPTIONS,
            ])}
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
    if (admin?.role?.roleName === ADMIN_ROLE.SUPER_ADMIN) {
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
    isCanEdit: checkPermission({
      permission: {},
      accessKeys: [PermissionEnum.USER_MGMT_EDIT],
    }),
  };
};

export { useAdminLogic };

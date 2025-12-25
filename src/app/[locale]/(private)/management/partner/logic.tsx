import React, { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { SortableHeader } from "@/app/_components/common/Sorting";
import UserInformationV2 from "@/app/_components/common/UserInformationV2";
import { ROUTERS } from "@/constant";
import { ADMIN_ROLE } from "@/constant/admin.constant";
import { IUserStatistics } from "@/constant/Manager.constant";
import { PermissionEnum } from "@/constant/Permission.constant";
import { useLocaleRouter } from "@/hook/useLocaleRouter";
import { Admin } from "@/model/Admin.mode";
import { useAppSelector } from "@/store";
import { useGetAdminsQuery } from "@/store/Apis/Admin.api";
import { AuthSelector } from "@/store/Auth/Auth.redux";
import { checkPermission } from "@/utils/auth.utils";
import { formatDateTime } from "@/utils/format.util";
import { createColumnHelper } from "@tanstack/react-table";

import ActionColumn from "./_components/ActionColumn";

const useAdminLogic = () => {
  const searchParams = useSearchParams();
  const { admin } = useAppSelector(AuthSelector.selectAuthState);
  const t = useTranslations("Users");
  const tMyProfile = useTranslations("MyProfile");

  const role: any = searchParams.get("role") || undefined;
  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 10;
  const search = searchParams.get("s") || undefined;
  const sortBy = searchParams.get("sortBy") || undefined;
  const sortOrder = searchParams.get("sortOrder") || undefined;

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
      role: ADMIN_ROLE.PARTNER,
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );
  const router = useLocaleRouter();
  const columnHelper = createColumnHelper<IUserStatistics>();

  const columns = useMemo(() => {
    const result = [
      columnHelper.accessor("username", {
        cell: ({ row }) => <UserInformationV2 user={row.original as Admin} />,
        header: () => (
          <SortableHeader sortKey="username">
            <p className="text-left">{t("columns.account")}</p>
          </SortableHeader>
        ),
        meta: {
          className: "min-w-[156px]",
        },
      }),
      // columnHelper.accessor("email", {
      //   cell: (info) => (
      //     <p className="truncate text-left text-base font-medium">
      //       {info.getValue()}
      //     </p>
      //   ),
      //   header: () => <p className="text-left">Email</p>,
      //   meta: {
      //     className: "min-w-[156px]",
      //   },
      // }),
      columnHelper.accessor("displayName", {
        cell: (info) => (
          <p className="truncate text-left text-base font-medium">
            {info.getValue()}
          </p>
        ),
        header: () => (
          <p className="text-left">{tMyProfile("basicInfo.displayName")}</p>
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
    {
      result.push(
        columnHelper.display({
          id: "action",
          header: () => <></>,
          cell: (cell) => {
            return (
              <ActionColumn
                data={cell.row.original}
                refetch={refetch}
                dataLength={data?.length}
                onDetail={() => {
                  router.push(
                    ROUTERS.MANAGEMENT_PARTNER_DETAIL.replace(
                      ":id",
                      String(cell.row.original.id || ""),
                    ),
                  );
                }}
              />
            );
          },
          meta: {
            className: "!w-[58px] !min-w-[58px] !max-w-[58px] px-0",
          },
        }) as any,
      );
    }
    return result;
  }, [admin, tMyProfile, t]);

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

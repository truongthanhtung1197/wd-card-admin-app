"use client";
import { useMemo } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { DisplayName } from "@/app/_components/common/DisplayName";
import { DOMAIN_TYPE_OPTIONS } from "@/constant/domain.constant";
import { Admin } from "@/model/Admin.mode";
import { useGetUserDomainQuery } from "@/store/Apis/UserDomain.api";
import { formatCurrency, formatDateTime } from "@/utils/format.util";
import { getLabelFromOptions } from "@/utils/loan.utils";
import { createColumnHelper } from "@tanstack/react-table";

import ActionColumn from "./ActionColumn";

export const UserDomainLogic = ({
  refetch: refetchAdminDetail,
  data: dataAdminDetail,
}: {
  refetch: () => void;
  data: Admin;
}) => {
  const t = useTranslations("UserDomain");
  const searchParams = useSearchParams();
  const { adminId } = useParams();
  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 10;
  const search = searchParams.get("s") || undefined;
  const status = searchParams.get("status") || undefined;
  const {
    data,
    isLoading: fetching,
    refetch,
  } = useGetUserDomainQuery(
    {
      limit: Number(limit),
      page: Number(page),
      search,
      assignedUserId: adminId as string,
    },
    {
      refetchOnMountOrArgChange: true,
      skip: !adminId,
    },
  );

  const columnHelper = createColumnHelper<any>();

  const columns = useMemo(() => {
    const result = [
      columnHelper.accessor("domain.name", {
        cell: (info) => (
          <p className="truncate text-left text-base font-medium">
            {info.getValue()}
          </p>
        ),
        header: () => <p className="text-left">{t("columns.domainName")}</p>,
        meta: {
          className: "min-w-[156px]",
        },
      }),
      columnHelper.accessor("domain.type", {
        cell: (info) => (
          <p className="truncate text-left text-base font-medium">
            {getLabelFromOptions(info.getValue(), DOMAIN_TYPE_OPTIONS)}
          </p>
        ),
        header: () => <p className="text-left">{t("columns.domainType")}</p>,
        meta: {
          className: "min-w-[156px]",
        },
      }),
      columnHelper.accessor("domain.budget", {
        cell: (info) => (
          <p className="truncate !text-right text-base font-medium">
            {formatCurrency(Number(info.getValue() || 0) || 0)}
          </p>
        ),
        header: () => <p className="!text-right">{t("columns.budget")}</p>,
        meta: {
          className: "min-w-[156px]",
        },
      }),
      columnHelper.accessor("domain.status", {
        cell: (info) => (
          <p className="truncate text-left text-base font-medium">
            {info?.row?.original?.domain?.status}
          </p>
        ),
        header: () => <p className="text-left">{t("columns.status")}</p>,
        meta: {
          className: "min-w-[156px]",
        },
      }),
      columnHelper.accessor("user", {
        cell: (info) => (
          <DisplayName
            displayName={info.getValue()?.displayName}
            username={info.getValue()?.username}
            isAdmin={true}
          />
        ),
        header: () => <p className="text-left">{t("columns.userName")}</p>,
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
        header: () => <p className="text-left">{t("columns.createdAt")}</p>,
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
                refetch={() => {
                  refetch();
                  refetchAdminDetail();
                }}
                data={cell.row.original}
              />
            );
          },
          meta: {
            className: "!w-[48px] !min-w-[48px] !max-w-[48px] px-0",
          },
        }) as any,
      );
    }
    return result;
  }, [refetch, refetchAdminDetail, t]);
  return {
    data: data?.data || [],
    total: data?.total || 0,
    fetching,
    columns,
  };
};

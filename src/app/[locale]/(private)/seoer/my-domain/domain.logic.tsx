"use client";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { SortableHeader } from "@/app/_components/common/Sorting";
import {
  DOMAIN_STATUS_OPTIONS,
  DOMAIN_TYPE_OPTIONS,
} from "@/constant/domain.constant";
import { useGetDomainsAssignToMeQuery } from "@/store/Apis/Domain.api";
import { AuthSelector } from "@/store/Auth";
import { formatCurrency } from "@/utils/format.util";
import { getLabelFromOptions } from "@/utils/loan.utils";
import { createColumnHelper } from "@tanstack/react-table";

import ActionColumnDomain from "./_components/ActionColumn";

export const useDomainLogic = () => {
  const t = useTranslations("SeoerDomain.myDomain");
  const searchParams = useSearchParams();
  const auth = useSelector(AuthSelector.selectAuthState);
  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 10;
  const search = searchParams.get("s") || undefined;
  const status = searchParams.get("status") || undefined;
  const sortBy = searchParams.get("sortBy") || undefined;
  const sortOrder = searchParams.get("sortOrder") || undefined;

  const {
    data,
    isLoading: fetching,
    refetch,
  } = useGetDomainsAssignToMeQuery(
    {
      limit: Number(limit),
      page: Number(page),
      search,
      status: status ? status.split(",") : undefined,
      sortBy: sortBy as string,
      sortOrder: sortOrder as string,
    },
    {
      refetchOnMountOrArgChange: true,
      skip: !auth?.admin?.id,
    },
  );

  const columnHelper = createColumnHelper<any>();

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
            <p className="text-left">{t("columns.domainName")}</p>
          </SortableHeader>
        ),
        meta: {
          className: "min-w-[156px]",
        },
      }),
      columnHelper.accessor("type", {
        cell: (info) => (
          <p className="truncate text-left text-base font-medium">
            {getLabelFromOptions(info.getValue(), DOMAIN_TYPE_OPTIONS)}
          </p>
        ),
        header: () => (
          <SortableHeader sortKey="type">
            <p className="text-left">{t("columns.type")}</p>
          </SortableHeader>
        ),
        meta: {
          className: "min-w-[156px]",
        },
      }),
      columnHelper.accessor("budget", {
        cell: (info) => (
          <p className="truncate !text-right text-base font-medium">
            {formatCurrency(Number(info.getValue() || 0) || 0)}
          </p>
        ),
        header: () => (
          <SortableHeader sortKey="budget">
            <p className="!text-right">{t("columns.budget")}</p>
          </SortableHeader>
        ),
        meta: {
          className: "min-w-[156px]",
        },
      }),
      columnHelper.accessor("status", {
        cell: (info) => (
          <p className="truncate text-left text-base font-medium">
            {getLabelFromOptions(info.getValue(), DOMAIN_STATUS_OPTIONS)}
          </p>
        ),
        header: () => (
          <SortableHeader sortKey="status">
            <p className="text-left">{t("columns.status")}</p>
          </SortableHeader>
        ),
        meta: {
          className: "min-w-[156px]",
        },
      }),
      columnHelper.display({
        id: "action",
        header: () => <></>,
        cell: (cell) => {
          return <ActionColumnDomain data={cell.row.original} />;
        },
        meta: {
          className: "!w-[48px] !min-w-[48px] !max-w-[48px]",
        },
      }) as any,
    ];
    // {
    //   result.push(
    //     columnHelper.display({
    //       id: "action",
    //       header: () => <></>,
    //       cell: (cell) => {
    //         return (
    //           <ActionColumnDomain
    //             data={cell.row.original}
    //             onEdit={() => {
    //               setEditDomain(cell.row.original);
    //               showEditDomain();
    //             }}
    //             refetch={refetch}
    //           />
    //         );
    //       },
    //       meta: {
    //         className: "!w-[48px] !min-w-[48px] !max-w-[48px] px-0",
    //       },
    //     }) as any,
    //   );
    // }
    return result;
  }, [refetch]);
  return {
    data: data?.data || [],
    total: data?.total || 0,
    fetching,
    columns,
  };
};

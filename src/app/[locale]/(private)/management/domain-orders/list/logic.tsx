import React, { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { SortableHeader } from "@/app/_components/common/Sorting";
import UserInformationV2 from "@/app/_components/common/UserInformationV2";
import { DOMAIN_ORDER_STATUS_OPTIONS } from "@/constant/domain.constant";
import { DomainOrder } from "@/model/Domain.model";
import { useAppSelector } from "@/store";
import { useGetDomainsOrdersQuery } from "@/store/Apis/Domain.api";
import { AuthSelector } from "@/store/Auth/Auth.redux";
import { formatCurrency, formatDateTime } from "@/utils/format.util";
import { getLabelFromOptions } from "@/utils/loan.utils";
import { createColumnHelper } from "@tanstack/react-table";

import ActionDomainColumn from "./ActionColumnDomain";

const useAdminLogic = () => {
  const t = useTranslations("Domain");
  const searchParams = useSearchParams();

  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 10;
  const search = searchParams.get("s") || undefined;
  const orderCode = searchParams.get("orderCode") || undefined;
  const proposeCode = searchParams.get("proposeCode") || undefined;
  const status = searchParams.get("status") || undefined;
  const sortBy = searchParams.get("sortBy") || undefined;
  const sortOrder = searchParams.get("sortOrder") || undefined;

  const { admin } = useAppSelector(AuthSelector.selectAuthState);

  // Use different API endpoints based on role
  const { data, isFetching, refetch } = useGetDomainsOrdersQuery(
    {
      limit: Number(limit),
      page: Number(page),
      search,
      orderCode,
      proposeCode,
      status: status ? status.split(",") : undefined,
      sortBy: sortBy as string,
      sortOrder: sortOrder as string,
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const columnHelper = createColumnHelper<DomainOrder>();
  const columns = useMemo(() => {
    const result = [
      columnHelper.accessor("orderCode", {
        cell: (info) => (
          <p className="break-all text-left text-base font-medium">
            {info.getValue()}
          </p>
        ),
        header: () => <p className=" text-left">Mã đơn</p>,
        meta: {
          className: "!max-w-[70px] !w-[70px] !min-w-[70px]",
        },
      }),
      columnHelper.accessor("proposeCode", {
        cell: (info) => (
          <p className="break-all  text-left text-base font-medium">
            {info.getValue()}
          </p>
        ),
        header: () => <p className="text-left">Mã đề xuất</p>,
        meta: {
          className: "!max-w-[70px] !w-[70px] !min-w-[70px]",
        },
      }),
      columnHelper.accessor("description", {
        cell: (info) => (
          <p className="truncate text-left text-base font-medium">
            {info.getValue()}
          </p>
        ),
        header: () => <p className="text-left">Description</p>,
        meta: {},
      }),
      columnHelper.display({
        id: "Người order",
        header: () => <p className="text-left">Người order</p>,
        cell: (info) => {
          return (
            <UserInformationV2 user={info.row.original.user} type="table" />
          );
        },
        meta: {
          className: "!max-w-[70px] !w-[70px] !min-w-[70px]",
        },
      }),
      columnHelper.accessor("status", {
        cell: (info) => (
          <p className="truncate text-left text-base font-medium">
            {getLabelFromOptions(info.getValue(), DOMAIN_ORDER_STATUS_OPTIONS)}
          </p>
        ),
        header: () => <p className="text-left">{t("columns.status")}</p>,
        meta: {
          className: "!max-w-[56px] !w-[56px] !min-w-[56px]",
        },
      }),
      columnHelper.accessor("domainsCount", {
        cell: (info) => (
          <p className="truncate text-left text-base font-medium">
            {info.getValue()}
          </p>
        ),
        header: () => <p className="text-left">Tổng domain</p>,
        meta: {
          className: "!max-w-[40px] !w-[40px] !min-w-[40px]",
        },
      }),
      columnHelper.accessor("price", {
        cell: (info) => (
          <p className="truncate text-left text-base font-medium">
            {Number(formatCurrency(info.getValue()))
              ? formatCurrency(info.getValue())
              : "-"}
          </p>
        ),
        header: () => <p className="text-left">Giá</p>,
        meta: {
          className: "!max-w-[90px] !w-[90px] !min-w-[90px]",
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
          className: "!max-w-[56px] !w-[56px] !min-w-[56px]",
        },
      }),
      columnHelper.display({
        id: "action",
        header: () => <></>,
        cell: (cell) => {
          return <ActionDomainColumn data={cell.row.original} />;
        },
        meta: {
          className: "!w-[40px] !min-w-[40px] !max-w-[40px]",
        },
      }) as any,
    ];

    return result;
  }, [data, t, refetch]);

  return {
    data: data?.data || [],
    total: data?.total || 0,
    fetching: isFetching,
    columns,
    admin,
  };
};

export { useAdminLogic };

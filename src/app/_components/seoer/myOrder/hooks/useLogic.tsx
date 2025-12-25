import React, { useCallback, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import UserInformationV2 from "@/app/_components/common/UserInformationV2";
import { ServiceNameCell } from "@/app/_components/table/_components/ServiceNameCell";
import { useVisibility } from "@/hook";
import { Service } from "@/model/Partner.model";
import {
  optionsStatusOrder,
  ORDER_STATUS,
  useGetMyOrdersQuery,
} from "@/store/Apis/Order.api";
import {
  formatCurrency,
  formatDateTimeWithLines,
  getLabelFromKey,
} from "@/utils/format.util";
import {
  calculateOrderTotalPrice,
  statusOrderClass,
} from "@/utils/order.ultil";
import { createColumnHelper } from "@tanstack/react-table";

import ActionColumnService from "../ActionColumnService";

const useLogic = () => {
  const t = useTranslations("MyOrder");
  const tStatus = useTranslations("statusOrder");
  const searchParams = useSearchParams();

  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 10;
  const timeBegin = searchParams.get("start") || undefined;
  const timeEnd = searchParams.get("end") || undefined;
  const orderCode = searchParams.get("orderCode") || "";
  const statusParam = searchParams.get("status") || undefined;
  const sortBy = searchParams.get("sortBy") || undefined;
  const sortOrder = searchParams.get("sortOrder") || undefined;

  const status =
    (statusParam && ORDER_STATUS[statusParam as keyof typeof ORDER_STATUS]) ||
    undefined;

  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [serviceModalData, setServiceModalData] = useState<any>({});

  const {
    data,
    isLoading: fetching,
    refetch,
  } = useGetMyOrdersQuery(
    {
      limit: Number(limit),
      page: Number(page),
      status: status,
      timeBegin: timeBegin,
      timeEnd: timeEnd,
      orderCode: orderCode,
      sortBy: sortBy as string,
      sortOrder: sortOrder as string,
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const [editService, setEditService] = useState<Service | null>(null);

  const {
    isVisible: isVisibleCreateDomain,
    show: showCreateDomain,
    hide: hideCreateDomain,
  } = useVisibility();

  const columnHelper = createColumnHelper<any>();

  const handleViewServiceDetails = useCallback((data: any) => {
    if (!data?.service) return;
    setServiceModalData(data.service);
    setIsServiceModalOpen(true);
  }, []);

  const columns = useMemo(() => {
    const result = [
      columnHelper.accessor("orderCode", {
        size: 100,
        cell: ({ getValue, row }) => (
          <p className="cursor-pointer break-words text-left text-base font-medium hover:text-brand-primary">
            {getValue()}
          </p>
        ),
        header: () => (
          <p className="text-left text-base">{t("columns.orderCode")}</p>
        ),
        meta: {
          className: "!w-[70px] !min-w-[70px] !max-w-[70px]",
        },
      }),
      columnHelper.accessor("domainName", {
        size: 100,
        cell: ({ row }) => (
          <p className="break-words text-left text-base font-medium">
            {row.original?.domain?.name}
          </p>
        ),
        header: () => (
          <p className="text-left text-base">{t("columns.domainName")}</p>
        ),
        meta: {
          className: "!w-[100px] !min-w-[100px] !max-w-[100px]",
        },
      }),

      columnHelper.accessor("serviceType", {
        size: 70,
        cell: (info) => {
          return <ServiceNameCell order={info.row.original} />;
        },
        header: () => (
          <p className="text-left text-base">{t("columns.service")}</p>
        ),
        meta: {
          className: "!w-[100px] !min-w-[100px] !max-w-[100px]",
        },
      }),

      columnHelper.accessor("partner", {
        size: 70,
        cell: ({ row }) => {
          return (
            <UserInformationV2
              user={row.original.orderDetails?.[0]?.service?.user}
              type="table"
            />
          );
        },
        header: () => (
          <p className="text-left text-base">{t("columns.partner")}</p>
        ),
        meta: {
          className: "!w-[100px] !min-w-[100px] !max-w-[100px]",
        },
      }),

      columnHelper.accessor("domain", {
        size: 70,
        cell: (info) => {
          return (
            <p className="break-words text-left text-base font-medium">
              {info?.row?.original?.domain?.name}
            </p>
          );
        },
        header: () => (
          <p className="text-left text-base">{t("columns.domainSeo")}</p>
        ),
        meta: {
          className: "!w-[70px] !min-w-[70px] !max-w-[70px]",
        },
      }),

      columnHelper.accessor("price", {
        size: 80,
        cell: (info) => {
          return (
            <p className="break-words text-right text-base ">
              {formatCurrency(info?.row?.original?.price)}
            </p>
          );
        },
        header: () => (
          <p className="break-words text-right text-base">
            {t("columns.total")}
          </p>
        ),
        meta: {
          className: "!w-[90px] !min-w-[90px] !max-w-[90px]",
        },
      }),

      columnHelper.accessor("total", {
        size: 80,
        cell: (info) => {
          return (
            <p className="break-words text-right text-base">
              {formatCurrency(calculateOrderTotalPrice(info?.row?.original))}
            </p>
          );
        },
        header: () => (
          <p className="text-right text-base">{t("columns.finalTotal")}</p>
        ),
        meta: {
          className: "!w-[80px] !min-w-[80px] !max-w-[80px]",
        },
      }),
      columnHelper.accessor("status", {
        size: 100,
        cell: ({ getValue }) => {
          const status = getValue() as any;

          const label = getLabelFromKey(optionsStatusOrder, status);

          return (
            <p
              className={`break-words text-left text-base font-medium ${statusOrderClass[status] || ""}`}
            >
              {tStatus(label)}
            </p>
          );
        },
        header: () => (
          <p className="text-left text-base">{t("columns.status")}</p>
        ),
        meta: {
          className: "!w-[100px] !min-w-[100px] !max-w-[100px]",
        },
      }),

      columnHelper.accessor("createdAt", {
        size: 100,
        cell: ({ getValue }) => {
          const dateTime = formatDateTimeWithLines(getValue());
          if (!dateTime) {
            return (
              <div className="break-words text-left text-base font-medium">
                -
              </div>
            );
          }
          return (
            <div className="break-words text-left text-base font-medium">
              <div>{dateTime.time}</div>
              <div className="text-sm text-gray-600">{dateTime.date}</div>
            </div>
          );
        },
        header: () => (
          <p className="text-left text-base">{t("columns.time")}</p>
        ),
        meta: {
          className: "!w-[70px] !min-w-[70px] !max-w-[70px] overflow-hidden",
        },
      }),

      columnHelper.display({
        id: "action",
        size: 80,
        header: () => (
          <p className="text-center text-base">{t("columns.actions")}</p>
        ),
        cell: (cell) => {
          return (
            <div className="flex items-center justify-center">
              <ActionColumnService data={cell.row.original} refetch={refetch} />
            </div>
          );
        },
        meta: {
          className: "!w-[50px] !min-w-[50px] !max-w-[50px] px-0",
        },
      }) as any,
    ];

    return result;
  }, [data, data?.data, handleViewServiceDetails, refetch, t]);

  return {
    data: data?.data || [],
    total: data?.total || 0,
    columns,
    isVisibleCreateDomain,
    hideCreateDomain,
    refetch,
    fetching,
    editService,
    isServiceModalOpen,
    setIsServiceModalOpen,
    serviceModalData,
  };
};

export { useLogic };

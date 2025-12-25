import React, { useCallback, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { SortableHeader } from "@/app/_components/common/Sorting";
import { SERVICE_TYPE } from "@/constant/service.constant";
import { useVisibility } from "@/hook";
import { Service } from "@/model/Partner.model";
import { ORDER_STATUS, useGetPartnerOrderQuery } from "@/store/Apis/Order.api";
import {
  formatCurrency,
  formatDateTime,
  formatTimeHHmmss,
} from "@/utils/format.util";
import {
  calculateOrderTotalPrice,
  statusOrderClass,
} from "@/utils/order.ultil";
import { createColumnHelper } from "@tanstack/react-table";

import MyTooltip from "../../common/MyTooltip";
import UserInformationV2 from "../../common/UserInformationV2";
import { ServiceNameCell } from "../../table/_components/ServiceNameCell";
import ActionColumnService from "./ActionColumnService";

const usePartnerOrderLogic = () => {
  const t = useTranslations("Partner.order");
  const tOrderStatus = useTranslations("statusOrder");
  const searchParams = useSearchParams();

  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 10;
  const startDate = searchParams.get("start") || undefined;
  const endDate = searchParams.get("end") || undefined;
  const orderCode = searchParams.get("orderCode") || undefined;
  const statusParam = searchParams.get("status") || undefined;
  const serviceType = searchParams.get("serviceType") || undefined;
  const fieldType = searchParams.get("fieldType") || undefined;
  const sortBy = searchParams.get("sortBy") || undefined;
  const sortOrder = searchParams.get("sortOrder") || undefined;

  const status =
    statusParam?.split(",")?.map((item) => item as ORDER_STATUS) || undefined;

  const {
    data,
    isLoading: fetching,
    refetch,
  } = useGetPartnerOrderQuery(
    {
      limit: Number(limit),
      page: Number(page),
      status: status,
      timeBegin: startDate,
      timeEnd: endDate,
      orderCode: orderCode,
      serviceType: serviceType
        ? (serviceType.split(",") as SERVICE_TYPE[])
        : undefined,
      // fieldType: fieldType
      //   ? (fieldType.split(",") as SERVICE_FIELD_TYPE[])
      //   : undefined,
      sortBy: sortBy as string,
      sortOrder: sortOrder as string,
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );

  // State for modal order detail
  const [isModalDetail, setIsModalDetail] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const handleViewOrderDetail = useCallback(
    (orderData: any) => {
      setSelectedOrder(orderData);
      setIsModalDetail(true);
    },
    [selectedOrder],
  );

  const handleCloseModal = useCallback(() => {
    setIsModalDetail(false);
  }, []);

  const [editService, setEditService] = useState<Service | null>(null);

  const {
    isVisible: isVisibleCreateDomain,
    show: showEditOrder,
    hide: hideEditOrder,
  } = useVisibility();

  const onOpenCreateDomain = () => {
    setEditService(null);
    showEditOrder();
  };

  const [serviceModalData, setServiceModalData] = useState<any>({});

  const handleViewServiceDetails = useCallback((data: any) => {
    if (!data?.service) return;
    setServiceModalData(data.service);
  }, []);

  const columnHelper = createColumnHelper<any>();

  const columns = useMemo(() => {
    const result = [
      columnHelper.accessor("orderCode", {
        size: 120,
        cell: ({ row, getValue }) => (
          <p
            className="cursor-pointer break-words text-left text-base font-medium hover:text-brand-primary"
            onClick={(e) => {
              e.stopPropagation();
              handleViewOrderDetail(row.original);
            }}
          >
            {getValue()}
          </p>
        ),
        header: () => (
          <SortableHeader sortKey="orderCode">
            <p className="text-left text-base font-semibold">
              {t("columns.orderCode")}
            </p>
          </SortableHeader>
        ),
        meta: {
          className: "!w-[100px] !min-w-[100px] !max-w-[100px]",
        },
      }),
      columnHelper.accessor("user", {
        size: 100,
        cell: (info) => <UserInformationV2 user={info?.row?.original?.user} />,
        meta: {
          className: "!w-[150px]",
        },
        header: () => (
          <p className="text-left text-base font-semibold">
            {t("columns.buyer")}
          </p>
        ),
      }),
      columnHelper.accessor("serviceName", {
        size: 120,
        cell: ({ row }) => (
          <ServiceNameCell
            handleViewServiceDetails={handleViewServiceDetails}
            order={row.original}
          />
        ),
        header: () => (
          <p className="text-left text-base font-semibold">
            {t("columns.serviceName")}
          </p>
        ),
        meta: {
          className: "!w-[120px] !min-w-[120px] !max-w-[120px]",
        },
      }),
      // columnHelper.accessor("serviceType", {
      //   size: 100,
      //   cell: (info) => (
      //     <p className="break-words text-left text-base font-medium">
      //       {getLabelFromOptions(
      //         info.getValue() as SERVICE_TYPE,
      //         SERVICE_TYPE_OPTIONS,
      //       )}
      //     </p>
      //   ),
      //   header: () => (
      //     <SortableHeader sortKey="serviceType">
      //       <p className="text-left text-base font-semibold">
      //         {t("columns.serviceType")}
      //       </p>
      //     </SortableHeader>
      //   ),
      //   meta: {
      //     className: "!w-[100px] !min-w-[100px] !max-w-[100px]",
      //   },
      // }),
      columnHelper.accessor("domain", {
        size: 150,
        cell: ({ row }) => (
          <p className="line-clamp-3 break-words text-left text-base font-medium">
            <MyTooltip content={row.original?.domain?.name ?? "-"}>
              {row.original?.domain?.name ?? "-"}
            </MyTooltip>
          </p>
        ),
        header: () => (
          <p className="text-left text-base font-semibold">Domain</p>
        ),
        meta: {
          className: "!w-[100px] !min-w-[100px] !max-w-[100px]",
        },
      }),
      columnHelper.accessor("price", {
        size: 120,
        cell: ({ row }) => (
          <p className="break-words text-right text-base font-medium">
            {formatCurrency(row.original?.price)}
          </p>
        ),
        header: () => (
          <p className="text-right text-base font-semibold">Giá gốc</p>
        ),
        meta: {
          className: "!w-[120px] !min-w-[120px] !max-w-[120px]",
        },
      }),
      columnHelper.accessor("discount", {
        size: 120,
        cell: ({ row }) => (
          <p className="break-words text-right text-base font-medium">
            {formatCurrency(row.original?.discount)}
          </p>
        ),
        header: () => (
          <p className="text-right text-base font-semibold">
            {t("columns.discount")}
          </p>
        ),
        meta: {
          className: "!w-[120px] !min-w-[120px] !max-w-[120px]",
        },
      }),
      columnHelper.accessor("priceAdjustment", {
        size: 130,
        cell: ({ row }) => (
          <p className="break-words text-right text-base font-medium">
            {formatCurrency(row.original?.priceAdjustment)}
          </p>
        ),
        header: () => (
          <p className="text-right text-base font-semibold">
            {t("columns.priceAdjustment")}
          </p>
        ),
        meta: {
          className: "!w-[130px] !min-w-[130px] !max-w-[130px]",
        },
      }),
      columnHelper.accessor("totalAfterDiscount", {
        size: 140,
        cell: ({ row }) => (
          <p className="break-words text-right text-base font-medium">
            {formatCurrency(calculateOrderTotalPrice(row.original))}
          </p>
        ),
        header: () => (
          <p className="text-right text-base font-semibold">
            {t("columns.totalAfterDiscount")}
          </p>
        ),
        meta: {
          className: "!w-[140px] !min-w-[140px] !max-w-[140px]",
        },
      }),
      columnHelper.accessor("status", {
        size: 120,
        cell: ({ getValue }) => {
          const status = getValue();
          return (
            <p
              className={`break-words text-left text-base font-medium ${statusOrderClass[status] || ""}`}
            >
              {tOrderStatus(status)}
            </p>
          );
        },
        header: () => (
          <SortableHeader sortKey="status">
            <p className="text-left text-base font-semibold">
              {t("columns.status")}
            </p>
          </SortableHeader>
        ),
        meta: {
          className: "!w-[120px] !min-w-[120px] !max-w-[120px]",
        },
      }),
      columnHelper.accessor("createdAt", {
        size: 100,
        cell: ({ getValue }) => (
          <div className="flex flex-col items-center text-sm">
            <span className="font-medium">{formatTimeHHmmss(getValue())}</span>
            <span className="text-gray-500">{formatDateTime(getValue())}</span>
          </div>
        ),
        header: () => (
          <SortableHeader sortKey="createdAt">
            <p className="text-center text-base font-semibold">
              {t("columns.time")}
            </p>
          </SortableHeader>
        ),
        meta: {
          className: "!w-[90px] !min-w-[90px] !max-w-[90px]",
        },
      }),
      columnHelper.display({
        id: "action",
        size: 70,
        header: () => (
          <p className="text-center text-base font-semibold">Thao tác</p>
        ),
        cell: (cell) => {
          return (
            <ActionColumnService
              data={cell.row.original}
              refetch={refetch}
              onView={() => handleViewOrderDetail(cell.row.original)}
            />
          );
        },
        meta: {
          className: "!w-[100px] !min-w-[100px] !max-w-[100px] px-1",
        },
      }) as any,
    ];

    return result;
  }, [data, data?.data, handleViewServiceDetails, refetch, t, tOrderStatus]);

  return {
    data: data?.data || [],
    total: data?.total || 0,
    columns,
    onOpenCreateDomain,
    isVisibleCreateDomain,
    hideEditOrder,
    refetch,
    fetching,
    editService,
    isModalDetail,
    selectedOrder,
    handleCloseModal,
    serviceModalData,
  };
};
export { usePartnerOrderLogic };
